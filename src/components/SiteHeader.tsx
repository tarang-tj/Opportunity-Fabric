import Link from "next/link";

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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--card)]/75 backdrop-blur-xl">
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
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/onboarding"
            className="rounded-full px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
          >
            Your profile
          </Link>
          <Link
            href="/roadmap"
            className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)] transition hover:opacity-90 dark:bg-[var(--gold)] dark:text-[#1a1508]"
          >
            My roadmap
          </Link>
        </nav>
      </div>
    </header>
  );
}
