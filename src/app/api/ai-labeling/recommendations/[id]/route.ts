import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Validation Schemas
// ---------------------------------------------------------------------------

const UpdateRecommendationSchema = z.object({
  action: z.enum(["approve", "ignore", "edit"]),
  reason: z.string().optional(),
  newLabelType: z.enum(["App", "Role", "Env", "Loc"]).optional(),
  newLabelValue: z.string().optional(),
  userId: z.string().default("current-user"),
  userName: z.string().default("Current User"),
});

// ---------------------------------------------------------------------------
// GET /api/ai-labeling/recommendations/[id]
// ---------------------------------------------------------------------------

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const recommendation = await prisma.labelRecommendation.findUnique({
      where: { id },
      include: {
        resource: true,
        label: true,
      },
    });

    if (!recommendation) {
      return NextResponse.json(
        { error: "Recommendation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: recommendation });
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendation" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/ai-labeling/recommendations/[id]
// ---------------------------------------------------------------------------

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, reason, newLabelType, newLabelValue, userId, userName } =
      UpdateRecommendationSchema.parse(body);

    const recommendation = await prisma.labelRecommendation.findUnique({
      where: { id },
      include: { resource: true, label: true },
    });

    if (!recommendation) {
      return NextResponse.json(
        { error: "Recommendation not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      await prisma.$transaction(async (tx) => {
        // Update recommendation status
        await tx.labelRecommendation.update({
          where: { id },
          data: {
            status: "APPROVED",
            reviewedBy: userId,
            reviewedAt: new Date(),
          },
        });

        // Create applied label
        await tx.appliedLabel.upsert({
          where: {
            resourceId_labelId: {
              resourceId: recommendation.resourceId,
              labelId: recommendation.labelId,
            },
          },
          create: {
            resourceId: recommendation.resourceId,
            labelId: recommendation.labelId,
            appliedBy: userName,
            source: "AI_RECOMMENDATION",
          },
          update: {
            appliedBy: userName,
            appliedAt: new Date(),
          },
        });

        // Audit log
        await tx.auditLog.create({
          data: {
            action: "APPROVE",
            entityType: "LabelRecommendation",
            entityId: id,
            userId,
            userName,
          },
        });
      });

      return NextResponse.json({
        success: true,
        action: "approve",
        id,
      });
    } else if (action === "ignore") {
      await prisma.$transaction(async (tx) => {
        await tx.labelRecommendation.update({
          where: { id },
          data: {
            status: "IGNORED",
            reviewedBy: userId,
            reviewedAt: new Date(),
            ignoreReason: reason || null,
          },
        });

        await tx.auditLog.create({
          data: {
            action: "IGNORE",
            entityType: "LabelRecommendation",
            entityId: id,
            userId,
            userName,
            details: { reason },
          },
        });
      });

      return NextResponse.json({
        success: true,
        action: "ignore",
        id,
      });
    } else if (action === "edit") {
      // Edit and approve with a different label
      if (!newLabelType || !newLabelValue) {
        return NextResponse.json(
          { error: "newLabelType and newLabelValue are required for edit action" },
          { status: 400 }
        );
      }

      await prisma.$transaction(async (tx) => {
        // Find or create the new label
        const newLabel = await tx.label.upsert({
          where: {
            type_value: {
              type: newLabelType,
              value: newLabelValue,
            },
          },
          create: {
            type: newLabelType,
            value: newLabelValue,
          },
          update: {},
        });

        // Update recommendation with new label and approve
        await tx.labelRecommendation.update({
          where: { id },
          data: {
            labelId: newLabel.id,
            status: "APPROVED",
            reviewedBy: userId,
            reviewedAt: new Date(),
          },
        });

        // Create applied label with the edited value
        await tx.appliedLabel.upsert({
          where: {
            resourceId_labelId: {
              resourceId: recommendation.resourceId,
              labelId: newLabel.id,
            },
          },
          create: {
            resourceId: recommendation.resourceId,
            labelId: newLabel.id,
            appliedBy: userName,
            source: "AI_RECOMMENDATION",
          },
          update: {
            appliedBy: userName,
            appliedAt: new Date(),
          },
        });

        // Audit log
        await tx.auditLog.create({
          data: {
            action: "EDIT",
            entityType: "LabelRecommendation",
            entityId: id,
            userId,
            userName,
            details: {
              originalLabel: `${recommendation.label.type}:${recommendation.label.value}`,
              newLabel: `${newLabelType}:${newLabelValue}`,
            },
          },
        });
      });

      return NextResponse.json({
        success: true,
        action: "edit",
        id,
        newLabel: { type: newLabelType, value: newLabelValue },
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating recommendation:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update recommendation" },
      { status: 500 }
    );
  }
}
