"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AzureOnboardingWizardFloorplan } from "@/design-system/floorplans";

function WizardPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isResume = searchParams.get("resume") === "true";
  const resumePath = searchParams.get("path") as "easy" | "advanced" | null;
  const resumeTenantId = searchParams.get("tenantId");
  const resumeSubscriptionId = searchParams.get("subscriptionId");
  const resumeSubscriptionName = searchParams.get("subscriptionName");

  return (
    <AzureOnboardingWizardFloorplan
      onComplete={() => router.push("/demos/azure-onboarding")}
      onExit={() => router.push("/demos/azure-onboarding")}
      resume={
        isResume
          ? {
              path: resumePath || "advanced",
              tenantId: resumeTenantId || "",
              subscriptionId: resumeSubscriptionId || "",
              subscriptionName: resumeSubscriptionName || "",
            }
          : undefined
      }
    />
  );
}

export default function AzureOnboardingWizardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WizardPageInner />
    </Suspense>
  );
}
