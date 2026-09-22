import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/stats
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    // Get counts for each status
    const [pendingCount, approvedCount, ignoredCount, totalResources, labelsByType] =
      await Promise.all([
        prisma.labelRecommendation.count({
          where: { status: "PENDING" },
        }),
        prisma.labelRecommendation.count({
          where: { status: "APPROVED" },
        }),
        prisma.labelRecommendation.count({
          where: { status: "IGNORED" },
        }),
        prisma.resource.count(),
        prisma.labelRecommendation.groupBy({
          by: ["status"],
          _count: {
            id: true,
          },
        }),
      ]);

    // Get unique label counts by type
    const pendingByLabelType = await prisma.labelRecommendation.findMany({
      where: { status: "PENDING" },
      select: {
        label: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    // Count unique labels by type
    const uniqueLabelsByType = pendingByLabelType.reduce((acc, rec) => {
      const type = rec.label.type;
      const value = rec.label.value;
      if (!acc[type]) {
        acc[type] = new Set();
      }
      acc[type].add(value);
      return acc;
    }, {} as Record<string, Set<string>>);

    const labelTypeCounts = Object.entries(uniqueLabelsByType).map(
      ([type, values]) => ({
        type,
        count: values.size,
      })
    );

    // Get recent activity
    const recentActivity = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        action: true,
        entityType: true,
        entityId: true,
        userName: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      data: {
        summary: {
          pending: pendingCount,
          approved: approvedCount,
          ignored: ignoredCount,
          totalResources,
        },
        labelTypeCounts,
        recentActivity: recentActivity.map((log) => ({
          ...log,
          createdAt: log.createdAt.toISOString(),
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
