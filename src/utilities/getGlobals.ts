import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import type { PayloadLocale } from '@/i18n/getPayloadLocale'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
  locale?: PayloadLocale,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    ...(locale ? { locale } : {}),
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0, locale?: PayloadLocale) =>
  unstable_cache(
    async () => getGlobal<T>(slug, depth, locale),
    locale ? [slug, locale] : [slug],
    {
      tags: [`global_${slug}`],
    },
  )
