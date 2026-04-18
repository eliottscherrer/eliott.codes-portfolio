"use client";
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import { useEffect } from 'react';

export default function IntlProviderClient(props: {
  locale: string;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = props.locale;
  }, [props.locale]);

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
