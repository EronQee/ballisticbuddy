import type { Block } from 'payload'

export const StatBand: Block = {
  slug: 'statBand',
  interfaceName: 'StatBandBlock',
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
      type: 'textarea',
      localized: true,
      label: 'Intro',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          localized: true,
          admin: {
            description: 'e.g. 7.62×39 or "Up to 40 mm"',
          },
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Stat Bands',
    singular: 'Stat Band',
  },
}