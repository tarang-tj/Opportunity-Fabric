import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--card)]/50 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-sm font-semibold text-[var(--foreground)]">
            Opportunity Fabric
          </p>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--muted)]">
            Your answers stay on <strong className="text-[var(--foreground)]/80">this device</strong>{" "}
            until you clear them—no account required for this demo.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/onboarding"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Edit your profile
          </Link>
          <a
            href="https://github.com/tarang-tj/Opportunity-Fabric"
            className="font-medium text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
