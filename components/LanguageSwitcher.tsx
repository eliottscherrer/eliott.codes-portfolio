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
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const LANGUAGE_LEFT_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },
  animate: {
    x: 9,
    y: 9,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 170,
      damping: 18,
      mass: 0.7,
    },
  },
};

const LANGUAGE_RIGHT_VARIANTS: Variants = {
  normal: {
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },
  animate: {
    x: -11,
    y: -11,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 170,
      damping: 18,
      mass: 0.7,
    },
  },
};

const LOCALE_TO_FLAG_CLASS: Partial<
  Record<(typeof routing.locales)[number], string>
> = {
  fr: "fi-fr",
  en: "fi-gb",
};

const getLocaleFlagClass = (
  availableLocale: (typeof routing.locales)[number],
) => {
  return LOCALE_TO_FLAG_CLASS[availableLocale] ?? `fi-${availableLocale}`;
};

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
  const languageIconControls = useAnimation();

  const startLanguageIconAnimation = useCallback(() => {
    void languageIconControls.start("animate");
  }, [languageIconControls]);

  const stopLanguageIconAnimation = useCallback(() => {
    void languageIconControls.start("normal");
  }, [languageIconControls]);

  const renderLanguageIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-languages-icon lucide-languages h-4 w-4"
      aria-hidden
    >
      <motion.g
        initial="normal"
        animate={languageIconControls}
        variants={LANGUAGE_LEFT_VARIANTS}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={languageIconControls}
        variants={LANGUAGE_RIGHT_VARIANTS}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </motion.g>
    </svg>
  );

  const renderLocaleFlag = (
    availableLocale: (typeof routing.locales)[number],
    size: "sm" | "md" = "md",
  ) => (
    <span
      aria-hidden
      className={cn(
        "fi shrink-0 rounded-[2px]",
        size === "sm"
          ? "text-[10px] leading-[10px]"
          : "text-[12px] leading-[12px]",
        getLocaleFlagClass(availableLocale),
      )}
    />
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
        {renderLanguageIcon()}
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
          onMouseEnter={startLanguageIconAnimation}
          onMouseLeave={stopLanguageIconAnimation}
          onFocus={startLanguageIconAnimation}
          onBlur={stopLanguageIconAnimation}
          className={cn(
            "ds-icon-control rounded-md w-8 h-8 flex items-center justify-center transition-colors [&_svg]:h-4 [&_svg]:w-4",
            className,
          )}
        >
          {renderLanguageIcon()}
          <span className="sr-only">{t("label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={side}
        className="bg-surface-glass backdrop-blur-xl border-surface-border shadow-lg transform-gpu"
      >
        {routing.locales.map((availableLocale) => (
          <DropdownMenuItem
            key={availableLocale}
            onClick={() => handleLocaleChange(availableLocale)}
            className={cn(
              "text-foreground/85 transition-colors data-[highlighted]:bg-foreground/8 data-[highlighted]:text-foreground focus:bg-foreground/8 focus:text-foreground",
              locale === availableLocale &&
                "bg-foreground/12 text-foreground data-[highlighted]:bg-foreground/18 data-[highlighted]:text-foreground focus:bg-foreground/18 focus:text-foreground",
            )}
          >
            {renderLocaleFlag(availableLocale)}
            <span>{formatLanguageLabel(availableLocale)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
