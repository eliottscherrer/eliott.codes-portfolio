import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import TechLogo from "@/components/TechLogo";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export interface StackItem {
  icon: React.ReactNode;
  label: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  cover?: string | null;
  stack?: StackItem[];
}

export default function ProjectCard({
  title,
  description,
  link,
  cover,
  stack = [],
}: ProjectCardProps) {
  const t = useTranslations("Projects");
  const isExternal = link.startsWith("http");

  return (
    <Link
      href={link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group group/tech block h-full rounded-2xl ds-focus-ring transition-opacity duration-300 [@media(hover:hover)]:group-has-[a:hover]/grid:opacity-60 group-has-[a:focus-visible]/grid:opacity-60 hover:!opacity-100 focus-visible:!opacity-100"
    >
      <SpotlightCard
        className="ds-surface-card flex h-full w-full flex-col overflow-hidden rounded-2xl p-0 bg-[var(--surface-glass)] hover:bg-[var(--surface-elevated)] hover:border-foreground/20 transition-[background-color,border-color] duration-500"
        spotlightColor="rgba(14, 100, 180, 0.15)"
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-[var(--surface-border)]">
          {cover ? (
            <Image
              src={cover}
              alt=""
              fill
              sizes="(min-width: 640px) 440px, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/5 to-primary/10" />
          )}
        </div>

        {/* Body */}
        <div className="relative flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
              {title}
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-[color,translate] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
            />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {description}
          </p>

          {stack.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {stack.map((item) => (
                <li key={item.label}>
                  <Badge
                    variant="glass"
                    className="rounded-full p-0 font-normal text-muted-foreground"
                  >
                    <TechLogo
                      icon={item.icon}
                      label={item.label}
                      size="sm"
                      labelSize="xs"
                      className="px-2.5 py-1"
                    />
                  </Badge>
                </li>
              ))}
            </ul>
          )}

          <span className="sr-only">{t("viewProject")}</span>
        </div>
      </SpotlightCard>
    </Link>
  );
}
