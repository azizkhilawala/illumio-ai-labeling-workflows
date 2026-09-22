"use client";

import { Suspense } from "react";
import { AzureOnboardingFloorplan } from "@/design-system/floorplans";

export default function AzureOnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AzureOnboardingFloorplan pageTitle="Cloud Onboarding" />
    </Suspense>
  );
}
