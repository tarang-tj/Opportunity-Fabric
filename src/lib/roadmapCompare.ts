import type { RoadmapResult } from "./types";

export interface OpportunityDiffItem {
  id: string;
  title: string;
}

export interface OpportunityDiff {
  shared: OpportunityDiffItem[];
  onlyA: OpportunityDiffItem[];
  onlyB: OpportunityDiffItem[];
}

export interface FlagDiff {
  shared: string[];
  onlyA: string[];
  onlyB: string[];
}

function opportunityMap(r: RoadmapResult): Map<string, string> {
  const m = new Map<string, string>();
  for (const p of r.phases) {
    for (const o of p.opportunities) {
      m.set(o.id, o.title);
    }
  }
  return m;
}

function sortByTitle(items: OpportunityDiffItem[]): OpportunityDiffItem[] {
  return [...items].sort((x, y) => x.title.localeCompare(y.title));
}

export function compareRoadmapOpportunities(
  roadmapA: RoadmapResult,
  roadmapB: RoadmapResult
): OpportunityDiff {
  const ma = opportunityMap(roadmapA);
  const mb = opportunityMap(roadmapB);
  const shared: OpportunityDiffItem[] = [];
  const onlyA: OpportunityDiffItem[] = [];
  const onlyB: OpportunityDiffItem[] = [];
  for (const [id, title] of ma) {
    if (mb.has(id)) shared.push({ id, title });
    else onlyA.push({ id, title });
  }
  for (const [id, title] of mb) {
    if (!ma.has(id)) onlyB.push({ id, title });
  }
  return {
    shared: sortByTitle(shared),
    onlyA: sortByTitle(onlyA),
    onlyB: sortByTitle(onlyB),
  };
}

export function compareRoadmapFlags(
  roadmapA: RoadmapResult,
  roadmapB: RoadmapResult
): FlagDiff {
  const a = roadmapA.flags;
  const b = roadmapB.flags;
  const sb = new Set(b);
  const sa = new Set(a);
  return {
    shared: [...a].filter((f) => sb.has(f)).sort(),
    onlyA: [...a].filter((f) => !sb.has(f)).sort(),
    onlyB: [...b].filter((f) => !sa.has(f)).sort(),
  };
}
