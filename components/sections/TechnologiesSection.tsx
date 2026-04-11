"use client"

import LogoLoop from '@/components/LogoLoop';
import { frontendTech, backendTech } from '@/lib/tech-data';
import { useTranslations } from "next-intl";

export default function TechnologiesSection() {
  const tc = useTranslations("Common");

  return (
    <div className="mt-12 sm:mt-16 space-y-4 sm:space-y-6">
      {/* Fade out using alpha mask */}
      <div style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)'
      }}>
        <LogoLoop
          logos={frontendTech}
          speed={30}
          direction="right"
          logoHeight={32}
          gap={40}
          pauseOnHover
          scaleOnHover
          ariaLabel={tc("frontendTechnologies")}
        />
      </div>
      {/* Fade out using alpha mask */}
      <div style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black clamp(24px, 8%, 120px), black calc(100% - clamp(24px, 8%, 120px)), transparent 100%)'
      }}>
        <LogoLoop
          logos={backendTech}
          speed={30}
          direction="left"
          logoHeight={32}
          gap={40}
          pauseOnHover
          scaleOnHover
          ariaLabel={tc("backendTechnologiesTools")}
        />
      </div>
    </div>
  );
}
