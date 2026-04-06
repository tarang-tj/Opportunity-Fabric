import { clearProgress } from "@/lib/progress";
import type { StudentProfile } from "./types";
import { STORAGE_KEY } from "./types";

const LEGACY_SESSION_ONLY = "opportunity_fabric_session_migrated_v2";

function migrateSessionToLocal(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(LEGACY_SESSION_ONLY)) return;
  const fromSession = sessionStorage.getItem(STORAGE_KEY);
  if (fromSession && !localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, fromSession);
  }
  localStorage.setItem(LEGACY_SESSION_ONLY, "1");
}

export function saveProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(profile);
  localStorage.setItem(STORAGE_KEY, raw);
  sessionStorage.setItem(STORAGE_KEY, raw);
}

export function loadProfile(): StudentProfile | null {
  if (typeof window === "undefined") return null;
  migrateSessionToLocal();
  const raw =
    localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StudentProfile;
  } catch {
    return null;
  }
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_SESSION_ONLY);
  sessionStorage.removeItem(STORAGE_KEY);
  clearProgress();
}
