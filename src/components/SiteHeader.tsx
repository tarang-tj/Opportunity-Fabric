import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Opportunity Fabric
        </Link>
        <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/onboarding" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Intake
          </Link>
          <Link href="/roadmap" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Roadmap
          </Link>
        </nav>
      </div>
    </header>
  );
}
