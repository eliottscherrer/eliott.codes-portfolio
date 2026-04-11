"use client";
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';

export default function IntlProviderClient(props: {
  locale: string;
  messages: AbstractIntlMessages;
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