import type { RoadmapResult, StudentProfile } from "./types";

function icsDate(d: Date): string {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function escapeText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildRoadmapIcs(
  roadmap: RoadmapResult,
  profile: StudentProfile
): string {
  const now = new Date();
  const stamp = icsDate(now);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Opportunity Fabric//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Opportunity Fabric roadmap",
  ];

  const nickname = profile.nickname ? ` (${profile.nickname})` : "";
  roadmap.phases.forEach((phase, i) => {
    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() + i * 21);
    start.setUTCHours(15, 0, 0, 0);
    const end = new Date(start);
    end.setUTCHours(16, 0, 0, 0);
    const uid = `fabric-${phase.id}-${start.getTime()}@opportunity-fabric.local`;
    const title = `${phase.label}${nickname}: Opportunity Fabric check-in`;
    const desc = `Review phase: ${phase.label}. ${phase.window}. ${roadmap.headline}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${icsDate(start)}`,
      `DTEND:${icsDate(end)}`,
      `SUMMARY:${escapeText(title)}`,
      `DESCRIPTION:${escapeText(desc)}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
