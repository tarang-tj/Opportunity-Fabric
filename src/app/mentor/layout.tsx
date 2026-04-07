import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mentor summary",
  description:
    "Print-friendly summary of a student’s Opportunity Fabric roadmap: profile snapshot, phased moves, and plain-language reasons for each suggestion.",
};

export default function MentorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
