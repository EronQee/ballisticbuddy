import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { localizedSitemapEntries } from '../localized'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        path: true,
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      ...localizedSitemapEntries('/search').map(({ loc, alternateRefs }) => ({
        loc,
        lastmod: dateFallback,
        alternateRefs,
      })),
      ...localizedSitemapEntries('/posts').map(({ loc, alternateRefs }) => ({
        loc,
        lastmod: dateFallback,
        alternateRefs,
      })),
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .flatMap((page) => {
            const slugPath = page?.path || page?.slug
            const path = slugPath === 'home' ? '/' : `/${slugPath}`
            return localizedSitemapEntries(path).map(({ loc, alternateRefs }) => ({
              loc,
              lastmod: page.updatedAt || dateFallback,
              alternateRefs,
            }))
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
