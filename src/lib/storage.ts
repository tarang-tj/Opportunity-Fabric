import type { StudentProfile } from "./types";
import { STORAGE_KEY } from "./types";

export function saveProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function loadProfile(): StudentProfile | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StudentProfile;
  } catch {
    return null;
  }
}
