"use client"

import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import SplitText from "@/components/SplitText";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const AGE = (() => {
  const birthDate = new Date("2006-11-20");
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
})();

export default function HeroSection() {
  const t = useTranslations();
  const tc = useTranslations("Common");
  const waveRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = waveRef.current;
    if (el && !el.classList.contains("is-waving")) {
      el.classList.add("is-waving");
    }
  }, []);

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        {/* Animated Title */}
        <div id="title" className="flex items-baseline">
          <span
            className="text-4xl md:text-5xl font-bold wave-emoji"
            ref={waveRef}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              if (!el.classList.contains("is-waving")) {
                el.classList.add("is-waving");
              }
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
            text=" Eliott Scherrer"
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
          <Button variant="secondary" size="icon" aria-label={tc("linkedin")} className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input" asChild>
            <a href="https://www.linkedin.com/in/eliottscherrer/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="size-4" />
              <span className="sr-only">{tc("linkedin")}</span>
            </a>
          </Button>
          <Button variant="secondary" size="icon" aria-label={tc("github")} className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input" asChild>
            <a href="https://github.com/eliottscherrer" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
              <span className="sr-only">{tc("github")}</span>
            </a>
          </Button>
          <Button variant="secondary" size="icon" aria-label={tc("email")} className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input" asChild>
            <a href="mailto:contact@eliott.codes">
              <Mail className="size-4" />
              <span className="sr-only">{tc("email")}</span>
            </a>
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground max-w-2xl flex items-center gap-1.5 text-sm sm:text-base">
        <MapPin className="size-4 flex-shrink-0" />
        {t("Hero.location")}
      </p>
      <p className="max-w-2xl text-base sm:text-lg leading-relaxed">
        {t("Hero.description", { age: AGE })}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href="#projects">{t("Hero.viewProjects")}</a>
        </Button>
        <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
          <a href="#contact">{t("Hero.getInTouch")}</a>
        </Button>
      </div>
    </section>
  );
}
