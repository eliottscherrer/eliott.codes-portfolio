"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

// ThemeProvider sets the initial theme and provides a hook for toggling.
// It keeps the current theme in localStorage (key: theme) and applies/removes
// the .dark class on <html>. It respects system preference on first visit.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // We don't actually need to render anything special; we just run side-effects.
  return <>{children}</>;
}

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"; // default during SSR
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  } catch {
    return "light";
  }
}

let cachedTheme: "light" | "dark" | null = null;

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"; // SSR placeholder
    if (cachedTheme) return cachedTheme;
    // Align with the class applied by the no-flash script to avoid hydration mismatch.
    const fromDom = document.documentElement.classList.contains("dark") ? "dark" : "light";
    cachedTheme = fromDom;
    return fromDom;
  });
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      applyTheme(theme);
      initializedRef.current = true;
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      cachedTheme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

// Small helper for an inline script to prevent flash of wrong theme.
export const noFlashScript = `(() => {try {const s = localStorage.getItem('theme');const m = window.matchMedia('(prefers-color-scheme: dark)').matches;const t = (s === 'dark' || s === 'light') ? s : (m ? 'dark' : 'light'); if(t==='dark'){document.documentElement.classList.add('dark');} } catch(e) {}})();`;
