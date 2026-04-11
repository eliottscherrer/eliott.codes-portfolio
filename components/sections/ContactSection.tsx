"use client"

import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact" className="space-y-4 mt-20 sm:mt-24">
      <h2 className="text-2xl sm:text-3xl font-semibold">{t("Contact.title")}</h2>
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
        {t.rich("Contact.emailText", {
          email: (chunks) => <a className="underline" href="mailto:contact@eliott.codes">{chunks}</a>
        })}
      </p>
    </section>
  );
}
