import type { Metadata } from 'next'
import React from 'react'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Plasmic Host',
  description: 'App host for Plasmic Studio. Do not visit directly.',
  robots: { index: false, follow: false },
}

export default function PlasmicHostLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
