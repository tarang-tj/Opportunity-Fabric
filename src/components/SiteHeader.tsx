"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

function Spark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="none"
      className="text-[var(--accent)]"
      aria-hidden
    >
      <path
        d="M16 2L18.5 11.5L28 14L18.5 16.5L16 26L13.5 16.5L4 14L13.5 11.5L16 2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M24 22L25 25L28 26L25 27L24 30L23 27L20 26L23 25L24 22Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

const nav = [
  { href: "/onboarding", label: "Your profile" },
  { href: "/plans", label: "Saved plans" },
  { href: "/plans/compare", label: "Compare" },
  { href: "/mentor", label: "Mentor view" },
  { href: "/import", label: "Import .md" },
  { href: "/roadmap", label: "My roadmap", primary: true as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className="print:hidden sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--card)]/85 backdrop-blur-xl">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-xl bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)] opacity-0 shadow-lg transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-[var(--foreground)]"
        >
          <Spark />
          <span>
            Opportunity{" "}
            <span className="text-[var(--accent)] transition-colors group-hover:text-[var(--sage)]">
              Fabric
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 sm:flex">
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
            {nav.map((item) =>
              item.primary ? (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-90 ${
                    pathname === item.href
                      ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/25"
                      : "bg-[var(--foreground)] text-[var(--background)] dark:bg-[var(--gold)] dark:text-[#1a1508]"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    pathname === item.href
                      ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:bg-[var(--accent-soft)]/80 hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--card)] text-[var(--foreground)] sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {menuOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-16 z-40 border-t border-[var(--line)] bg-[var(--card)]/98 px-4 py-6 backdrop-blur-xl sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile main">
            <Link
              href="/"
              className="rounded-2xl px-4 py-3 text-base font-medium text-[var(--foreground)] hover:bg-[var(--accent-soft)]/60"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-base font-semibold ${
                  item.primary
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--accent-soft)]/60"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-[var(--line)] pt-4">
              <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                Theme
              </p>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
