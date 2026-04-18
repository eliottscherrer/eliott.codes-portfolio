"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
import { Badge } from "@/components/ui/badge";
import { getExperienceTimeline, type TimelineItem } from "@/lib/timeline-data";
import { cn } from "@/lib/utils";

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

export default function ExperienceSection() {
  const tt = useTranslations("Timeline");
  const timelineItems = useMemo(() => getExperienceTimeline(tt), [tt]);
  const groupedTimeline = useMemo(
    () => buildGroupedTimeline(timelineItems),
    [timelineItems],
  );

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

  return (
    <section
      id="experience"
      className="relative space-y-8 sm:space-y-10 ds-anchor-target"
      aria-labelledby="timeline-title"
    >
      <SectionAnchorHeading anchorId="experience" headingId="timeline-title">
        {tt("title")}
      </SectionAnchorHeading>

      <div ref={timelineBodyRef} className="relative w-full space-y-1">
        <div
          className="pointer-events-none absolute left-3.75 sm:left-4 top-12 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-border/40 via-border to-border/40"
          aria-hidden="true"
        />
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
              const lightIconSrc = item.iconSrc?.replace(".svg", "-light.svg");

              return (
                <div key={item.id} className="flex gap-x-3 sm:gap-x-4">
                  <div
                    className={cn(
                      "relative",
                      !isLastInGroup &&
                        "after:absolute after:top-8 after:bottom-0 after:start-4 after:-translate-x-[0.5px] after:border-s after:border-border/70",
                    )}
                    aria-hidden="true"
                  >
                    <div className="relative z-10 size-8 flex items-center justify-center">
                      {item.iconSrc ? (
                        <span className="flex shrink-0 justify-center items-center size-8 rounded-full border border-black/15 dark:border-white/10 bg-[var(--surface-elevated)] shadow-[0_6px_20px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
                          <Image
                            src={item.iconSrc}
                            alt={
                              item.iconAlt ?? item.organization ?? item.title
                            }
                            width={32}
                            height={32}
                            className="hidden size-8 object-cover dark:block"
                          />
                          <Image
                            src={lightIconSrc ?? item.iconSrc}
                            alt=""
                            aria-hidden="true"
                            width={32}
                            height={32}
                            className="block size-8 object-cover dark:hidden"
                          />
                        </span>
                      ) : (
                        <span className="flex shrink-0 justify-center items-center size-8 rounded-full border border-black/15 dark:border-white/10 bg-[var(--surface-elevated)] text-foreground shadow-[0_6px_20px_-12px_rgba(0,0,0,0.7)]">
                          <span className="text-[11px] font-semibold uppercase text-foreground/80">
                            {item.iconAlt?.[0] ??
                              item.organization?.[0] ??
                              item.title[0] ??
                              "•"}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  <article
                    tabIndex={0}
                    className={cn(
                      "group relative grow pt-0.5 pb-8 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl",
                    )}
                    aria-label={`${item.period} - ${item.title}`}
                  >
                    <SpotlightCard
                      className="flex flex-col w-full h-full p-0 bg-[var(--surface-glass)] hover:bg-[var(--surface-elevated)] transition-[background-color,border-color,box-shadow] duration-500 border border-[var(--surface-border)] hover:border-foreground/20 backdrop-blur-xl overflow-hidden rounded-2xl"
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
                                <MapPin
                                  className="size-3.5"
                                  aria-hidden="true"
                                />
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
                              variant="glass"
                              className="rounded-full px-2.5 py-1 text-[11px] text-foreground/85"
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
