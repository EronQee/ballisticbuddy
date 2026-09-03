import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
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
      name: 'tiers',
      type: 'array',
      label: 'Price Tiers',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
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
          name: 'priceRange',
          type: 'text',
          localized: true,
          admin: {
            description: 'e.g. $800 – $2,500 / sheet',
          },
          required: true,
        },
        {
          name: 'details',
          type: 'array',
          label: 'Details',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'detail',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'disclaimer',
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
      label: 'Disclaimer (required)',
    },
  ],
  labels: {
    plural: 'Pricing',
    singular: 'Pricing',
  },
}