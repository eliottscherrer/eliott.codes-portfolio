"use client";

import type { ReactNode } from "react";
import { SiCplusplus, SiGo, SiRust } from "react-icons/si";
import { useTranslations } from "next-intl";

import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
import SpotlightCard from "@/components/SpotlightCard";
import TechLogo from "@/components/TechLogo";

// Brand colors from Simple Icons (https://simpleicons.org/), Rust in its usual orange
// since its official black would just inherit the text color.
const LEARNING = [
  { key: "go", icon: <SiGo />, label: "Go", color: "#00ADD8" },
  { key: "rust", icon: <SiRust />, label: "Rust", color: "#CE422B" },
  { key: "cpp", icon: <SiCplusplus />, label: "C++", color: "#00599C" },
] as const;

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ds-inline-link ds-focus-ring text-foreground"
    >
      {children}
    </a>
  );
}

export default function OffTheClockSection() {
  const t = useTranslations("OffTheClock");

  return (
    <section
      id="off-the-clock"
      className="space-y-6 sm:space-y-8 ds-anchor-target"
    >
      <SectionAnchorHeading
        anchorId="off-the-clock"
        description={t("subtitle")}
      >
        {t("title")}
      </SectionAnchorHeading>

      <div className="space-y-4">
        {/* One small card per language, so nothing has to stretch to match a neighbour */}
        <div className="grid gap-4 sm:grid-cols-3">
          {LEARNING.map(({ key, icon, label, color }) => (
            <SpotlightCard
              key={key}
              className="ds-surface-card group/tech flex h-full flex-col gap-2 rounded-2xl bg-[var(--surface-glass)] p-5"
              spotlightColor="rgba(14, 100, 180, 0.15)"
            >
              <div className="flex items-center gap-2">
                <TechLogo
                  icon={icon}
                  brandColor={color}
                  size="lg"
                  className="text-muted-foreground"
                />
                <p className="text-sm font-medium">{label}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`learning.${key}`)}
              </p>
            </SpotlightCard>
          ))}
        </div>

        {/* The homelab this very site runs on */}
        <div className="ds-surface-card space-y-2.5 rounded-2xl bg-[var(--surface-glass)] p-5">
          <p className="ds-eyebrow">{t("homelab.label")}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t.rich("homelab.description", {
              dokploy: (chunks) => (
                <ExternalLink href="https://dokploy.com">{chunks}</ExternalLink>
              ),
              traefik: (chunks) => (
                <ExternalLink href="https://traefik.io">{chunks}</ExternalLink>
              ),
              tailscale: (chunks) => (
                <ExternalLink href="https://tailscale.com">
                  {chunks}
                </ExternalLink>
              ),
            })}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("homelab.runs")}
          </p>
          <p className="text-sm leading-relaxed text-foreground/90">
            {t("homelab.meta")}
          </p>
        </div>
      </div>
    </section>
  );
}
