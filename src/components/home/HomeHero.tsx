'use client'

import Link from 'next/link'

export default function HomeHero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__media">
        {/* Background Container: ink gradient stands in for hero imagery until real assets land */}
        <div className="hero__bg" style={{ backgroundColor: 'var(--color-ink)' }} />

        {/* Top Features Header Row */}
        <div className="hero__features">
          {/* Feature 01 */}
          <div className="hero__feature">
            <p className="hero__feature-num">01</p>
            <p className="hero__feature-text">BALLISTIC VEHICLE GLASS</p>
          </div>

          {/* Feature 02 */}
          <div className="hero__feature">
            <p className="hero__feature-num">02</p>
            <p className="hero__feature-text">RUN-FLAT TIRE INSERTS</p>
          </div>

          {/* Feature 03 */}
          <div className="hero__feature">
            <p className="hero__feature-num">03</p>
            <p className="hero__feature-text">GA/T-TESTED, SAMPLE-VERIFIED</p>
          </div>
        </div>

        {/* Middle Typography Section */}
        <div className="hero__typography">
          <div className="w-full">
            <h1 className="hero__heading">CERTIFICATIONS TELL.</h1>
            <h1 className="hero__heading">TESTS PROVE.</h1>
          </div>

          <div className="hero__message">
            <p className="hero__subtext">
              Two components protect a vehicle: bulletproof glass and run-flat tire inserts. We
              manufacture both, publish the specs, and ship you a sample — you run the test
              yourself.
            </p>
          </div>
        </div>

        {/* Interactive Get Started Button */}
        <div className="hero__cta">
          <Link tabIndex={0} href="/test-samples" className="cta">
            {/* Expanding Background Circle */}
            <div className="cta__bg" />

            {/* Arrow Pointer Box */}
            <div className="cta__arrow">
              <div className="cta__pointer">
                <div className="cta__stem" />
              </div>
            </div>

            {/* Text Label */}
            <div className="cta__label">
              <p className="cta__text">Request a Test Sample</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}