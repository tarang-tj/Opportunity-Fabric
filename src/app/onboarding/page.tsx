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

const GOALS: { value: PrimaryGoal; label: string }[] = [
  { value: "software_engineering", label: "Software engineering" },
  { value: "data_analytics", label: "Data analytics" },
  { value: "product_management", label: "Product management" },
  { value: "consulting", label: "Consulting" },
  { value: "healthcare", label: "Healthcare / pre-clinical" },
  { value: "research_grad_school", label: "Research / grad school" },
  { value: "creative_design", label: "Creative & design" },
  { value: "exploring", label: "Still exploring" },
];

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
      <main className="mx-auto max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Single intake
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Map goals and constraints once
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Fabric turns this into a phased roadmap with explicit &ldquo;because&rdquo; lines—so
          it is explainable, not mystical.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-10 border-t border-zinc-200 pt-10 dark:border-zinc-800"
        >
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              What should we call you? (optional)
            </span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-amber-500/0 transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="TJ"
              autoComplete="nickname"
            />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Primary direction
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {GOALS.map((g) => (
                <label
                  key={g.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                    primaryGoal === g.value
                      ? "border-amber-500 bg-amber-50 dark:border-amber-500/80 dark:bg-amber-950/40"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={g.value}
                    checked={primaryGoal === g.value}
                    onChange={() => setPrimaryGoal(g.value)}
                    className="accent-amber-600"
                  />
                  {g.label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Focus notes
            </span>
            <textarea
              value={focusNotes}
              onChange={(e) => setFocusNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-amber-500/0 transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="e.g. interested in climate data, first-gen, prefers small teams"
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Target graduation year
              </span>
              <input
                type="number"
                min={2025}
                max={2040}
                value={gradYear}
                onChange={(e) => setGradYear(Number(e.target.value))}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Current quarter (rough)
              </span>
              <select
                value={quarter}
                onChange={(e) =>
                  setQuarter(e.target.value as StudentProfile["quarter"])
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              >
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
              </select>
            </label>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Weekly bandwidth outside class
            </legend>
            <select
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value as WeeklyHours)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              <option value="under_10">Under 10 hours</option>
              <option value="10_20">10–20 hours</option>
              <option value="20_plus">20+ hours</option>
            </select>
          </fieldset>

          <div className="space-y-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={needIncome}
                onChange={(e) => setNeedIncome(e.target.checked)}
                className="size-4 accent-amber-600"
              />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                I need income from work while in school
              </span>
            </label>
            {needIncome && (
              <label className="block space-y-2 pl-7">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  How urgent is income vs exploration?
                </span>
                <select
                  value={incomePriority}
                  onChange={(e) =>
                    setIncomePriority(e.target.value as IncomePriority)
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                >
                  <option value="low">Lower — I can take unpaid if it builds signal</option>
                  <option value="medium">Balanced</option>
                  <option value="high">High — paid work shapes my schedule</option>
                </select>
              </label>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={remoteOk}
                onChange={(e) => setRemoteOk(e.target.checked)}
                className="size-4 accent-amber-600"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                Remote networking / work is OK
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={visaSensitive}
                onChange={(e) => setVisaSensitive(e.target.checked)}
                className="size-4 accent-amber-600"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                Visa / work authorization is a constraint
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400 sm:w-auto sm:px-8"
          >
            Weave my roadmap
          </button>
        </form>
      </main>
    </>
  );
}
