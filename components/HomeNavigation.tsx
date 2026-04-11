"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";

export default function HomeNavigation() {
  const t = useTranslations();
  const tc = useTranslations("Common");

  return (
    <header className="flex items-center justify-between mb-8 sm:mb-12 md:mb-16">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-sm font-medium">
          eliott.codes
        </Link>
      </div>
      <div className="flex gap-2 sm:gap-3">
        <AnimatedThemeToggler
          aria-label={tc("toggleTheme")}
          className="bg-transparent hover:bg-accent rounded-md w-8 h-8 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4"
        />
        <LanguageSwitcher />
        <Button variant="ghost" asChild className="hidden sm:inline-flex">
          <a href="#experience">{t("Navigation.journey")}</a>
        </Button>
        <Button variant="ghost" asChild className="hidden sm:inline-flex">
          <a href="#projects">{t("Navigation.projects")}</a>
        </Button>
        <Button asChild className="text-xs sm:text-sm px-3 sm:px-4">
          <a href="#contact">{t("Navigation.contact")}</a>
        </Button>
      </div>
    </header>
  );
}
