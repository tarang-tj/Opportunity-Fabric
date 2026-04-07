"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconAlert, IconMap } from "@/components/FabricIcons";
import { OpportunityRoadmapCard } from "@/components/OpportunityRoadmapCard";
import { SiteHeader } from "@/components/SiteHeader";
import { buildRoadmap } from "@/lib/engine";
import {
  downloadMarkdownFile,
  roadmapToMarkdown,
  roadmapToPlainText,
} from "@/lib/formatRoadmap";
import { buildInsights } from "@/lib/insights";
import {
  loadProgress,
  progressCounts,
  toggleDone,
  toggleWorking,
  type RoadmapProgress,
} from "@/lib/progress";
import { buildRoadmapIcs, downloadIcsFile } from "@/lib/roadmapIcs";
import { saveNamedPlan } from "@/lib/savedPlans";
import { encodeProfileForShare } from "@/lib/shareCodec";
import { clearProfile, loadProfile } from "@/lib/storage";
import type { RoadmapResult, StudentProfile } from "@/lib/types";

const phaseDecor = [
  { num: "1", blob: "from-[var(--accent)]/30 to-transparent" },
  { num: "2", blob: "from-[var(--sage)]/25 to-transparent" },
  { num: "3", blob: "from-violet-500/20 to-transparent" },
];

export default function RoadmapPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [progress, setProgress] = useState<RoadmapProgress>({
    doneIds: [],
    workingIds: [],
  });
  const [toast, setToast] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [saveName, setSaveName] = useState("");
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setProgress(loadProgress());
  }, []);

  const roadmap: RoadmapResult | null = useMemo(
    () => (profile ? buildRoadmap(profile) : null),
    [profile]
  );

  const validIds = useMemo(() => {
    const s = new Set<string>();
    roadmap?.phases.forEach((p) =>
      p.opportunities.forEach((o) => s.add(o.id))
    );
    return s;
  }, [roadmap]);

  const counts = useMemo(
    () => progressCounts(progress, validIds),
    [progress, validIds]
  );

  const insights = useMemo(
    () => (profile && roadmap ? buildInsights(profile, roadmap) : []),
    [profile, roadmap]
  );

  useEffect(() => {
    if (!profile || typeof window === "undefined") return;
    const t = encodeProfileForShare(profile);
    setShareUrl(
      `${window.location.origin}/roadmap/shared?t=${encodeURIComponent(t)}`
    );
  }, [profile]);

  const totalCards = roadmap
    ? roadmap.phases.reduce((n, p) => n + p.opportunities.length, 0)
    : 0;

  const pct =
    counts.total > 0 ? Math.round((counts.done / counts.total) * 100) : 0;

  const firstPhasePreview = useMemo(() => {
    if (!roadmap?.phases.length) return [];
    return roadmap.phases[0]!.opportunities.slice(0, 4);
  }, [roadmap]);

  const firstPhaseId = roadmap?.phases[0]?.id ?? "";

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!profile || !roadmap) return;
    const text = roadmapToPlainText(profile, roadmap);
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied! Paste into Notes, Google Docs, or an email.");
    } catch {
      showToast("Could not copy. Try selecting text manually.");
    }
  }, [profile, roadmap, showToast]);

  const handleCopyShare = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Share link copied. Anyone with the link can view a read-only roadmap.");
    } catch {
      showToast("Could not copy link.");
    }
  }, [shareUrl, showToast]);

  const handleIcs = useCallback(() => {
    if (!profile || !roadmap) return;
    const ics = buildRoadmapIcs(roadmap, profile);
    downloadIcsFile(ics, "opportunity-fabric-roadmap.ics");
    showToast("Calendar file downloaded. Open it to add reminders to Apple or Google Calendar.");
  }, [profile, roadmap, showToast]);

  const handleDownloadMd = useCallback(() => {
    if (!profile || !roadmap) return;
    const md = roadmapToMarkdown(profile, roadmap, {
      doneIds: progress.doneIds,
      workingIds: progress.workingIds,
    });
    const slug = (profile.nickname || "my-roadmap")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
    downloadMarkdownFile(md, `opportunity-fabric-${slug || "roadmap"}.md`);
    showToast("Markdown file downloaded. Open in any editor or note app.");
  }, [profile, roadmap, progress, showToast]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleClear = useCallback(() => {
    if (
      !window.confirm(
        "Erase your saved answers on this device? You can always fill the form again."
      )
    ) {
      return;
    }
    clearProfile();
    setProfile(null);
    setProgress({ doneIds: [], workingIds: [] });
    router.push("/onboarding");
  }, [router]);

  const onToggleDone = useCallback((id: string) => {
    setProgress(toggleDone(id));
  }, []);

  const onToggleWorking = useCallback((id: string) => {
    setProgress(toggleWorking(id));
  }, []);

  const handleSavePlan = useCallback(() => {
    if (!profile) return;
    const plan = saveNamedPlan(saveName || "My plan", profile);
    if (plan) {
      setSaveName("");
      setShowSave(false);
      showToast(`Saved as “${plan.name}”. View all under Saved plans.`);
    }
  }, [profile, saveName, showToast]);

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-5xl flex-1 px-4 py-10 pb-20 sm:px-6 sm:py-14 sm:pb-24"
      >
        {toast && (
          <div
            role="status"
            className="print:hidden fabric-fade-up fixed bottom-6 left-1/2 z-[60] max-w-[min(90vw,26rem)] -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-center text-sm font-medium text-[var(--foreground)] shadow-xl"
          >
            {toast}
          </div>
        )}

        {!profile || !roadmap ? (
          <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-[var(--accent)]/45 bg-[var(--card)]/95 p-12 text-center shadow-[var(--elev-1)]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--accent-soft)] blur-3xl dark:opacity-40" />
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--accent-soft)]/70 text-[var(--accent)]">
              <IconMap className="size-10" aria-hidden />
            </div>
            <h1 className="font-display mt-8 text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              Your roadmap is not here yet
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[var(--muted)] leading-relaxed">
              Tell us about your goals once. We save your answers on{" "}
              <strong className="font-medium text-[var(--foreground)]/90">this device</strong>, even
              if you refresh or open a new tab.
            </p>
            <Link
              href="/onboarding"
              className="mt-10 inline-flex rounded-full bg-[var(--accent)] px-9 py-4 text-sm font-bold text-white shadow-[var(--elev-2)] transition hover:brightness-110"
            >
              Start the questionnaire
            </Link>
          </div>
        ) : (
          <>
            <div className="fabric-panel fabric-fade-up mb-6 print:hidden">
              <div className="flex flex-col gap-4 px-5 py-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Your momentum
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="text-2xl font-bold tabular-nums text-[var(--foreground)]">
                        {pct}%
                      </span>
                      <span className="text-sm text-[var(--muted)]">
                        {counts.done} of {counts.total} moves marked done
                        {counts.working > 0 ? ` · ${counts.working} in progress` : ""}
                      </span>
                    </div>
                  </div>
                  {pct === 0 && counts.total > 0 && (
                    <p className="max-w-[14rem] text-right text-xs leading-snug text-[var(--muted)]">
                      Check a card below as <span className="font-semibold text-[var(--foreground)]/80">Done</span>{" "}
                      when you finish it — the bar fills as you go.
                    </p>
                  )}
                </div>
                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--foreground)]/[0.08] ring-1 ring-inset ring-[var(--foreground)]/[0.06] dark:bg-[var(--foreground)]/[0.12] dark:ring-[var(--foreground)]/[0.08]"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Roadmap progress, ${counts.done} of ${counts.total} moves done`}
                >
                  <div
                    className="h-full rounded-full bg-[var(--accent)] shadow-sm shadow-[var(--accent)]/25 transition-[width] duration-500 ease-out"
                    style={{
                      width: `${pct}%`,
                      minWidth: pct > 0 ? "0.5rem" : undefined,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="fabric-panel fabric-fade-up mb-8 flex flex-wrap items-center justify-center gap-4 px-5 py-4 print:hidden sm:justify-between">
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--muted)]">
                <span className="rounded-full bg-[var(--background)] px-3 py-1 font-semibold text-[var(--foreground)] ring-1 ring-[var(--line)]">
                  {roadmap.phases.length} phases
                </span>
                <span className="rounded-full bg-[var(--background)] px-3 py-1 font-semibold text-[var(--foreground)] ring-1 ring-[var(--line)]">
                  {totalCards} moves
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 sm:items-end">
                <p className="text-center text-xs text-[var(--muted)] sm:text-right">
                  Check off cards as you go. Progress saves on this device.
                </p>
                <a
                  href="#roadmap-moves"
                  className="text-center text-xs font-bold text-[var(--accent)] underline decoration-[var(--accent)]/35 underline-offset-4 transition hover:decoration-[var(--accent)] sm:text-right"
                >
                  Jump to your moves ↓
                </a>
              </div>
            </div>

            {firstPhasePreview.length > 0 && (
              <div className="fabric-panel fabric-fade-up mb-8 p-5 print:hidden">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  What&apos;s next
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  First items in <span className="font-medium text-[var(--foreground)]/90">phase 1</span> — open a card to mark progress.
                </p>
                <ul className="mt-4 space-y-2">
                  {firstPhasePreview.map((o) => (
                    <li key={o.id}>
                      <a
                        href={`#move-${o.id}`}
                        className="group flex items-start gap-2 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--accent)]"
                      >
                        <span className="mt-0.5 text-[var(--accent)] opacity-70 transition group-hover:opacity-100">
                          →
                        </span>
                        <span className="leading-snug">{o.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="fabric-fade-up flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="relative text-center sm:flex-1 sm:text-left">
                <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-[var(--gold-soft)] blur-3xl dark:opacity-25" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                  Your personalized roadmap
                </p>
                <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  {roadmap.headline}
                </h1>
                {profile.nickname && (
                  <p className="mt-2 text-lg font-medium text-[var(--muted)]">
                    Hey {profile.nickname}, here is a path that matches what you shared.
                  </p>
                )}
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:mx-0">
                  {roadmap.tradeoffSummary}
                </p>
              </div>
              <div className="print:hidden flex flex-shrink-0 flex-wrap justify-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Print / PDF
                </button>
                <button
                  type="button"
                  onClick={handleIcs}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Add to calendar
                </button>
                <button
                  type="button"
                  onClick={handleDownloadMd}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Download .md
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Copy text
                </button>
                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Copy share link
                </button>
                <Link
                  href="/mentor"
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Mentor summary
                </Link>
                <button
                  type="button"
                  onClick={() => setShowSave((s) => !s)}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-4 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Save snapshot
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-transparent px-4 py-2.5 text-sm font-bold text-[var(--muted)] transition hover:border-red-500/40 hover:text-red-700 dark:hover:text-red-300"
                >
                  Clear all
                </button>
              </div>
            </div>

            {showSave && (
              <div className="fabric-panel fabric-fade-up mt-6 flex flex-col gap-3 p-5 print:hidden sm:flex-row sm:items-end">
                <label className="flex-1 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Snapshot name
                  </span>
                  <input
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="e.g. Fall plan, Pre-internship"
                    className="w-full rounded-2xl border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSavePlan}
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
                >
                  Save to device
                </button>
              </div>
            )}

            {insights.length > 0 && (
              <div className="fabric-panel fabric-fade-up mt-8 p-6 print:hidden">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  Fabric read on your inputs
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                  {insights.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-[var(--accent)]">→</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {roadmap.flags.length > 0 && (
              <div
                className="fabric-fade-up fabric-panel mt-8 border-amber-400/35 bg-gradient-to-br from-amber-50/95 to-orange-50/90 p-5 dark:from-amber-950/35 dark:to-orange-950/20 dark:border-amber-800/40"
                style={{ animationDelay: "60ms" }}
              >
                <p className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100/80 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                    <IconAlert className="size-4" aria-hidden />
                  </span>
                  Quick heads-up
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-amber-950/90 dark:text-amber-100/90">
                  {roadmap.flags.map((f) => (
                    <li key={f} className="flex gap-2 pl-1">
                      <span className="text-amber-600 dark:text-amber-400">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              id="roadmap-moves"
              className="relative scroll-mt-28 mt-10 print:mt-8 sm:scroll-mt-32"
            >
              <h2 className="sr-only">Your phased moves</h2>
              <div
                className="absolute left-[1.125rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--sage)] to-violet-400 opacity-40 print:hidden sm:left-8"
                aria-hidden
              />

              <div className="space-y-20 sm:space-y-24 print:space-y-10">
                {roadmap.phases.map((phase, i) => {
                  const decor = phaseDecor[i] ?? phaseDecor[0];
                  return (
                    <section
                      key={phase.id}
                      id={i === 0 && firstPhaseId ? `phase-${firstPhaseId}` : undefined}
                      className="relative scroll-mt-28 pl-12 sm:scroll-mt-32 sm:pl-20 print:pl-0 print:sm:pl-0"
                    >
                      <div className="absolute left-0 top-0 print:hidden sm:left-3">
                        <div
                          className={`relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--card)] text-sm font-bold text-[var(--foreground)] shadow-lg ring-2 ring-[var(--accent)]/30 sm:h-12 sm:w-12 sm:text-base`}
                        >
                          <span
                            className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${decor.blob} blur-md opacity-80`}
                            aria-hidden
                          />
                          {decor.num}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 print:mb-4 sm:flex-row sm:items-end sm:justify-between">
                        <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] sm:text-3xl print:text-xl">
                          {phase.label}
                        </h2>
                        <p className="text-sm font-medium text-[var(--muted)]">{phase.window}</p>
                      </div>

                      <div className="mt-8 grid gap-5 md:grid-cols-2 print:grid-cols-1">
                        {phase.opportunities.map((o, oi) => (
                          <div
                            key={o.id}
                            id={`move-${o.id}`}
                            className="scroll-mt-28 sm:scroll-mt-32"
                          >
                          <OpportunityRoadmapCard
                            item={o}
                            animDelayMs={80 + i * 140 + oi * 60}
                            done={progress.doneIds.includes(o.id)}
                            working={progress.workingIds.includes(o.id)}
                            onToggleDone={() => onToggleDone(o.id)}
                            onToggleWorking={() => onToggleWorking(o.id)}
                          />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

            <div className="print:hidden mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl border border-[var(--line)] bg-[var(--card)]/80 p-6 text-center shadow-[var(--elev-1)] sm:flex-row sm:text-left">
              <p className="max-w-md text-sm text-[var(--muted)]">
                Life changes, so should this plan. Tweak your answers anytime and we will redraw
                the map.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  href="/onboarding"
                  className="rounded-full border-2 border-[var(--foreground)]/15 px-6 py-3 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
                >
                  Update my answers
                </Link>
                <Link
                  href="/plans"
                  className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-bold text-[var(--background)] transition hover:opacity-90 dark:bg-[var(--gold)] dark:text-[#1a1508]"
                >
                  Saved plans
                </Link>
                <Link
                  href="/import"
                  clas