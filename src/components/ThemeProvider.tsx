"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "fabric_theme";

type Ctx = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  resolved: "light" | "dark";
};

const ThemeContext = createContext<Ctx | null>(null);

function getStored(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark" || v === "system") return v;
  return "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getStored());
    setMounted(true);
  }, []);

  const apply = useCallback((mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (mode === "light") {
      root.classList.add("light");
    } else if (mode === "dark") {
      root.classList.add("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    apply(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted, apply]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme, mounted, apply]);

  const resolved: "light" | "dark" =
    !mounted
      ? "light"
      : theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, resolved }),
    [theme, setTheme, resolved]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useFabricTheme(): Ctx {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: "system",
      setTheme: () => {},
      resolved: "light",
    };
  }
  return ctx;
}
