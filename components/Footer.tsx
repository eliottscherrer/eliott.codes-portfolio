"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  AnimatedLinkedin,
  AnimatedGithub,
  AnimatedMail,
  triggerGithubWag,
} from "@/components/ui/animated-social-icons";

export default function Footer() {
  const t = useTranslations("Footer");
  const tc = useTranslations("Common");

  const links = [
    { href: "#experience", label: t("experience") },
    { href: "#projects", label: t("projects") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <footer className="mt-24 sm:mt-28 pb-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <div className="border-t border-border pt-8 sm:pt-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand */}
            <div className="space-y-1">
              <p className="font-semibold">eliott.codes</p>
              <p className="text-sm text-muted-foreground">{t("role")}</p>
            </div>

            <div className="flex gap-12 sm:gap-16">
              {/* Links */}
              <div className="space-y-3">
                <p className="text-sm font-semibold">{t("quickLinks")}</p>
                <nav className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="ds-focus-ring relative w-fit rounded-sm text-sm text-muted-foreground transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:text-foreground hover:after:scale-x-100 focus-visible:after:scale-x-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Social */}
              <div className="space-y-3">
                <p className="text-sm font-semibold">{t("connect")}</p>
                <div className="flex gap-2">
                  <Button
                    variant="glass"
                    size="icon"
                    aria-label={tc("linkedin")}
                    className="ds-icon-control group"
                    asChild
                  >
                    <Link
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AnimatedLinkedin />
                    </Link>
                  </Button>
                  <Button
                    variant="glass"
                    size="icon"
                    aria-label={tc("github")}
                    className="ds-icon-control group"
                    asChild
                    onMouseEnter={(event) =>
                      triggerGithubWag(event.currentTarget)
                    }
                    onFocus={(event) => triggerGithubWag(event.currentTarget)}
                  >
                    <Link
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Eliott Scherrer.{" "}
              {t("allRightsReserved")}
            </p>
            <p className="flex items-center gap-1.5">
              {t.rich("madeWithLoveIn", {
                heart: () => (
                  <Heart
                    className="size-3.5 fill-current text-brand"
                    aria-hidden="true"
                  />
                ),
                country: () => <>{t("switzerland")}</>,
              })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
