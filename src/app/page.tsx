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
  children: React.ReactNode;
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
                Private · No login · Saves on your device
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
                  className="inline-flex w-full min-w-[200px] items-center justify-center rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)]/90 px-8 py-4 text-sm font-bold text-[var(--foreground)] b