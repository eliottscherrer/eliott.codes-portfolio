"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";

// Gap plus logo, the width the sentence opens up to make room for it
const LOGO = 13;
const SLOT = LOGO + 4;

/**
 * External link whose service logo slides out of the word on hover, inline, pushing the
 * rest of the sentence along. The logo comes in a pair, `<name>.svg` for dark and
 * `<name>-light.svg` for light.
 */
export default function ServiceLink({
  href,
  logo,
  children,
}: {
  href: string;
  /** Base name under /public/logos, without the extension. */
  logo: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <span
      className="inline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="ds-inline-link ds-focus-ring text-foreground"
      >
        {children}
      </a>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            aria-hidden="true"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: SLOT, opacity: 1 }}
            exit={{ width: 0, opacity: 0, transition: { duration: 0.14 } }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 460, damping: 34, mass: 0.5 }
            }
            className="inline-flex -translate-y-px items-center overflow-hidden align-middle"
          >
            <span
              className="ml-1 flex shrink-0 items-center justify-center"
              style={{ width: LOGO, height: LOGO }}
            >
              <Image
                src={`/logos/${logo}.svg`}
                alt=""
                width={LOGO}
                height={LOGO}
                className="hidden size-full object-contain dark:block"
              />
              <Image
                src={`/logos/${logo}-light.svg`}
                alt=""
                width={LOGO}
                height={LOGO}
                className="block size-full object-contain dark:hidden"
              />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
