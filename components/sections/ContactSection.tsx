"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import SectionAnchorHeading from "@/components/ui/section-anchor-heading";

export default function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact" className="space-y-4 mt-20 sm:mt-24 ds-anchor-target">
      <SectionAnchorHeading anchorId="contact">
        {t("Contact.title")}
      </SectionAnchorHeading>
      <p className="ds-body-lg">
        {t.rich("Contact.emailText", {
          email: (chunks) => (
            <Link
              className="ds-inline-link font-medium"
              href="mailto:contact@eliott.codes"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </section>
  );
}
