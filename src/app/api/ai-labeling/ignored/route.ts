import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { LabelType } from "@/generated/prisma";

// ---------------------------------------------------------------------------
// Validation Schemas
// ---------------------------------------------------------------------------

const RestoreSchema = z.object({
  ids: z.array(z.string()).min(1),
  userId: z.string().default("current-user"),
  userName: z.string().default("Current User"),
});

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/ignored
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

    // Get ignored recommendations
    const ignoredRecommendations = await prisma.labelRecommendation.findMany({
      where: {
        status: "IGNORED",
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
    const groupedByLabel = ignoredRecommendations.reduce((acc, rec) => {
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
          reason: rec.ignoreReason || "Not specified",
          ignoredBy: rec.reviewedBy || "Unknown",
          ignoredAt: rec.reviewedAt?.toLocaleString("en-US", {
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
      reason: string;
      ignoredBy: string;
      ignoredAt: string;
      lastUpdated: string;
      recommendations: typeof ignoredRecommendations;
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
      reason: item.reason,
      ignoredBy: item.ignoredBy,
      ignoredAt: item.ignoredAt,
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
    console.error("Error fetching ignored labels:", error);
    return NextResponse.json(
      { error: "Failed to fetch ignored labels" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/ai-labeling/ignored (restore action)
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, userId, userName } = RestoreSchema.parse(body);

    await prisma.$transaction(async (tx) => {
      // Update recommendations back to pending
      await tx.labelRecommendation.updateMany({
        where: { id: { in: ids } },
        data: {
          status: "PENDING",
          reviewedBy: null,
          reviewedAt: null,
          ignoreReason: null,
        },
      });

      // Create audit logs
      await tx.auditLog.createMany({
        data: ids.map((id) => ({
          action: "RESTORE",
          entityType: "LabelRecommendation",
          entityId: id,
          userId,
          userName,
        })),
      });
    });

    return NextResponse.json({
      success: true,
      action: "restore",
      count: ids.length,
    });
  } catch (error) {
    console.error("Error restoring recommendations:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to restore recommendations" },
      { status: 500 }
    );
  }
}
