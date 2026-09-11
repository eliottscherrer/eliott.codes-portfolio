"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";

const TIME_ZONE = "Europe/Zurich";

// Re-renders on every minute boundary.
const subscribe = (onChange: () => void) => {
  let timer = 0;
  const schedule = () => {
    timer = window.setTimeout(
      () => {
        onChange();
        schedule();
      },
      60_000 - (Date.now() % 60_000),
    );
  };
  schedule();
  return () => window.clearTimeout(timer);
};
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

/** Current time in Lausanne, e.g. "14:32 GMT+2", with a blinking colon. */
export default function LocalTime({ className }: { className?: string }) {
  const locale = useLocale();
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);

  // Not known on the server, so nothing is rendered until hydration.
  if (minute === null) return null;

  const now = new Date(minute * 60_000);
  const parts = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: TIME_ZONE,
    timeZoneName: "short",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return (
    <time
      dateTime={now.toISOString()}
      className={cn("tabular-nums", className)}
    >
      {part("hour")}
      <span className="animate-[blink_1s_steps(1,end)_infinite]">:</span>
      {part("minute")}
      <span className="ml-1 text-xs">{part("timeZoneName")}</span>
    </time>
  );
}
