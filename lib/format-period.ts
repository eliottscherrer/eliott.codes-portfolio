export interface Period {
  /** ISO date: "2026-03" or "2026-03-01". */
  start: string;
  end?: string;
  /** Show the "today" label instead of the end while the end date has not passed. */
  today?: boolean;
}

const DAY_MS = 86_400_000;

// ISO date -> UTC midnight, formatted with timeZone "UTC" so the month never shifts.
const parseIso = (iso: string) => {
  const [year, month = 1, day = 1] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const isOngoing = ({ end, today }: Period, now = Date.now()) =>
  Boolean(today) && (!end || now <= parseIso(end).getTime() + DAY_MS);

/** "March 2026 – Today" while ongoing, "March 2026 – January 2027" once the end has passed. */
export function formatPeriod(
  locale: string,
  period: Period,
  todayLabel: string,
  now = Date.now(),
) {
  const format = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const start = parseIso(period.start);
  const label =
    isOngoing(period, now) || !period.end
      ? `${format.format(start)} – ${todayLabel}`
      : // ICU builds differ in the spaces they put around the dash (Node vs browsers),
        // which would be a hydration mismatch, so normalise the separator.
        format
          .formatRange(start, parseIso(period.end))
          .replace(/\s*[–—-]\s*/u, " – ");

  return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
}
