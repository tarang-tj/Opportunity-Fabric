import type { ComponentType } from "react";
import type { OpportunityKind } from "@/lib/types";

const stroke = "currentColor";
const strokeW = 1.75;

export function IconBook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 7h8M8 11h6" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" />
    </svg>
  );
}

export function IconFlask({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3h6M10 3v6.5L5 20h14l-5-10.5V3"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.5 17h9" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" />
    </svg>
  );
}

export function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01" stroke={stroke} strokeWidth={2} />
    </svg>
  );
}

export function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2"
        y="7"
        width="20"
        height="14"
        rx="2"
        stroke={stroke}
        strokeWidth={strokeW}
      />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={stroke} strokeWidth={strokeW} />
      <path d="M2 13h20" stroke={stroke} strokeWidth={strokeW} />
    </svg>
  );
}

export function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="7" r="3" stroke={stroke} strokeWidth={strokeW} />
      <path
        d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
      <path
        d="M16 11a3 3 0 1 0 0-6M21 21v-1.5a3.5 3.5 0 0 0-2.5-3.3"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconLayers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconScale({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function IconLightbulb({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3 11.2V16h6v-2.8A6 6 0 0 0 12 2z"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconOrbit({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke={stroke} strokeWidth={strokeW} />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        transform="rotate(60 12 12)"
        stroke={stroke}
        strokeWidth={strokeW}
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        transform="rotate(120 12 12)"
        stroke={stroke}
        strokeWidth={strokeW}
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth={strokeW} />
      <path
        d="M12 8v5M12 16h.01"
        stroke={stroke}
        strokeWidth={2.25}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconMap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 20l-5-2V4l5 2 6-2 5 2v14l-5-2-6 2z"
        stroke={stroke}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 4v16M15 2v16" stroke={stroke} strokeWidth={strokeW} strokeLinecap="round" />
    </svg>
  );
}

const kindGlyph: Record<OpportunityKind, ComponentType<{ className?: string }>> = {
  course_strategy: IconBook,
  experience: IconFlask,
  campus_resource: IconBuilding,
  job_search: IconBriefcase,
  networking: IconUsers,
  portfolio: IconLayers,
};

export function KindGlyph({
  kind,
  className = "size-5",
}: {
  kind: OpportunityKind;
  className?: string;
}) {
  const G = kindGlyph[kind];
  return <G className={className} />;
}
