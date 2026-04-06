import { Suspense } from "react";
import { SharedRoadmapClient } from "./SharedRoadmapClient";

export const metadata = {
  title: "Shared roadmap",
  description: "Read-only shared Opportunity Fabric roadmap.",
};

export default function SharedRoadmapPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] flex-1 items-center justify-center text-[var(--muted)]">
          Loading shared roadmap…
        </div>
      }
    >
      <SharedRoadmapClient />
    </Suspense>
  );
}
