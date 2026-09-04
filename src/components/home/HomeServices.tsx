'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'

const SERVICES_DATA = [
  {
    id: '01',
    title: 'BALLISTIC VEHICLE GLASS',
    description:
      'Windshields, side and rear windows from 20–60 mm, rated from handgun to rifle threats. Each level lists thickness, weight and light transmission — measured, not claimed.',
    url: '/products/bulletproof-vehicle-glass',
  },
  {
    id: '02',
    title: 'RUN-FLAT TIRE INSERTS',
    description:
      'Tire inserts and run-flat systems that keep a vehicle moving after a puncture or an attack. Fit to your existing wheels — no new vehicle required.',
    url: '/products/run-flat-tires',
  },
  {
    id: '03',
    title: 'TEST THE SAMPLE',
    description:
      'Buy a sample, run your own test, measure it yourself. If the panel does not perform, we want to know — every claim ships with a reproducible protocol.',
    url: '/test-samples',
  },
]

export default function HomeServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isBtnHovered, setIsBtnHovered] = useState(false)

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const totalHeight = rect.height
    const windowHeight = window.innerHeight
    const scrollableDistance = totalHeight - windowHeight

    if (scrollableDistance <= 0) return

    const currentScroll = -rect.top
    const rawProgress = Math.max(0, Math.min(1, currentScroll / scrollableDistance))
    const continuousProgress = rawProgress * (SERVICES_DATA.length - 1)

    setScrollProgress(continuousProgress)

    if (continuousProgress < 0.6) {
      setActiveIndex(0)
    } else if (continuousProgress < 1.4) {
      setActiveIndex(1)
    } else {
      setActiveIndex(2)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSlide = (index: number) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const sectionTop = scrollTop + rect.top
    const scrollDistance = rect.height - window.innerHeight
    const targetScroll = sectionTop + (index / (SERVICES_DATA.length - 1)) * scrollDistance

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="services__sticky">
        {/* Top label */}
        <div className="services__label">
          <h2 className="eyebrow">Two components. One protection system.</h2>
        </div>

        {/* 1200x675 main stage */}
        <div className="services__stage">
          <div className="services__frame">
            {/* Main title and number area */}
            <div className="services__main">
              <div className="services__counter">
                <div className="services__counter-window">
                  <div
                    style={{
                      transform: `translateY(-${activeIndex * 45}px)`,
                      transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'transform',
                    }}
                  >
                    {SERVICES_DATA.map((service) => (
                      <div key={service.id} className="services__counter-item">
                        <p className="services__counter-num">{service.id}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="services__counter-total">
                  <p className="services__counter-total-text">/03</p>
                </div>
              </div>

              {/* Big title vertical scroller */}
              <div className="services__title-window">
                <div
                  style={{
                    transform: `translateY(-${activeIndex * 100}px)`,
                    transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                  }}
                >
                  {SERVICES_DATA.map((service) => (
                    <div key={service.id} className="services__title-item">
                      <p className="services__title">
                        <strong>{service.title}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right media: ink panel with big index, stands in for imagery */}
            <div className="services__media">
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeIndex === index
                return (
                  <div
                    key={service.id}
                    className="services__media-item"
                    style={{
                      position: 'absolute',
                      inset: '0px',
                      width: '100%',
                      height: '100%',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1)' : 'scale(1.06)',
                      transition:
                        'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                      pointerEvents: isActive ? 'auto' : 'none',
                      willChange: 'opacity, transform',
                      backgroundColor: 'var(--color-ink)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <div className="services__media-mask">
                      <p
                        className="display-lg"
                        style={{ color: 'var(--color-paper)', textAlign: 'center' }}
                      >
                        {service.id}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom indicator, description and button */}
            <div className="services__footer">
              {/* Scroll pill indicator */}
              <div
                className="services__indicator"
                title="Click to switch"
                onClick={() => scrollToSlide((activeIndex + 1) % SERVICES_DATA.length)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="services__indicator-dot"
                  style={{
                    transform: `translateX(-50%) translateY(${
                      (scrollProgress / (SERVICES_DATA.length - 1)) * 26
                    }px)`,
                    transition: 'transform 0.15s linear',
                    willChange: 'transform',
                    opacity: 1,
                  }}
                />
              </div>

              {/* Description smooth switching */}
              <div className="services__description">
                {SERVICES_DATA.map((service, index) => {
                  const isActive = activeIndex === index
                  const offset = index < activeIndex ? -16 : index > activeIndex ? 16 : 0
                  return (
                    <div
                      key={service.id}
                      className="services__description-item"
                      style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        opacity: isActive ? 1 : 0,
                        transform: `translateY(${offset}px)`,
                        transition:
                          'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: isActive ? 'auto' : 'none',
                        willChange: 'opacity, transform',
                      }}
                    >
                      <p className="services__description-text">{service.description}</p>
                    </div>
                  )
                })}
              </div>

              {/* Restored morph button */}
              <div className="services__cta">
                <Link
                  className="service-cta"
                  href={SERVICES_DATA[activeIndex].url}
                  tabIndex={0}
                  onMouseEnter={() => setIsBtnHovered(true)}
                  onMouseLeave={() => setIsBtnHovered(false)}
                >
                  {/* Capsule stretch background */}
                  <div
                    className="service-cta__bg"
                    style={{
                      backgroundColor: 'rgba(242, 103, 61, 0.15)',
                      borderRadius: isBtnHovered ? '9.77037% / 53.3333%' : '24px',
                      transform: isBtnHovered
                        ? 'translate3d(100.32px, 0px, 0px) scale(5.45868, 1)'
                        : 'translate3d(0px, 0px, 0px) scale(1, 1)',
                      transformOrigin: '50% 50% 0px',
                      transition:
                        'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'transform, border-radius',
                    }}
                  />

                  {/* Geometric arrow and stem */}
                  <div className="service-cta__arrow">
                    <div
                      className="service-cta__pointer"
                      style={{
                        boxSizing: 'border-box',
                        width: '12px',
                        height: '12px',
                        position: 'absolute',
                        top: '50%',
                        left: '14px',
                        borderTop: '2px solid var(--color-accent)',
                        borderRight: '2px solid var(--color-accent)',
                        transform: isBtnHovered
                          ? 'translateY(-50%) translateX(2px) rotate(45deg) translateZ(0px)'
                          : 'translateY(-50%) translateX(0px) rotate(45deg) translateZ(0px)',
                        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div
                        className="service-cta__stem"
                        style={{
                          width: '20px',
                          height: '2px',
                          position: 'absolute',
                          top: '50%',
                          left: '-6px',
                          backgroundColor: 'var(--color-accent)',
                          opacity: isBtnHovered ? 1 : 0,
                          transform: 'translateY(-50%) rotate(-45deg)',
                          transformOrigin: '50% 50%',
                          transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Button text */}
                  <div className="service-cta__label">
                    <div className="service-cta__label-inner" style={{ zIndex: 1 }}>
                      <p className="service-cta__text">Explore</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll driver placeholders */}
      <div className="services__slide" />
      <div className="services__slide" />
      <div className="services__spacer" />
    </section>
  )
}