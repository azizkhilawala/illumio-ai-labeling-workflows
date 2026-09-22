import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Labeling | Lightning Design System",
};

export default function AILabelingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
