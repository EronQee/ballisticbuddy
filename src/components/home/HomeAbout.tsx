'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'

export default function HomeAbout() {
  const [opacities, setOpacities] = useState([1, 0.1, 0.1, 0.1])
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // References to the 4 text lines for scroll calculations
  const lineRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight || 800

    // Calculate opacity for each line based on its vertical position in the viewport
    const newOpacities = lineRefs.map((ref, index) => {
      if (!ref.current) {
        return index === 0 ? 1 : 0.1
      }
      const rect = ref.current.getBoundingClientRect()

      // Interpolation triggers:
      // Starts illuminating when top reaches 85% of viewport
      // Fully illuminated (1.0) when top reaches 45% of viewport
      const startFade = windowHeight * 0.85
      const fullFade = windowHeight * 0.45

      if (rect.top >= startFade) {
        return 0.1
      } else if (rect.top <= fullFade) {
        return 1
      } else {
        const progress = (startFade - rect.top) / (startFade - fullFade)
        const interpolated = 0.1 + progress * 0.9
        return Number(interpolated.toFixed(3))
      }
    })

    setOpacities(newOpacities)
  }, [])

  useEffect(() => {
    // Initial sync on mount so line opacities match the current scroll position before any scroll event fires.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  const aboutLines = [
    'Certifications tell. Tests prove.',
    'Most armor specs are claims.',
    'Ours are measurements you can verify —',
    'right down to the test protocol we ship with every order.',
  ]

  return (
    <section id="about" className="about">
      {/* Label Container */}
      <div className="about__label">
        <h2 className="eyebrow">Why BallisticBuddy — Our Approach:</h2>
      </div>

      {/* Content Container with 4 scroll-reactive lines */}
      <div className="about__content">
        {aboutLines.map((line, index) => (
          <div key={line} ref={lineRefs[index]} className="about__line">
            <div className="about__line-inner" style={{ opacity: opacities[index] }}>
              <div className="about__text">
                <h3 className="display-md">{line}</h3>
              </div>
            </div>
          </div>
        ))}

        {/* Spacer */}
        <div className="about__spacer" />

        {/* Button Link */}
        <div className="about__cta">
          <Link
            className="about-cta"
            href="/results"
            tabIndex={0}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onFocus={() => setIsButtonHovered(true)}
            onBlur={() => setIsButtonHovered(false)}
          >
            {/* Expanding Orange Background Morph */}
            <div
              className="about-cta__bg"
              style={{
                borderRadius: isButtonHovered ? '10.9793% / 53.3333%' : '24px',
                transform: isButtonHovered
                  ? 'translate3d(86.7969px, 0px, 0px) scale(4.85764, 1)'
                  : 'translate3d(0px, 0px, 0px) scale(1, 1)',
              }}
            />

            {/* Arrow Wrapper */}
            <div className="about-cta__arrow">
              {/* Chevron Icon Pointer */}
              <div
                className="about-cta__pointer"
                style={{
                  transform: isButtonHovered
                    ? 'translateY(-50%) rotate(45deg) translate(2px, -2px)'
                    : 'translateY(-50%) rotate(45deg) translateZ(0px)',
                }}
              >
                {/* Stem of Arrow (reveals on hover) */}
                <div
                  className="about-cta__stem"
                  style={{ opacity: isButtonHovered ? 1 : 0 }}
                />
              </div>
            </div>

            {/* Text Label */}
            <div className="about-cta__label">
              <p
                className="text-sm font-medium uppercase tracking-[0.08em]"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: isButtonHovered
                    ? 'var(--color-paper)'
                    : 'var(--color-accent)',
                }}
              >
                See the Test Evidence
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}