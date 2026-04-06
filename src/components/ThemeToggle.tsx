"use client";

import { useFabricTheme, type ThemeMode } from "@/components/ThemeProvider";

const modes: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useFabricTheme();

  return (
    <div
      className="flex rounded-full border border-[var(--line)] bg-[var(--card)]/90 p-0.5 text-[11px] font-bold"
      role="group"
      aria-label="Theme"
    >
      {modes.map((m) => (
        <button
          key={m.value}
          type="button"
          onClick={() => setTheme(m.value)}
          className={`rounded-full px-2.5 py-1.5 transition sm:px-3 ${
            theme === m.value
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
