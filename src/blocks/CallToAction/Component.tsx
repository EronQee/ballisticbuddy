import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container my-16">
      <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-ink)] px-6 py-12 md:px-12 md:py-16 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center text-[var(--color-paper)]">
          {richText && (
            <RichText className="mb-0 [&_h1]:text-[var(--color-paper)] [&_h2]:text-[var(--color-paper)] [&_h3]:text-[var(--color-paper)] [&_p]:text-[var(--color-paper-soft)] [&_a]:text-[var(--color-accent)]" data={richText} enableGutter={false} />
          )}
        </div>
        <div className="flex flex-col gap-4 md:gap-3">
          {(links || []).map(({ link }, i) => {
            return (
              <div key={i}>
                <CMSLink size="lg" {...link} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}