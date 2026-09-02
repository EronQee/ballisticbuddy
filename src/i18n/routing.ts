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

export function getLocaleDir(locale: string): 'ltr' | 'rtl' {
  return localization.locales.find((l) => l.code === locale)?.rtl ? 'rtl' : 'ltr'
}