import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';

import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default function middleware(req: NextRequest) {
  req.headers.set('x-forwarded-port', '443');
  req.headers.set('x-forwarded-proto', 'https');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (host) {
    req.headers.set('x-forwarded-host', host.split(':')[0]);
    req.headers.set('host', host.split(':')[0]);
  }
  req.nextUrl.port = '';
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(hi|ta|te|kn|bn|en)/:path*']
};
