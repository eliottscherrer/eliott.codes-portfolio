"use client"

import { useMemo } from "react";
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { getExperienceTimeline } from '@/lib/timeline-data';
import { useTranslations } from "next-intl";

export default function ExperienceSection() {
  const t = useTranslations();
  const tt = useTranslations("Timeline");
  const timelineItems = useMemo(() => getExperienceTimeline(tt), [tt]);

  return (
    <section id="experience" className="space-y-6 sm:space-y-8">
      <h2 className="text-2xl sm:text-3xl font-semibold">{t("Timeline.title")}</h2>
      <ExperienceTimeline items={timelineItems} />
    </section>
  );
}
