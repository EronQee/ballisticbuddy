import { getTranslations } from 'next-intl/server'
import React from 'react'

import type { PricingBlock as PricingBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const PricingBlock: React.FC<PricingBlockProps> = async ({ disclaimer, intro, tiers, title }) => {
  const t = await getTranslations('Blocks.pricing')
  const heading = title || t('title')

  return (
    <div className="container my-16">
      <div className="max-w-[48rem]">
        <h2 className="eyebrow">{t('eyebrow')}</h2>
        <h3 className="display-md mt-2">{heading}</h3>
        {intro && (
          <div className="mt-4">
            <RichText className="mb-0" data={intro} enableGutter={false} />
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {(tiers || []).map(({ description, details, name, priceRange }, index) => {
          return (
            <div
              className="flex flex-col rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-tint)] p-6"
              key={index}
            >
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
                {name}
              </p>
              <p className="mt-3 text-2xl font-bold text-[var(--color-ink)]">{priceRange}</p>
              {description && <p className="text-body mt-2 text-sm">{description}</p>}
              {details && details.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-ink-soft)]">
                  {details.map(({ detail }, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-4 text-sm text-[var(--color-ink-soft)]">
        <p className="font-semibold text-[var(--color-ink)]">{t('disclaimerLabel')}</p>
        <RichText className="mb-0" data={disclaimer} enableGutter={false} />
      </div>
    </div>
  )
}