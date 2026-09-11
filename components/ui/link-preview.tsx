"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useState, type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const WIDTH = 240;
const HEIGHT = 150;

/**
 * External link that pops a screenshot of its target above it on hover, leaning
 * with the cursor. The image is a prerendered file so nothing is fetched at runtime.
 */
export default function LinkPreview({
  href,
  preview,
  children,
  className,
}: {
  href: string;
  /** 480x300 image of the linked page, served from /public. Plain link without it. */
  preview?: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Cursor offset from the link's centre slides the card a little.
  const x = useMotionValue(0);
  const translateX = useSpring(useTransform(x, [-100, 100], [-40, 40]), {
    stiffness: 120,
    damping: 16,
  });
  const onMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
  };

  return (
    <span className="relative inline-flex">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onMouseMove={onMouseMove}
        className={className}
      >
        {children}
      </a>
      <AnimatePresence>
        {open && preview && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 16, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.85,
              transition: { duration: 0.15 },
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 280, damping: 18, mass: 0.7 }
            }
            // Absolute + shrink-to-fit would collapse the card, so size it explicitly.
            style={{ translateX, width: WIDTH + 8 }}
            className={cn(
              "ds-surface-card pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 block origin-bottom -translate-x-1/2 overflow-hidden rounded-xl bg-[var(--surface-elevated)] p-1 shadow-xl backdrop-blur-xl",
            )}
          >
            <Image
              src={preview}
              alt=""
              width={WIDTH}
              height={HEIGHT}
              className="block rounded-lg"
              style={{ width: WIDTH, height: HEIGHT }}
            />
          </motion.span>
        )}
      </AnimatePresence>
      {/* Warm the cache so the card appears with its image already loaded. */}
      {preview && (
        <Image
          src={preview}
          alt=""
          width={WIDTH}
          height={HEIGHT}
          loading="eager"
          aria-hidden="true"
          className="hidden"
        />
      )}
    </span>
  );
}
