import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const TrustBand: Block = {
  slug: 'trustBand',
  interfaceName: 'TrustBandBlock',
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
      label: 'Trust Items',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional thumbnail for test report or video. Placeholder shown when empty.',
          },
        },
        link({
          appearances: ['default', 'outline'],
          disableLabel: false,
          overrides: {
            label: 'Link',
          },
        }),
      ],
    },
  ],
  labels: {
    plural: 'Trust Bands',
    singular: 'Trust Band',
  },
}