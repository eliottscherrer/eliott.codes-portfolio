"use client";

import { Button } from "@/components/ui/button";
import Tooltip from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";
import LocalTime from "@/components/LocalTime";
import SplitText from "@/components/SplitText";
import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import {
  AnimatedLinkedin,
  AnimatedGithub,
  AnimatedMail,
  triggerGithubWag,
} from "@/components/ui/animated-social-icons";
import { SendIcon, type SendIconHandle } from "@/components/ui/send-icon";

const AGE = (() => {
  const birthDate = new Date("2006-11-20");
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
})();

export default function HeroSection() {
  const t = useTranslations();
  const tc = useTranslations("Common");
  const waveRef = useRef<HTMLSpanElement | null>(null);
  const sendIconRef = useRef<SendIconHandle>(null);

  const triggerWave = useCallback((el: HTMLSpanElement | null) => {
    if (!el || el.classList.contains("is-waving")) return;
    el.classList.add("is-waving");
  }, []);

  useEffect(() => {
    triggerWave(waveRef.current);
  }, [triggerWave]);

  return (
    <section className="space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        {/* Animated Title */}
        <div id="title" className="flex items-baseline gap-1">
          <span
            className="text-4xl md:text-5xl font-bold wave-emoji"
            ref={waveRef}
            onMouseEnter={(e) => {
              triggerWave(e.currentTarget);
            }}
            onFocus={(e) => {
              triggerWave(e.currentTarget);
            }}
            onAnimationEnd={(e) => {
              if (e.animationName === "wave") {
                (e.currentTarget as HTMLElement).classList.remove("is-waving");
              }
            }}
          >
            👋
          </span>
          <SplitText
            text="Eliott Scherrer"
            tag="h1"
            className="text-4xl md:text-5xl font-bold tracking-tight"
            delay={70}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
        {/* Social Links */}
        <div className="flex flex-row gap-2">
          <Button
            variant="glass"
            size="icon"
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
            size="icon"
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
          <Button
            variant="glass"
            size="icon"
            aria-label={tc("email")}
            className="ds-icon-control group"
            asChild
          >
            <Link href={`mailto:${EMAIL}`}>
              <AnimatedMail />
            </Link>
          </Button>
        </div>
      </div>

      {/* Meta row: location + current status, same icon-slot rhythm */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
        <Tooltip
          content={
            <>
              <span className="text-muted-foreground">
                {t("Hero.localTime")}
              </span>{" "}
              <LocalTime className="font-medium" />
            </>
          }
          className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {t("Hero.location")}
        </Tooltip>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="relative flex size-4 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <span className="absolute inline-flex size-2 animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.4s]" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {t("Hero.currently")}
        </span>
      </div>

      <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-foreground/90">
        {t("Hero.description", { age: AGE })}
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Button
          variant="brand"
          asChild
          size="lg"
          className="w-full sm:w-auto group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <Link href="#projects" className="gap-2">
            <span className="relative z-10">{t("Hero.viewProjects")}</span>{" "}
            {/* Shine effect overlay */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[150%] ease-in-out" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          size="lg"
          className="w-full sm:w-auto group transition-all duration-300 hover:bg-transparent dark:hover:bg-transparent"
          onMouseEnter={() => sendIconRef.current?.startAnimation()}
          onMouseLeave={() => sendIconRef.current?.stopAnimation()}
        >
          <Link href="#contact" className="gap-2">
            {t("Hero.getInTouch")}
            <SendIcon ref={sendIconRef} className="size-5 shrink-0" size={20} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
