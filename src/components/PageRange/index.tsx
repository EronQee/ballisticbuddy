import { getTranslations } from 'next-intl/server'
import React from 'react'

export const PageRange: React.FC<{
  className?: string
  collection?: 'posts'
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = async (props) => {
  const { className, currentPage, limit, totalDocs } = props
  const t = await getTranslations('Common')

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const label = totalDocs && totalDocs > 1 ? t('docs') : t('doc')

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && t('noResults')}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        t('showingRange', {
          start: String(indexStart),
          end: String(indexEnd),
          total: String(totalDocs),
          label,
        })}
    </div>
  )
}
