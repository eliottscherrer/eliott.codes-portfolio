"use client";

import { Server } from "lucide-react";
import { SiCplusplus, SiGo, SiRust } from "react-icons/si";
import { useTranslations } from "next-intl";

import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
import ServiceLink from "@/components/ServiceLink";
import SpotlightCard from "@/components/SpotlightCard";
import TechLogo from "@/components/TechLogo";

// Brand colors from Simple Icons (https://simpleicons.org/), Rust in its usual orange
// since its official black would just inherit the text color.
const LEARNING = [
  { key: "go", icon: <SiGo />, label: "Go", color: "#00ADD8" },
  { key: "rust", icon: <SiRust />, label: "Rust", color: "#CE422B" },
  { key: "cpp", icon: <SiCplusplus />, label: "C++", color: "#00599C" },
] as const;

const CARD_CLASS =
  "ds-surface-card rounded-2xl bg-[var(--surface-glass)] p-5 transition-colors duration-500 hover:border-foreground/20";
const SPOTLIGHT = "rgba(14, 100, 180, 0.15)" as const;

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
              className={`${CARD_CLASS} group/tech flex h-full flex-col gap-2`}
              spotlightColor={SPOTLIGHT}
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
        <SpotlightCard
          className={`${CARD_CLASS} group/homelab space-y-2.5`}
          spotlightColor={SPOTLIGHT}
        >
          <div className="flex items-center gap-2">
            <Server
              className="size-5 text-muted-foreground transition-colors duration-300 group-hover/homelab:text-foreground"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">{t("homelab.label")}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t.rich("homelab.description", {
              traefik: (chunks) => (
                <ServiceLink href="https://traefik.io" logo="traefik">
                  {chunks}
                </ServiceLink>
              ),
              tailscale: (chunks) => (
                <ServiceLink href="https://tailscale.com" logo="tailscale">
                  {chunks}
                </ServiceLink>
              ),
            })}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("homelab.runs")}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t.rich("homelab.meta", {
              dokploy: (chunks) => (
                <ServiceLink href="https://dokploy.com" logo="dokploy">
                  {chunks}
                </ServiceLink>
              ),
            })}
          </p>
        </SpotlightCard>
      </div>
    </section>
  );
}
