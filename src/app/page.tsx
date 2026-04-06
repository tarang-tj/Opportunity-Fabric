import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Opportunity Fabric
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            One intake. Many paths. Explicit tradeoffs.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Students shouldn&apos;t re-enter goals into ten different portals. Fabric is the
            decision layer: it maps classes, experiences, jobs, and campus resources into a
            phased roadmap—and every suggestion carries a &ldquo;because&rdquo; you can
            question, tune, or share with a mentor.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
            >
              Run the intake
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              View roadmap (after intake)
            </Link>
          </div>

          <dl className="mt-20 grid gap-8 border-t border-zinc-200 pt-12 sm:grid-cols-3 dark:border-zinc-800">
            <div>
              <dt className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Multi-objective by design
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Income, bandwidth, visa risk, and learning goals compete. The fabric surfaces
                tradeoffs instead of hiding them behind a checklist.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Explainable, not oracular
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Each opportunity includes rationale lines so advisors, friends, and future you
                can argue with the plan.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Platform-shaped wedge
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Start with a student-owned profile and roadmap. Expand into curated feeds from
                campus and employers when partnerships unlock real data.
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </>
  );
}
