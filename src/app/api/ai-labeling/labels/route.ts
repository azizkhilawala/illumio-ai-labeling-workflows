import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { LabelType } from "@/generated/prisma";

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/labels
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const labelType = searchParams.get("type") as LabelType | null;
    const status = searchParams.get("status") || "PENDING";

    // Get unique labels from recommendations
    const recommendations = await prisma.labelRecommendation.findMany({
      where: {
        status: status as "PENDING" | "APPROVED" | "IGNORED",
        ...(labelType && { label: { type: labelType } }),
      },
      select: {
        label: {
          select: {
            id: true,
            type: true,
            value: true,
          },
        },
      },
      distinct: ["labelId"],
    });

    // Extract unique labels
    const labels = recommendations.map((rec) => rec.label);

    // Group by type
    const labelsByType = labels.reduce((acc, label) => {
      if (!acc[label.type]) {
        acc[label.type] = [];
      }
      acc[label.type].push({
        id: label.id,
        value: label.value,
      });
      return acc;
    }, {} as Record<string, { id: string; value: string }[]>);

    // Sort values within each type
    Object.values(labelsByType).forEach((values) => {
      values.sort((a, b) => a.value.localeCompare(b.value));
    });

    return NextResponse.json({
      data: {
        labels,
        byType: labelsByType,
      },
    });
  } catch (error) {
    console.error("Error fetching labels:", error);
    return NextResponse.json(
      { error: "Failed to fetch labels" },
      { status: 500 }
    );
  }
}
