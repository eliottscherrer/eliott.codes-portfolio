import IntlProviderClient from "@/components/IntlProviderClient";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { title, description } = (await import(`@/messages/${locale}.json`))
    .default.Metadata;
  const url = `/${locale}/`;
  const image = {
    url: `/og-${locale}.png`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}/`])),
        "x-default": `/${routing.defaultLocale}/`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "eliott.codes",
      url,
      title,
      description,
      locale: locale === "fr" ? "fr_CH" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as (typeof routing.locales)[number];

  if (!routing.locales.includes(typedLocale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <IntlProviderClient locale={locale} messages={messages}>
      <SmoothScroll />
      {children}
    </IntlProviderClient>
  );
}
