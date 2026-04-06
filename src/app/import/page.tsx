"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ImportedRoadmapBody } from "@/components/ImportedRoadmapBody";
import { SiteHeader } from "@/components/SiteHeader";
import {
  parseFabricMarkdown,
  type ImportedRoadmapPreview,
} from "@/lib/importMarkdown";

const inputClass =
  "w-full rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

export default function ImportPage() {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState<ImportedRoadmapPreview | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runParse = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setError("Add some Markdown first, or choose a .md file.");
      setPreview(null);
      return;
    }
    const parsed = parseFabricMarkdown(trimmed);
    if (!parsed) {
      setError(
        "Could not read that file. Use an .md you exported from Opportunity Fabric (Download .md on the roadmap page)."
      );
      setPreview(null);
      return;
    }
    setError(null);
    setPreview(parsed);
  }, []);

  const onFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const s = typeof reader.result === "string" ? reader.result : "";
        setText(s);
        runParse(s);
      };
      reader.readAsText(file, "utf-8");
      e.target.value = "";
    },
    [runParse]
  );

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="mx-auto max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14"
      >
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
          Read-only
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          Preview from Markdown
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)] leading-relaxed">
          Paste or upload a roadmap you exported with{" "}
          <strong className="font-medium text-[var(--foreground)]/90">Download .md</strong>. This
          does not change your saved profile or plans. It only shows a preview in your browser.
        </p>

        <div className="fabric-panel mt-10 space-y-4 p-6 print:hidden">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[var(--foreground)]">
              Markdown
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              className={`${inputClass} min-h-[12rem] resize-y font-mono text-xs leading-relaxed sm:text-sm`}
              placeholder="# Opportunity Fabric roadmap&#10;> …"
              spellCheck={false}
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => runParse(text)}
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
            >
              Show preview
            </button>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-full border-2 border-[var(--foreground)]/12 bg-[var(--background)] px-6 py-3 text-sm font-bold text-[var(--foreground)] transition hover:border-[var(--accent)]/45">
              <span>Choose .md file</span>
              <input
                type="file"
                accept=".md,text/markdown,.markdown"
                className="sr-only"
                onChange={onFile}
              />
            </label>
            <Link
              href="/roadmap"
              className="text-center text-sm font-semibold text-[var(--accent)] underline sm:ml-2"
            >
              Back to roadmap
            </Link>
          </div>
          {error && (
            <p className="text-sm text-[var(--accent)]" role="alert">
              {error}
            </p>
          )}
        </div>

        {preview && (
          <div className="mt-14 border-t border-[var(--line)] pt-14">
            <ImportedRoadmapBody data={preview} />
          </div>
        )}
      </main>
    </>
  );
}
