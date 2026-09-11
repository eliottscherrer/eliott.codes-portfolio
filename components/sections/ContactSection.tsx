"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
import { Button } from "@/components/ui/button";
import {
  AnimatedLinkedin,
  AnimatedGithub,
  triggerGithubWag,
} from "@/components/ui/animated-social-icons";
import { SendIcon, type SendIconHandle } from "@/components/ui/send-icon";

export default function ContactSection() {
  const t = useTranslations();
  const tc = useTranslations("Common");
  const sendIconRef = useRef<SendIconHandle>(null);

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
          <Link href="mailto:contact@eliott.codes" className="gap-2">
            contact@eliott.codes
            <SendIcon ref={sendIconRef} className="size-5 shrink-0" size={20} />
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            variant="glass"
            size="icon-lg"
            aria-label={tc("linkedin")}
            className="ds-icon-control group"
            asChild
          >
            <Link
              href="https://www.linkedin.com/in/eliottscherrer/"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <Link
              href="https://github.com/eliottscherrer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatedGithub />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
