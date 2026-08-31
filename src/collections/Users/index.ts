import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    // Only allow user creation when:
    // 1. An authenticated user is creating a new user (invited by an existing admin), OR
    // 2. There are no users yet (first-run setup / initial admin creation)
    // This prevents arbitrary public sign-ups after the first admin is created.
    create: ({ req: { user, payload } }) => {
      if (user) return true

      return payload.count({
        collection: 'users',
        overrideAccess: true,
      }).then(({ totalDocs }) => totalDocs === 0)
    },
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
