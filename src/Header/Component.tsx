import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayloadLocale } from '@/i18n/getPayloadLocale'
import React from 'react'

export async function Header() {
  const locale = await getPayloadLocale()
  const headerData = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} />
}
