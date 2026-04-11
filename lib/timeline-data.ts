export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization?: string;
  location?: string;
  description: string;
  tags: string[];
  isCurrent?: boolean;
  iconSrc?: string;
  iconAlt?: string;
}

type TimelineTranslator = (key: string) => string;

export function getExperienceTimeline(t: TimelineTranslator): TimelineItem[] {
  return [
    {
      id: "cfc-etml",
      period: t("items.cfc.period"),
      title: t("items.cfc.title"),
      organization: t("items.cfc.organization"),
      location: t("items.cfc.location"),
      iconSrc: "/icons/etml-icon.svg",
      iconAlt: "ETML",
      description: t("items.cfc.description"),
      tags: ["JavaScript", "Docker", "C#", "MySQL", "Git", "Agile"],
    },
    {
      id: "stage-infomaniak",
      period: t("items.pos.period"),
      title: t("items.pos.title"),
      organization: t("items.pos.organization"),
      location: t("items.pos.location"),
      iconSrc: "/icons/infomaniak-k-icon.svg",
      iconAlt: "infomaniak",
      description: t("items.pos.description"),
      tags: ["React", "Gatsby", "Inertia.js", "TypeScript", "Figma", "UX/UI"],
    },
    {
      id: "kchat-team",
      period: t("items.kchat.period"),
      title: t("items.kchat.title"),
      organization: t("items.kchat.organization"),
      location: t("items.kchat.location"),
      iconSrc: "/icons/infomaniak-kchat-icon.svg",
      iconAlt: "kChat",
      description: t("items.kchat.description"),
      tags: ["React", "React Native", "Electron", "TypeScript", "Redux", "Redmine"],
      isCurrent: true,
    },
  ];
}