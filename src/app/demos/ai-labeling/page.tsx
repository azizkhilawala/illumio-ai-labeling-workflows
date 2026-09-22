"use client";

import { Suspense } from "react";
import { AILabelingFloorplan } from "@/design-system";

export default function AILabelingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AILabelingFloorplan pageTitle="AI Labeling" />
    </Suspense>
  );
}
