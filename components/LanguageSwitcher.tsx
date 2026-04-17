"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  className,
  side = "bottom",
}: {
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const languageNames = new Intl.DisplayNames([locale], { type: "language" });
  const formatLanguageLabel = (
    availableLocale: (typeof routing.locales)[number],
  ) => {
    const label =
      languageNames.of(availableLocale) ?? availableLocale.toUpperCase();

    if (!label) {
      return availableLocale.toUpperCase();
    }

    return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
  };

  const handleLocaleChange = (newLocale: (typeof routing.locales)[number]) => {
    router.replace(pathname, { locale: newLocale });
  };

  if (!mounted) {
    return (
      <Button
        variant="glass"
        size="icon"
        className={cn(
          "ds-icon-control rounded-md w-8 h-8 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4",
          className,
        )}
        disabled
      >
        <Languages className="h-4 w-4" />
        <span className="sr-only">{t("label")}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="glass"
          size="icon"
          className={cn(
            "ds-icon-control rounded-md w-8 h-8 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4",
            className,
          )}
        >
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t("label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={side}
        className="bg-[var(--surface-glass)] backdrop-blur-xl border-[var(--surface-border)] shadow-lg transform-gpu"
      >
        {routing.locales.map((availableLocale) => (
          <DropdownMenuItem
            key={availableLocale}
            onClick={() => handleLocaleChange(availableLocale)}
            className={cn(locale === availableLocale && "bg-accent")}
          >
            {formatLanguageLabel(availableLocale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
