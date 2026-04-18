"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import {
  AnimatedLinkedin,
  AnimatedGithub,
  AnimatedMail,
  triggerGithubWag,
} from "@/components/ui/animated-social-icons";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");
  const tc = useTranslations("Common");
  const socialIconClass = "ds-icon-control group";

  const renderSocialLinks = () => (
    <div className="flex gap-2">
      <Button
        variant="glass"
        size="icon"
        aria-label={tc("github")}
        className={socialIconClass}
        asChild
        onMouseEnter={(event) => {
          triggerGithubWag(event.currentTarget);
        }}
        onFocus={(event) => {
          triggerGithubWag(event.currentTarget);
        }}
      >
        <a
          href="https://github.com/eliottscherrer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnimatedGithub />
        </a>
      </Button>
      <Button
        variant="glass"
        size="icon"
        aria-label={tc("linkedin")}
        className={socialIconClass}
        asChild
      >
        <a
          href="https://www.linkedin.com/in/eliottscherrer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnimatedLinkedin />
        </a>
      </Button>
      <Button
        variant="glass"
        size="icon"
        aria-label={tc("email")}
        className={socialIconClass}
        asChild
      >
        <a href="mailto:contact@eliott.codes">
          <AnimatedMail />
        </a>
      </Button>
    </div>
  );

  return (
    <footer className="relative mt-auto mb-20 sm:mb-16 pt-8">
      <Separator className="mb-8" />

      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="block sm:hidden mb-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-row gap-12">
              {/* Brand */}
              <div className="space-y-3 min-w-[160px] flex-grow">
                <h3 className="font-semibold text-lg">eliott.codes</h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.raw("role") }}
                />
              </div>
              {/* Quick Links */}
              <div className="space-y-3 ml-auto flex flex-col items-end text-right sm:items-start sm:text-left">
                <h4 className="font-semibold text-sm self-end sm:self-start">
                  {t("quickLinks")}
                </h4>
                <nav className="flex flex-col gap-2 items-end text-right sm:items-start sm:text-left">
                  <Link
                    href="#experience"
                    className="ds-inline-link text-sm w-fit text-right sm:text-left"
                  >
                    {t("experience")}
                  </Link>
                  <Link
                    href="#projects"
                    className="ds-inline-link text-sm w-fit text-right sm:text-left"
                  >
                    {t("projects")}
                  </Link>
                  <Link
                    href="#contact"
                    className="ds-inline-link text-sm w-fit text-right sm:text-left"
                  >
                    {t("contact")}
                  </Link>
                </nav>
              </div>
            </div>
            {/* Social */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{t("connect")}</h4>
              {renderSocialLinks()}
            </div>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">eliott.codes</h3>
            <p
              className="text-sm text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.raw("role") }}
            />
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-md">{t("quickLinks")}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#experience" className="ds-inline-link text-sm w-fit">
                {t("experience")}
              </Link>
              <Link href="#projects" className="ds-inline-link text-sm w-fit">
                {t("projects")}
              </Link>
              <Link href="#contact" className="ds-inline-link text-sm w-fit">
                {t("contact")}
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-md">{t("connect")}</h4>
            {renderSocialLinks()}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Eliott Scherrer.{" "}
              {t("allRightsReserved")}
            </p>
            <div className="flex items-center gap-3">
              <LanguageSwitcher
                side="top"
                className="ds-icon-control border-0 !border-transparent w-8 h-8 p-2 rounded-md transition-colors"
              />
              <AnimatedThemeToggler
                className="ds-icon-control border-0 !border-transparent w-8 h-8 p-2 rounded-md transition-colors flex items-center justify-center"
                aria-label={tc("toggleTheme")}
              />
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {t.rich("madeWithLoveIn", {
                  heart: () => (
                    <Heart className="size-3.5 fill-current text-blue-500" />
                  ),
                  country: () => <>{t("switzerland")}</>,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
