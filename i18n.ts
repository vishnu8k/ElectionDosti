import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['en', 'hi', 'ta', 'te', 'kn', 'bn'];

export default getRequestConfig(async ({locale}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`./lib/i18n/messages/${locale}.json`)).default
  };
});
