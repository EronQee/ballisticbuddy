import { getLocale } from 'next-intl/server'

import { routing, type Locale } from './routing'

export type PayloadLocale = Locale | 'all'

/**
 * Returns the current next-intl locale, narrowed to Payload's `locale`
 * option type so it can be passed straight into payload queries.
 *
 * Falls back to the default locale (defensive; the `[locale]` layout
 * already guarantees a valid locale via `hasLocale`).
 */
export async function getPayloadLocale(): Promise<PayloadLocale> {
  const locale = await getLocale()
  return routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale
}