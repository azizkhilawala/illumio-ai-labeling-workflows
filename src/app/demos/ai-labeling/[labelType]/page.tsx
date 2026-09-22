import type { Metadata } from "next";
import { Suspense } from "react";
import { AILabelingDetailFloorplan } from "@/design-system/floorplans/AILabelingDetailFloorplan";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ value?: string }>;
}): Promise<Metadata> {
  const { value } = await searchParams;
  const labelValue = value ? decodeURIComponent(value) : "Details";
  return {
    title: `${labelValue} | AI Labeling | Lightning Design System`,
  };
}

export default async function AILabelingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ labelType: string }>;
  searchParams: Promise<{ value?: string }>;
}) {
  const { labelType: labelTypeParam } = await params;
  const { value } = await searchParams;

  const labelType = labelTypeParam.charAt(0).toUpperCase() + labelTypeParam.slice(1);
  const labelValue = value ? decodeURIComponent(value) : "";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AILabelingDetailFloorplan
        labelType={labelType as "App" | "Role" | "Env" | "Loc"}
        labelValue={labelValue}
      />
    </Suspense>
  );
}
