"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { buildRoadmap } from "@/lib/engine";
import {
  labelIncomePriority,
  labelQuarter,
  labelWeeklyHours,
  PRIMARY_GOAL_LABELS,
  yesNo,
} from "@/lib/profileLabels";
import {
  compareRoadmapFlags,
  compareRoadmapOpportunities,
} from "@/lib/roadmapCompare";
import { listNamedPlans, type NamedPlan } from "@/lib/savedPlans";
import type { RoadmapResult, StudentProfile } from "@/lib/types";

function notesSnippet(s: string, max = 140): string {
  const t = s.trim();
  if (!t) return "—";
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

type Row = { label: string; a: string; b: string; diff?: boolean };

function profileRows(left: StudentProfile, right: StudentProfile): Row[] {
  const rows: Row[] = [
    {
      label: "What we call you",
      a: left.nickname?.trim() || "—",
      b: right.nickname?.trim() || "—",
    },
    {
      label: "Direction",
      a: PRIMARY_GOAL_LABELS[left.primaryGoal],
      b: PRIMARY_GOAL_LABELS[right.primaryGoal],
    },
    {
      label: "Extra context",
      a: notesSnippet(left.focusNotes),
      b: notesSnippet(right.focusNotes),
    },
    {
      label: "Graduate year",
      a: String(left.gradYear),
      b: String(right.gradYear),
    },
    {
      label: "Term",
      a: labelQuarter(left.quarter),
      b: labelQuarter(right.quarter),
    },
    {
      label: "Time outside class",
      a: labelWeeklyHours(left.weeklyHours),
      b: labelWeeklyHours(right.weeklyHours),
    },
    {
      label: "Needs income",
      a: yesNo(left.needIncome),
      b: yesNo(right.needIncome),
    },
    {
      label: "Income priority",
      a: left.needIncome ? labelIncomePriority(left.incomePriority) : "—",
      b: right.needIncome ? labelIncomePriority(right.incomePriority) : "—",
    },
    {
      label: "Open to remote",
      a: yesNo(left.remoteOk),
      b: yesNo(right.remoteOk),
    },
    {
      label: "Visa needs care",
      a: yesNo(left.visaSensitive),
      b: yesNo(right.visaSensitive),
    },
  ];
  return rows.map((r) => ({
    ...r,
    diff: r.a !== r.b,
  }));
}

function roadmapStats(r: RoadmapResult): {
  phases: number;
  cards: number;
  flags: number;
} {
  const cards = r.phases.reduce((n, p) => n + p.opportunities.length, 0);
  return { phases: r.phases.length, cards, flags: r.flags.length };
}

function RoadmapMini({
  title,
  roadmap,
}: {
  title: string;
  roadmap: RoadmapResult;
}) {
  const st = roadmapStats(roadmap);
  return (
    <div className="fabric-panel p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
        {title}
      </p>
      <h3 className="font-display mt-2 text-lg font-semibold text-[var(--foreground)]">
        {roadmap.headline}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] line-clamp-4">
        {roadmap.tradeoffSummary}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[var(--foreground)]">
        <li className="rounded-full bg-[var(--background)] px-3 py-1 ring-1 ring-[var(--line)]">
          {st.phases} phases
        </li>
        <li className="rounded-full bg-[var(--background)] px-3 py-1 ring-1 ring-[var(--line)]">
          {st.cards} moves
        </li>
        <li className="rounded-full bg-[var(--background)] px-3 py-1 ring-1 ring-[var(--line)]">
          {st.flags} flags
        </li>
      </ul>
    </div>
  );
}

function DiffList({
  heading,
  sub,
  items,
  emptyLabel,
}: {
  heading: string;
  sub: string;
  items: { id: string; title: string }[] | string[];
  emptyLabel: string;
}) {
  const isStrings = items.length > 0 && typeof items[0] === "string";
  return (
    <div className="fabric-panel p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{heading}</p>
      <p className="mt-1 text-xs text-[var(--muted)]/90">{sub}</p>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--muted)]">{emptyLabel}</p>
      ) : (
        <ul className="mt-4 space-y-2.5 text-sm leading-snug text-[var(--foreground)]">
          {isStrings
            ? (items as string[]).map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>{line}</span>
                </li>
              ))
            : (items as { id: string; title: string }[]).map((o) => (
                <li key={o.id} className="flex gap-2">
                  <span className="text-[var(--accent)]">•</span>
                  <span>{o.title}</span>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}

export function ComparePlansClient() {
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<NamedPlan[]>([]);
  const [idA, setIdA] = useState("");
  const [idB, setIdB] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setPlans(listNamedPlans());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const list = plans;
    if (list.length === 0) {
      setIdA("");
      setIdB("");
      return;
    }
    const qa = searchParams.get("a");
    const qb = searchParams.get("b");
    const hasA = Boolean(qa && list.some((p) => p.id === qa));
    const hasB = Boolean(qb && list.some((p) => p.id === qb));

    if (hasA && hasB && qa !== qb) {
      setIdA(qa!);
      setIdB(qb!);
      return;
    }
    if (hasA) {
      setIdA(qa!);
      const other = list.find((p) => p.id !== qa);
      setIdB(other?.id ?? qa!);
      return;
    }
    if (hasB) {
      setIdB(qb!);
      const other = list.find((p) => p.id !== qb);
      setIdA(other?.id ?? qb!);
      return;
    }
    setIdA(list[0]!.id);
    setIdB((list[1] ?? list[0])!.id);
  }, [plans, searchParams]);

  const planA = useMemo(
    () => plans.find((p) => p.id === idA) ?? null,
    [plans, idA]
  );
  const planB = useMemo(
    () => plans.find((p) => p.id === idB) ?? null,
    [plans, idB]
  );

  const rows = useMemo(() => {
    if (!planA || !planB) return [];
    return profileRows(planA.profile, planB.profile);
  }, [planA, planB]);

  const roadmapA = useMemo(
    () => (planA ? buildRoadmap(planA.profile) : null),
    [planA]
  );
  const roadmapB = useMemo(
    () => (planB ? buildRoadmap(planB.profile) : null),
    [planB]
  );

  const samePlan = Boolean(planA && planB && planA.id === planB.id);

  const oppDiff = useMemo(() => {
    if (!roadmapA || !roadmapB || samePlan) return null;
    return compareRoadmapOpportunities(roadmapA, roadmapB);
  }, [roadmapA, roadmapB, samePlan]);

  const flagDiff = useMemo(
    () =>
      roadmapA && roadmapB && !samePlan
        ? compareRoadmapFlags(roadmapA, roadmapB)
        : null,
    [roadmapA, roadmapB, samePlan]
  );

  const shareCompareUrl = useMemo(() => {
    if (typeof window === "undefined" || !planA || !planB || samePlan) return "";
    const u = new URL(`${window.location.origin}/plans/compare`);
    u.searchParams.set("a", planA.id);
    u.searchParams.set("b", planB.id);
    return u.toString();
  }, [planA, planB, samePlan]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const handleCopyCompareLink = useCallback(async () => {
    if (!shareCompareUrl) return;
    try {
      await navigator.clipboard.writeText(shareCompareUrl);
      showToast("Comparison link copied. Opens this pair on this device.");
    } catch {
      showToast("Could not copy link.");
    }
  }, [shareCompareUrl, showToast]);

  const hasFlagDiff =
    flagDiff &&
    (flagDiff.shared.length > 0 ||
      flagDiff.onlyA.length > 0 ||
      flagDiff.onlyB.length > 0);

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14"
      >
        {toast && (
          <div
            role="status"
            className="fabric-fade-up fixed bottom-6 left-1/2 z-[60] max-w-[min(90vw,26rem)] -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-center text-sm font-medium text-[var(--foreground)] shadow-xl"
          >
            {toast}
          </div>
        )}

        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
          Saved plans
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          Compare two plans
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)] leading-relaxed">
          Pick two snapshots you saved from the roadmap. We line up your answers, diff the generated
          moves and heads-up flags, and show a quick read on each roadmap.
        </p>

        {plans.length < 2 ? (
          <div className="fabric-panel mt-10 p-10 text-center">
            <p className="text-[var(--muted)]">
              You need at least two saved plans. Open your roadmap, use{" "}
              <strong className="text-[var(--foreground)]/90">Save snapshot</strong>, then come
              back here.
            </p>
            <Link
              href="/roadmap"
              className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white"
            >
              Go to roadmap
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Plan A
                </span>
                <select
                  value={idA}
                  onChange={(e) => setIdA(e.target.value)}
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Plan B
                </span>
                <select
                  value={idB}
                  onChange={(e) => setIdB(e.target.value)}
                  className="w-full rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {samePlan && (
              <p className="mt-4 text-sm text-[var(--muted)]">
                Choose two different snapshots to see a side-by-side diff.
              </p>
            )}

            {planA && planB && roadmapA && roadmapB && !samePlan && (
              <>
                {shareCompareUrl && (
                  <div className="mt-6 print:hidden">
                    <button
                      type="button"
                      onClick={handleCopyCompareLink}
                      className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-5 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                    >
                      Copy link to this comparison
                    </button>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      Link includes plan IDs stored on this browser; useful to reopen the same pair
                      after a refresh.
                    </p>
                  </div>
                )}

                <div className="mt-10 overflow-x-auto rounded-2xl border border-[var(--line)] shadow-[var(--elev-1)]">
                  <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--line)] bg-[var(--card)]/80">
                        <th className="px-4 py-3 font-semibold text-[var(--foreground)]">
                          Field
                        </th>
                        <th className="px-4 py-3 font-semibold text-[var(--foreground)]">
                          {planA.name}
                        </th>
                        <th className="px-4 py-3 font-semibold text-[var(--foreground)]">
                          {planB.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr
                          key={row.label}
                          className={`border-b border-[var(--line)] ${
                            row.diff ? "bg-[var(--accent-soft)]/35 dark:bg-[var(--accent-soft)]/15" : ""
                          }`}
                        >
                          <th className="px-4 py-3 font-medium text-[var(--muted)]">
                            {row.label}
                          </th>
                          <td className="px-4 py-3 text-[var(--foreground)]">{row.a}</td>
                          <td className="px-4 py-3 text-[var(--foreground)]">{row.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  Rows with a tinted background differ between the two plans.
                </p>

                {oppDiff && (
                  <section className="mt-14">
                    <h2 className="font-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                      Moves on the board
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-[var(--muted)] leading-relaxed">
                      Same engine, two profiles: see which roadmap cards overlap and which only show
                      up when your goals or constraints change.
                    </p>
                    <div className="mt-8 grid gap-6 lg:grid-cols-3">
                      <DiffList
                        heading="In both roadmaps"
                        sub={`${oppDiff.shared.length} shared move${oppDiff.shared.length === 1 ? "" : "s"}`}
                        items={oppDiff.shared}
                        emptyLabel="No overlap — profiles diverge enough that every card differs."
                      />
                      <DiffList
                        heading={`Only in ${planA.name}`}
                        sub="Drops off if you shift toward plan B’s answers."
                        items={oppDiff.onlyA}
                        emptyLabel="Nothing unique here; plan B’s path already covers these moves."
                      />
                      <DiffList
                        heading={`Only in ${planB.name}`}
                        sub="Shows up when you lean into plan B’s profile."
                        items={oppDiff.onlyB}
                        emptyLabel="Nothing unique here; plan A already includes these moves."
                      />
                    </div>
                  </section>
                )}

                {hasFlagDiff && flagDiff && (
                  <section className="mt-14">
                    <h2 className="font-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                      Heads-up flags
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-[var(--muted)] leading-relaxed">
                      Cross-cutting reminders the engine attaches to a roadmap. Compare which risks
                      stay on your radar across both scenarios.
                    </p>
                    <div className="mt-8 grid gap-6 lg:grid-cols-3">
                      <DiffList
                        heading="Both plans"
                        sub="Same reminder in each roadmap"
                        items={flagDiff.shared}
                        emptyLabel="No shared flags."
                      />
                      <DiffList
                        heading={`Only ${planA.name}`}
                        sub="Flag clears under plan B"
                        items={flagDiff.onlyA}
                        emptyLabel="No flags unique to this plan."
                      />
                      <DiffList
                        heading={`Only ${planB.name}`}
                        sub="New or extra caution under plan B"
                        items={flagDiff.onlyB}
                        emptyLabel="No flags unique to this plan."
                      />
                    </div>
                  </section>
                )}

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                  <RoadmapMini title="Roadmap from plan A" roadmap={roadmapA} />
                  <RoadmapMini title="Roadmap from plan B" roadmap={roadmapB} />
                </div>
              </>
            )}
          </>
        )}

        <div className="mt-12 flex flex-wrap gap-4 text-sm">
          <Link href="/plans" className="font-semibold text-[var(--accent)] underline">
            All saved plans
          </Link>
          <Link href="/roadmap" className="font-semibold text-[var(--accent)] underline">
            Live roadmap
          </Link>
        </div>
      </main>
    </>
  );
}
