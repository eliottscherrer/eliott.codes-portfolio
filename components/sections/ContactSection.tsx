"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
import { Button } from "@/components/ui/button";
import {
  AnimatedLinkedin,
  AnimatedGithub,
  triggerGithubWag,
} from "@/components/ui/animated-social-icons";
import { SendIcon, type SendIconHandle } from "@/components/ui/send-icon";
import { copyToClipboard } from "@/lib/utils";

export default function ContactSection() {
  const t = useTranslations();
  const tc = useTranslations("Common");
  const sendIconRef = useRef<SendIconHandle>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const copyEmail = async () => {
    if (!(await copyToClipboard(EMAIL))) return;
    setCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="contact" className="space-y-6 sm:space-y-8 ds-anchor-target">
      <SectionAnchorHeading
        anchorId="contact"
        description={t("Contact.subtitle")}
      >
        {t("Contact.title")}
      </SectionAnchorHeading>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          variant="brand"
          size="lg"
          asChild
          className="w-full sm:w-auto transition-all duration-300 hover:scale-[1.02] active:scale-95"
          onMouseEnter={() => sendIconRef.current?.startAnimation()}
          onMouseLeave={() => sendIconRef.current?.stopAnimation()}
        >
          <Link href={`mailto:${EMAIL}`} className="gap-2">
            {EMAIL}
            <SendIcon ref={sendIconRef} className="size-5 shrink-0" size={20} />
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            variant="glass"
            size="icon-lg"
            aria-label={t("Contact.copyEmail")}
            className="ds-icon-control"
            onClick={copyEmail}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={copied ? "check" : "copy"}
                initial={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex"
              >
                {copied ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>
          <span className="sr-only" role="status" aria-live="polite">
            {copied ? t("Contact.emailCopied") : ""}
          </span>
          <Button
            variant="glass"
            size="icon-lg"
            aria-label={tc("linkedin")}
            className="ds-icon-control group"
            asChild
          >
            <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <AnimatedLinkedin />
            </Link>
          </Button>
          <Button
            variant="glass"
            size="icon-lg"
            aria-label={tc("github")}
            className="ds-icon-control group"
            asChild
            onMouseEnter={(event) => triggerGithubWag(event.currentTarget)}
            onFocus={(event) => triggerGithubWag(event.currentTarget)}
          >
            <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <AnimatedGithub />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
