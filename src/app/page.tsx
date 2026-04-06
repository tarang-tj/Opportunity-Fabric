import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

function FeatureCard({
  emoji,
  title,
  delayMs = 0,
  children,
}: {
  emoji: string;
  title: string;
  delayMs?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fabric-fade-up group rounded-3xl border border-[var(--line)] bg-[var(--card)]/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold-soft)] text-2xl">
        {emoji}
      </div>
      <h3 className="font-display mt-4 text-lg font-semibold text-[var(--foreground)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="relative flex-1">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:pt-20">
          <div className="fabric-fade-up mb-10 flex flex-wrap justify-center gap-3 sm:justify-start">
            {[
              { k: "3", v: "phases" },
              { k: "∞", v: "ways to tweak" },
              { k: "1", v: "story — yours" },
            ].map((s) => (
              <div
                key={s.v}
                className="flex items-baseline gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)]/90 px-4 py-2 shadow-sm"
              >
                <span className="font-display text-lg font-bold text-[var(--accent)]">{s.k}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="fabric-fade-up" style={{ animationDelay: "80ms" }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Built for busy students
              </p>
              <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.25rem]">
                Your goals,{" "}
                <span className="relative whitespace-nowrap text-[var(--accent)]">
                  one story
                  <span
                    className="absolute -bottom-1 left-0 h-2 w-full rounded-sm bg-[var(--gold-soft)] opacity-80 dark:opacity-40"
                    aria-hidden
                  />
                </span>
                <br />
                —a plan that actually fits.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Stop retyping the same answers across advising, job sites, and random
                spreadsheets. Answer a few questions once, and we&apos;ll sketch a timeline of
                classes, jobs, and experiences—with plain-English reasons behind each idea.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25 transition hover:brightness-110"
                >
                  Build my plan
                </Link>
                <Link
                  href="/roadmap"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[var(--foreground)]/15 bg-[var(--card)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]/40"
                >
                  I already filled it out
                </Link>
              </div>
              <p className="mt-4 text-xs text-[var(--muted)]">
                Tip: we save your answers on this device, so you can come back anytime—even after
                a refresh.
              </p>
            </div>

            <div
              className="fabric-fade-up relative lg:min-h-[420px]"
              style={{ animationDelay: "140ms" }}
            >
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[var(--accent-soft)] blur-2xl dark:opacity-40" />
              <div className="absolute -bottom-8 left-8 h-40 w-40 rounded-full bg-[var(--sage-soft)] blur-3xl dark:opacity-30" />
              <div className="relative rounded-[2rem] border border-[var(--line)] bg-[var(--card)]/95 p-8 shadow-xl backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Sneak peek
                </p>
                <ul className="mt-6 space-y-5">
                  {[
                    { t: "This month", d: "Lock in one “proof” project or role" },
                    { t: "Next term", d: "Go deeper—not wider—on what matters" },
                    { t: "Before you graduate", d: "Compare offers beyond the paycheck" },
                  ].map((row) => (
                    <li key={row.t} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gold-soft)] text-sm font-bold text-[var(--foreground)]">
                        ✓
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {row.t}
                        </p>
                        <p className="text-sm text-[var(--muted)]">{row.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-2xl bg-[var(--sage-soft)] p-4 text-sm text-[var(--sage)] dark:text-[#b8d4cf]">
                  <span className="font-semibold text-[var(--foreground)] dark:text-[var(--foreground)]">
                    Every suggestion says why it&apos;s there,
                  </span>{" "}
                  so you can tweak the plan with a mentor—or trust your own gut.
                </div>
              </div>
            </div>
          </div>

          <section className="fabric-fade-up mt-24 border-t border-[var(--line)] pt-16" style={{ animationDelay: "200ms" }}>
            <h2 className="font-display text-center text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
              Why students use it
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--muted)]">
              No jargon, no black box—just a clearer picture of what to do next.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <FeatureCard emoji="⚖️" title="Real life is messy" delayMs={260}>
                Work, money, visas, and how much time you actually have—we factor that in
                instead of pretending you can do everything.
              </FeatureCard>
              <FeatureCard emoji="💡" title="You’ll see the ‘why’" delayMs={320}>
                Each idea comes with short reasons, so the plan feels debatable and
                adjustable—not like a mysterious algorithm.
              </FeatureCard>
              <FeatureCard emoji="🚀" title="Made to grow with you" delayMs={380}>
                Start simple today; later this can plug into real campus jobs, clubs, and
                employer listings.
              </FeatureCard>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
