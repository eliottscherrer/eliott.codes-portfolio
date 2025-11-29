"use client";
import { NextIntlClientProvider } from 'next-intl';

export default function IntlProviderClient(props: {
  locale: string;
  messages: any;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider 
      locale={props.locale} 
      messages={props.messages}
      timeZone="Europe/Zurich"
    >
      {props.children}
    </NextIntlClientProvider>
  );
}