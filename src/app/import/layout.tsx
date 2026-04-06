import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Import Markdown",
  description:
    "Paste or upload an Opportunity Fabric roadmap .md file for a read-only preview on this device.",
};

export default function ImportLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
