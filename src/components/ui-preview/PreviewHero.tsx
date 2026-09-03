'use client'

export default function PreviewHero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__media">
        {/* Background Image Container */}
        <div className="hero__bg">
          <img
            alt="Office Building"
            decoding="sync"
            loading="eager"
            sizes="min(min(100vw, 1920px) - 24px, 1920px)"
            src="https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg"
            srcSet="https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg?scale-down-to=512 512w,https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg?scale-down-to=1024 1024w,https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg 1920w"
          />
        </div>

        {/* Top Features Header Row */}
        <div className="hero__features">
          {/* Feature 01 */}
          <div className="hero__feature">
            <p className="hero__feature-num">01</p>
            <p className="hero__feature-text">A CREATIVE DIGITAL AGENCY</p>
          </div>

          {/* Feature 02 */}
          <div className="hero__feature">
            <p className="hero__feature-num">02</p>
            <p className="hero__feature-text">SPECIALIZING IN VISUAL EXPERIENCES</p>
          </div>

          {/* Feature 03 */}
          <div className="hero__feature">
            <p className="hero__feature-num">03</p>
            <p className="hero__feature-text">BASED IN SEATTLE, WORKING WORLDWIDE</p>
          </div>
        </div>

        {/* Middle Typography Section */}
        <div className="hero__typography">
          <div className="w-full">
            <h1 className="hero__heading">CREATE, INNOVATE,</h1>
            <h1 className="hero__heading">COLLABORATE.</h1>
          </div>

          <div className="hero__message">
            <p className="hero__subtext">
              Choose Roman24 - where creativity meets digital excellence, unlocking the full
              potential of your brand in the dynamic digital landscape.
            </p>
          </div>
        </div>

        {/* Interactive Get Started Button */}
        <div className="hero__cta">
          <a tabIndex={0} href="#contact" className="cta">
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
              <p className="cta__text">Get Started Now</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
