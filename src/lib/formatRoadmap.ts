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
