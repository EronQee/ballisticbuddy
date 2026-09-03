import React from 'react'

export default function UiTestPage() {
  return (
    <>
      <div
        style={{
          background: '#3b82f6',
          color: 'white',
          padding: '40px',
          fontSize: '32px',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        BLUE BACKGROUND TEST - does global style paint?
      </div>
      <p style={{ color: '#111', fontSize: '18px' }}>plain paragraph (no global class)</p>
    </>
  )
}
