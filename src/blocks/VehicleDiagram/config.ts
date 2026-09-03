import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const VehicleDiagram: Block = {
  slug: 'vehicleDiagram',
  interfaceName: 'VehicleDiagramBlock',
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
      name: 'diagram',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Side-view diagram of the vehicle. Placeholder shown when empty.',
      },
    },
    {
      name: 'callouts',
      type: 'array',
      label: 'Callouts',
      admin: {
        initCollapsed: true,
        description:
          'Labels placed on the side-view diagram. Position is set via percentage coordinates.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'x',
          type: 'number',
          admin: {
            description: 'Horizontal position as a percentage (0–100, from left).',
          },
          min: 0,
          max: 100,
          required: true,
        },
        {
          name: 'y',
          type: 'number',
          admin: {
            description: 'Vertical position as a percentage (0–100, from top).',
          },
          min: 0,
          max: 100,
          required: true,
        },
        link({
          appearances: false,
          disableLabel: false,
          overrides: {
            label: 'Link',
          },
        }),
      ],
    },
  ],
  labels: {
    plural: 'Vehicle Diagrams',
    singular: 'Vehicle Diagram',
  },
}