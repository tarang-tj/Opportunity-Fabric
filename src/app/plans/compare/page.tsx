import { Suspense } from "react";
import { ComparePlansClient } from "./ComparePlansClient";

export default function ComparePlansPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center gap-3 px-4 text-[var(--muted)]">
          <p>Loading compare…</p>
        </div>
      }
    >
      <ComparePlansClient />
    </Suspense>
  );
}
