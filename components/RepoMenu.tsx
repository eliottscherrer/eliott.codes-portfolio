"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Globe, Monitor, Smartphone } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Repo } from "@/lib/timeline-data";

const ICONS = { web: Globe, desktop: Monitor, mobile: Smartphone };

/** Small GitHub button that opens the list of public repos the team ships. */
export default function RepoMenu({ repos }: { repos: Repo[] }) {
  const t = useTranslations("Timeline.repos");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={t("label")}
        className="ds-focus-ring group/repos flex size-6 items-center justify-center rounded-full border border-black/15 bg-[var(--surface-elevated)] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground data-[state=open]:border-foreground/30 data-[state=open]:text-foreground dark:border-white/10"
      >
        <FaGithub className="size-3.5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="bg-surface-glass backdrop-blur-xl border-surface-border shadow-lg transform-gpu"
      >
        <DropdownMenuLabel className="ds-eyebrow px-2 pb-1 pt-1.5 text-[10px] font-semibold">
          {t("label")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[var(--surface-border)]" />
        {repos.map((repo) => {
          const Icon = ICONS[repo.kind];
          return (
            <DropdownMenuItem
              key={repo.name}
              asChild
              className="group/repo cursor-pointer gap-2.5 text-foreground/85 transition-colors data-[highlighted]:bg-foreground/8 data-[highlighted]:text-foreground focus:bg-foreground/8 focus:text-foreground"
            >
              <a href={repo.href} target="_blank" rel="noopener noreferrer">
                <Icon
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm">{repo.name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {t(repo.kind)}
                  </span>
                </span>
                <ArrowUpRight
                  className="ml-auto size-3.5 text-muted-foreground transition-[color,translate] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[highlighted]/repo:-translate-y-0.5 group-data-[highlighted]/repo:translate-x-0.5 group-data-[highlighted]/repo:text-foreground"
                  aria-hidden="true"
                />
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
