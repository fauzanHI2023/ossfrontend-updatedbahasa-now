import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'id', 'ar'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      id: '/pathnames'
    }
  }
});
