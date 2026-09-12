"use client";

import { GitCommitVertical } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { REPO_URL } from "@/lib/site";

const SHA = process.env.NEXT_PUBLIC_COMMIT_SHA;
const DATE = process.env.NEXT_PUBLIC_BUILD_DATE;
const SUBJECT = process.env.NEXT_PUBLIC_COMMIT_SUBJECT;

/**
 * Footer stamp of the commit this build came from. Hovering opens a small card with
 * who committed it and the commit's first line. All three values are baked in at build
 * time, so the stamp hydrates exactly as prerendered and vanishes when they are missing.
 */
export default function CommitStamp() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  if (!SHA) return null;

  return (
    <span className="relative inline-flex">
      <AnimatePresence>
        {open && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 6,
              scale: 0.94,
              transition: { duration: 0.12 },
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 380, damping: 24, mass: 0.6 }
            }
            className="ds-surface-card pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 block w-64 origin-bottom -translate-x-1/2 rounded-xl bg-[var(--surface-elevated)] p-3 text-left shadow-xl backdrop-blur-xl"
          >
            <span className="flex items-center gap-2">
              <Image
                src="/avatar.png"
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0 rounded-full"
              />
              <span className="block min-w-0">
                <span className="block truncate text-xs font-medium text-foreground">
                  Eliott Scherrer
                </span>
                <span className="block font-mono text-[11px] text-muted-foreground">
                  {SHA} · {DATE}
                </span>
              </span>
            </span>
            {SUBJECT && (
              <span className="mt-2 block border-t border-[var(--surface-border)] pt-2 text-xs leading-relaxed text-muted-foreground">
                {SUBJECT}
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>

      <Link
        href={`${REPO_URL}/commit/${SHA}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="ds-focus-ring inline-flex items-center gap-1 rounded-sm transition-colors hover:text-foreground"
      >
        <GitCommitVertical className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="font-mono text-xs">{SHA}</span>
      </Link>
    </span>
  );
}
