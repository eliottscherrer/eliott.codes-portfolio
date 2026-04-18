import IntlProviderClient from '@/components/IntlProviderClient';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SmoothScroll from "@/components/SmoothScroll";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
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
