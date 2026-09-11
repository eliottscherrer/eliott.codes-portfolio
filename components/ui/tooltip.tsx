"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Small glass tooltip that springs in above its trigger on hover or keyboard focus,
 * and toggles on tap for touch screens.
 */
export default function Tooltip({
  content,
  children,
  className,
}: {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduceMotion = useReducedMotion();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if ((event.nativeEvent as PointerEvent).pointerType === "touch") {
      setOpen((isOpen) => !isOpen);
    }
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={onClick}
        className={cn("ds-focus-ring cursor-default rounded-sm", className)}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            id={id}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 4,
              scale: 0.95,
              transition: { duration: 0.15 },
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 500, damping: 22, mass: 0.6 }
            }
            className="ds-surface-card pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 origin-bottom -translate-x-1/2 whitespace-nowrap rounded-lg bg-[var(--surface-elevated)] px-3 py-2 text-xs text-foreground shadow-lg backdrop-blur-xl"
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
