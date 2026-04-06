import type { RoadmapResult, StudentProfile } from "./types";

export function roadmapToPlainText(
  profile: StudentProfile,
  roadmap: RoadmapResult
): string {
  const lines: string[] = [];
  lines.push("Opportunity Fabric: my roadmap");
  lines.push("=".repeat(42));
  lines.push(roadmap.headline);
  if (profile.nickname) lines.push(`For: ${profile.nickname}`);
  lines.push("");
  lines.push(roadmap.tradeoffSummary);
  lines.push("");

  if (roadmap.flags.length > 0) {
    lines.push("Heads-up:");
    roadmap.flags.forEach((f) => lines.push(`• ${f}`));
    lines.push("");
  }

  roadmap.phases.forEach((phase) => {
    lines.push(`${phase.label}  |  ${phase.window}`);
    lines.push("");
    phase.opportunities.forEach((o) => {
      lines.push(`• ${o.title}`);
      lines.push(`  ${o.summary}`);
      lines.push("  Why this fits:");
      o.because.forEach((b) => lines.push(`    – ${b}`));
      lines.push("");
    });
  });

  lines.push("Generated at opportunity-fabric.vercel.app");
  return lines.join("\n").trim();
}

export type RoadmapMarkdownProgress = {
  doneIds: string[];
  workingIds: string[];
};

function mdEscapeInline(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
}

function statusTag(
  id: string,
  progress?: RoadmapMarkdownProgress
): string {
  if (!progress) return "";
  if (progress.doneIds.includes(id)) return "**[Done]** ";
  if (progress.workingIds.includes(id)) return "**[In progress]** ";
  return "";
}

export function roadmapToMarkdown(
  profile: StudentProfile,
  roadmap: RoadmapResult,
  progress?: RoadmapMarkdownProgress
): string {
  const lines: string[] = [];
  lines.push("# Opportunity Fabric roadmap");
  lines.push("");
  lines.push(`> ${mdEscapeInline(roadmap.headline)}`);
  lines.push("");
  if (profile.nickname) {
    lines.push(`**For:** ${mdEscapeInline(profile.nickname)}`);
    lines.push("");
  }
  lines.push(roadmap.tradeoffSummary);
  lines.push("");

  if (roadmap.flags.length > 0) {
    lines.push("## Heads-up");
    lines.push("");
    roadmap.flags.forEach((f) => {
      lines.push(`- ${mdEscapeInline(f)}`);
    });
    lines.push("");
  }

  roadmap.phases.forEach((phase) => {
    lines.push(`## ${mdEscapeInline(phase.label)}`);
    lines.push("");
    lines.push(`*${mdEscapeInline(phase.window)}*`);
    lines.push("");
    phase.opportunities.forEach((o) => {
      lines.push(
        `### ${statusTag(o.id, progress)}${mdEscapeInline(o.title)}`
      );
      lines.push("");
      lines.push(o.summary);
      lines.push("");
      lines.push("**Why this fits**");
      o.because.forEach((b) => {
        lines.push(`- ${mdEscapeInline(b)}`);
      });
      lines.push("");
    });
  });

  lines.push("---");
  lines.push("");
  lines.push(
    "_Generated with [Opportunity Fabric](https://opportunity-fabric.vercel.app)._"
  );
  return lines.join("\n").trim();
}

export function downloadMarkdownFile(content: string, filename: string): void {
  const blob = new Blob([content], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
