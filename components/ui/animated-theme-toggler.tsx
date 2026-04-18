"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

const SUN_RAYS_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 10,
      duration: 0.5,
    },
  },
  animate: {
    rotate: 180,
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 80,
      damping: 13,
    },
  },
};

const MOON_ICON_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  animate: {
    rotate: [0, 14, -9, 0],
    y: [0, -1, 0.2, 0],
    scale: [1, 1.05, 0.98, 1],
    transition: {
      duration: 0.85,
      ease: "easeInOut",
    },
  },
};

const MOON_DROP_SPARKLE_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
    scale: 0.82,
    rotate: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  settled: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sunRaysControls = useAnimation();
  const moonControls = useAnimation();
  const moonDropSparkleControls = useAnimation();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const startSunRaysAnimation = useCallback(() => {
    void sunRaysControls.start("animate");
  }, [sunRaysControls]);

  const stopSunRaysAnimation = useCallback(() => {
    void sunRaysControls.start("normal");
  }, [sunRaysControls]);

  const startMoonAnimation = useCallback(() => {
    void moonControls.start("animate");
    void moonDropSparkleControls.start("settled");
  }, [moonControls, moonDropSparkleControls]);

  const stopMoonAnimation = useCallback(() => {
    void moonControls.start("normal");
    void moonDropSparkleControls.start("hidden");
  }, [moonControls, moonDropSparkleControls]);

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
      onMouseEnter={(event) => {
        startSunRaysAnimation();
        startMoonAnimation();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        stopSunRaysAnimation();
        stopMoonAnimation();
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        startSunRaysAnimation();
        startMoonAnimation();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        stopSunRaysAnimation();
        stopMoonAnimation();
        onBlur?.(event);
      }}
      className={cn("theme-toggle-btn", className)}
      aria-pressed={mounted ? resolvedTheme === "dark" : undefined}
      {...props}
    >
      {/* Always render both icons and let the css decide which one is displayed to avoid hydration mismatches */}
      <svg
        className="theme-toggle-sun hidden h-4 w-4 dark:inline"
        aria-hidden
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" />
        <motion.g
          initial="normal"
          animate={sunRaysControls}
          variants={SUN_RAYS_VARIANTS}
          style={{ transformOrigin: "12px 12px" }}
        >
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.93 19.07 1.41-1.41" />
          <path d="m17.66 6.34 1.41-1.41" />
        </motion.g>
      </svg>
      <motion.svg
        initial="normal"
        animate={moonControls}
        className="inline h-4 w-4 dark:hidden"
        aria-hidden
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <motion.g
          variants={MOON_ICON_VARIANTS}
          style={{ transformOrigin: "12px 12px" }}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </motion.g>
        <motion.path
          initial="hidden"
          animate={moonDropSparkleControls}
          variants={MOON_DROP_SPARKLE_VARIANTS}
          d="M16.8 4.9c0 1.6 1.1 2.7 2.7 2.7-1.6 0-2.7 1.1-2.7 2.7 0-1.6-1.1-2.7-2.7-2.7 1.6 0 2.7-1.1 2.7-2.7Z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill="currentColor"
        />
      </motion.svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
