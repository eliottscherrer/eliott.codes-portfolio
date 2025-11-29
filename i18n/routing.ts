import {defineRouting} from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en': '/en'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);