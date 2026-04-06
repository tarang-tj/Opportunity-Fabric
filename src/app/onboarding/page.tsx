"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { saveProfile } from "@/lib/storage";
import type {
  IncomePriority,
  PrimaryGoal,
  StudentProfile,
  WeeklyHours,
} from "@/lib/types";

const GOALS: { value: PrimaryGoal; label: string; hint: string }[] = [
  { value: "software_engineering", label: "Software & coding", hint: "Apps, systems, tech" },
  { value: "data_analytics", label: "Data & analytics", hint: "Numbers, dashboards, research" },
  { value: "product_management", label: "Product & strategy", hint: "Features, users, roadmaps" },
  { value: "consulting", label: "Consulting", hint: "Case prep, client-style work" },
  { value: "healthcare", label: "Healthcare", hint: "Pre-med, public health, biotech" },
  { value: "research_grad_school", label: "Research / grad school", hint: "Labs, papers, PhD track" },
  { value: "creative_design", label: "Design & creative", hint: "UX, visual, content" },
  { value: "exploring", label: "I’m still figuring it out", hint: "Totally OK" },
];

const inputClass =
  "w-full rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

export default function OnboardingPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>("exploring");
  const [focusNotes, setFocusNotes] = useState("");
  const [gradYear, setGradYear] = useState(2027);
  const [quarter, setQuarter] = useState<StudentProfile["quarter"]>("spring");
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>("10_20");
  const [needIncome, setNeedIncome] = useState(false);
  const [incomePriority, setIncomePriority] = useState<IncomePriority>("medium");
  const [remoteOk, setRemoteOk] = useState(true);
  const [visaSensitive, setVisaSensitive] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const profile: StudentProfile = {
      nickname: nickname.trim() || undefined,
      primaryGoal,
      focusNotes: focusNotes.trim(),
      gradYear,
      quarter,
      weeklyHours,
      needIncome,
      incomePriority: needIncome ? incomePriority : "low",
      remoteOk,
      visaSensitive,
    };
    saveProfile(profile);
    router.push("/roadmap");
  }

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="relative mx-auto max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14 xl:grid xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,360px)] xl:items-start xl:gap-14"
      >
        <div className="fabric-panel relative z-[1] mx-auto w-full max-w-2xl p-8 shadow-[var(--elev-1)] sm:p-10 xl:mx-0 xl:max-w-none">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            Your profile
          </p>
          <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Let&apos;s sketch your next chapter
          </h1>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            No wrong answers. We use this to shape a visual roadmap: classes, jobs, clubs, and
            other moves, each with short explanations for every idea.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-10">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                What should we call you?{" "}
                <span className="font-normal text-[var(--muted)]">(optional)</span>
              </span>
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={inputClass}
                placeholder="First name or nickname"
                autoComplete="nickname"
              />
            </label>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-[var(--foreground)]">
                What direction feels closest right now?
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {GOALS.map((g) => (
                  <label
                    key={g.value}
                    className={`relative cursor-pointer rounded-2xl border-2 p-4 transition ${
                      primaryGoal === g.value
                        ? "border-[var(--accent)] bg-[var(--accent-soft)]/50 shadow-sm dark:bg-[var(--accent-soft)]/25"
                        : "border-[var(--line)] bg-[var(--background)]/50 hover:border-[var(--accent)]/35"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="goal"
                        value={g.value}
                        checked={primaryGoal === g.value}
                        onChange={() => setPrimaryGoal(g.value)}
                        className="mt-1 size-4 accent-[var(--accent)]"
                      />
                      <div>
                        <span className="font-medium text-[var(--foreground)]">{g.label}</span>
                        <p className="mt-0.5 text-xs text-[var(--muted)]">{g.hint}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                Anything else we should know?
              </span>
              <span className="block text-xs text-[var(--muted)]">
                Interests, identity, constraints: whatever helps paint the picture.
              </span>
              <textarea
                value={focusNotes}
                onChange={(e) => setFocusNotes(e.target.value)}
                rows={3}
                className={`${inputClass} resize-y min-h-[5.5rem]`}
                placeholder="e.g. first-gen, care about climate, prefer small teams, commuting…"
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  When do you hope to graduate?
                </span>
                <input
                  type="number"
                  min={2025}
                  max={2040}
                  value={gradYear}
                  onChange={(e) => setGradYear(Number(e.target.value))}
                  className={inputClass}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  What term is it for you?
                </span>
                <select
                  value={quarter}
                  onChange={(e) =>
                    setQuarter(e.target.value as StudentProfile["quarter"])
                  }
                  className={inputClass}
                >
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                </select>
              </label>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-[var(--foreground)]">
                Outside of class, how much time do you realistically have?
              </legend>
              <select
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value as WeeklyHours)}
                className={inputClass}
              >
                <option value="under_10">Less than 10 hours a week</option>
                <option value="10_20">About 10–20 hours a week</option>
                <option value="20_plus">More than 20 hours a week</option>
              </select>
            </fieldset>

            <div className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--background)]/60 p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={needIncome}
                  onChange={(e) => setNeedIncome(e.target.checked)}
                  className="mt-1 size-4 accent-[var(--accent)]"
                />
                <span className="text-sm font-medium text-[var(--foreground)] leading-snug">
                  I need to earn money while I&apos;m in school
                </span>
              </label>
              {needIncome && (
                <label className="block space-y-2 border-t border-[var(--line)] pt-4">
                  <span className="text-sm text-[var(--muted)]">
                    How much does paid work need to drive your choices?
                  </span>
                  <select
                    value={incomePriority}
                    onChange={(e) =>
                      setIncomePriority(e.target.value as IncomePriority)
                    }
                    className={inputClass}
                  >
                    <option value="low">
                      Lower: I can take unpaid roles if they really help my résumé
                    </option>
                    <option value="medium">Balanced</option>
                    <option value="high">High: my job schedule comes first</option>
                  </select>
                </label>
              )}
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 sm:flex-row sm:flex-wrap">
              <label className="flex flex-1 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={remoteOk}
                  onChange={(e) => setRemoteOk(e.target.checked)}
                  className="size-4 accent-[var(--accent)]"
                />
                <span className="text-sm text-[var(--foreground)]">
                  I&apos;m open to remote chats, events, or work
                </span>
              </label>
              <label className="flex flex-1 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={visaSensitive}
                  onChange={(e) => setVisaSensitive(e.target.checked)}
                  className="size-4 accent-[var(--accent)]"
                />
                <span className="text-sm text-[var(--foreground)]">
                  My visa or work permission needs extra care
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--accent)] py-4 text-sm font-bold text-white shadow-lg shadow-[var(--accent)]/30 transition hover:brightness-110 sm:w-auto sm:px-12"
            >
              Show me my roadmap →
            </button>
            <p className="text-center text-xs text-[var(--muted)] sm:text-left">
              We save your answers on <strong className="text-[var(--foreground)]/90">this device</strong>{" "}
              so your roadmap survives refresh and new tabs.
            </p>
          </form>
        </div>

        <aside className="relative mt-12 hidden xl:mt-0 xl:block">
          <div className="fabric-hero-ring -right-8 top-0 h-64 w-64 opacity-35" />
          <div className="fabric-panel sticky top-28 space-y-5 p-7 shadow-[var(--elev-1)]">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
              What you get next
            </p>
            <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">
              A roadmap you can actually use
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--muted)]">
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent)]">1.</span>
                Phased moves from &ldquo;start here&rdquo; through &ldquo;finish strong.&rdquo;
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent)]">2.</span>
                Plain-language reasons on every card.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent)]">3.</span>
                Copy, print, or reset anytime. Data stays on this device.
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}
