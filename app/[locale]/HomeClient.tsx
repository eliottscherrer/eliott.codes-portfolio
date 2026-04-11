"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DarkVeil from "@/components/DarkVeil";
import GradualBlur from "@/components/GradualBlur";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import Footer from "@/components/Footer"
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

import HeroSection from "@/components/sections/HeroSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomeClient() {
  const t = useTranslations();
  const tc = useTranslations("Common");

  return (
    <>
      {/* Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.4,
        zIndex: -1
      }}>
        <DarkVeil
          speed={0.5}
          hueShift={35}
          noiseIntensity={0}
          scanlineFrequency={0}
          scanlineIntensity={0}
          warpAmount={5}
          resolutionScale={1}
          alpha={10}
          alphaThreshold={0.08}
          style={{ pointerEvents: 'none' }}
        />
      </div>

      <main className="min-h-screen mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 md:py-16 relative">
        {/* Navigation */}
        <header className="flex items-center justify-between mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm font-medium">eliott.codes</Link>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <AnimatedThemeToggler aria-label={tc("toggleTheme")} className="bg-transparent hover:bg-accent rounded-md w-8 h-8 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4" />
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

        {/* Hero Section */}
        <HeroSection />

        {/* Technologies Section */}
        <TechnologiesSection />

        <Separator className="my-12 sm:my-16" />

        {/* Experience Section */}
        <ExperienceSection />

        <Separator className="my-12 sm:my-16" />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />

        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </main>

      <Footer />
    </>
  );
}

