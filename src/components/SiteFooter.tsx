import Link from "next/link";

const footerLinkClass =
  "text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline";

export function SiteFooter() {
  return (
    <footer className="print:hidden mt-auto border-t border-[var(--line)] bg-[var(--card)]/60 py-12 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-md">
          <p className="font-display text-base font-semibold text-[var(--foreground)]">
            Opportunity Fabric
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Your answers stay on{" "}
            <strong className="font-medium text-[var(--foreground)]/90">this device</strong> until
            you clear them. No account required for this demo.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
          <Link
            href="/onboarding"
            className="text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Your profile
          </Link>
          <Link href="/roadmap" className={footerLinkClass}>
            My roadmap
          </Link>
          <Link href="/mentor" className={footerLinkClass}>
            Mentor summary
          </Link>
          <a
            href="https://github.com/tarang-tj/Opportunity-Fabric"
            className={footerLinkClass}
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
