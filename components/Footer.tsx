"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="relative mt-auto mb-20 sm:mb-12 pt-8">
      <Separator className="mb-8" />
      
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="block sm:hidden mb-8">
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-row gap-12">
              {/* Brand */}
              <div className="space-y-3 min-w-[160px] flex-grow">
                <h3 className="font-semibold text-lg">eliott.codes</h3>
                <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("role") }} />
              </div>
              {/* Quick Links */}
              <div className="space-y-3 ml-auto flex flex-col items-end text-right sm:items-start sm:text-left">
                <h4 className="font-semibold text-sm self-end sm:self-start">{t("quickLinks")}</h4>
                <nav className="flex flex-col gap-2 items-end text-right sm:items-start sm:text-left">
                  <a 
                    href="#projects" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit text-right sm:text-left"
                  >
                    {t("projects")}
                  </a>
                  <a 
                    href="#contact" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit text-right sm:text-left"
                  >
                    {t("contact")}
                  </a>
                  <a 
                    href="mailto:contact@eliott.codes" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit text-right sm:text-left"
                  >
                    {t("email")}
                  </a>
                </nav>
              </div>
            </div>
            {/* Social */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Connect</h4>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  aria-label="GitHub"
                  className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                  asChild
                >
                  <a href="https://github.com/eliottscherrer" target="_blank" rel="noopener noreferrer">
                    <Github className="size-4" />
                  </a>
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  aria-label="LinkedIn"
                  className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/eliottscherrer/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="size-4" />
                  </a>
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  aria-label="Email"
                  className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                  asChild
                >
                  <a href="mailto:contact@eliott.codes">
                    <Mail className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">eliott.codes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("role") }} />
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("quickLinks")}</h4>
            <nav className="flex flex-col gap-2">
              <a 
                href="#projects" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {t("projects")}
              </a>
              <a 
                href="#contact" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {t("contact")}
              </a>
              <a 
                href="mailto:contact@eliott.codes" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {t("email")}
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Connect</h4>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                aria-label="GitHub"
                className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                asChild
              >
                <a href="https://github.com/eliottscherrer" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                </a>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                aria-label="LinkedIn"
                className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                asChild
              >
                <a href="https://www.linkedin.com/in/eliottscherrer/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="size-4" />
                </a>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                aria-label="Email"
                className="bg-background/10 dark:bg-input/30 hover:dark:bg-input/50 backdrop-blur-sm border !border-border dark:!border-input"
                asChild
              >
                <a href="mailto:contact@eliott.codes">
                  <Mail className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Eliott Scherrer. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <LanguageSwitcher side="top" className="w-8 h-8 p-2 rounded-md bg-background/10 dark:bg-input/30 hover:bg-accent hover:text-accent-foreground transition-colors" />
              <AnimatedThemeToggler
                className="w-8 h-8 p-2 rounded-md bg-background/10 dark:bg-input/30 hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center"
                aria-label="Toggle theme"
              />
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                Made with <Heart className="size-3.5 fill-current text-blue-500" /> in Switzerland
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
