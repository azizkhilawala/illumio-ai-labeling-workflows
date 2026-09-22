import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const ResetSchema = z.object({
  userId: z.string().default("current-user"),
  userName: z.string().default("Current User"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userName } = ResetSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      // Delete applied labels
      const appliedLabels = await tx.appliedLabel.deleteMany({});

      // Delete audit logs
      const auditLogs = await tx.auditLog.deleteMany({});

      // Reset all recommendations to PENDING
      const recommendations = await tx.labelRecommendation.updateMany({
        data: {
          status: "PENDING",
          reviewedBy: null,
          reviewedAt: null,
          ignoreReason: null,
        },
      });

      return {
        recommendations: recommendations.count,
        appliedLabels: appliedLabels.count,
        auditLogs: auditLogs.count,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Demo reset successfully",
      counts: result,
    });
  } catch (error) {
    console.error("Error resetting demo:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to reset demo" },
      { status: 500 }
    );
  }
}
