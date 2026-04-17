"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const isDark = resolvedTheme === "dark";
    const newTheme = isDark ? "light" : "dark";

    const applyTheme = () => {
      flushSync(() => {
        setTheme(newTheme);
      });
    };

    // TODO:
    // Currently, Firefox has a bug where `backdrop-filter` (glassmorphism) completely disappears
    // during a View Transition because it fails to capture or render the filtered context in the snapshot.
    // Once Mozilla fixes this rendering bug, we can remove this user-agent check.
    // See: https://wpt.fyi/results/css/filter-effects/backdrop-filter-reference-filter.html?label=experimental&label=master&aligned
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1887451
    const isFirefoxBasedBrowser = navigator.userAgent
      .toLowerCase()
      .includes("firefox");
    const isSafari = navigator.userAgent.toLowerCase().includes("safari");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      typeof document.startViewTransition !== "function" ||
      isFirefoxBasedBrowser ||
      isSafari ||
      prefersReducedMotion
    ) {
      applyTheme();
      return;
    }

    let transition: ViewTransition | undefined;

    try {
      transition = document.startViewTransition(applyTheme);
    } catch {
      applyTheme();
      return;
    }

    try {
      await transition?.ready;
    } catch {
      return;
    }

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    try {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch {
      // Ignore animation errors on browsers with partial View Transition support.
    }
  }, [resolvedTheme, setTheme, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
      {...props}
    >
      {/* Always render both icons and let the css decide which one is displayed to avoid hydration mismatches */}
      <Sun className="hidden h-4 w-4 dark:inline" aria-hidden />
      <Moon className="inline h-4 w-4 dark:hidden" aria-hidden />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
