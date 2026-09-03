import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Section heading. Leave empty to use the localized default.',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      localized: true,
      label: 'Intro',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Questions',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
          localized: true,
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'FAQs',
    singular: 'FAQ',
  },
}
