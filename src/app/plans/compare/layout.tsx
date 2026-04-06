import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Compare plans",
  description:
    "Compare two saved Opportunity Fabric snapshots side by side: answers, highlights where they differ, and a quick read on each generated roadmap.",
};

export default function CompareLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
