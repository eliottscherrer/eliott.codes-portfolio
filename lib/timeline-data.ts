export interface TimelinePosition {
  id: string;
  team: string;
  period: string;
  description: string;
  tags: string[];
  iconSrc?: string;
  href?: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization?: string;
  location?: string;
  /** e.g. "Internship"; shown in the meta line, not the title */
  employmentType?: string;
  description?: string;
  tags?: string[];
  /** Several teams/roles at the same organization, oldest first. */
  positions?: TimelinePosition[];
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
      id: "infomaniak",
      period: t("items.infomaniak.period"),
      title: t("items.infomaniak.title"),
      organization: t("items.infomaniak.organization"),
      location: t("items.infomaniak.location"),
      employmentType: t("items.infomaniak.type"),
      iconSrc: "/icons/infomaniak-k-icon.svg",
      iconAlt: "Infomaniak",
      isCurrent: true,
      positions: [
        {
          id: "pos",
          iconSrc: "/icons/infomaniak-k-icon.svg",
          team: t("items.infomaniak.teams.pos.name"),
          href: t("items.infomaniak.teams.pos.url"),
          period: t("items.infomaniak.teams.pos.period"),
          description: t("items.infomaniak.teams.pos.description"),
          tags: [
            "React",
            "Gatsby",
            "Inertia.js",
            "TypeScript",
            "Figma",
            "UX/UI",
          ],
        },
        {
          id: "kchat",
          iconSrc: "/icons/infomaniak-kchat-icon.svg",
          team: t("items.infomaniak.teams.kchat.name"),
          href: t("items.infomaniak.teams.kchat.url"),
          period: t("items.infomaniak.teams.kchat.period"),
          description: t("items.infomaniak.teams.kchat.description"),
          tags: [
            "React",
            "React Native",
            "Electron",
            "TypeScript",
            "Redux",
            "Redmine",
          ],
        },
      ],
    },
  ];
}
