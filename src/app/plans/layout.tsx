import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Saved plans",
  description:
    "Named snapshots of your Opportunity Fabric profile, stored on this device. Load one to reopen that roadmap.",
};

export default function PlansLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
