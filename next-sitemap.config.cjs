const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  alternateRefs: [
    { href: `${SITE_URL}/`, hreflang: 'en' },
    { href: `${SITE_URL}/pt`, hreflang: 'pt' },
    { href: `${SITE_URL}/ar`, hreflang: 'ar' },
    { href: `${SITE_URL}/es`, hreflang: 'es' },
    { href: `${SITE_URL}/fr`, hreflang: 'fr' },
    { href: `${SITE_URL}/ru`, hreflang: 'ru' },
    { href: `${SITE_URL}/`, hreflang: 'x-default' },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
