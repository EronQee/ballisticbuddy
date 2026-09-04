import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import HomeLanding from '@/components/home/HomeLanding'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getPayloadLocale } from '@/i18n/getPayloadLocale'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      path: true,
      slug: true,
    },
  })

  const params = pages.docs
    ? pages.docs.map(({ path, slug }) => {
        const slugPath = path || slug
        // The home page lives at the root: an empty catch-all segment array.
        return { slug: slugPath === 'home' ? [] : slugPath.split('/') }
      })
    : []

  return params
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const segments = (await paramsPromise).slug
  const slug = segments?.length ? segments.join('/') : 'home'
  const url = '/' + slug

  const page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    return <HomeLanding />
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const segments = (await paramsPromise).slug
  const slug = segments?.length ? segments.join('/') : 'home'
  const page = await queryPageBySlug({
    slug,
  })

  if (page) {
    return generateMeta({ doc: page })
  }

  if (slug === 'home') {
    return {
      title: 'BallisticBuddy — Tested Ballistic Glass & Run-Flat Tires',
      description:
        'Bulletproof vehicle glass and run-flat tire inserts. Ballistic protection tested to Chinese national standards — every claim ships with a test protocol you can reproduce.',
    }
  }

  return generateMeta({ doc: null })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const locale = await getPayloadLocale()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    locale,
    pagination: false,
    overrideAccess: draft,
    where: {
      or: [
        {
          path: {
            equals: slug,
          },
        },
        {
          slug: {
            equals: slug,
          },
        },
      ],
    },
  })

  return result.docs?.[0] || null
})