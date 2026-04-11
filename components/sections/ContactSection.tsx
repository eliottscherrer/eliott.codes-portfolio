"use client"

import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact" className="space-y-4 mt-20 sm:mt-24">
      <h2 className="ds-section-title">{t("Contact.title")}</h2>
      <p className="ds-body-lg">
        {t.rich("Contact.emailText", {
          email: (chunks) => <a className="ds-inline-link" href="mailto:contact@eliott.codes">{chunks}</a>
        })}
      </p>
    </section>
  );
}
