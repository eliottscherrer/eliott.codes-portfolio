"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";

/**
 * External link that pops the service's logo above itself on hover, as a small rounded
 * tile. The logo comes in a pair, `<name>.svg` for dark and `<name>-light.svg` for light.
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
    <span className="relative inline-flex">
      <AnimatePresence>
        {open && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 6, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 4,
              scale: 0.8,
              transition: { duration: 0.12 },
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 420, damping: 22, mass: 0.6 }
            }
            className="ds-surface-card pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 flex size-9 -translate-x-1/2 items-center justify-center rounded-[10px] bg-background p-2 shadow-lg"
          >
            <Image
              src={`/logos/${logo}.svg`}
              alt=""
              width={20}
              height={20}
              className="hidden size-full object-contain dark:block"
            />
            <Image
              src={`/logos/${logo}-light.svg`}
              alt=""
              width={20}
              height={20}
              className="block size-full object-contain dark:hidden"
            />
          </motion.span>
        )}
      </AnimatePresence>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="ds-inline-link ds-focus-ring text-foreground"
      >
        {children}
      </a>
    </span>
  );
}
