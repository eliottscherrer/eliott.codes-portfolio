"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { useTranslations } from "next-intl";

import { LinkIcon, type LinkIconHandle } from "@/components/ui/link-icon";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface SectionAnchorHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  anchorId: string;
  headingId?: string;
  as?: HeadingTag;
}

const copyToClipboard = async (text: string) => {
  if (!window.isSecureContext || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export default function SectionAnchorHeading({
  anchorId,
  headingId,
  as: HeadingTag = "h2",
  className,
  children,
  ...props
}: SectionAnchorHeadingProps) {
  const tc = useTranslations("Common");
  const iconRef = useRef<LinkIconHandle>(null);
  const resetCopiedTimeoutRef = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  const resetCopiedState = useCallback(() => {
    if (resetCopiedTimeoutRef.current) {
      window.clearTimeout(resetCopiedTimeoutRef.current);
    }

    resetCopiedTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 1400);
  }, []);

  const handleCopyClick = useCallback(async () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.hash = anchorId;

    const didCopy = await copyToClipboard(currentUrl.toString());
    if (!didCopy) return;

    iconRef.current?.startAnimation();
    setCopied(true);
    resetCopiedState();
  }, [anchorId, resetCopiedState]);

  useEffect(() => {
    return () => {
      if (resetCopiedTimeoutRef.current) {
        window.clearTimeout(resetCopiedTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="group/section-anchor relative w-fit max-w-full">
      <button
        type="button"
        aria-label={copied ? tc("sectionLinkCopied") : tc("copySectionLink")}
        className={cn(
          "absolute -left-8 top-1/2 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center text-muted-foreground transition-all duration-300",
          "hover:text-foreground",
          "opacity-70 md:opacity-0 md:-translate-x-1",
          "group-hover/section-anchor:opacity-100 group-hover/section-anchor:translate-x-0",
          "group-focus-within/section-anchor:opacity-100 group-focus-within/section-anchor:translate-x-0",
          "focus-visible:outline-none focus-visible:text-foreground",
        )}
        onClick={handleCopyClick}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
        onFocus={() => iconRef.current?.startAnimation()}
        onBlur={() => iconRef.current?.stopAnimation()}
      >
        <LinkIcon
          ref={iconRef}
          size={16}
          className="pointer-events-none"
          aria-hidden="true"
        />
      </button>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? tc("sectionLinkCopied") : ""}
      </span>

      <HeadingTag
        id={headingId}
        className={cn("ds-section-title", className)}
        {...props}
      >
        {children}
      </HeadingTag>
    </div>
  );
}
