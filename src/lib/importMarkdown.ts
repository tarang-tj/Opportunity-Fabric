/**
 * Parses Markdown produced by roadmapToMarkdown (Opportunity Fabric export).
 * Read-only preview: does not restore a full StudentProfile.
 */

export type ImportedPreviewItem = {
  title: string;
  summary: string;
  because: string[];
  status?: "done" | "working";
};

export type ImportedPreviewPhase = {
  label: string;
  window: string;
  items: ImportedPreviewItem[];
};

export type ImportedRoadmapPreview = {
  headline: string;
  nickname?: string;
  tradeoff: string;
  flags: string[];
  phases: ImportedPreviewPhase[];
};

function unescapeFabricInline(s: string): string {
  return s.replace(/\\\|/g, "|").replace(/\\\\/g, "\\");
}

function skipEmpty(lines: string[], i: { v: number }): void {
  while (i.v < lines.length && lines[i.v].trim() === "") i.v += 1;
}

export function parseFabricMarkdown(raw: string): ImportedRoadmapPreview | null {
  const beforeRule = raw.split(/\r?\n---\r?\n/)[0] ?? raw;
  const lines = beforeRule.split(/\r?\n/).map((l) => l.trimEnd());
  const i = { v: 0 };

  if (!lines[i.v]?.startsWith("# ")) return null;
  const docTitle = lines[i.v].slice(2).trim();
  if (
    !docTitle.includes("Opportunity Fabric") &&
    !docTitle.toLowerCase().includes("roadmap")
  ) {
    return null;
  }
  i.v += 1;
  skipEmpty(lines, i);

  let headline = "";
  if (lines[i.v]?.startsWith("> ")) {
    headline = unescapeFabricInline(lines[i.v].slice(2).trim());
    i.v += 1;
  }
  skipEmpty(lines, i);

  let nickname: string | undefined;
  const forLine = lines[i.v];
  if (forLine?.startsWith("**For:**")) {
    nickname = unescapeFabricInline(
      forLine.replace(/^\*\*For:\*\*\s*/i, "").trim()
    );
    i.v += 1;
    skipEmpty(lines, i);
  }

  const tradeoffLines: string[] = [];
  while (i.v < lines.length && !lines[i.v].startsWith("## ")) {
    const t = lines[i.v].trim();
    if (t) tradeoffLines.push(t);
    i.v += 1;
  }
  const tradeoff = tradeoffLines.join("\n").trim();

  const flags: string[] = [];
  if (lines[i.v]?.trim() === "## Heads-up") {
    i.v += 1;
    skipEmpty(lines, i);
    while (i.v < lines.length && lines[i.v].startsWith("- ")) {
      flags.push(unescapeFabricInline(lines[i.v].slice(2).trim()));
      i.v += 1;
    }
    skipEmpty(lines, i);
  }

  const phases: ImportedPreviewPhase[] = [];

  while (i.v < lines.length && lines[i.v].startsWith("## ")) {
    const label = unescapeFabricInline(lines[i.v].slice(3).trim());
    i.v += 1;
    skipEmpty(lines, i);

    let window = "";
    const winLine = lines[i.v];
    if (winLine?.startsWith("*") && winLine.endsWith("*") && winLine.length >= 2) {
      window = unescapeFabricInline(winLine.slice(1, -1).trim());
      i.v += 1;
    }
    skipEmpty(lines, i);

    const items: ImportedPreviewItem[] = [];

    while (i.v < lines.length && lines[i.v].startsWith("### ")) {
      const headingRaw = lines[i.v].slice(4).trim();
      i.v += 1;

      const tagMatch = headingRaw.match(
        /^\*\*\[(Done|In progress)\]\*\*\s+(.+)$/i
      );
      let status: ImportedPreviewItem["status"];
      let titleRest = headingRaw;
      if (tagMatch) {
        status =
          tagMatch[1].toLowerCase() === "done" ? "done" : "working";
        titleRest = tagMatch[2].trim();
      }
      const title = unescapeFabricInline(titleRest);
      skipEmpty(lines, i);

      const summaryLines: string[] = [];
      while (
        i.v < lines.length &&
        !lines[i.v].includes("**Why this fits**") &&
        !lines[i.v].startsWith("### ") &&
        !lines[i.v].startsWith("## ")
      ) {
        const s = lines[i.v].trim();
        if (s) summaryLines.push(s);
        i.v += 1;
      }
      const summary = summaryLines.join("\n").trim();

      const because: string[] = [];
      if (lines[i.v]?.includes("**Why this fits**")) {
        i.v += 1;
        while (i.v < lines.length && lines[i.v].startsWith("- ")) {
          because.push(unescapeFabricInline(lines[i.v].slice(2).trim()));
          i.v += 1;
        }
      }
      skipEmpty(lines, i);

      items.push({ title, summary, because, status });
    }

    phases.push({ label, window, items });
  }

  if (!headline && !tradeoff && phases.length === 0) return null;

  return { headline, nickname, tradeoff, flags, phases };
}
