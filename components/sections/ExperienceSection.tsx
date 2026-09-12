"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  Fragment,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, MapPin } from "lucide-react";

import RepoMenu from "@/components/RepoMenu";
import LinkPreview from "@/components/ui/link-preview";
import SpotlightCard from "@/components/SpotlightCard";
import SectionAnchorHeading from "@/components/ui/section-anchor-heading";
import { Badge } from "@/components/ui/badge";
import { getExperienceTimeline, type TimelineItem } from "@/lib/timeline-data";
import { cn } from "@/lib/utils";

// Day granularity keeps the snapshot stable, and a static build from before a period ended
// simply re-renders with the right labels on the client.
const DAY_MS = 86_400_000;
const subscribeToNothing = () => () => {};
const getDayIndex = () => Math.floor(Date.now() / DAY_MS);
// Hydrate with the day the site was built (what the static HTML shows); React then
// re-renders with the real day without a hydration mismatch.
const getBuildDayIndex = () =>
  Number(process.env.NEXT_PUBLIC_BUILD_DAY ?? getDayIndex());

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

/** Round logo with a dark/light variant pair (`x.svg` / `x-light.svg`). */
function TimelineLogo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const lightSrc = src.replace(".svg", "-light.svg");

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/15 bg-[var(--surface-elevated)] dark:border-white/10",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="hidden size-full object-cover dark:block"
      />
      <Image
        src={lightSrc}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="block size-full object-cover dark:hidden"
      />
    </span>
  );
}

function TagList({
  tags,
  keyPrefix,
  trailing,
}: {
  tags: string[];
  keyPrefix: string;
  /** Extra chip rendered after the tags, e.g. the open source menu. */
  trailing?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      {tags.map((tag) => (
        <Badge
          key={`${keyPrefix}-${tag}`}
          variant="glass"
          className="rounded-full px-2.5 py-1 text-xs text-foreground/85"
        >
          {tag}
        </Badge>
      ))}
      {trailing}
    </div>
  );
}

export default function ExperienceSection() {
  const tt = useTranslations("Timeline");
  const locale = useLocale();
  const day = useSyncExternalStore(
    subscribeToNothing,
    getDayIndex,
    getBuildDayIndex,
  );
  const timelineItems = useMemo(
    () => getExperienceTimeline(tt, locale, day * DAY_MS),
    [tt, locale, day],
  );
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
      <SectionAnchorHeading
        anchorId="experience"
        headingId="timeline-title"
        description={tt("subtitle")}
      >
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
            <h3 className="ds-eyebrow my-3 first:mt-0 pl-12">{group.period}</h3>

            {group.entries.map((item, entryPosition) => {
              const isLastInGroup = entryPosition === group.entries.length - 1;
              const positions = item.positions ?? [];
              const meta = [
                item.organization && (
                  <span key="org" className="font-medium text-foreground/90">
                    {item.organization}
                  </span>
                ),
                item.location && (
                  <span key="loc" className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {item.location}
                  </span>
                ),
              ].filter(Boolean);

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
                        <TimelineLogo
                          src={item.iconSrc}
                          alt={item.iconAlt ?? item.organization ?? item.title}
                          className="size-8 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.7)]"
                        />
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

                  <article className="group relative grow pt-0.5 pb-8">
                    <SpotlightCard
                      className="flex flex-col w-full h-full p-0"
                      spotlightColor="rgba(14, 100, 180, 0.15)"
                    >
                      <div className="relative p-4 sm:p-5 space-y-3.5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-[15px] sm:text-base font-semibold text-foreground leading-snug">
                            {item.title}
                            {item.employmentType && (
                              <span className="ml-2 text-sm font-normal text-muted-foreground">
                                <span aria-hidden="true">• </span>
                                {item.employmentType}
                              </span>
                            )}
                          </h3>
                          {item.isCurrent && (
                            <Badge
                              variant="glass"
                              className="shrink-0 gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium text-foreground/85"
                            >
                              <span
                                className="size-1.5 rounded-full bg-emerald-500"
                                aria-hidden="true"
                              />
                              {tt("current")}
                            </Badge>
                          )}
                        </div>

                        {meta.length > 0 && (
                          <p className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
                            {meta.map((node, index) => (
                              <Fragment key={index}>
                                {index > 0 && <span aria-hidden="true">•</span>}
                                {node}
                              </Fragment>
                            ))}
                          </p>
                        )}

                        {positions.length > 0 ? (
                          /* Several teams at the same organization: inner rail, oldest first */
                          <ol className="mt-1">
                            {positions.map((position, positionIndex) => {
                              const isLastPosition =
                                positionIndex === positions.length - 1;

                              return (
                                <li key={position.id} className="flex gap-x-3">
                                  <div
                                    className={cn(
                                      "relative flex w-6 shrink-0 justify-center",
                                      !isLastPosition &&
                                        "after:absolute after:top-7 after:bottom-0 after:left-[calc(50%-0.5px)] after:w-px after:bg-border/70",
                                    )}
                                    aria-hidden="true"
                                  >
                                    {position.iconSrc ? (
                                      <TimelineLogo
                                        src={position.iconSrc}
                                        alt=""
                                        className="relative z-10 mt-0.5 size-6"
                                      />
                                    ) : (
                                      <span className="relative z-10 mt-2 size-2 rounded-full bg-muted-foreground/60" />
                                    )}
                                  </div>

                                  <div
                                    className={cn(
                                      "min-w-0 grow space-y-2",
                                      !isLastPosition && "pb-5",
                                    )}
                                  >
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                      <span className="inline-flex items-center gap-2">
                                        {position.href ? (
                                          <LinkPreview
                                            href={position.href}
                                            preview={position.previewSrc}
                                            className="group/team ds-focus-ring inline-flex items-center gap-1 rounded-sm text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
                                          >
                                            {position.team}
                                            <ArrowUpRight
                                              className="size-3.5 text-muted-foreground transition-[color,translate] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/team:-translate-y-0.5 group-hover/team:translate-x-0.5 group-hover/team:text-foreground group-focus-visible/team:-translate-y-0.5 group-focus-visible/team:translate-x-0.5"
                                              aria-hidden="true"
                                            />
                                          </LinkPreview>
                                        ) : (
                                          <p className="text-sm font-medium text-foreground/90">
                                            {position.team}
                                          </p>
                                        )}
                                      </span>
                                      <p className="text-xs text-muted-foreground">
                                        {position.period}
                                      </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {position.description}
                                    </p>
                                    <TagList
                                      tags={position.tags}
                                      keyPrefix={`${item.id}-${position.id}`}
                                      trailing={
                                        position.repos && (
                                          <RepoMenu repos={position.repos} />
                                        )
                                      }
                                    />
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
                        ) : (
                          <>
                            {item.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <TagList tags={item.tags} keyPrefix={item.id} />
                            )}
                          </>
                        )}
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
