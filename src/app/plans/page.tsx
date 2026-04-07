"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import {
  deleteNamedPlan,
  listNamedPlans,
  type NamedPlan,
} from "@/lib/savedPlans";
import { saveProfile } from "@/lib/storage";

export default function PlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<NamedPlan[]>([]);

  const refresh = useCallback(() => {
    setPlans(listNamedPlans());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function loadPlan(plan: NamedPlan) {
    saveProfile(plan.profile);
    router.push("/roadmap");
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
          Saved on this device
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          Saved plans
        </h1>
        <p className="mt-3 text-[var(--muted)] leading-relaxed">
          Snapshots you saved from the roadmap page. Loading one replaces your current active
          profile and opens the roadmap. Up to 8 plans are kept, newest first.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/plans/compare"
            className="inline-flex rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-5 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
          >
            Compare two plans
          </Link>
          <Link
            href="/import"
            className="inline-flex rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--card)] px-5 py-2.5 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45"
          >
            Preview from .md
          </Link>
        </div>

        {plans.length === 0 ? (
          <div className="fabric-panel mt-10 p-10 text-center">
            <p className="text-[var(--muted)]">No saved plans yet.</p>
            <Link
              href="/roadmap"
              className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white"
            >
              Go to roadmap
            </Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className="fabric-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-[var(--foreground)]">
                    {plan.name}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Saved {new Date(plan.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/plans/compare?a=${encodeURIComponent(plan.id)}`}
                    className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]/45 hover:text-[var(--accent)]"
                  >
                    Compare from here
                  </Link>
                  <button
                    type="button"
                    onClick={() => loadPlan(plan)}
                    className="rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-bold text-[var(--background)] dark:bg-[var(--gold)] dark:text-[#1a1508]"
                  >
                    Load & open roadmap
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete “${plan.name}”?`)) {
                        deleteNamedPlan(plan.id);
                        refresh();
                      }
                    }}
                    className="rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 text-center">
          <Link href="/roadmap" className="text-sm font-semibold text-[var(--accent)] underline">
            Back to roadmap
          </Link>
        </div>
      </main>
    </>
  );
}
