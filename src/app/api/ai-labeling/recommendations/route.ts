import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { RecommendationStatus, LabelType } from "@/generated/prisma";

// ---------------------------------------------------------------------------
// Validation Schemas
// ---------------------------------------------------------------------------

const BulkActionSchema = z.object({
  action: z.enum(["approve", "ignore"]),
  ids: z.array(z.string()).min(1),
  reason: z.string().optional(),
  userId: z.string().default("current-user"),
  userName: z.string().default("Current User"),
});

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/recommendations
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const status = (searchParams.get("status") || "PENDING") as RecommendationStatus;
    const labelType = searchParams.get("labelType") as LabelType | null;
    const labelValues = searchParams.get("labelValues")?.split(",").filter(Boolean);
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

    // Build where clause
    const where = {
      status,
      ...(labelType && { label: { type: labelType } }),
      ...(labelValues?.length && { label: { value: { in: labelValues } } }),
      ...(dateFrom && { updatedAt: { gte: dateFrom } }),
    };

    // Get recommendations with aggregation by label
    const recommendations = await prisma.labelRecommendation.findMany({
      where,
      include: {
        resource: true,
        label: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Group recommendations by label for card view
    const groupedByLabel = recommendations.reduce((acc, rec) => {
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
          recommendations: [],
          lastUpdatedDate: rec.updatedAt,
        };
      }
      acc[labelKey].totalResources += 1;
      // Count cloud vs data center based on platformType
      if (rec.resource.platformType === "CLOUD") {
        acc[labelKey].cloudCount += 1;
      } else {
        acc[labelKey].dataCenterCount += 1;
      }
      // Track the most recent updatedAt for this label group
      if (rec.updatedAt > acc[labelKey].lastUpdatedDate) {
        acc[labelKey].lastUpdatedDate = rec.updatedAt;
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
      recommendations: typeof recommendations;
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

    // Format response with lastUpdated timestamp
    const formattedData = paginatedData.map((item) => ({
      id: item.id,
      label: item.label,
      totalResources: item.totalResources,
      cloudCount: item.cloudCount,
      dataCenterCount: item.dataCenterCount,
      csp: item.csp,
      evidence: item.evidence,
      lastUpdated: item.lastUpdatedDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
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
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/ai-labeling/recommendations (bulk actions)
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids, reason, userId, userName } = BulkActionSchema.parse(body);

    if (action === "approve") {
      await prisma.$transaction(async (tx) => {
        // Get recommendations to approve
        const recs = await tx.labelRecommendation.findMany({
          where: { id: { in: ids } },
          include: { label: true, resource: true },
        });

        // Update recommendations status
        await tx.labelRecommendation.updateMany({
          where: { id: { in: ids } },
          data: {
            status: "APPROVED",
            reviewedBy: userId,
            reviewedAt: new Date(),
          },
        });

        // Create applied labels
        const appliedLabelsData = recs.map((rec) => ({
          resourceId: rec.resourceId,
          labelId: rec.labelId,
          appliedBy: userName,
          source: "AI_RECOMMENDATION",
        }));

        // Use upsert pattern to avoid duplicates
        for (const data of appliedLabelsData) {
          await tx.appliedLabel.upsert({
            where: {
              resourceId_labelId: {
                resourceId: data.resourceId,
                labelId: data.labelId,
              },
            },
            create: data,
            update: {
              appliedBy: data.appliedBy,
              appliedAt: new Date(),
            },
          });
        }

        // Create audit logs
        await tx.auditLog.createMany({
          data: ids.map((id) => ({
            action: "APPROVE",
            entityType: "LabelRecommendation",
            entityId: id,
            userId,
            userName,
          })),
        });
      });

      return NextResponse.json({
        success: true,
        action: "approve",
        count: ids.length,
        succeeded: ids.length,
        failed: 0,
      });
    } else {
      // Ignore action
      await prisma.$transaction(async (tx) => {
        await tx.labelRecommendation.updateMany({
          where: { id: { in: ids } },
          data: {
            status: "IGNORED",
            reviewedBy: userId,
            reviewedAt: new Date(),
            ignoreReason: reason || null,
          },
        });

        await tx.auditLog.createMany({
          data: ids.map((id) => ({
            action: "IGNORE",
            entityType: "LabelRecommendation",
            entityId: id,
            userId,
            userName,
            details: { reason },
          })),
        });
      });

      return NextResponse.json({
        success: true,
        action: "ignore",
        count: ids.length,
        succeeded: ids.length,
        failed: 0,
      });
    }
  } catch (error) {
    console.error("Error processing bulk action:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process action" },
      { status: 500 }
    );
  }
}
