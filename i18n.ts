import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['en', 'hi', 'ta', 'te', 'kn', 'bn'];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  console.log("i18n.ts invoked with locale:", locale);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !locales.includes(locale as any)) {
    console.log("Locale not found in locales array, falling back to en");
    locale = 'en';
  }

  try {
    const messages = (await import(`./lib/i18n/messages/${locale}.json`)).default;
    return {
      locale: locale as string,
      messages
    };
  } catch (error) {
    console.error("Error loading messages for locale:", locale, error);
    notFound();
  }
});
