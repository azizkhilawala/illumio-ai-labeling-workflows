import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { LabelType, CloudProvider, PlatformType } from "@/generated/prisma";

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/approved/resources
// Returns flat list of approved resources (not grouped by label)
// Query params:
//   csp: CloudProvider filter (comma-separated)
//   labelType: Label type filter
//   labelValue: Specific label value filter
//   accountId: Account filter
//   region: Region filter
//   page: number (default: 1)
//   limit: number (default: 100, max: 1000)
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const cspParam = searchParams.get("csp");
    const cspFilter: CloudProvider[] = cspParam
      ? (cspParam.split(",").filter(Boolean) as CloudProvider[])
      : [];
    const labelType = searchParams.get("labelType") as LabelType | null;
    const labelValue = searchParams.get("labelValue");
    const accountId = searchParams.get("accountId");
    const region = searchParams.get("region");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(1000, Math.max(1, parseInt(searchParams.get("limit") || "100", 10) || 100));
    const skip = (page - 1) * limit;

    // Build where clause
    const where = {
      status: "APPROVED" as const,
      ...(labelType && { label: { type: labelType } }),
      ...(labelValue && { label: { value: labelValue } }),
      ...(cspFilter.length > 0 || accountId || region
        ? {
            resource: {
              ...(cspFilter.length > 0 && { cloudProvider: { in: cspFilter } }),
              ...(accountId && { accountId }),
              ...(region && { region }),
            },
          }
        : {}),
    };

    // Get approved recommendations with resources
    const [recommendations, totalCount] = await Promise.all([
      prisma.labelRecommendation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { reviewedAt: "desc" },
        include: {
          resource: true,
          label: true,
        },
      }),
      prisma.labelRecommendation.count({ where }),
    ]);

    // Get filter options (distinct values)
    const [distinctCsps, distinctLabelTypes, distinctAccounts, distinctRegions] = await Promise.all([
      prisma.resource.findMany({
        where: {
          recommendations: { some: { status: "APPROVED" } },
          cloudProvider: { not: null },
        },
        select: { cloudProvider: true },
        distinct: ["cloudProvider"],
      }),
      prisma.label.findMany({
        where: {
          recommendations: { some: { status: "APPROVED" } },
        },
        select: { type: true },
        distinct: ["type"],
      }),
      prisma.resource.findMany({
        where: {
          recommendations: { some: { status: "APPROVED" } },
          accountId: { not: null },
        },
        select: { accountId: true },
        distinct: ["accountId"],
      }),
      prisma.resource.findMany({
        where: {
          recommendations: { some: { status: "APPROVED" } },
          region: { not: null },
        },
        select: { region: true },
        distinct: ["region"],
      }),
    ]);

    // Shape the response data
    const data = recommendations.map((rec) => {
      const resource = rec.resource;
      return {
        id: rec.id,
        resourceName: resource.name,
        hostname: resource.hostname ?? null,
        approvedLabel: {
          type: rec.label.type,
          value: rec.label.value,
        },
        platformType: resource.platformType,
        cloudProvider: resource.cloudProvider ?? null,
        accountId: resource.accountId ?? null,
        region: resource.region ?? null,
        approvedBy: rec.reviewedBy ?? "Unknown",
        approvedAt: rec.reviewedAt?.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }) ?? "",
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
      filterOptions: {
        csps: distinctCsps.map((r) => r.cloudProvider).filter(Boolean) as string[],
        labelTypes: distinctLabelTypes.map((l) => l.type),
        accounts: distinctAccounts.map((r) => r.accountId).filter(Boolean) as string[],
        regions: distinctRegions.map((r) => r.region).filter(Boolean) as string[],
      },
    });
  } catch (error) {
    console.error("Error fetching approved resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch approved resources" },
      { status: 500 }
    );
  }
}
