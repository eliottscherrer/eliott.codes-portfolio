"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import SplitText from "@/components/SplitText";
import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
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
  }, []);

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
            className="text-4xl md:text-5xl font-bold"
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
        <div className="flex flex-row gap-2 sm:gap-3">
          <Button
            variant="secondary"
            size="icon"
            aria-label={tc("linkedin")}
            className="group bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input transition-colors"
            asChild
          >
            <Link
              href="https://www.linkedin.com/in/eliottscherrer/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatedLinkedin />
              <span className="sr-only">{tc("linkedin")}</span>
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label={tc("github")}
            className="group bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input transition-colors"
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
              <span className="sr-only">{tc("github")}</span>
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label={tc("email")}
            className="group bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input transition-colors"
            asChild
          >
            <Link href="mailto:contact@eliott.codes">
              <AnimatedMail />
              <span className="sr-only">{tc("email")}</span>
            </Link>
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground max-w-2xl flex items-center gap-1.5 text-sm sm:text-base">
        <MapPin className="size-4 flex-shrink-0" />
        {t("Hero.location")}
      </p>
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
          className="w-full sm:w-auto group transition-all duration-300 hover:bg-0 dark:hover:bg-0"
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
