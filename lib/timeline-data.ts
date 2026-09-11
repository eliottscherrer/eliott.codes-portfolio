import { formatPeriod, isOngoing, type Period } from "@/lib/format-period";

export interface Repo {
  name: string;
  kind: "web" | "desktop" | "mobile";
  href: string;
}

export interface TimelinePosition {
  id: string;
  team: string;
  period: string;
  description: string;
  tags: string[];
  iconSrc?: string;
  href?: string;
  /** Prerendered screenshot of `href`, shown on hover. */
  previewSrc?: string;
  /** Public source code of what the team ships. */
  repos?: Repo[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization?: string;
  location?: string;
  /** e.g. "Internship"; shown next to the title, not in the meta line */
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

// Dates live here; labels ("March 2026 – Today") are derived per locale at render time,
// so the kChat entry closes itself once 31 January 2027 has passed.
const PERIODS = {
  cfc: { start: "2023-09", end: "2027-07" },
  infomaniak: { start: "2026-02", end: "2027-01-31", today: true },
  pos: { start: "2026-02", end: "2026-03" },
  kchat: { start: "2026-03", end: "2027-01-31", today: true },
} satisfies Record<string, Period>;

const KCHAT_REPOS: Repo[] = [
  {
    name: "webapp-kChat",
    kind: "web",
    href: "https://github.com/Infomaniak/webapp-kChat",
  },
  {
    name: "desktop-kChat",
    kind: "desktop",
    href: "https://github.com/Infomaniak/desktop-kChat",
  },
  {
    name: "mobile-kchat",
    kind: "mobile",
    href: "https://github.com/Infomaniak/mobile-kchat",
  },
];

export function getExperienceTimeline(
  t: TimelineTranslator,
  locale: string,
  now: number,
): TimelineItem[] {
  const period = (value: Period) =>
    formatPeriod(locale, value, t("today"), now);

  return [
    {
      id: "cfc-etml",
      period: period(PERIODS.cfc),
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
      period: period(PERIODS.infomaniak),
      title: t("items.infomaniak.title"),
      organization: t("items.infomaniak.organization"),
      location: t("items.infomaniak.location"),
      employmentType: t("items.infomaniak.type"),
      iconSrc: "/icons/infomaniak-k-icon.svg",
      iconAlt: "Infomaniak",
      isCurrent: isOngoing(PERIODS.infomaniak, now),
      positions: [
        {
          id: "pos",
          iconSrc: "/icons/infomaniak-k-icon.svg",
          team: t("items.infomaniak.teams.pos.name"),
          href: t("items.infomaniak.teams.pos.url"),
          previewSrc: `/previews/infomaniak-${locale}.webp`,
          period: period(PERIODS.pos),
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
          previewSrc: `/previews/kchat-${locale}.webp`,
          period: period(PERIODS.kchat),
          description: t("items.infomaniak.teams.kchat.description"),
          tags: [
            "React",
            "React Native",
            "Electron",
            "TypeScript",
            "Redux",
            "Redmine",
          ],
          repos: KCHAT_REPOS,
        },
      ],
    },
  ];
}
