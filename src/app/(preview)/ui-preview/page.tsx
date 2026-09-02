import React from 'react'

import PreviewGlobalStyles from '@/components/ui-preview/PreviewGlobalStyles'
import PreviewHeader from '@/components/ui-preview/PreviewHeader'
import PreviewHero from '@/components/ui-preview/PreviewHero'
import PreviewMetrics from '@/components/ui-preview/PreviewMetrics'
import PreviewAbout from '@/components/ui-preview/PreviewAbout'
import PreviewServices from '@/components/ui-preview/PreviewServices'
import PreviewRoad from '@/components/ui-preview/PreviewRoad'
import PreviewTestimonials from '@/components/ui-preview/PreviewTestimonials'
import PreviewInvite from '@/components/ui-preview/PreviewInvite'
import PreviewFooter from '@/components/ui-preview/PreviewFooter'

export default function UiPreviewPage() {
  return (
    <>
      <PreviewGlobalStyles />
      <div style={{ padding: '0 12px' }}>
        <PreviewHeader />
        <PreviewHero />
        <PreviewMetrics />
        <PreviewAbout />
        <PreviewServices />
        <PreviewRoad />
        <PreviewTestimonials />
        <PreviewInvite />
        <PreviewFooter />
      </div>
    </>
  )
}