"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { buildRoadmap } from "@/lib/engine";
import { roadmapToPlainText } from "@/lib/formatRoadmap";
import { clearProfile, loadProfile } from "@/lib/storage";
import type { FabricOpportunity, RoadmapResult, StudentProfile } from "@/lib/types";

const kindUi: Record<
  FabricOpportunity["kind"],
  { label: string; emoji: string; stripe: string; chip: string }
> = {
  course_strategy: {
    label: "Classes & order",
    emoji: "📚",
    stripe: "from-violet-500 to-indigo-500",
    chip: "bg-violet-500/15 text-violet-800 dark:text-violet-200",
  },
  experience: {
    label: "Hands-on experience",
    emoji: "🧪",
    stripe: "from-emerald-500 to-teal-500",
    chip: "bg-emerald-500/15 text-emerald-900 dark:text-emerald-200",
  },
  campus_resource: {
    label: "Campus support",
    emoji: "🏛️",
    stripe: "from-sky-500 to-cyan-500",
    chip: "bg-sky-500/15 text-sky-900 dark:text-sky-200",
  },
  job_search: {
    label: "Jobs & internships",
    emoji: "💼",
    stripe: "from-amber-500 to-orange-500",
    chip: "bg-amber-500/20 text-amber-950 dark:text-amber-200",
  },
  networking: {
    label: "People & community",
    emoji: "🤝",
    stripe: "from-rose-500 to-pink-500",
    chip: "bg-rose-500/15 text-rose-900 dark:text-rose-200",
  },
  portfolio: {
    label: "Portfolio & projects",
    emoji: "✨",
    stripe: "from-fuchsia-500 to-purple-500",
    chip: "bg-fuchsia-500/15 text-fuchsia-900 dark:text-fuchsia-200",
  },
};

const effortLabel: Record<FabricOpportunity["effort"], string> = {
  light: "Light lift",
  moderate: "Steady effort",
  heavy: "Bigger project",
};

function OpportunityCard({
  item,
  animDelayMs,
}: {
  item: FabricOpportunity;
  animDelayMs: number;
}) {
  const ui = kindUi[item.kind];
  return (
    <article
      className="fabric-fade-up group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)]/95 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
      style={{ animationDelay: `${animDelayMs}ms` }}
    >
      <div
        className={`absolute inset-y-3 left-0 w-1.5 rounded-full bg-gradient-to-b ${ui.stripe} opacity-90`}
        aria-hidden
      />
      <div className="relative pl-6 pr-5 pb-5 pt-5 sm:pl-7 sm:pr-6 sm:pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--background)] text-lg shadow-inner"
            aria-hidden
          >
            {ui.emoji}
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

const phaseDecor = [
  { num: "1", blob: "from-[var(--accent)]/30 to-transparent" },
  { num: "2", blob: "from-[var(--sage)]/25 to-transparent" },
  { num: "3", blob: "from-violet-500/20 to-transparent" },
];

export default function RoadmapPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const roadmap: RoadmapResult | null = useMemo(
    () => (profile ? buildRoadmap(profile) : null),
    [profile]
  );

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
      showToast("Couldn’t copy—try selecting text manually.");
    }
  }, [profile, roadmap, showToast]);

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
    router.push("/onboarding");
  }, [router]);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        {toast && (
          <div
            role="status"
            className="fabric-fade-up fixed bottom-6 left-1/2 z-[60] max-w-[min(90vw,24rem)] -translate-x-1/2 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-3 text-center text-sm font-medium text-[var(--foreground)] shadow-xl"
          >
            {toast}
          </div>
        )}

        {!profile || !roadmap ? (
          <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-[var(--accent)]/40 bg-[var(--card)]/90 p-12 text-center shadow-lg">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--accent-soft)] blur-3xl dark:opacity-40" />
            <p className="text-5xl" aria-hidden>
              🗺️
            </p>
            <h1 className="font-display mt-6 text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              Your roadmap isn&apos;t here yet
            </h1>
            <p className="mx-auto mt-3 max-w-md text-[var(--muted)] leading-relaxed">
              Tell us about your goals once—we save your answers on{" "}
              <strong className="text-[var(--foreground)]/90">this device</strong> (even if you
              refresh or open a new tab).
            </p>
            <Link
              href="/onboarding"
              className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--accent)]/25 transition hover:brightness-110"
            >
              Start the questionnaire
            </Link>
          </div>
        ) : (
          <>
            <div className="fabric-fade-up flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
                    Hey {profile.nickname} — here&apos;s a path that matches what you shared.
                  </p>
                )}
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:mx-0">
                  {roadmap.tradeoffSummary}
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-wrap justify-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-5 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
                >
                  Copy as text
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
                >
                  Clear & start over
                </button>
              </div>
            </div>

            {roadmap.flags.length > 0 && (
              <div
                className="fabric-fade-up mt-10 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-50 to-orange-50/80 p-5 dark:from-amber-950/40 dark:to-orange-950/20 dark:border-amber-800/50"
                style={{ animationDelay: "60ms" }}
              >
                <p className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
                  <span aria-hidden>👋</span> Quick heads-up
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-amber-950/90 dark:text-amber-100/90">
                  {roadmap.flags.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-amber-600 dark:text-amber-400">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="relative mt-16">
              <div
                className="absolute left-[1.125rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--sage)] to-violet-400 opacity-40 sm:left-8"
                aria-hidden
              />

              <div className="space-y-20 sm:space-y-24">
                {roadmap.phases.map((phase, i) => {
                  const decor = phaseDecor[i] ?? phaseDecor[0];
                  return (
                    <section key={phase.id} className="relative pl-12 sm:pl-20">
                      <div className="absolute left-0 top-0 sm:left-3">
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

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <h2 className="font-display text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
                          {phase.label}
                        </h2>
                        <p className="text-sm font-medium text-[var(--muted)]">{phase.window}</p>
                      </div>

                      <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {phase.opportunities.map((o, oi) => (
                          <OpportunityCard
                            key={o.id}
                            item={o}
                            animDelayMs={80 + i * 140 + oi * 60}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl border border-[var(--line)] bg-[var(--card)]/80 p-6 text-center sm:flex-row sm:text-left">
              <p className="max-w-md text-sm text-[var(--muted)]">
                Life changes—so should this plan. Tweak your answers anytime and we&apos;ll redraw
                the map.
              </p>
              <Link
                href="/onboarding"
                className="shrink-0 rounded-full border-2 border-[var(--foreground)]/15 px-6 py-3 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/50"
              >
                Update my answers
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
}
