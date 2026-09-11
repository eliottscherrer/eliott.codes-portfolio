"use client";

import LogoLoop from "@/components/LogoLoop";
import { frontendTech, backendTech } from "@/lib/tech-data";
import { useTranslations } from "next-intl";

const loopProps = {
  speed: 28,
  logoHeight: 22,
  gap: 36,
  pauseOnHover: true,
  scaleOnHover: true,
} as const;

export default function TechnologiesSection() {
  const tc = useTranslations("Common");

  return (
    <div className="mt-12 sm:mt-14 space-y-4">
      <p className="ds-eyebrow">{tc("technologies")}</p>
      <div className="space-y-3 text-muted-foreground">
        <div className="ds-fade-x">
          <LogoLoop
            {...loopProps}
            logos={frontendTech}
            direction="right"
            ariaLabel={tc("frontendTechnologies")}
          />
        </div>
        <div className="ds-fade-x">
          <LogoLoop
            {...loopProps}
            logos={backendTech}
            direction="left"
            ariaLabel={tc("backendTechnologiesTools")}
          />
        </div>
      </div>
    </div>
  );
}
