"use client";

import { KindGlyph } from "@/components/FabricIcons";
import type { FabricOpportunity } from "@/lib/types";

const kindUi: Record<
  FabricOpportunity["kind"],
  { label: string; stripe: string; chip: string }
> = {
  course_strategy: {
    label: "Classes & order",
    stripe: "from-violet-500 to-indigo-500",
    chip: "bg-violet-500/15 text-violet-800 dark:text-violet-200",
  },
  experience: {
    label: "Hands-on experience",
    stripe: "from-emerald-500 to-teal-500",
    chip: "bg-emerald-500/15 text-emerald-900 dark:text-emerald-200",
  },
  campus_resource: {
    label: "Campus support",
    stripe: "from-sky-500 to-cyan-500",
    chip: "bg-sky-500/15 text-sky-900 dark:text-sky-200",
  },
  job_search: {
    label: "Jobs & internships",
    stripe: "from-amber-500 to-orange-500",
    chip: "bg-amber-500/20 text-amber-950 dark:text-amber-200",
  },
  networking: {
    label: "People & community",
    stripe: "from-rose-500 to-pink-500",
    chip: "bg-rose-500/15 text-rose-900 dark:text-rose-200",
  },
  portfolio: {
    label: "Portfolio & projects",
    stripe: "from-fuchsia-500 to-purple-500",
    chip: "bg-fuchsia-500/15 text-fuchsia-900 dark:text-fuchsia-200",
  },
};

const effortLabel: Record<FabricOpportunity["effort"], string> = {
  light: "Light lift",
  moderate: "Steady effort",
  heavy: "Bigger project",
};

export function OpportunityRoadmapCard({
  item,
  animDelayMs,
  readOnly = false,
  done = false,
  working = false,
  onToggleDone,
  onToggleWorking,
}: {
  item: FabricOpportunity;
  animDelayMs: number;
  readOnly?: boolean;
  done?: boolean;
  working?: boolean;
  onToggleDone?: () => void;
  onToggleWorking?: () => void;
}) {
  const ui = kindUi[item.kind];
  return (
    <article
      className={`fabric-fade-up relative overflow-hidden rounded-3xl border bg-[var(--card)]/95 shadow-[var(--elev-1)] transition print:shadow-none hover:-translate-y-0.5 hover:shadow-[var(--elev-2)] ${
        done
          ? "border-[var(--sage)]/50 ring-1 ring-[var(--sage)]/20"
          : "border-[var(--line)]"
      }`}
      style={{ animationDelay: `${animDelayMs}ms`, breakInside: "avoid" }}
    >
      <div
        className={`absolute inset-y-3 left-0 w-1.5 rounded-full bg-gradient-to-b ${ui.stripe} opacity-90 print:opacity-100`}
        aria-hidden
      />
      <div className="relative pl-6 pr-5 pb-5 pt-5 sm:pl-7 sm:pr-6 sm:pt-6">
        {!readOnly && (
          <div className="print:hidden mb-4 flex flex-wrap items-center gap-3 border-b border-[var(--line)] pb-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--foreground)]">
              <input
                type="checkbox"
                checked={done}
                onChange={onToggleDone}
                className="size-4 rounded border-[var(--line)] accent-[var(--accent)]"
              />
              Done
            </label>
            <label
              className={`flex cursor-pointer items-center gap-2 text-sm font-medium ${
                done ? "cursor-not-allowed text-[var(--muted)]/50" : "text-[var(--muted)]"
              }`}
            >
              <input
                type="checkbox"
                checked={working}
                disabled={done}
                onChange={onToggleWorking}
                className="size-4 rounded border-[var(--line)] accent-[var(--sage)] disabled:opacity-40"
              />
              In progress
            </label>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--card)] to-[var(--background)] text-[var(--accent)] shadow-inner ring-1 ring-[var(--line)]"
            aria-hidden
          >
            <KindGlyph kind={item.kind} className="size-5" />
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${ui.chip}`}
          >
            {ui.label}
          </span>
          <span className="ml-auto rounded-full border border-[var(--line)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
            {effortLabel[item.effort]}
          </span>
        </div>
        <h3 className="font-display mt-4 text-xl font-semibold leading-snug text-[var(--foreground)]">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.summary}</p>
        <div className="mt-5 rounded-2xl bg-[var(--gold-soft)]/60 p-4 dark:bg-[var(--gold-soft)]/10">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Why this fits you
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--foreground)]/90">
            {item.because.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
