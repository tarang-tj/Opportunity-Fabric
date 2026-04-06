"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IconMap } from "@/components/FabricIcons";
import { OpportunityRoadmapCard } from "@/components/OpportunityRoadmapCard";
import { SiteHeader } from "@/components/SiteHeader";
import { buildRoadmap } from "@/lib/engine";
import { decodeProfileFromShare } from "@/lib/shareCodec";

const phaseDecor = [
  { num: "1", blob: "from-[var(--accent)]/30 to-transparent" },
  { num: "2", blob: "from-[var(--sage)]/25 to-transparent" },
  { num: "3", blob: "from-violet-500/20 to-transparent" },
];

export function SharedRoadmapClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t") ?? "";

  const profile = useMemo(() => decodeProfileFromShare(token), [token]);
  const roadmap = useMemo(
    () => (profile ? buildRoadmap(profile) : null),
    [profile]
  );

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <div className="fabric-panel mb-8 border-[var(--accent)]/30 bg-[var(--accent-soft)]/40 p-4 text-center text-sm text-[var(--foreground)] dark:bg-[var(--accent-soft)]/15">
          <strong>Read-only view.</strong> This link encodes a snapshot of someone&apos;s answers.
          It does not update if they change their profile.{" "}
          <Link href="/onboarding" className="font-semibold text-[var(--accent)] underline">
            Build your own
          </Link>
        </div>

        {!profile || !roadmap ? (
          <div className="rounded-[2rem] border border-dashed border-[var(--line)] bg-[var(--card)]/95 p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)]/60 text-[var(--accent)]">
              <IconMap className="size-8" />
            </div>
            <h1 className="font-display mt-6 text-xl font-semibold text-[var(--foreground)]">
              Link invalid or expired
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
              Ask for a fresh share link, or start your own roadmap.
            </p>
            <Link
              href="/onboarding"
              className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white"
            >
              Get started
            </Link>
          </div>
        ) : (
          <>
            <header className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                Shared roadmap
              </p>
              <h1 className="font-display mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
                {roadmap.headline}
              </h1>
              {profile.nickname && (
                <p className="mt-2 text-[var(--muted)]">Prepared for {profile.nickname}</p>
              )}
              <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)] sm:mx-0">
                {roadmap.tradeoffSummary}
              </p>
            </header>

            <div className="relative mt-14">
              <div
                className="absolute left-[1.125rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--sage)] to-violet-400 opacity-40 sm:left-8"
                aria-hidden
              />
              <div className="space-y-16 sm:space-y-20">
                {roadmap.phases.map((phase, i) => {
                  const decor = phaseDecor[i] ?? phaseDecor[0];
                  return (
                    <section key={phase.id} className="relative pl-12 sm:pl-20">
                      <div className="absolute left-0 top-0 sm:left-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--card)] text-sm font-bold shadow-lg ring-2 ring-[var(--accent)]/30 sm:h-12 sm:w-12">
                          <span
                            className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${decor.blob} blur-md opacity-80`}
                            aria-hidden
                          />
                          {decor.num}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
                          {phase.label}
                        </h2>
                        <p className="text-sm text-[var(--muted)]">{phase.window}</p>
                      </div>
                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        {phase.opportunities.map((o, oi) => (
                          <OpportunityRoadmapCard
                            key={o.id}
                            item={o}
                            readOnly
                            animDelayMs={40 + i * 80 + oi * 40}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
