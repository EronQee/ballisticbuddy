import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import localization from './localization'

export const routing = defineRouting({
  locales: localization.locales.map((locale) => locale.code),
  defaultLocale: localization.defaultLocale,
  localePrefix: 'as-needed',
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)

export type Locale = (typeof routing.locales)[number]

export type { LocaleCode } from './localization'

export function getLocaleDir(locale: string): 'ltr' | 'rtl' {
  const entry = localization.locales.find((l) => l.code === locale)
  return entry && 'rtl' in entry && entry.rtl ? 'rtl' : 'ltr'
}