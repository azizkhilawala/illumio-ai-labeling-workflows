import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, LabelType, RecommendationStatus, CloudProvider, PlatformType, BatchStatus } from "@/generated/prisma";

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/recommendations/resources
// Query params:
//   labelType  (required): App | Role | Env | Loc
//   labelValue (required): string
//   status:    PENDING | APPROVED | IGNORED  (default: PENDING)
//   csp:       comma-separated CloudProvider values (e.g. AWS,Azure)
//   platformType: CLOUD | DATA_CENTER
//   page:      number (default: 1)
//   limit:     number (default: 100, max: 1000)
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // ---- Required params ----
    const labelTypeParam = searchParams.get("labelType");
    const labelValueParam = searchParams.get("labelValue");

    if (!labelTypeParam || !labelValueParam) {
      return NextResponse.json(
        { error: "labelType and labelValue are required query parameters" },
        { status: 400 }
      );
    }

    // Validate labelType enum
    const validLabelTypes: LabelType[] = ["App", "Role", "Env", "Loc"];
    if (!validLabelTypes.includes(labelTypeParam as LabelType)) {
      return NextResponse.json(
        { error: `labelType must be one of: ${validLabelTypes.join(", ")}` },
        { status: 400 }
      );
    }
    const labelType = labelTypeParam as LabelType;
    const labelValue = labelValueParam;

    // ---- Optional params ----
    const statusParam = (searchParams.get("status") || "PENDING") as RecommendationStatus;
    const validStatuses: RecommendationStatus[] = ["PENDING", "APPROVED", "IGNORED"];
    const status = validStatuses.includes(statusParam) ? statusParam : "PENDING";

    const cspParam = searchParams.get("csp");
    const cspFilter: CloudProvider[] = cspParam
      ? (cspParam.split(",").filter(Boolean) as CloudProvider[])
      : [];

    const platformTypeParam = searchParams.get("platformType") as PlatformType | null;

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(1000, Math.max(1, parseInt(searchParams.get("limit") || "100", 10) || 100));
    const skip = (page - 1) * limit;

    // ---- Build Prisma where clause ----
    const where: Prisma.LabelRecommendationWhereInput = {
      status,
      label: {
        type: labelType,
        value: labelValue,
      },
      ...(cspFilter.length > 0 || platformTypeParam
        ? {
            resource: {
              ...(cspFilter.length > 0 && { cloudProvider: { in: cspFilter } }),
              ...(platformTypeParam && { platformType: platformTypeParam }),
            },
          }
        : {}),
    };

    // ---- Run queries in parallel ----
    const [recommendations, totalCount, lastBatch] = await Promise.all([
      prisma.labelRecommendation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          resource: {
            include: {
              appliedLabels: {
                include: {
                  label: true,
                },
              },
              cloudTags: true,
              processes: true,
            },
          },
          label: true,
        },
      }),
      prisma.labelRecommendation.count({ where }),
      prisma.recommendationBatch.findFirst({
        where: { status: BatchStatus.COMPLETED },
        orderBy: { completedAt: "desc" },
        select: { completedAt: true },
      }),
    ]);

    // ---- Summary counts (all resources for this label, regardless of page) ----
    const [totalResources, cloudCount, dcCount] = await Promise.all([
      prisma.labelRecommendation.count({
        where: { label: { type: labelType, value: labelValue }, status },
      }),
      prisma.labelRecommendation.count({
        where: {
          label: { type: labelType, value: labelValue },
          status,
          resource: { platformType: PlatformType.CLOUD },
        },
      }),
      prisma.labelRecommendation.count({
        where: {
          label: { type: labelType, value: labelValue },
          status,
          resource: { platformType: PlatformType.DATA_CENTER },
        },
      }),
    ]);

    // ---- Shape the response data ----
    const data = recommendations.map((rec) => {
      const resource = rec.resource;
      const isCloud = resource.platformType === PlatformType.CLOUD;

      return {
        id: rec.id,
        resourceName: resource.name,
        resourceType: isCloud ? "cloud" : "dc",
        csp: resource.cloudProvider ?? null,
        accountId: resource.accountId ?? "",
        region: resource.region ?? "",
        category: resource.category ?? "",
        state: resource.state ?? "",
        hostname: resource.hostname ?? null,
        existingLabels: resource.appliedLabels.map((al) => ({
          type: al.label.type,
          value: al.label.value,
        })),
        evidence: {
          appExplanationShort: rec.appExplanationShort ?? "",
          appExplanation: rec.appExplanation ?? "",
          roleExplanationShort: rec.roleExplanationShort ?? "",
          roleExplanation: rec.roleExplanation ?? "",
        },
        ...(isCloud && resource.cloudTags.length > 0
          ? {
              cloudTags: resource.cloudTags.reduce<Record<string, string>>(
                (acc, tag) => {
                  acc[tag.key] = tag.value;
                  return acc;
                },
                {}
              ),
            }
          : {}),
        ...(!isCloud && resource.processes.length > 0
          ? {
              processes: resource.processes.map((p) => ({
                name: p.name,
                type: p.protocol ?? "TCP",
                count: p.count,
                port: p.port ?? 0,
              })),
            }
          : {}),
        status: rec.status,
        approvedBy: rec.status === "APPROVED" ? (rec.reviewedBy ?? null) : null,
        approvedAt:
          rec.status === "APPROVED" && rec.reviewedAt
            ? rec.reviewedAt.toISOString()
            : null,
        ignoredBy: rec.status === "IGNORED" ? (rec.reviewedBy ?? null) : null,
        ignoredAt:
          rec.status === "IGNORED" && rec.reviewedAt
            ? rec.reviewedAt.toISOString()
            : null,
        ignoreReason: rec.status === "IGNORED" ? (rec.ignoreReason ?? null) : null,
      };
    });

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      labelSummary: {
        type: labelType,
        value: labelValue,
        totalResources,
        cloudCount,
        dcCount,
      },
      lastUpdated: lastBatch?.completedAt?.toISOString() ?? null,
    });
  } catch (error) {
    console.error("Error fetching resources for recommendation:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
