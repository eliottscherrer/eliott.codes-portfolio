"use client";

import { GitPullRequestArrow } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

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
  const dismissed = useRef(false);
  const reduceMotion = useReducedMotion();

  if (!SHA) return null;

  const close = () => setOpen(false);
  const show = () => {
    if (!dismissed.current) setOpen(true);
  };

  return (
    <span className="relative inline-flex">
      {open && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 24, mass: 0.6 }
          }
          // Same surface as the dropdowns elsewhere on the site
          className="bg-surface-glass border-surface-border pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 block w-64 origin-bottom -translate-x-1/2 transform-gpu rounded-md border p-1 text-left shadow-lg backdrop-blur-xl"
        >
          <span className="flex items-center gap-2 px-2 py-1.5">
            <Image
              src="/avatar.png"
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full"
            />
            <span className="block min-w-0">
              <span className="block truncate text-sm font-medium text-foreground">
                Eliott Scherrer
              </span>
              <span className="block font-mono text-xs text-muted-foreground">
                {SHA} · {DATE}
              </span>
            </span>
          </span>
          {SUBJECT && (
            <>
              <span className="bg-border -mx-1 my-1 block h-px" />
              <span className="block px-2 py-1.5 text-sm leading-relaxed text-muted-foreground">
                {SUBJECT}
              </span>
            </>
          )}
        </motion.span>
      )}

      <Link
        href={`${REPO_URL}/commit/${SHA}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          dismissed.current = false;
          setOpen(true);
        }}
        onMouseLeave={close}
        onFocus={show}
        onBlur={close}
        onKeyUp={(event) => {
          if (event.key === "Tab") {
            dismissed.current = false;
            setOpen(true);
          }
        }}
        onClick={() => {
          dismissed.current = true;
          close();
        }}
        className="ds-focus-ring inline-flex items-center gap-1 rounded-sm text-sm transition-colors hover:text-foreground"
      >
        <GitPullRequestArrow
          className="size-3.5 shrink-0 -translate-y-px"
          aria-hidden="true"
        />
        <span className="font-mono">{SHA}</span>
      </Link>
    </span>
  );
}
