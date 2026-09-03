import { getTranslations } from 'next-intl/server'
import React from 'react'

import type { VehicleDiagramBlock as VehicleDiagramBlockProps } from '@/payload-types'

import { PlaceholderImage } from '@/components/PlaceholderImage'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const VehicleDiagramBlock: React.FC<VehicleDiagramBlockProps> = async ({
  callouts,
  diagram,
  intro,
  title,
}) => {
  const t = await getTranslations('Blocks.vehicleDiagram')
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

      <div className="mt-10">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-soft)]">
          {diagram && typeof diagram === 'object' ? (
            <Media imgClassName="w-full object-cover" resource={diagram} size="100vw" />
          ) : (
            <PlaceholderImage className="h-[360px] w-full rounded-none border-0 md:h-[480px]" />
          )}

          {(callouts || []).map(({ label, link, x, y }, index) => (
            <div
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1"
              key={index}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="whitespace-nowrap rounded-full border border-[var(--color-line)] bg-[var(--color-paper-tint)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)] shadow-sm">
                {link ? (
                  <CMSLink {...link}>{label}</CMSLink>
                ) : (
                  label
                )}
              </span>
              <span className="h-3 w-px bg-[var(--color-accent)]" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-paper-tint)]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}