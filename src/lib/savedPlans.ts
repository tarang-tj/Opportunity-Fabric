import type { StudentProfile } from "./types";

const PLANS_KEY = "opportunity_fabric_named_plans_v1";
const MAX_PLANS = 8;

export interface NamedPlan {
  id: string;
  name: string;
  profile: StudentProfile;
  createdAt: string;
}

function read(): NamedPlan[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PLANS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as NamedPlan[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(plans: NamedPlan[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
}

export function listNamedPlans(): NamedPlan[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function saveNamedPlan(name: string, profile: StudentProfile): NamedPlan | null {
  const trimmed = name.trim().slice(0, 80);
  if (!trimmed) return null;
  const plans = read();
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `p_${Date.now()}`;
  const plan: NamedPlan = {
    id,
    name: trimmed,
    profile: { ...profile },
    createdAt: new Date().toISOString(),
  };
  const next = [plan, ...plans].slice(0, MAX_PLANS);
  write(next);
  return plan;
}

export function deleteNamedPlan(id: string): void {
  write(read().filter((p) => p.id !== id));
}

export function getNamedPlan(id: string): NamedPlan | null {
  return read().find((p) => p.id === id) ?? null;
}
