const PROGRESS_KEY = "opportunity_fabric_progress_v1";

export interface RoadmapProgress {
  doneIds: string[];
  workingIds: string[];
}

function read(): RoadmapProgress {
  if (typeof window === "undefined") return { doneIds: [], workingIds: [] };
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { doneIds: [], workingIds: [] };
    const p = JSON.parse(raw) as RoadmapProgress;
    return {
      doneIds: Array.isArray(p.doneIds) ? p.doneIds : [],
      workingIds: Array.isArray(p.workingIds) ? p.workingIds : [],
    };
  } catch {
    return { doneIds: [], workingIds: [] };
  }
}

function write(p: RoadmapProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

export function loadProgress(): RoadmapProgress {
  return read();
}

export function toggleDone(opportunityId: string): RoadmapProgress {
  const p = read();
  const set = new Set(p.doneIds);
  if (set.has(opportunityId)) set.delete(opportunityId);
  else {
    set.add(opportunityId);
    p.workingIds = p.workingIds.filter((id) => id !== opportunityId);
  }
  const next = { doneIds: [...set], workingIds: p.workingIds };
  write(next);
  return next;
}

export function toggleWorking(opportunityId: string): RoadmapProgress {
  const p = read();
  if (p.doneIds.includes(opportunityId)) return p;
  const set = new Set(p.workingIds);
  if (set.has(opportunityId)) set.delete(opportunityId);
  else set.add(opportunityId);
  const next = { doneIds: p.doneIds, workingIds: [...set] };
  write(next);
  return next;
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROGRESS_KEY);
}

export function progressCounts(
  progress: RoadmapProgress,
  validIds: Set<string>
): { done: number; working: number; total: number } {
  const done = progress.doneIds.filter((id) => validIds.has(id)).length;
  const working = progress.workingIds.filter(
    (id) => validIds.has(id) && !progress.doneIds.includes(id)
  ).length;
  return { done, working, total: validIds.size };
}
