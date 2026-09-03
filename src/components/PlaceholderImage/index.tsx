import { getTranslations } from 'next-intl/server'
import React from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  className?: string
  label?: string | null
}

export const PlaceholderImage: React.FC<Props> = async ({ className, label }) => {
  const t = await getTranslations('PlaceholderImage')

  return (
    <div
      aria-label={t('title')}
      className={cn(
        'flex items-center justify-center rounded-3xl border border-dashed border-[var(--color-line)] bg-[var(--color-paper-soft)] px-6 py-10 text-center',
        className,
      )}
      role="img"
    >
      <div className="flex flex-col items-center gap-2">
        <svg
          aria-hidden="true"
          className="h-10 w-10 text-[var(--color-ink-muted)]"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <rect width="18" height="18" x="3" y="3" rx="4" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        <p className="m-0 text-sm font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">
          {label || t('title')}
        </p>
        <p className="m-0 max-w-[24rem] text-sm text-[var(--color-ink-soft)]">{t('description')}</p>
      </div>
    </div>
  )
}
