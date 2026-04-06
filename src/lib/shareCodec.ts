import type { StudentProfile } from "./types";

/** Compact URL-safe payload for read-only sharing (no crypto). */
export function encodeProfileForShare(profile: StudentProfile): string {
  const json = JSON.stringify(profile);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeProfileFromShare(token: string): StudentProfile | null {
  try {
    const pad = token.length % 4 === 0 ? "" : "=".repeat(4 - (token.length % 4));
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as StudentProfile;
    if (!parsed || typeof parsed.primaryGoal !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}
