import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { LabelType } from "@/generated/prisma";

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/approved
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const labelType = searchParams.get("labelType") as LabelType | null;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const sortBy = searchParams.get("sortBy") || "resources-desc";
    const timeFilter = searchParams.get("timeFilter") || "all";

    // Calculate date range based on time filter
    let dateFrom: Date | null = null;
    if (timeFilter !== "all") {
      const now = new Date();
      switch (timeFilter) {
        case "24h":
          dateFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7d":
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "90d":
          dateFrom = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
      }
    }

    // Get approved recommendations
    const approvedRecommendations = await prisma.labelRecommendation.findMany({
      where: {
        status: "APPROVED",
        ...(labelType && { label: { type: labelType } }),
        ...(dateFrom && { reviewedAt: { gte: dateFrom } }),
      },
      include: {
        resource: true,
        label: true,
      },
      orderBy: { reviewedAt: "desc" },
    });

    // Group by label for card view
    const groupedByLabel = approvedRecommendations.reduce((acc, rec) => {
      const labelKey = `${rec.label.type}:${rec.label.value}`;
      if (!acc[labelKey]) {
        acc[labelKey] = {
          id: rec.label.id,
          label: {
            type: rec.label.type,
            value: rec.label.value,
          },
          totalResources: 0,
          cloudCount: 0,
          dataCenterCount: 0,
          csp: rec.resource.cloudProvider ?? "",
          evidence: rec.evidence,
          approvedBy: rec.reviewedBy || "Unknown",
          approvedAt: rec.reviewedAt?.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }) || "",
          lastUpdated: rec.updatedAt.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          recommendations: [],
          lastUpdatedDate: rec.updatedAt,
        };
      }
      acc[labelKey].totalResources += 1;
      if (rec.resource.platformType === "CLOUD") {
        acc[labelKey].cloudCount += 1;
      } else {
        acc[labelKey].dataCenterCount += 1;
      }
      // Track the most recent updatedAt for this label group
      if (rec.updatedAt > acc[labelKey].lastUpdatedDate) {
        acc[labelKey].lastUpdatedDate = rec.updatedAt;
        acc[labelKey].lastUpdated = rec.updatedAt.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }
      acc[labelKey].recommendations.push(rec);
      return acc;
    }, {} as Record<string, {
      id: string;
      label: { type: LabelType; value: string };
      totalResources: number;
      cloudCount: number;
      dataCenterCount: number;
      csp: string;
      evidence: string;
      approvedBy: string;
      approvedAt: string;
      lastUpdated: string;
      recommendations: typeof approvedRecommendations;
      lastUpdatedDate: Date;
    }>);

    // Convert to array and sort
    const groupedArray = Object.values(groupedByLabel);

    // Apply sorting
    switch (sortBy) {
      case "resources-desc":
        groupedArray.sort((a, b) => b.totalResources - a.totalResources);
        break;
      case "resources-asc":
        groupedArray.sort((a, b) => a.totalResources - b.totalResources);
        break;
      case "name-asc":
        groupedArray.sort((a, b) => a.label.value.localeCompare(b.label.value));
        break;
      case "name-desc":
        groupedArray.sort((a, b) => b.label.value.localeCompare(a.label.value));
        break;
      case "time-desc":
        groupedArray.sort((a, b) => b.lastUpdatedDate.getTime() - a.lastUpdatedDate.getTime());
        break;
      case "time-asc":
        groupedArray.sort((a, b) => a.lastUpdatedDate.getTime() - b.lastUpdatedDate.getTime());
        break;
    }

    // Apply pagination
    const total = groupedArray.length;
    const paginatedData = groupedArray.slice((page - 1) * limit, page * limit);

    // Format response (exclude internal fields)
    const formattedData = paginatedData.map((item) => ({
      id: item.id,
      label: item.label,
      totalResources: item.totalResources,
      cloudCount: item.cloudCount,
      dataCenterCount: item.dataCenterCount,
      csp: item.csp,
      evidence: item.evidence,
      approvedBy: item.approvedBy,
      approvedAt: item.approvedAt,
      lastUpdated: item.lastUpdated,
    }));

    return NextResponse.json({
      data: formattedData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching approved labels:", error);
    return NextResponse.json(
      { error: "Failed to fetch approved labels" },
      { status: 500 }
    );
  }
}
