"use client";

import { IconAlert } from "@/components/FabricIcons";
import { OpportunityRoadmapCard } from "@/components/OpportunityRoadmapCard";
import type { ImportedRoadmapPreview } from "@/lib/importMarkdown";
import type { FabricOpportunity } from "@/lib/types";

function toFabricItems(
  phaseIdx: number,
  preview: ImportedRoadmapPreview["phases"][0]
): FabricOpportunity[] {
  return preview.items.map((it, j) => ({
    id: `imported-${phaseIdx}-${j}`,
    kind: "experience" as const,
    title: it.title,
    summary: it.summary,
    because: it.because.length > 0 ? it.because : ["Imported from Markdown."],
    effort: "moderate" as const,
  }));
}

export function ImportedRoadmapBody({
  data,
}: {
  data: ImportedRoadmapPreview;
}) {
  return (
    <div className="space-y-10">
      <div className="relative text-center sm:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Imported preview (read-only)
        </p>
        {data.nickname && (
          <p className="mt-2 text-sm font-medium text-[var(--muted)]">
            For {data.nickname}
          </p>
        )}
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {data.headline || "Roadmap"}
        </h1>
        {data.tradeoff && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:mx-0">
            {data.tradeoff}
          </p>
        )}
      </div>

      {data.flags.length > 0 && (
        <div className="fabric-panel border-amber-400/35 bg-gradient-to-br from-amber-50/95 to-orange-50/90 p-5 dark:from-amber-950/35 dark:to-orange-950/20 dark:border-amber-800/40">
          <p className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100/80 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
              <IconAlert className="size-4" aria-hidden />
            </span>
            Heads-up
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-amber-950/90 dark:text-amber-100/90">
            {data.flags.map((f) => (
              <li key={f} className="flex gap-2 pl-1">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-20 sm:space-y-24">
        {data.phases.map((phase, pi) => {
          const ops = toFabricItems(pi, phase);
          return (
            <section key={`${phase.label}-${pi}`} className="relative">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
                  {phase.label}
                </h2>
                {phase.window && (
                  <p className="text-sm font-medium text-[var(--muted)]">{phase.window}</p>
                )}
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {phase.items.map((it, oi) => (
                  <OpportunityRoadmapCard
                    key={ops[oi].id}
                    item={ops[oi]}
                    animDelayMs={oi * 40}
                    readOnly
                    done={it.status === "done"}
                    working={it.status === "working"}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
