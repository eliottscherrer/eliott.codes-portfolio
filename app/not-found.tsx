"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import FuzzyText from "@/components/FuzzyText";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

// Rendered outside the [locale] routes, so pick the language from the URL instead of next-intl.
const COPY = {
  en: { title: "This page doesn't exist.", back: "Back to home", home: "/en/" },
  fr: { title: "Cette page n'existe pas.", back: "Retour à l'accueil", home: "/fr/" },
};

export default function NotFound() {
  const { resolvedTheme } = useTheme();
  const isEnglish = useSyncExternalStore(
    () => () => {},
    () => window.location.pathname.startsWith("/en"),
    () => false,
  );
  const copy = isEnglish ? COPY.en : COPY.fr;

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <div aria-hidden="true">
        <FuzzyText
          fontSize="clamp(5rem, 22vw, 11rem)"
          color={resolvedTheme === "light" ? "#171717" : "#fafafa"}
          baseIntensity={0.15}
          hoverIntensity={0.45}
        >
          404
        </FuzzyText>
      </div>
      <h1 className="text-lg text-muted-foreground">
        <span className="sr-only">404 </span>
        {copy.title}
      </h1>
      <Button variant="brand" size="lg" asChild>
        <Link href={copy.home}>{copy.back}</Link>
      </Button>
    </main>
  );
}
