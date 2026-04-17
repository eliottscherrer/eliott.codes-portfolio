"use client";

import { Separator } from "@/components/ui/separator";
import DarkVeil from "@/components/DarkVeil";
import GradualBlur from "@/components/GradualBlur";
import Footer from "@/components/Footer";
import HomeNavigation from "@/components/HomeNavigation";

import HeroSection from "@/components/sections/HeroSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomeClient() {
  return (
    <>
      {/* Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.4,
          zIndex: -1,
        }}
      >
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
          style={{ pointerEvents: "none" }}
        />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen mx-auto max-w-4xl px-4 sm:px-6 md:px-8 pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-6 md:pb-16 relative outline-none"
      >
        <HomeNavigation />
        <HeroSection />
        <TechnologiesSection />
        <Separator className="my-12 sm:my-16" />
        <ExperienceSection />
        <Separator className="my-12 sm:my-16" />
        <ProjectsSection />
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
