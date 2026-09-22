import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import {
  PrismaClient,
  LabelType,
  CloudProvider,
  PlatformType,
  BatchStatus,
} from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create PostgreSQL connection pool for direct connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

// ---------------------------------------------------------------------------
// CSV File Paths
// ---------------------------------------------------------------------------

const CLOUD_CSV_PATH = path.resolve(
  __dirname,
  "../src/app/demos/ai-labeling/prediction_examples_Cloud.csv"
);
const DC_CSV_PATH = path.resolve(
  __dirname,
  "../src/app/demos/ai-labeling/prediction_examples_DC.csv"
);

// ---------------------------------------------------------------------------
// Types for CSV rows
// ---------------------------------------------------------------------------

interface CloudCsvRow {
  predicted_env: string;
  location: string;
  predicted_app: string;
  predicted_role: string;
  app_prediction_explanation_short: string;
  app_prediction_explanation: string;
  role_prediction_explanation_short: string;
  role_prediction_explanation: string;
  inventory: string;
}

interface DcCsvRow {
  hostname: string;
  process_port: string;
  predicted_env: string;
  location: string;
  predicted_app: string;
  predicted_role: string;
  app_prediction_explanation_short: string;
  app_prediction_explanation: string;
  role_prediction_explanation_short: string;
  role_prediction_explanation: string;
}

interface ParsedInventory {
  resourceName: string;
  accountName: string;
  tags: Record<string, string>;
}

interface ParsedProcess {
  path: string;
  name: string;
  port: number | null;
  protocol: string | null;
}

// ---------------------------------------------------------------------------
// Parsing Helpers
// ---------------------------------------------------------------------------

/**
 * Parses the inventory string from Cloud CSV rows.
 * Format: " Resource Name: <name> Account Name: <account>label/key=value,label/key=value,..."
 */
function parseInventory(inventoryStr: string): ParsedInventory {
  const str = inventoryStr.trim();

  // Extract Resource Name
  const resourceNameMatch = str.match(/Resource Name:\s*(\S+)/);
  const resourceName = resourceNameMatch ? resourceNameMatch[1].trim() : "unknown";

  // Extract Account Name - it appears between "Account Name: " and the first "label/"
  const accountNameMatch = str.match(/Account Name:\s*([^\n]+?)(?:label\/|$)/);
  const accountName = accountNameMatch ? accountNameMatch[1].trim() : "unknown";

  // Tags start after Account Name and are in format "label/key=value,label/key=value,..."
  // Find where the tags begin
  const tagsStartIndex = str.indexOf("label/");
  const tags: Record<string, string> = {};

  if (tagsStartIndex !== -1) {
    const tagsStr = str.slice(tagsStartIndex);
    // Split by comma+label/ to get individual tags
    const tagParts = tagsStr.split(",label/");
    for (const part of tagParts) {
      // Remove leading "label/" if present
      const cleaned = part.replace(/^label\//, "");
      const eqIdx = cleaned.indexOf("=");
      if (eqIdx !== -1) {
        const key = cleaned.slice(0, eqIdx).trim();
        const value = cleaned.slice(eqIdx + 1).trim();
        tags[key] = value;
      }
    }
  }

  return { resourceName, accountName, tags };
}

/**
 * Detects CloudProvider from account name.
 * Account names contain "gcp", "azure", or "aws" keywords.
 */
function detectCloudProvider(accountName: string): CloudProvider {
  const lower = accountName.toLowerCase();
  if (lower.includes("gcp") || lower.includes("google")) return "GCP";
  if (lower.includes("azure") || lower.includes("az-")) return "Azure";
  if (lower.includes("aws") || lower.includes("amazon")) return "AWS";
  // Default to GCP since the sample data uses gcp account names
  return "GCP";
}

/**
 * Parses the process_port string from DC CSV rows.
 * Format: Python set literal: {'path-name-port NUM-PROTO', 'path-name-port NUM-PROTO', ...}
 * Each entry: "full/path/to/exe-ServiceName-port PORT-PROTOCOL"
 */
function parseProcessPort(processStr: string): ParsedProcess[] {
  if (!processStr || processStr.trim() === "nan" || processStr.trim() === "") {
    return [];
  }

  // Remove outer braces and leading/trailing whitespace
  const inner = processStr.trim().replace(/^\{/, "").replace(/\}$/, "").trim();

  // Split by ', ' between quoted entries - handle Python set format
  // Entries are separated by ', ' and each is wrapped in single quotes
  const entries: string[] = [];
  let current = "";
  let inQuote = false;

  for (let i = 0; i < inner.length; i++) {
    const char = inner[i];
    if (char === "'" && !inQuote) {
      inQuote = true;
    } else if (char === "'" && inQuote) {
      inQuote = false;
      if (current.trim()) {
        entries.push(current.trim());
      }
      current = "";
    } else if (inQuote) {
      current += char;
    }
    // Outside quotes we just skip (commas, spaces between entries)
  }

  const processes: ParsedProcess[] = [];

  for (const entry of entries) {
    // Each entry format: "path-to-exe-ServiceName-port PORT-PROTOCOL"
    // e.g. "C:\\Windows\\System32\\svchost.exe-TermService-port 3389-TCP"
    // or "System-WinRm-port 5985-TCP"
    // or "C:\\Windows\\System32\\svchost.exe-port 5050-UDP" (no service name)

    // Find "-port " to split path+name from port info
    const portIdx = entry.lastIndexOf("-port ");
    if (portIdx === -1) {
      // No port info, skip
      continue;
    }

    const pathAndName = entry.slice(0, portIdx);
    const portAndProto = entry.slice(portIdx + 6); // skip "-port "

    // Split portAndProto on last "-" to get port and protocol
    const lastDash = portAndProto.lastIndexOf("-");
    let port: number | null = null;
    let protocol: string | null = null;

    if (lastDash !== -1) {
      const portStr = portAndProto.slice(0, lastDash);
      protocol = portAndProto.slice(lastDash + 1);
      port = parseInt(portStr, 10);
      if (isNaN(port)) port = null;
    } else {
      const portNum = parseInt(portAndProto, 10);
      if (!isNaN(portNum)) port = portNum;
    }

    // Split pathAndName on last "\" or "/" to get path and name
    const backslashIdx = pathAndName.lastIndexOf("\\");
    const forwardSlashIdx = pathAndName.lastIndexOf("/");
    const lastSepIdx = Math.max(backslashIdx, forwardSlashIdx);

    let exePath: string;
    let servicePart: string;

    if (lastSepIdx !== -1) {
      // Has a path separator - find the exe filename
      const exeEndIdx = pathAndName.indexOf("-", lastSepIdx);
      if (exeEndIdx !== -1) {
        exePath = pathAndName.slice(0, exeEndIdx);
        servicePart = pathAndName.slice(exeEndIdx + 1);
      } else {
        exePath = pathAndName;
        servicePart = "";
      }
    } else {
      // No path separator (e.g. "System-WinRm" or "System")
      exePath = "";
      servicePart = pathAndName;
    }

    // Service name is servicePart (may be empty if the entry is "path-port NUM-PROTO")
    const name = servicePart || (exePath ? exePath.split("\\").pop()?.replace(".exe", "") || exePath : pathAndName);

    processes.push({
      path: exePath || null,
      name: name || "unknown",
      port,
      protocol,
    } as ParsedProcess);
  }

  return processes;
}

/**
 * Normalizes environment string to match Prisma enum values.
 * CSV values: "Production", "Development", "Staging", "NaN"
 */
function normalizeEnv(env: string): string {
  const lower = env.toLowerCase();
  if (lower === "production" || lower === "prd" || lower === "prod") return "Production";
  if (lower === "development" || lower === "dev") return "Development";
  if (lower === "staging") return "Staging";
  if (lower === "qa") return "QA";
  return "Production"; // default
}

// ---------------------------------------------------------------------------
// Main Seed Function
// ---------------------------------------------------------------------------

async function main() {
  console.log("Starting database seed from CSV files...\n");

  // Clear existing data in correct dependency order
  console.log("Clearing existing data...");
  await prisma.auditLog.deleteMany();
  await prisma.appliedLabel.deleteMany();
  await prisma.labelRecommendation.deleteMany();
  await prisma.cloudTag.deleteMany();
  await prisma.process.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.label.deleteMany();
  await prisma.recommendationBatch.deleteMany();
  await prisma.userPreference.deleteMany();
  console.log("Existing data cleared\n");

  // ---------------------------------------------------------------------------
  // Parse Cloud CSV
  // ---------------------------------------------------------------------------

  let cloudRows: CloudCsvRow[] = [];
  if (fs.existsSync(CLOUD_CSV_PATH)) {
    console.log(`Parsing Cloud CSV: ${CLOUD_CSV_PATH}`);
    try {
      const cloudCsvContent = fs.readFileSync(CLOUD_CSV_PATH, "utf-8");
      cloudRows = parse(cloudCsvContent, {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        trim: true,
      }) as CloudCsvRow[];
      console.log(`  Found ${cloudRows.length} cloud resources\n`);
    } catch (err) {
      console.error(`  Error parsing Cloud CSV at ${CLOUD_CSV_PATH}:`, err);
      throw err;
    }
  } else {
    console.warn(`  Cloud CSV not found at ${CLOUD_CSV_PATH}, skipping\n`);
  }

  // ---------------------------------------------------------------------------
  // Parse DC CSV
  // ---------------------------------------------------------------------------

  let dcRows: DcCsvRow[] = [];
  if (fs.existsSync(DC_CSV_PATH)) {
    console.log(`Parsing DC CSV: ${DC_CSV_PATH}`);
    try {
      const dcCsvContent = fs.readFileSync(DC_CSV_PATH, "utf-8");
      dcRows = parse(dcCsvContent, {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        trim: true,
      }) as DcCsvRow[];
      console.log(`  Found ${dcRows.length} DC resources\n`);
    } catch (err) {
      console.error(`  Error parsing DC CSV at ${DC_CSV_PATH}:`, err);
      throw err;
    }
  } else {
    console.warn(`  DC CSV not found at ${DC_CSV_PATH}, skipping\n`);
  }

  // ---------------------------------------------------------------------------
  // Collect all unique label values from both CSVs
  // ---------------------------------------------------------------------------

  console.log("Collecting unique labels from CSV data...");

  const labelSet = new Map<string, { type: LabelType; value: string }>();

  // Helper to add a label
  const addLabel = (type: LabelType, value: string) => {
    if (value && value !== "nan" && value !== "NaN" && value.trim() !== "") {
      const key = `${type}:${value.trim()}`;
      if (!labelSet.has(key)) {
        labelSet.set(key, { type, value: value.trim() });
      }
    }
  };

  for (const row of cloudRows) {
    addLabel("App", row.predicted_app);
    addLabel("Role", row.predicted_role);
    if (row.predicted_env && row.predicted_env !== "nan") {
      addLabel("Env", normalizeEnv(row.predicted_env));
    }
    if (row.location && row.location !== "nan") {
      addLabel("Loc", row.location);
    }
  }

  for (const row of dcRows) {
    addLabel("App", row.predicted_app);
    addLabel("Role", row.predicted_role);
    if (row.predicted_env && row.predicted_env !== "nan") {
      addLabel("Env", normalizeEnv(row.predicted_env));
    }
    // DC location is often "NaN" - skip those
    if (row.location && row.location !== "nan" && row.location !== "NaN") {
      addLabel("Loc", row.location);
    }
  }

  console.log(`  Found ${labelSet.size} unique labels\n`);

  // ---------------------------------------------------------------------------
  // Create Labels (upsert to avoid duplicates)
  // ---------------------------------------------------------------------------

  console.log("Creating labels...");
  const createdLabels = await Promise.all(
    Array.from(labelSet.values()).map(({ type, value }) =>
      prisma.label.upsert({
        where: { type_value: { type, value } },
        update: {},
        create: { type, value },
      })
    )
  );

  const labelMap = new Map(createdLabels.map((l) => [`${l.type}:${l.value}`, l]));
  console.log(`  Created/upserted ${createdLabels.length} labels\n`);

  // ---------------------------------------------------------------------------
  // Seed Cloud Resources
  // ---------------------------------------------------------------------------

  console.log("Seeding cloud resources...");
  let cloudResourceCount = 0;
  let cloudRecommendationCount = 0;

  for (const row of cloudRows) {
    const parsed = parseInventory(row.inventory);
    const cloudProvider = detectCloudProvider(parsed.accountName);
    const locValue = row.location && row.location !== "nan" ? row.location : null;

    // Create resource
    const resource = await prisma.resource.create({
      data: {
        name: parsed.resourceName,
        resourceType: "VM Instance",
        cloudProvider,
        platformType: "CLOUD" as PlatformType,
        region: locValue,
        accountId: parsed.accountName,
        metadata: {
          accountName: parsed.accountName,
          rawInventory: row.inventory.trim(),
        },
      },
    });
    cloudResourceCount++;

    // Create CloudTags from parsed tags
    const tagsToCreate = Object.entries(parsed.tags).map(([key, value]) => ({
      resourceId: resource.id,
      key,
      value,
    }));

    if (tagsToCreate.length > 0) {
      await prisma.cloudTag.createMany({
        data: tagsToCreate,
        skipDuplicates: true,
      });
    }

    // Create LabelRecommendations for App, Role, Env, Loc
    const recommendations: Array<{
      type: LabelType;
      value: string;
      explanationShort: string;
      explanation: string;
    }> = [];

    if (row.predicted_app && row.predicted_app !== "nan") {
      recommendations.push({
        type: "App",
        value: row.predicted_app.trim(),
        explanationShort: row.app_prediction_explanation_short,
        explanation: row.app_prediction_explanation,
      });
    }
    if (row.predicted_role && row.predicted_role !== "nan") {
      recommendations.push({
        type: "Role",
        value: row.predicted_role.trim(),
        explanationShort: row.role_prediction_explanation_short,
        explanation: row.role_prediction_explanation,
      });
    }
    if (row.predicted_env && row.predicted_env !== "nan") {
      const envNorm = normalizeEnv(row.predicted_env);
      recommendations.push({
        type: "Env",
        value: envNorm,
        explanationShort: `Environment predicted as ${envNorm}.`,
        explanation: `The environment label ${envNorm} is predicted based on the environment tags in the resource inventory.`,
      });
    }
    if (locValue) {
      recommendations.push({
        type: "Loc",
        value: locValue,
        explanationShort: `Location predicted as ${locValue}.`,
        explanation: `The location label ${locValue} is predicted based on the location tags in the resource inventory.`,
      });
    }

    for (const rec of recommendations) {
      const label = labelMap.get(`${rec.type}:${rec.value}`);
      if (!label) continue;

      await prisma.labelRecommendation.create({
        data: {
          resourceId: resource.id,
          labelId: label.id,
          confidence: 0.88,
          evidence: rec.explanationShort || rec.explanation || `Predicted ${rec.type}: ${rec.value}`,
          status: "PENDING",
          appExplanationShort: rec.type === "App" ? rec.explanationShort : null,
          appExplanation: rec.type === "App" ? rec.explanation : null,
          roleExplanationShort: rec.type === "Role" ? rec.explanationShort : null,
          roleExplanation: rec.type === "Role" ? rec.explanation : null,
          predictedEnv: row.predicted_env && row.predicted_env !== "nan" ? normalizeEnv(row.predicted_env) : null,
          predictedLocation: locValue,
        },
      });
      cloudRecommendationCount++;
    }
  }

  console.log(`  Created ${cloudResourceCount} cloud resources`);
  console.log(`  Created ${cloudRecommendationCount} cloud recommendations\n`);

  // ---------------------------------------------------------------------------
  // Seed DC Resources
  // ---------------------------------------------------------------------------

  console.log("Seeding data center resources...");
  let dcResourceCount = 0;
  let dcRecommendationCount = 0;

  for (const row of dcRows) {
    const hostname = row.hostname?.trim();
    if (!hostname) continue;

    const envValue = normalizeEnv(row.predicted_env);
    const locValue =
      row.location && row.location !== "nan" && row.location !== "NaN"
        ? row.location
        : null;

    // Create resource
    const resource = await prisma.resource.create({
      data: {
        name: hostname,
        resourceType: "Server",
        cloudProvider: null,
        platformType: "DATA_CENTER" as PlatformType,
        region: locValue,
        hostname: hostname,
        metadata: {
          hostname,
        },
      },
    });
    dcResourceCount++;

    // Parse and create processes
    const processes = parseProcessPort(row.process_port);
    const seenProcessKeys = new Set<string>();

    for (const proc of processes) {
      // Deduplicate by name+port within same resource
      const key = `${proc.name}|${proc.port}`;
      if (seenProcessKeys.has(key)) continue;
      seenProcessKeys.add(key);

      try {
        await prisma.process.create({
          data: {
            resourceId: resource.id,
            name: proc.name.slice(0, 255),
            path: proc.path ? proc.path.slice(0, 500) : null,
            port: proc.port,
            protocol: proc.protocol,
            count: 1,
          },
        });
      } catch (err: unknown) {
        // Only skip unique constraint violations (P2002), re-throw other errors
        if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
          // Skip duplicate process entries
        } else {
          throw err;
        }
      }
    }

    // Create LabelRecommendations for App, Role, Env, Loc
    const recommendations: Array<{
      type: LabelType;
      value: string;
      explanationShort: string;
      explanation: string;
    }> = [];

    if (row.predicted_app && row.predicted_app !== "nan") {
      recommendations.push({
        type: "App",
        value: row.predicted_app.trim(),
        explanationShort: row.app_prediction_explanation_short,
        explanation: row.app_prediction_explanation,
      });
    }
    if (row.predicted_role && row.predicted_role !== "nan") {
      recommendations.push({
        type: "Role",
        value: row.predicted_role.trim(),
        explanationShort: row.role_prediction_explanation_short,
        explanation: row.role_prediction_explanation,
      });
    }
    if (row.predicted_env && row.predicted_env !== "nan") {
      recommendations.push({
        type: "Env",
        value: envValue,
        explanationShort: `Environment predicted as ${envValue}.`,
        explanation: `The environment label ${envValue} is predicted based on process patterns and deployment context.`,
      });
    }
    if (locValue) {
      recommendations.push({
        type: "Loc",
        value: locValue,
        explanationShort: `Location predicted as ${locValue}.`,
        explanation: `The location label ${locValue} is predicted based on hostname and network topology.`,
      });
    }

    for (const rec of recommendations) {
      const label = labelMap.get(`${rec.type}:${rec.value}`);
      if (!label) continue;

      await prisma.labelRecommendation.create({
        data: {
          resourceId: resource.id,
          labelId: label.id,
          confidence: 0.85,
          evidence: rec.explanationShort || rec.explanation || `Predicted ${rec.type}: ${rec.value}`,
          status: "PENDING",
          appExplanationShort: rec.type === "App" ? rec.explanationShort : null,
          appExplanation: rec.type === "App" ? rec.explanation : null,
          roleExplanationShort: rec.type === "Role" ? rec.explanationShort : null,
          roleExplanation: rec.type === "Role" ? rec.explanation : null,
          predictedEnv: row.predicted_env && row.predicted_env !== "nan" ? envValue : null,
          predictedLocation: locValue,
        },
      });
      dcRecommendationCount++;
    }
  }

  console.log(`  Created ${dcResourceCount} DC resources`);
  console.log(`  Created ${dcRecommendationCount} DC recommendations\n`);

  // ---------------------------------------------------------------------------
  // Create default user preference
  // ---------------------------------------------------------------------------

  console.log("Creating user preferences...");
  await prisma.userPreference.create({
    data: {
      userId: "current-user",
      defaultGroupBy: "application",
      showVideoBanner: true,
      defaultSortBy: "resources-desc",
      itemsPerPage: 20,
    },
  });
  console.log("  User preferences created\n");

  // ---------------------------------------------------------------------------
  // Create RecommendationBatch
  // ---------------------------------------------------------------------------

  console.log("Creating recommendation batch...");
  const totalResources = cloudResourceCount + dcResourceCount;
  const batch = await prisma.recommendationBatch.create({
    data: {
      status: BatchStatus.COMPLETED,
      completedAt: new Date(),
      resourceCount: totalResources,
    },
  });
  console.log(`  Created batch ${batch.id} with status COMPLETED\n`);

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------

  const totalRecommendations = cloudRecommendationCount + dcRecommendationCount;
  console.log("=".repeat(50));
  console.log("Seed completed successfully!");
  console.log("=".repeat(50));
  console.log(`  Labels:               ${createdLabels.length}`);
  console.log(`  Cloud Resources:      ${cloudResourceCount}`);
  console.log(`  DC Resources:         ${dcResourceCount}`);
  console.log(`  Total Resources:      ${totalResources}`);
  console.log(`  Cloud Recommendations:${cloudRecommendationCount}`);
  console.log(`  DC Recommendations:   ${dcRecommendationCount}`);
  console.log(`  Total Recommendations:${totalRecommendations}`);
  console.log(`  Batch ID:             ${batch.id}`);
  console.log("=".repeat(50));
}

// ---------------------------------------------------------------------------
// Run Seed
// ---------------------------------------------------------------------------

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
