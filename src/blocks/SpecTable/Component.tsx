import { getTranslations } from 'next-intl/server'
import React from 'react'

import type { SpecTableBlock as SpecTableBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

export const SpecTableBlock: React.FC<SpecTableBlockProps> = async ({ columns, intro, rows, title }) => {
  const t = await getTranslations('Blocks.specTable')
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

      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              {(columns || []).map(({ header }, index) => (
                <th
                  className="border-b-2 border-[var(--color-ink)] px-4 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.08em] text-[var(--color-ink)]"
                  key={index}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows || []).map(({ cells }, rowIndex) => (
              <tr key={rowIndex}>
                {(cells || []).map(({ value }, cellIndex) => (
                  <td
                    className="border-b border-[var(--color-line)] px-4 py-3 text-[var(--color-ink-soft)]"
                    key={cellIndex}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}