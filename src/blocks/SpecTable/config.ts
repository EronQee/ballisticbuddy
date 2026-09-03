import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SpecTable: Block = {
  slug: 'specTable',
  interfaceName: 'SpecTableBlock',
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
      name: 'columns',
      type: 'array',
      label: 'Columns',
      minRows: 2,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'cells',
          type: 'array',
          label: 'Cells',
          minRows: 2,
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Spec Tables',
    singular: 'Spec Table',
  },
}