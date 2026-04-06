"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { buildRoadmap } from "@/lib/engine";
import { loadProfile } from "@/lib/storage";
import type { FabricOpportunity, RoadmapResult, StudentProfile } from "@/lib/types";

const kindLabel: Record<FabricOpportunity["kind"], string> = {
  course_strategy: "Courses & sequencing",
  experience: "Experience",
  campus_resource: "Campus resources",
  job_search: "Jobs & pipeline",
  networking: "Network",
  portfolio: "Portfolio",
};

function OpportunityCard({ item }: { item: FabricOpportunity }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
        {kindLabel[item.kind]}
      </p>
      <h3 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {item.summary}
      </p>
      <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
          Because
        </p>
        <ul className="mt-1 list-inside list-disc text-sm text-zinc-700 dark:text-zinc-300">
          {item.because.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
        Effort: {item.effort}
      </p>
    </article>
  );
}

export default function RoadmapPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const roadmap: RoadmapResult | null = useMemo(
    () => (profile ? buildRoadmap(profile) : null),
    [profile]
  );

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl flex-1 px-4 py-10 sm:px-6">
        {!profile || !roadmap ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-10 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              No fabric yet
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Run the intake once—we store it for this browser session.
            </p>
            <Link
              href="/onboarding"
              className="mt-6 inline-flex rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
            >
              Start intake
            </Link>
          </div>
        ) : (
          <>
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Your roadmap
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {roadmap.headline}
              </h1>
              {profile.nickname && (
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                  Woven for {profile.nickname}.
                </p>
              )}
              <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
                {roadmap.tradeoffSummary}
              </p>
            </div>

            {roadmap.flags.length > 0 && (
              <ul className="mt-8 max-w-3xl list-inside list-disc rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
                {roadmap.flags.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}

            <div className="mt-12 space-y-16">
              {roadmap.phases.map((phase) => (
                <section key={phase.id}>
                  <div className="flex flex-col gap-1 border-b border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      {phase.label}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                      {phase.window}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {phase.opportunities.map((o) => (
                      <OpportunityCard key={o.id} item={o} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <Link
                href="/onboarding"
                className="text-sm font-medium text-amber-700 underline-offset-4 hover:underline dark:text-amber-400"
              >
                Adjust intake
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                Demo engine: rule-based. Next step is real institutional + employer
                graph data.
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
}
