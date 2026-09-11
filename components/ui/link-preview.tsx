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
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const WIDTH = 240;
const HEIGHT = 150;
const GAP = 10;

const subscribeToNothing = () => () => {};

/**
 * External link that pops a screenshot of its target below it on hover, leaning with
 * the cursor. The card is portaled to <body> and positioned fixed, so no ancestor's
 * overflow or stacking context can clip it. The image is a prerendered file.
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
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [anchorBox, setAnchorBox] = useState<{ x: number; y: number } | null>(
    null,
  );
  const open = anchorBox !== null;
  const reduceMotion = useReducedMotion();
  const canPortal = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

  const measure = () => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (rect)
      setAnchorBox({ x: rect.left + rect.width / 2, y: rect.bottom + GAP });
  };
  const close = () => setAnchorBox(null);

  // Follow the link if the page scrolls or resizes while the card is showing.
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [open]);

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

  const card = (
    <AnimatePresence>
      {open && preview && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, y: -12, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: -8,
            scale: 0.85,
            transition: { duration: 0.15 },
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 280, damping: 18, mass: 0.7 }
          }
          style={{
            translateX,
            left: anchorBox?.x,
            top: anchorBox?.y,
            width: WIDTH + 8,
          }}
          className="ds-surface-card pointer-events-none fixed z-50 block origin-top -translate-x-1/2 overflow-hidden rounded-xl bg-[var(--surface-elevated)] p-1 shadow-xl backdrop-blur-xl"
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
  );

  return (
    <>
      <a
        ref={anchorRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={measure}
        onMouseLeave={close}
        onFocus={measure}
        onBlur={close}
        onMouseMove={onMouseMove}
        className={className}
      >
        {children}
      </a>
      {canPortal && createPortal(card, document.body)}
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
    </>
  );
}
