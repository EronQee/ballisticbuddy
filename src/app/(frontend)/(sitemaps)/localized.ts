import { routing } from '@/i18n/routing'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

export type AlternateRef = {
  href: string
  hreflang: string
}

/**
 * Builds the absolute URL for a path in a given locale.
 *
 * Uses the same `localePrefix: 'as-needed'` rule as the router:
 * the default locale (en) lives at the root, all other locales are prefixed.
 */
export function localizedURL(path: string, locale: string): string {
  if (locale === routing.defaultLocale) return `${SITE_URL}${path}`
  return `${SITE_URL}/${locale}${path}`
}

/**
 * Enumerates one sitemap entry per configured locale for a given path,
 * each carrying the full set of hreflang alternates (self included)
 * plus an `x-default` pointing at the default-locale URL.
 */
export function localizedSitemapEntries(
  path: string,
  locales: string[] = routing.locales,
): { loc: string; alternateRefs: AlternateRef[] }[] {
  return locales.map((locale) => ({
    loc: localizedURL(path, locale),
    alternateRefs: [
      ...locales.map((altLocale) => ({
        href: localizedURL(path, altLocale),
        hreflang: altLocale,
      })),
      {
        href: localizedURL(path, routing.defaultLocale),
        hreflang: 'x-default',
      },
    ],
  }))
}