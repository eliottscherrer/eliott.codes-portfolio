"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 transition-all duration-300"
        >
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">{t("label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-md border-border/50">
        <DropdownMenuItem 
          onClick={() => handleLocaleChange("en")}
          className={locale === 'en' ? "bg-accent" : ""}
        >
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLocaleChange("fr")}
          className={locale === 'fr' ? "bg-accent" : ""}
        >
          {t("fr")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}