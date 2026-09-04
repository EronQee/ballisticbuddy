import { getTranslations } from 'next-intl/server'
import React from 'react'

import type { StatBandBlock as StatBandBlockProps } from '@/payload-types'

export const StatBandBlock: React.FC<StatBandBlockProps> = async ({ intro, stats, title }) => {
  const t = await getTranslations('Blocks.statBand')
  const heading = title || t('title')

  return (
    <div className="container my-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="eyebrow">{t('eyebrow')}</h2>
          <h3 className="display-md mt-2">{heading}</h3>
        </div>
        {intro && <p className="text-body max-w-md md:text-right">{intro}</p>}
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
        {(stats || []).map(({ label, value }, index) => (
          <div className="bg-[var(--color-paper-tint)] px-6 py-8" key={index}>
            <p className="display-md text-[var(--color-accent)]">{value}</p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}