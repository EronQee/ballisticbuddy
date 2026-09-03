'use client'

// Note: Pricing.txt was restored as a fixed full-screen blur overlay ("BG Blur"),
// a modal background rather than a homepage section. Kept as a standalone component;
// not mounted in the preview homepage so it does not cover the whole page.
export default function PreviewPricing() {
  return (
    <div
      className="pricing-overlay"
      tabIndex={0}
      style={{
        boxSizing: 'border-box',
        inset: '0px',
        position: 'fixed',
        zIndex: 10,
        pointerEvents: 'none',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(3, 3, 3, 0.25)',
      }}
    />
  )
}