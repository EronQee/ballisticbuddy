import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-tint)] p-6 md:p-8">
                  {richText && (
                    <div className="[&_h2]:font-[var(--font-display)] [&_h2]:text-[var(--text-h2)] [&_h2]:font-semibold [&_h3]:font-[var(--font-display)] [&_h3]:text-[var(--text-h3)] [&_h3]:font-semibold [&_h4]:font-[var(--font-display)] [&_h4]:text-[var(--text-h3)] [&_h4]:font-semibold [&_p]:text-[var(--color-ink-soft)] [&_a]:text-[var(--color-accent)] [&_a]:underline">
                      <RichText data={richText} enableGutter={false} />
                    </div>
                  )}

                  {enableLink && (
                    <div className="mt-4">
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
