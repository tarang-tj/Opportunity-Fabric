import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Compare plans",
  description:
    "Compare two saved Opportunity Fabric snapshots: profile diff, shared vs unique roadmap moves and flags, and headline summaries.",
};

export default function CompareLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
