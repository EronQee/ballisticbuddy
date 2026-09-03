import type { Metadata } from 'next'
import React from 'react'

import '../(frontend)/globals.css'

export const metadata: Metadata = {
  title: 'UI 组件预览 — BallisticBuddy',
  description: '首页组件视觉预览',
  robots: { index: false, follow: false },
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}