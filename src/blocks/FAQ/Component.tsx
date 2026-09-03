import { getTranslations } from 'next-intl/server'
import React from 'react'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

type Question = {
  answer: NonNullable<FAQBlockProps['items']>[number]['answer']
  id?: string | null
  question?: string | null
}

const serializeQuestions = (questions: Question[]) => {
  return questions.map(({ answer, question }) => {
    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer.root.children.map((child) => child.text ?? '').join(' '),
      },
    }
  })
}

export const FAQBlock: React.FC<FAQBlockProps> = async ({ intro, items, title }) => {
  const t = await getTranslations('Blocks.faq')
  const heading = title || t('title')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serializeQuestions(items || []),
  }

  return (
    <div className="container my-16">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <div className="max-w-[48rem]">
        <h2 className="display-md">{heading}</h2>
        {intro && (
          <div className="mt-4">
            <RichText className="mb-0" data={intro} enableGutter={false} />
          </div>
        )}
      </div>
      <div className="mt-10">
        {(items || []).map(({ answer, question }, index) => {
          return (
            <details
              className="border-b border-[var(--color-line)] py-4 first:border-t"
              key={index}
              open={index === 0}
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                {question}
              </summary>
              <div className="mt-3">
                <RichText data={answer} enableGutter={false} />
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}