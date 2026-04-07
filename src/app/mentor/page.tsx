"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconAlert, IconMap } from "@/components/FabricIcons";
import { SiteHeader } from "@/components/SiteHeader";
import { buildRoadmap } from "@/lib/engine";
import { buildInsights } from "@/lib/insights";
import {
  labelIncomePriority,
  labelQuarter,
  labelWeeklyHours,
  PRIMARY_GOAL_LABELS,
  yesNo,
} from "@/lib/profileLabels";
import { encodeProfileForShare } from "@/lib/shareCodec";
import { loadProfile } from "@/lib/storage";
import type { RoadmapResult, StudentProfile } from "@/lib/types";

function ProfileSnapshot({ profile }: { profile: StudentProfile }) {
  const rows: { label: string; value: string }[] = [
    { label: "Direction", value: PRIMARY_GOAL_LABELS[profile.primaryGoal] },
    { label: "Graduating", value: String(profile.gradYear) },
    { label: "Term context", value: labelQuarter(profile.quarter) },
    { label: "Time outside class", value: labelWeeklyHours(profile.weeklyHours) },
    { label: "Needs income", value: yesNo(profile.needIncome) },
    {
      label: "Income priority",
      value: profile.needIncome ? labelIncomePriority(profile.incomePriority) : "—",
    },
    { label: "Open to remote", value: yesNo(profile.remoteOk) },
    { label: "Visa considerations", value: yesNo(profile.visaSensitive) },
  ];

  return (
    <div className="fabric-panel p-6 print:border print:border-neutral-300 print:bg-white print:shadow-none">
      <h2 className="font-display text-lg font-semibold text-[var(--foreground)] print:text-black">
        Profile snapshot
      </h2>
      <p className="mt-1 text-xs text-[var(--muted)] print:text-neutral-600">
        What the student entered on this device. They can update it anytime.
      </p>
      {profile.nickname && (
        <p className="mt-4 text-sm font-semibold text-[var(--foreground)] print:text-black">
          Name: {profile.nickname}
        </p>
      )}
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="border-b border-[var(--line)] pb-3 last:border-0 sm:border-0 sm:pb-0 print:border-neutral-200">
            <dt className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] print:text-neutral-500">
              {r.label}
            </dt>
            <dd className="mt-1 text-sm text-[var(--foreground)] print:text-black">{r.value}</dd>
          </div>
        ))}
      </dl>
      {profile.focusNotes.trim() && (
        <blockquote className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--background)]/60 p-4 text-sm leading-relaxed text-[var(--muted)] print:border-neutral-300 print:bg-neutral-50 print:text-neutral-800">
          <span className="font-semibold text-[var(--foreground)] print:text-black">In their words: </span>
          {profile.focusNotes.trim()}
        </blockquote>
      )}
    </div>
  );
}

export default function MentorSummaryPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const roadmap: RoadmapResult | null = useMemo(
    () => (profile ? buildRoadmap(profile) : null),
    [profile]
  );

  const insights = useMemo(
    () => (profile && roadmap ? buildInsights(profile, roadmap) : []),
    [profile, roadmap]
  );

  useEffect(() => {
    if (!profile || typeof window === "undefined") return;
    const t = encodeProfileForShare(profile);
    setShareUrl(`${window.location.origin}/roadmap/shared?t=${encodeURIComponent(t)}`);
  }, [profile]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyShare = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Read-only roadmap link copied.");
    } catch {
      showToast("Could not copy link.");
    }
  }, [shareUrl, showToast]);

  return (
    <>
      <div className="print:hidden">
        <SiteHeader />
      </div>
      <main
        id="main-content"
        className="mx-auto max-w-3xl flex-1 px-4 py-10 pb-20 sm:px-6 sm:py-14 sm:pb-24"
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
          <div className="fabric-panel p-10 text-center print:hidden">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)]/70 text-[var(--accent)]">
              <IconMap className="size-8" aria-hidden />
            </div>
            <h1 className="font-display mt-6 text-2xl font-semibold text-[var(--foreground)]">
              No profile on this device yet
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-[var(--muted)] leading-relaxed">
              The student completes the questionnaire first. Then this page shows a calm summary you
              can discuss together or print.
            </p>
            <Link
              href="/onboarding"
              className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white"
            >
              Go to questionnaire
            </Link>
          </div>
        ) : (
          <>
            <header className="print:mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)] print:text-neutral-700">
                Opportunity Fabric
              </p>
              <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--foreground)] print:text-black sm:text-4xl">
                Mentor & advisor summary
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] print:text-neutral-700">
                Phased plan and plain-language reasons behind each suggestion. Data lives on the
                student&apos;s browser unless they use share or export — this page does not send
                anything to a server.
              </p>
              <p className="mt-2 text-xs text-[var(--muted)] print:text-neutral-600">
                Generated {new Date().toLocaleDateString(undefined, { dateStyle: "long" })}
              </p>
            </header>

            <div className="print:hidden mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-5 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
              >
                Print / PDF
              </button>
              <button
                type="button"
                onClick={handleCopyShare}
                className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-5 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
              >
                Copy read-only link
              </button>
              <Link
                href="/roadmap"
                className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--foreground)] px-5 py-2.5 text-sm font-bold text-[var(--background)] transition hover:opacity-90 dark:bg-[var(--gold)] dark:text-[#1a1508]"
              >
                Full roadmap (interactive)
              </Link>
              <Link
                href="/onboarding"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
              >
                Edit answers
              </Link>
            </div>

            <div className="mt-10 space-y-8 print:space-y-6">
              <ProfileSnapshot profile={profile} />

              <div className="fabric-panel p-6 print:border print:border-neutral-300 print:bg-white print:shadow-none">
                <h2 className="font-display text-lg font-semibold text-[var(--foreground)] print:text-black">
                  Plan headline
                </h2>
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-[var(--foreground)] print:text-black sm:text-2xl">
                  {roadmap.headline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] print:text-neutral-800">
                  {roadmap.tradeoffSummary}
                </p>
              </div>

              {insights.length > 0 && (
                <div className="fabric-panel p-6 print:border print:border-neutral-300 print:bg-white print:shadow-none">
                  <h2 className="font-display text-lg font-semibold text-[var(--foreground)] print:text-black">
                    How Fabric read their inputs
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)] print:text-neutral-800">
                    {insights.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-[var(--accent)] print:text-neutral-600">→</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {roadmap.flags.length > 0 && (
                <div className="fabric-panel border-amber-400/35 bg-gradient-to-br from-amber-50/95 to-orange-50/90 p-5 dark:from-amber-950/35 dark:to-orange-950/20 dark:border-amber-800/40 print:border print:border-amber-200 print:bg-amber-50 print:shadow-none">
                  <p className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200 print:text-amber-950">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100/80 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 print:bg-amber-100">
                      <IconAlert className="size-4" aria-hidden />
                    </span>
                    Heads-up
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-amber-950/90 dark:text-amber-100/90 print:text-amber-950">
                    {roadmap.flags.map((f) => (
                      <li key={f} className="flex gap-2 pl-1">
                        <span className="text-amber-600 dark:text-amber-400">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--foreground)] print:text-black">
                  Phased moves & rationale
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)] print:text-neutral-700">
                  Each item is a suggestion the student can accept, adapt, or replace — the bullets
                  explain why it appeared.
                </p>
                <div className="mt-8 space-y-12 print:space-y-10">
                  {roadmap.phases.map((phase, pi) => (
                    <section
                      key={phase.id}
                      className="border-t border-[var(--line)] pt-10 first:border-0 first:pt-0 print:border-neutral-300"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="font-display text-xl font-semibold text-[var(--foreground)] print:text-black">
                          <span className="text-[var(--accent)] print:text-neutral-600">
                            Phase {pi + 1}.{" "}
                          </span>
                          {phase.label}
                        </h3>
                        <p className="text-sm font-medium text-[var(--muted)] print:text-neutral-600">
                          {phase.window}
                        </p>
                      </div>
                      <div className="mt-6 space-y-8">
                        {phase.opportunities.map((o) => (
                          <article
                            key={o.id}
                            className="rounded-2xl border border-[var(--line)] bg-[var(--card)]/80 p-5 print:border-neutral-300 print:bg-white print:shadow-none"
                          >
                            <h4 className="font-display text-lg font-semibold text-[var(--foreground)] print:text-black">
                              {o.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] print:text-neutral-800">
                              {o.summary}
                            </p>
                            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--accent)] print:text-neutral-700">
                              Why this is here
                            </p>
                            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[var(--foreground)]/90 print:text-black">
                              {o.because.map((line, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-[var(--accent)] print:text-neutral-600">•</span>
                                  {line}
                                </li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>

            <div className="print:hidden mt-14 text-center text-sm text-[var(--muted)]">
              <Link href="/" className="font-semibold text-[var(--accent)] underline">
                Home
              </Link>
              <span className="mx-2">·</span>
              <Link href="/roadmap" className="font-semibold text-[var(--accent)] underline">
                My roadmap
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}
