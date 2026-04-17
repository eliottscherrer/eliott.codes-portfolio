"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import SplitText from "@/components/SplitText";
import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

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

const AnimatedLinkedin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle
      cx="4"
      cy="4"
      r="2"
      className="origin-center transition-all duration-500 group-hover:rotate-[360deg]"
    />
  </svg>
);

const AnimatedGithub = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path
      id="github-tail"
      d="M8.7 18c-4.51 2-5-2-7-2"
      className="origin-[9px_18px]"
      onAnimationEnd={(e) => {
        if (e.animationName === "wag") {
          (e.currentTarget as SVGPathElement).classList.remove("is-wagging");
        }
      }}
    />
  </svg>
);

const AnimatedMail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4 overflow-visible"
  >
    {/* Base U-shape of the envelope (static so it won't cross-fade blink) */}
    <path d="M22 6V18A2 2 0 0 1 20 20H4A2 2 0 0 1 2 18V6" />

    {/* Top rounded corners and top line (fades out) */}
    <path
      d="M22 6A2 2 0 0 0 20 4H4A2 2 0 0 0 2 6"
      className="transition-opacity duration-300 ease-out group-hover:opacity-0"
    />

    {/* Outline mask for document so it looks inside the envelope */}
    <defs>
      <clipPath id="mail-doc-clip">
        <path d="M0 0h24v8l-12 5.7L0 8Z" />
      </clipPath>
    </defs>

    {/* Document that slides up (wrapped so clip-path does not move) */}
    <g clipPath="url(#mail-doc-clip)">
      <g className="opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-0.25">
        <path d="M6 14V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7" />
      </g>
    </g>

    {/* Top square vertical extensions (fades in) */}
    <path
      d="M22 6V4 M2 6V4"
      className="opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
    />
    {/* Bottom-hinged 3D pitch so the flap rotates upward */}
    <path
      d="M22 7 L12 12.7 L2 7"
      className="[transform-box:view-box] [transform-origin:12px_5px] [transform:rotateX(0deg)] transition-transform duration-300 ease-out group-hover:[transform:rotateX(180deg)]"
    />
    {/* Bottom flap */}
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function HeroSection() {
  const t = useTranslations();
  const tc = useTranslations("Common");
  const waveRef = useRef<HTMLSpanElement | null>(null);

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
            onMouseEnter={() => {
              const tail = document.getElementById("github-tail");
              if (tail && !tail.classList.contains("is-wagging")) {
                tail.classList.add("is-wagging");
              }
            }}
            onFocus={() => {
              const tail = document.getElementById("github-tail");
              if (tail && !tail.classList.contains("is-wagging")) {
                tail.classList.add("is-wagging");
              }
            }}
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
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button variant="brand" asChild size="lg" className="w-full sm:w-auto">
          <Link href="#projects">{t("Hero.viewProjects")}</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          size="lg"
          className="w-full sm:w-auto"
        >
          <Link href="#contact">{t("Hero.getInTouch")}</Link>
        </Button>
      </div>
    </section>
  );
}
