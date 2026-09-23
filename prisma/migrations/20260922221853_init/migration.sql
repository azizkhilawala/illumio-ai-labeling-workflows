-- CreateEnum
CREATE TYPE "LabelType" AS ENUM ('App', 'Role', 'Env', 'Loc');

-- CreateEnum
CREATE TYPE "RecommendationStatus" AS ENUM ('PENDING', 'APPROVED', 'IGNORED');

-- CreateEnum
CREATE TYPE "CloudProvider" AS ENUM ('AWS', 'Azure', 'GCP');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('CLOUD', 'DATA_CENTER');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "cloudProvider" "CloudProvider",
    "platformType" "PlatformType" NOT NULL DEFAULT 'CLOUD',
    "region" TEXT,
    "accountId" TEXT,
    "hostname" TEXT,
    "category" TEXT,
    "state" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CloudTag" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CloudTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT,
    "port" INTEGER,
    "protocol" TEXT,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL,
    "type" "LabelType" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabelRecommendation" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.85,
    "evidence" TEXT NOT NULL,
    "status" "RecommendationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "ignoreReason" TEXT,
    "appExplanationShort" TEXT,
    "appExplanation" TEXT,
    "roleExplanationShort" TEXT,
    "roleExplanation" TEXT,
    "predictedEnv" TEXT,
    "predictedLocation" TEXT,
    "reviewedByName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabelRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppliedLabel" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "labelId" TEXT NOT NULL,
    "appliedBy" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'AI_RECOMMENDATION',

    CONSTRAINT "AppliedLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "defaultGroupBy" TEXT NOT NULL DEFAULT 'application',
    "showVideoBanner" BOOLEAN NOT NULL DEFAULT true,
    "defaultSortBy" TEXT NOT NULL DEFAULT 'resources-desc',
    "itemsPerPage" INTEGER NOT NULL DEFAULT 20,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationBatch" (
    "id" TEXT NOT NULL,
    "status" "BatchStatus" NOT NULL DEFAULT 'RUNNING',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "resourceCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RecommendationBatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Resource_cloudProvider_idx" ON "Resource"("cloudProvider");

-- CreateIndex
CREATE INDEX "Resource_platformType_idx" ON "Resource"("platformType");

-- CreateIndex
CREATE INDEX "Resource_resourceType_idx" ON "Resource"("resourceType");

-- CreateIndex
CREATE INDEX "Resource_region_idx" ON "Resource"("region");

-- CreateIndex
CREATE INDEX "CloudTag_resourceId_idx" ON "CloudTag"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "CloudTag_resourceId_key_key" ON "CloudTag"("resourceId", "key");

-- CreateIndex
CREATE INDEX "Process_resourceId_idx" ON "Process"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Process_resourceId_name_port_key" ON "Process"("resourceId", "name", "port");

-- CreateIndex
CREATE INDEX "Label_type_idx" ON "Label"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Label_type_value_key" ON "Label"("type", "value");

-- CreateIndex
CREATE INDEX "LabelRecommendation_status_idx" ON "LabelRecommendation"("status");

-- CreateIndex
CREATE INDEX "LabelRecommendation_resourceId_idx" ON "LabelRecommendation"("resourceId");

-- CreateIndex
CREATE INDEX "LabelRecommendation_labelId_idx" ON "LabelRecommendation"("labelId");

-- CreateIndex
CREATE INDEX "LabelRecommendation_createdAt_idx" ON "LabelRecommendation"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "LabelRecommendation_resourceId_labelId_key" ON "LabelRecommendation"("resourceId", "labelId");

-- CreateIndex
CREATE INDEX "AppliedLabel_appliedBy_idx" ON "AppliedLabel"("appliedBy");

-- CreateIndex
CREATE INDEX "AppliedLabel_appliedAt_idx" ON "AppliedLabel"("appliedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AppliedLabel_resourceId_labelId_key" ON "AppliedLabel"("resourceId", "labelId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- CreateIndex
CREATE INDEX "RecommendationBatch_status_idx" ON "RecommendationBatch"("status");

-- CreateIndex
CREATE INDEX "RecommendationBatch_completedAt_idx" ON "RecommendationBatch"("completedAt");

-- AddForeignKey
ALTER TABLE "CloudTag" ADD CONSTRAINT "CloudTag_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelRecommendation" ADD CONSTRAINT "LabelRecommendation_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabelRecommendation" ADD CONSTRAINT "LabelRecommendation_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedLabel" ADD CONSTRAINT "AppliedLabel_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedLabel" ADD CONSTRAINT "AppliedLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;
