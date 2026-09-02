'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const SERVICES_DATA = [
  {
    id: '01',
    title: 'UI/UX DESIGN',
    description:
      "Pushing the boundaries of what's possible: We blend artistry with cutting-edge tech to create digital experiences that are as beautiful as they are groundbreaking.",
    image: 'https://framerusercontent.com/images/mU4hZNris6VTimcM1cjUtTWA9I.jpeg',
    srcSet:
      'https://framerusercontent.com/images/mU4hZNris6VTimcM1cjUtTWA9I.jpeg?scale-down-to=512 512w, https://framerusercontent.com/images/mU4hZNris6VTimcM1cjUtTWA9I.jpeg?scale-down-to=1024 1024w, https://framerusercontent.com/images/mU4hZNris6VTimcM1cjUtTWA9I.jpeg 1920w',
  },
  {
    id: '02',
    title: 'APP DEVELOPMENT',
    description:
      'Empowering digital innovation through expert web & mobile Development services.',
    image: 'https://framerusercontent.com/images/ubEALWneTpRyiC0kStlVjGTRLBI.jpeg',
    srcSet:
      'https://framerusercontent.com/images/ubEALWneTpRyiC0kStlVjGTRLBI.jpeg?scale-down-to=512 512w, https://framerusercontent.com/images/ubEALWneTpRyiC0kStlVjGTRLBI.jpeg?scale-down-to=1024 1024w, https://framerusercontent.com/images/ubEALWneTpRyiC0kStlVjGTRLBI.jpeg 1280w',
  },
  {
    id: '03',
    title: 'BRAND IDENTITY',
    description:
      "Your vision, our expertise: Crafting bespoke design solutions that empower your brand's journey.",
    image: 'https://framerusercontent.com/images/bEYRpNbxMKaMZzP27cd5fzXqLVw.jpeg',
    srcSet:
      'https://framerusercontent.com/images/bEYRpNbxMKaMZzP27cd5fzXqLVw.jpeg?scale-down-to=512 512w, https://framerusercontent.com/images/bEYRpNbxMKaMZzP27cd5fzXqLVw.jpeg?scale-down-to=1024 1024w, https://framerusercontent.com/images/bEYRpNbxMKaMZzP27cd5fzXqLVw.jpeg 1280w',
  },
]

export default function PreviewServices() {
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
    <>
      <section id="services" ref={sectionRef} className="svc-section">
        <div className="svc-sticky">
          {/* Top label */}
          <div className="svc-label">
            <h2 className="svc-preset-label">our core services</h2>
          </div>

          {/* 1200x675 main stage */}
          <div className="svc-stage">
            <div className="svc-frame">
              {/* Main title and number area */}
              <div className="svc-main">
                <div className="svc-num-row">
                  <div className="svc-num-scroller">
                    <div
                      style={{
                        transform: `translateY(-${activeIndex * 45}px)`,
                        transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                        willChange: 'transform',
                      }}
                    >
                      {SERVICES_DATA.map((service) => (
                        <div key={service.id} className="svc-num-item">
                          <p className="svc-num">{service.id}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="svc-num-total">
                    <p className="svc-num-total-text">/03</p>
                  </div>
                </div>

                {/* Big title vertical scroller */}
                <div className="svc-title-scroller">
                  <div
                    style={{
                      transform: `translateY(-${activeIndex * 100}px)`,
                      transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'transform',
                    }}
                  >
                    {SERVICES_DATA.map((service) => (
                      <div key={service.id} className="svc-title-item">
                        <p className="svc-title">
                          <strong>{service.title}</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right images stacked fade */}
              <div className="svc-media">
                {SERVICES_DATA.map((service, index) => {
                  const isActive = activeIndex === index
                  return (
                    <div
                      key={service.id}
                      className="svc-media-item"
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
                      }}
                    >
                      <div className="svc-media-mask">
                        <img
                          sizes="calc(min(1200px, 100vw) * 0.8)"
                          src={service.image}
                          srcSet={service.srcSet}
                          alt={service.title}
                          className="svc-media-img"
                          decoding="async"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

{/* Bottom indicator, description and button */}
              <div className="svc-bottom">
                {/* Scroll pill indicator */}
                <div
                  className="svc-pill"
                  title="Click to switch"
                  onClick={() => scrollToSlide((activeIndex + 1) % SERVICES_DATA.length)}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="svc-pill-dot"
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
                <div className="svc-desc">
                  {SERVICES_DATA.map((service, index) => {
                    const isActive = activeIndex === index
                    const offset = index < activeIndex ? -16 : index > activeIndex ? 16 : 0
                    return (
                      <div
                        key={service.id}
                        className="svc-desc-item"
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
                        <p className="svc-desc-text">{service.description}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Restored morph button */}
                <div className="svc-btn-wrap">
                  <a
                    className="svc-btn"
                    data-framer-name="Color 2"
                    data-highlight="true"
                    data-reset="button"
                    href="https://roman24.framer.website/services"
                    tabIndex={0}
                    onMouseEnter={() => setIsBtnHovered(true)}
                    onMouseLeave={() => setIsBtnHovered(false)}
                  >
                    {/* Capsule stretch background */}
                    <div
                      className="svc-btn-bg"
                      data-framer-name="BG"
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
                    <div className="svc-btn-arrow" data-framer-name="Arrow">
                      <div
                        className="svc-btn-pointer"
                        data-border="true"
                        data-framer-name="Pointer"
                        style={{
                          boxSizing: 'border-box',
                          width: '12px',
                          height: '12px',
                          position: 'absolute',
                          top: '50%',
                          left: '14px',
                          borderTop:
                            '2px solid var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61))',
                          borderRight:
                            '2px solid var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61))',
                          transform: isBtnHovered
                            ? 'translateY(-50%) translateX(2px) rotate(45deg) translateZ(0px)'
                            : 'translateY(-50%) translateX(0px) rotate(45deg) translateZ(0px)',
                          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        <div
                          className="svc-btn-stem"
                          data-framer-name="Stem"
                          style={{
                            width: '20px',
                            height: '2px',
                            position: 'absolute',
                            top: '50%',
                            left: '-6px',
                            backgroundColor:
                              'var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61))',
                            opacity: isBtnHovered ? 1 : 0,
                            transform: 'translateY(-50%) rotate(-45deg)',
                            transformOrigin: '50% 50%',
                            transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Button text */}
                    <div className="svc-btn-label">
                      <div className="svc-btn-label-text" style={{ zIndex: 1 }}>
                        <p className="svc-btn-label-copy">View All Services</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll driver placeholders */}
        <div className="svc-slide" />
        <div className="svc-slide" />
        <div className="svc-spacer" />
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
.svc-section {
  align-content: flex-start;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: auto;
  justify-content: flex-start;
  max-width: 1920px;
  margin: 0 auto;
  overflow: visible;
  padding: 0 120px;
  position: relative;
  scroll-margin-top: 72px;
  width: 100%;
  z-index: 1;
}

.svc-sticky {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 48px;
  height: 100vh;
  justify-content: center;
  min-height: 100vh;
  overflow: visible;
  padding: 0;
  position: sticky;
  top: 0;
  width: 100%;
  will-change: transform;
  z-index: 1;
}

.svc-label {
  flex: none;
  height: auto;
  position: relative;
  white-space: pre-wrap;
  width: 100%;
  max-width: 1200px;
  word-break: break-word;
  overflow-wrap: break-word;
  z-index: 1;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
}

.svc-preset-label {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  text-transform: uppercase;
  color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  margin: 0;
  padding: 0;
}

.svc-stage {
  aspect-ratio: 1.7777777777777777 / 1;
  flex: none;
  max-height: 675px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  z-index: 1;
}

.svc-frame {
  height: 100%;
  overflow: visible;
  position: relative;
  width: 100%;
}

.svc-main {
  align-content: start;
  align-items: start;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 12px;
  height: 80%;
  justify-content: flex-start;
  left: 0;
  overflow: visible;
  padding: 0 0 24px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
  pointer-events: none;
}

.svc-num-row {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 3px;
  height: 50px;
  justify-content: flex-start;
  overflow: visible;
  padding: 0;
  position: relative;
  width: 100%;
  z-index: 1;
}

.svc-num-scroller {
  align-content: start;
  align-items: start;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: 45px;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 35px;
}

.svc-num-item {
  flex: none;
  height: 45px;
  position: relative;
  white-space: pre;
  width: auto;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}

.svc-num {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  text-transform: uppercase;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
  margin: 0;
  padding: 0;
}

.svc-num-total {
  flex: none;
  height: auto;
  position: relative;
  white-space: pre;
  width: auto;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  opacity: 0.5;
}

.svc-num-total-text {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  text-transform: uppercase;
  color: var(--token-cfc0fde9-680d-4640-ae43-a7a5aeebce91, rgb(181, 181, 181));
  margin: 0;
  padding: 0;
}

.svc-title-scroller {
  align-content: start;
  align-items: start;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: 100px;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
  z-index: 1;
}

.svc-title-item {
  flex: none;
  height: 100px;
  position: relative;
  white-space: pre;
  width: auto;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}

.svc-title {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: clamp(36px, 5.7vw, 82px);
  letter-spacing: 0em;
  line-height: 1.2em;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
  margin: 0;
  padding: 0;
}

.svc-media {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: 80%;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 80%;
  border-radius: 24px;
  background-color: #eaeaea;
  z-index: 0;
}

.svc-media-item {
  flex: none;
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
  border-radius: 24px;
}

.svc-media-mask {
  position: absolute;
  border-radius: inherit;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.svc-media-img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-position: center;
  object-fit: cover;
  image-rendering: auto;
}

.svc-bottom {
  align-content: start;
  align-items: start;
  bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 48px;
  height: 20%;
  justify-content: flex-start;
  overflow: visible;
  padding: 48px 0 0;
  position: absolute;
  right: 0;
  width: 100%;
  z-index: 1;
}

.svc-pill {
  aspect-ratio: 0.6 / 1;
  flex: none;
  height: 47px;
  left: 0;
  overflow: hidden;
  position: relative;
  margin-top: -47px;
  width: 28px;
  border-radius: 50px;
  border: 2px solid rgba(181, 181, 181, 0.5);
  z-index: 1;
  box-sizing: border-box;
}

.svc-pill-dot {
  aspect-ratio: 1 / 1;
  flex: none;
  height: 6px;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 10px;
  width: 6px;
  border-radius: 50%;
  background-color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
}

.svc-desc {
  align-content: center;
  align-items: center;
  display: flex;
  flex: 1 0 0px;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: 100%;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 1px;
}

.svc-desc-item {
  flex: none;
  height: 100%;
  position: relative;
  white-space: pre-wrap;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
}

.svc-desc-text {
  font-family: 'Montserrat', 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0em;
  line-height: 2em;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
  margin: 0;
  padding: 0;
}

.svc-btn-wrap {
  flex: none;
  height: auto;
  position: relative;
  width: auto;
}

.svc-btn {
  align-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 12px;
  height: min-content;
  justify-content: center;
  padding: 0 24px 0 0;
  position: relative;
  text-decoration: none;
  width: min-content;
  border-width: 0px;
  background: none;
  box-sizing: border-box;
}

.svc-btn-bg {
  aspect-ratio: 1 / 1;
  flex: 0 0 auto;
  overflow: visible;
  bottom: 0px;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 45px;
  height: 45px;
  z-index: 0;
  box-sizing: border-box;
}

.svc-btn-arrow {
  aspect-ratio: 1 / 1;
  flex: none;
  height: 45px;
  overflow: visible;
  position: relative;
  width: 45px;
  z-index: 1;
  box-sizing: border-box;
}

.svc-btn-label {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: min-content;
  justify-content: center;
  overflow: visible;
  padding: 2px 0 0;
  position: relative;
  width: min-content;
}

.svc-btn-label-copy {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0em;
  line-height: 1.5em;
  text-transform: uppercase;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
  margin: 0;
  padding: 0;
  white-space: pre;
}

.svc-slide {
  user-select: none;
  flex: none;
  height: 400px;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 0;
}

.svc-spacer {
  user-select: none;
  flex: none;
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
  z-index: 0;
}
`,
        }}
      />
    </>
  )
}
