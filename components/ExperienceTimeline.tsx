"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import SpotlightCard from "@/components/SpotlightCard";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/lib/timeline-data";

interface ExperienceTimelineProps {
  items: TimelineItem[];
  title?: string;
  className?: string;
}

interface GroupedTimeline {
  period: string;
  entries: Array<TimelineItem & { index: number }>;
}

function buildGroupedTimeline(items: TimelineItem[]): GroupedTimeline[] {
  const grouped = new Map<string, Array<TimelineItem & { index: number }>>();

  items.forEach((item, index) => {
    const existing = grouped.get(item.period);
    const entry = { ...item, index };

    if (existing) {
      existing.push(entry);
      return;
    }

    grouped.set(item.period, [entry]);
  });

  return Array.from(grouped.entries()).map(([period, entries]) => ({
    period,
    entries,
  }));
}

export default function ExperienceTimeline({
  items,
  title,
  className,
}: ExperienceTimelineProps) {
  const tt = useTranslations("Timeline");
  const timelineBodyRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineBodyRef,
    offset: ["start 82%", "end 24%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.45,
  });

  const groupedTimeline = useMemo(() => buildGroupedTimeline(items), [items]);
  const resolvedTitle = title ?? tt("title");

  return (
    <section
      id="timeline"
      className={cn("relative space-y-8 sm:space-y-10", className)}
      aria-labelledby="timeline-title"
    >
      <h2 id="timeline-title" className="text-2xl sm:text-3xl font-semibold">
          {resolvedTitle}
      </h2>

      <div ref={timelineBodyRef} className="w-full space-y-1 relative">
        <div className="pointer-events-none absolute left-3.75 sm:left-4 top-12 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-border/40 via-border to-border/40" aria-hidden="true" />
        <motion.div
          className="pointer-events-none absolute left-3.75 sm:left-4 top-12 bottom-0 w-[2px] rounded-full origin-top bg-gradient-to-b from-primary/25 via-primary/55 to-primary/15"
          style={{
            scaleY: shouldReduceMotion ? 1 : lineProgress,
          }}
          aria-hidden="true"
        />

        {groupedTimeline.map((group) => (
          <div key={group.period} className="w-full">
            <h3 className="ps-2 my-3 first:mt-0 pl-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {group.period}
            </h3>

            {group.entries.map((item, entryPosition) => {
              const isLastInGroup = entryPosition === group.entries.length - 1;

              return (
                <div key={item.id} className="flex gap-x-3 sm:gap-x-4">
                  <div
                    className={cn(
                      "relative",
                      !isLastInGroup &&
                        "after:absolute after:top-8 after:bottom-0 after:start-4 after:-translate-x-[0.5px] after:border-s after:border-border/70"
                    )}
                    aria-hidden="true"
                  >
                    <div className="relative z-10 size-8 flex items-center justify-center">
                      {item.iconSrc ? (
                        <span className="flex shrink-0 justify-center items-center size-8 rounded-full border border-black/10 dark:border-white/10 bg-card/95 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
                          <Image
                            src={item.iconSrc}
                            alt={item.iconAlt ?? item.organization ?? item.title}
                            width={32}
                            height={32}
                            className="size-8 object-cover"
                          />
                        </span>
                      ) : (
                        <span className="flex shrink-0 justify-center items-center size-8 rounded-full border border-black/10 dark:border-white/10 bg-card/95 text-foreground shadow-[0_6px_20px_-12px_rgba(0,0,0,0.7)]">
                          <span className="text-[11px] font-semibold uppercase text-foreground/80">
                            {(item.iconAlt?.[0] ?? item.organization?.[0] ?? item.title[0] ?? "•")}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  <article
                    tabIndex={0}
                    className={cn(
                      "group relative grow pt-0.5 pb-8 outline-none"
                    )}
                    aria-label={`${item.period} - ${item.title}`}
                  >
                    <SpotlightCard
                      className="flex flex-col w-full h-full p-0 bg-card/40 hover:bg-card/60 transition-all duration-500 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 overflow-hidden rounded-2xl"
                      spotlightColor="rgba(14, 100, 180, 0.15)"
                    >

                      {item.isCurrent && (
                        <Badge className="absolute right-5 top-5 z-10 rounded-full px-2.5 py-1 text-[10px] tracking-wide font-semibold">
                          {tt("current")}
                        </Badge>
                      )}

                      <div className="relative p-4 sm:p-5 space-y-3.5">
                        <h3 className="flex items-start gap-x-2 text-[15px] sm:text-base font-semibold text-foreground leading-snug">
                          {item.title}
                        </h3>

                        {(item.organization || item.location) && (
                          <p className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
                            {item.organization && (
                              <span className="font-medium text-foreground/90">
                                {item.organization}
                              </span>
                            )}
                            {item.organization && item.location && (
                              <span aria-hidden="true">•</span>
                            )}
                            {item.location && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="size-3.5" aria-hidden="true" />
                                {item.location}
                              </span>
                            )}
                          </p>
                        )}

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.tags.map((tag) => (
                            <Badge
                              key={`${item.id}-${tag}`}
                              variant="secondary"
                              className="rounded-full border border-black/10 dark:border-white/10 bg-secondary/70 px-2.5 py-1 text-[11px] text-foreground/85"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </article>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}