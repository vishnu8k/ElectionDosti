import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';

import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default function middleware(req: NextRequest) {
  req.nextUrl.port = '';
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(hi|ta|te|kn|bn|en)/:path*']
};
