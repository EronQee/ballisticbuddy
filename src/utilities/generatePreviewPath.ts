import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  path?: string | null
  req: PayloadRequest
  slug: string
}

export const generatePreviewPath = ({ collection, path, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Multi-segment pages store a full path (e.g. products/bulletproof-vehicle-glass).
  // When present, use it directly; otherwise fall back to the slug.
  const urlPath = path || slug

  // Encode each segment to support slugs with special characters
  // while keeping forward slashes intact.
  const encodedSlug = urlPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  const encodedParams = new URLSearchParams({
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
