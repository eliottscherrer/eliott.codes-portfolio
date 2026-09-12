"use client";

import type { ReactNode } from "react";
import { SiCplusplus, SiGo, SiRust } from "react-icons/si";
import { useTranslations } from "next-intl";

import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
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

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Languages I'm picking up: an honest line each, no skill bars */}
        <div className="ds-surface-card space-y-4 rounded-2xl p-5">
          <p className="ds-eyebrow">{t("learning.label")}</p>
          <ul className="space-y-3.5">
            {LEARNING.map(({ key, icon, label, color }) => (
              <li key={key} className="group/tech flex gap-3">
                <TechLogo
                  icon={icon}
                  brandColor={color}
                  size="lg"
                  className="mt-0.5 shrink-0 self-start text-muted-foreground"
                />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">{label}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`learning.${key}`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* The homelab this very site runs on */}
        <div className="ds-surface-card flex flex-col gap-4 rounded-2xl p-5">
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
          <p className="text-sm leading-relaxed text-muted-foreground/80">
            {t("homelab.runs")}
          </p>
          <p className="mt-auto border-t border-[var(--surface-border)] pt-4 text-sm leading-relaxed text-muted-foreground">
            {t("homelab.meta")}
          </p>
        </div>
      </div>
    </section>
  );
}
