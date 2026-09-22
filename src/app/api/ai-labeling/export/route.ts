import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RecommendationStatus } from "@/generated/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tab = searchParams.get("tab");

    if (!tab || !["recommended", "approved", "ignored"].includes(tab)) {
      return NextResponse.json(
        { error: "Invalid tab parameter. Must be 'recommended', 'approved', or 'ignored'" },
        { status: 400 }
      );
    }

    const statusMap: Record<string, RecommendationStatus> = {
      recommended: RecommendationStatus.PENDING,
      approved: RecommendationStatus.APPROVED,
      ignored: RecommendationStatus.IGNORED,
    };

    const recommendations = await prisma.labelRecommendation.findMany({
      where: { status: statusMap[tab] },
      include: {
        resource: { include: { cloudTags: true, processes: true } },
        label: true,
      },
    });

    // Build CSV headers
    const baseHeaders = [
      "Resource Name",
      "Resource Type",
      "CSP",
      "Account ID",
      "Region",
      "Label Type",
      "Label Value",
      "Evidence",
      "Status",
    ];

    const tabHeaders: Record<string, string[]> = {
      recommended: [],
      approved: ["Approved By", "Approved At"],
      ignored: ["Ignored By", "Ignored At", "Reason"],
    };

    const headers = [...baseHeaders, ...tabHeaders[tab]];

    // Build rows
    const rows = recommendations.map((rec) => {
      const baseRow = [
        escapeCsv(rec.resource.name),
        rec.resource.platformType,
        rec.resource.cloudProvider || "-",
        rec.resource.accountId || "-",
        rec.resource.region || "-",
        rec.label.type,
        escapeCsv(rec.label.value),
        escapeCsv(rec.appExplanationShort || rec.evidence),
        rec.status,
      ];

      if (tab === "approved") {
        baseRow.push(rec.reviewedByName || "-");
        baseRow.push(rec.reviewedAt?.toISOString() || "-");
      } else if (tab === "ignored") {
        baseRow.push(rec.reviewedByName || "-");
        baseRow.push(rec.reviewedAt?.toISOString() || "-");
        baseRow.push(escapeCsv(rec.ignoreReason || "-"));
      }

      return baseRow;
    });

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const filename = `ai-labeling-${tab}-${new Date().toISOString().split("T")[0]}.csv`;

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating export:", error);
    return NextResponse.json(
      { error: "Failed to generate export" },
      { status: 500 }
    );
  }
}

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
