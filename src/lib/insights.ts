import type { RoadmapResult, StudentProfile } from "./types";

export function buildInsights(
  profile: StudentProfile,
  roadmap: RoadmapResult
): string[] {
  const lines: string[] = [];
  const all = roadmap.phases.flatMap((p) => p.opportunities);
  const byKind = (k: string) => all.filter((o) => o.kind === k).length;

  if (profile.weeklyHours === "under_10") {
    lines.push(
      "Low weekly bandwidth: the roadmap stays lean so you can protect depth over noise."
    );
  }
  if (profile.needIncome && profile.incomePriority === "high") {
    lines.push(
      `Income is driving choices: ${byKind("job_search")} of ${all.length} cards lean toward jobs or pipeline.`
    );
  } else if (!profile.needIncome) {
    lines.push(
      "With less income pressure, you have more room to stack skill and portfolio moves."
    );
  }
  if (profile.visaSensitive) {
    lines.push("Visas are in play: double-check any role with your international office.");
  }
  if (profile.remoteOk) {
    lines.push("Remote-friendly: networking suggestions assume Zoom and async intros count.");
  } else {
    lines.push("In-person bias: we weighted campus events, office hours, and face time.");
  }

  const heavy = all.filter((o) => o.effort === "heavy").length;
  if (heavy >= 2) {
    lines.push(
      `${heavy} “bigger project” moves on the board: consider sequencing them across terms.`
    );
  }

  if (lines.length === 0) {
    lines.push("Balanced mix across phases: adjust any card that does not feel like you.");
  }

  return lines.slice(0, 5);
}
