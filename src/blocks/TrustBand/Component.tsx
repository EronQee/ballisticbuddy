import { getTranslations } from 'next-intl/server'
import React from 'react'

import type { TrustBandBlock as TrustBandBlockProps } from '@/payload-types'

import { PlaceholderImage } from '@/components/PlaceholderImage'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const TrustBandBlock: React.FC<TrustBandBlockProps> = async ({ intro, items, title }) => {
  const t = await getTranslations('Blocks.trustBand')
  const heading = title || t('title')

  return (
    <div className="container my-16">
      <div className="max-w-[48rem]">
        <h2 className="display-md">{heading}</h2>
        {intro && (
          <div className="mt-4">
            <RichText className="mb-0" data={intro} enableGutter={false} />
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(items || []).map(({ description, link, media, title: itemTitle }, index) => {
          return (
            <div
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-tint)]"
              key={index}
            >
              <div className="aspect-[16/9]">
                {media && typeof media === 'object' ? (
                  <Media imgClassName="h-full w-full object-cover" resource={media} size="33vw" />
                ) : (
                  <PlaceholderImage className="h-full w-full rounded-none border-0" label={itemTitle} />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="card-title text-lg">{itemTitle}</h3>
                {description && <p className="text-body mt-0 text-sm">{description}</p>}
                {link && (
                  <div className="mt-auto pt-3">
                    <CMSLink {...link} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}