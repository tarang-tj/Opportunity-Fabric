import type { ReactNode } from "react";
import Link from "next/link";
import {
  IconLightbulb,
  IconMap,
  IconOrbit,
  IconScale,
} from "@/components/FabricIcons";
import { SiteHeader } from "@/components/SiteHeader";

function BentoFeature({
  icon,
  title,
  children,
  className = "",
  delayMs = 0,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  return (
    <div
      className={`fabric-fade-up fabric-panel group relative overflow-hidden p-7 transition hover:shadow-[var(--elev-2)] ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="mb-5 inline-flex rounded-2xl bg-[var(--accent-soft)]/80 p-3 text-[var(--accent)] ring-1 ring-[var(--accent)]/15 dark:bg-[var(--accent-soft)]/40">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="relative flex-1">
        <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 pb-24 pt-10 sm:px-6 lg:min-h-[calc(100vh-4.25rem)] lg:pt-14">
          <div className="fabric-hero-ring -left-32 -top-32 h-[28rem] w-[28rem] opacity-40 sm:left-[5%]" />
          <div className="fabric-hero-ring right-[-20%] top-1/3 h-[22rem] w-[22rem] opacity-30" />
          <div className="fabric-hero-ring bottom-[-10%] left-1/3 h-[18rem] w-[18rem] opacity-25" />

          <div className="relative mx-auto max-w-6xl">
            <div className="fabric-fade-up mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)]/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                Private · No login · Light or dark · Saves on your device
              </p>
              <h1 className="font-display mt-8 text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Turn scattered goals into{" "}
                <span className="relative inline-block text-[var(--accent)]">
                  one clear path
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[0.35em] rounded-sm bg-[var(--gold-soft)]/90 dark:opacity-50"
                    aria-hidden
                  />
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
                Answer once. Get a phased plan across classes, jobs, and campus moves, each with
                short reasons you can share with a mentor or edit on your own.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex w-full min-w-[200px] items-center justify-center rounded-full bg-[var(--accent)] px-9 py-4 text-sm font-bold text-white shadow-[var(--elev-2)] transition hover:brightness-110 sm:w-auto"
                >
                  Build my plan
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex w-full min-w-[200px] items-center justify-center rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)]/90 px-8 py-4 text-sm font-bold text-[var(--foreground)] backdrop-blur-sm transition hover:border-[var(--accent)]/35 sm:w-auto"
                >
                  Open my roadmap
                </Link>
              </div>
              <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-[var(--muted)]">
                Your roadmap stays on this browser after you leave. Refresh safe. Use{" "}
                <strong className="font-medium text-[var(--foreground)]/85">Clear</strong> on the
                roadmap page if you want a fresh start.
              </p>
              <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-[var(--muted)]">
                Meeting with a mentor? Open the{" "}
                <Link
                  href="/mentor"
                  className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  mentor summary
                </Link>{" "}
                for a print-friendly snapshot with every &ldquo;why&rdquo; spelled out.
              </p>
            </div>

            <div
              className="fabric-fade-up relative mx-auto mt-20 max-w-4xl"
              style={{ animationDelay: "100ms" }}
            >
              <div className="fabric-panel relative p-8 sm:p-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                    How it flows
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-[var(--muted)]">
                    <span className="rounded-full bg-[var(--background)] px-3 py-1 ring-1 ring-[var(--line)]">
                      3 phases
                    </span>
                    <span className="rounded-full bg-[var(--background)] px-3 py-1 ring-1 ring-[var(--line)]">
                      Plain-language “why”
                    </span>
                    <span className="rounded-full bg-[var(--background)] px-3 py-1 ring-1 ring-[var(--line)]">
                      Share link & snapshots
                    </span>
                    <span className="rounded-full bg-[var(--background)] px-3 py-1 ring-1 ring-[var(--line)]">
                      Calendar, .md, print
                    </span>
                  </div>
                </div>
                <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                  {[
                    {
                      n: "01",
                      t: "Tell your story",
                      d: "Goals, time, money, visa context. Takes a few minutes.",
                    },
                    {
                      n: "02",
                      t: "See the map",
                      d: "Start here, build momentum, finish strong. Each card explains itself.",
                    },
                    {
                      n: "03",
                      t: "Act your way",
                      d: "Track done and in progress, save named snapshots, share a read-only link, or export to calendar and Markdown when you need it elsewhere.",
                    },
                  ].map((row) => (
                    <li key={row.n} className="relative pl-12">
                      <span className="font-display absolute left-0 top-0 text-2xl font-bold text-[var(--accent)]/90">
                        {row.n}
                      </span>
                      <p className="font-semibold text-[var(--foreground)]">{row.t}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{row.d}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line)] bg-[var(--card)]/25 px-4 py-6 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            <span>Built for real schedules</span>
            <span className="hidden text-[var(--line)] sm:inline">|</span>
            <span>Explainable suggestions</span>
            <span className="hidden text-[var(--line)] sm:inline">|</span>
            <span>Designed to plug into campus data later</span>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="fabric-fade-up mx-auto max-w-2xl text-center" style={{ animationDelay: "40ms" }}>
            <h2 className="font-display text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
              Why it feels different
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              No jargon, no black box. Just a calmer way to see what to do next.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <BentoFeature
              icon={<IconScale className="size-6" />}
              title="Tradeoffs out in the open"
              delayMs={120}
            >
              Work, money, visas, and how much time you actually have: we bake that into the plan
              instead of pretending you can join ten clubs and sleep.
            </BentoFeature>
            <BentoFeature
              icon={<IconLightbulb className="size-6" />}
              title="Every idea says why"
              delayMs={180}
            >
              Short reasons under each suggestion so the roadmap feels debatable and adjustable,
              not like a mystery algorithm.
            </BentoFeature>
            <BentoFeature
              icon={<IconOrbit className="size-6" />}
              title="Room to grow"
              delayMs={240}
            >
              Start lean today. Later this can connect to real job feeds, clubs, and advising
              tools when schools and partners plug in.
            </BentoFeature>
          </div>

          <div
            className="fabric-fade-up fabric-panel relative mx-auto mt-16 max-w-4xl overflow-hidden p-10 sm:p-12"
            style={{ animationDelay: "280ms" }}
          >
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--accent-soft)]/50 blur-3xl dark:opacity-40" />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--sage-soft)] text-[var(--sage)]">
                <IconMap className="size-9" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl">
                  Ready when you are
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  The questionnaire is friendly and specific. On the other side you get a visual
                  timeline you can print, export, share as a link, or revisit from saved plans on
                  this device.
                </p>
                <Link
                  href="/onboarding"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  Start the questionnaire <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
