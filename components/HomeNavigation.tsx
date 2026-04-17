"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";

export default function HomeNavigation() {
  const t = useTranslations();
  const tc = useTranslations("Common");
  const [activeSection, setActiveSection] = useState<string>("experience");

  useEffect(() => {
    const ids = ["experience", "projects", "contact"] as const;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const targetId = visibleEntries[0].target.id;
        setActiveSection(targetId);
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { id: "experience", label: t("Navigation.journey") },
    { id: "projects", label: t("Navigation.projects") },
  ];

  const switcherControlClass =
    "ds-focus-ring border-0 !border-transparent rounded-md text-foreground !bg-transparent !backdrop-blur-none shadow-none hover:!bg-black/5 hover:text-foreground dark:hover:!bg-white/10 disabled:opacity-100 disabled:pointer-events-none";

  return (
    <header className="sticky top-3 z-30 mb-10 sm:mb-12 md:mb-16 -mx-2 sm:-mx-3 md:-mx-4 lg:-mx-10 isolate">
      <div className="ds-surface-card rounded-xl md:rounded-2xl p-2 md:p-2.5 backdrop-blur-xl transform-gpu">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-sm md:text-base font-medium ml-3 tracking-tight ds-focus-ring rounded-sm"
            >
              eliott.codes
            </Link>
          </div>
          <div className="flex gap-1.5 sm:gap-2 md:gap-2.5 items-center">
            <AnimatedThemeToggler
              aria-label={tc("toggleTheme")}
              className={`${switcherControlClass} size-9 md:size-10 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4`}
            />
            <LanguageSwitcher
              className={`${switcherControlClass} size-9 md:size-10`}
            />
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                asChild
                className="hidden sm:inline-flex px-3.5 md:px-4 h-9 md:h-10 border-0 bg-transparent hover:!bg-black/5 dark:hover:!bg-white/10 hover:text-foreground"
              >
                <Link
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className="text-foreground"
                >
                  {item.label}
                </Link>
              </Button>
            ))}
            <Button
              asChild
              className="text-sm md:text-[0.95rem] px-4 md:px-5 h-9 md:h-10"
            >
              <Link
                href="#contact"
                aria-current={activeSection === "contact" ? "page" : undefined}
              >
                {t("Navigation.contact")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
