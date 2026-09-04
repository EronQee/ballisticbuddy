'use client'

import Link from 'next/link'

export default function HomeInvite() {
  return (
    <div id="invite" className="invite">
      {/* Background gradient (ink panel stands in for imagery) */}
      <div
        className="invite__bg"
        style={{ backgroundColor: 'var(--color-ink)' }}
      />

      {/* Radial gradient overlay */}
      <div
        className="invite__gradient"
        style={{
          background:
            'radial-gradient(114.4% 240.8% at 8.4% 55.2%, rgba(3,3,3,0) 0%, var(--color-ink) 41.56%)',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 0,
        }}
      />

      {/* Text content */}
      <div className="invite__wrap">
        <div className="invite__content">
          {/* Eyebrow (H2) */}
          <div className="invite__text">
            <h2 className="invite__eyebrow">protect the vehicle, not the paperwork</h2>
          </div>

          {/* Headline */}
          <div className="invite__text">
            <p className="invite__headline">GET YOUR VEHICLE TO THE RIGHT PROTECTION LEVEL</p>
          </div>

          {/* Description */}
          <div className="invite__text">
            <p className="invite__desc">
              Tell us the vehicle and the threat level — we will recommend the configuration:
              ballistic glass, run-flat inserts, or both. Then verify it on a sample before you
              commit.
            </p>
          </div>
        </div>

        {/* Interactive button */}
        <div className="invite__cta">
          <Link className="invite-cta" tabIndex={0} href="/contact">
            {/* Orange icon circle */}
            <div className="invite-cta__icon">
              {/* Arrow decoration SVG */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: 'block',
                  transform: 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Button label */}
            <div className="invite-cta__label">
              <p className="invite-cta__text">Request a Quote</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}