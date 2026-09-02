'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function PreviewAbout() {
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
    'Empower our clients with transformative digital solutions.',
    'We are dedicated to staying ahead of the curve, embracing',
    'emerging technologies, and continously evolving to anticipate',
    'and meet the ever-changing needs of our clients.',
  ]

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
.preview-about {
  align-content: flex-start;
  align-items: flex-start;
  display: flex;
  flex: 0 0 auto;
  flex-flow: column;
  gap: 120px;
  height: auto;
  justify-content: flex-start;
  max-width: 1920px;
  margin: 0 auto;
  overflow: visible;
  padding: 120px;
  position: relative;
  scroll-margin-top: 72px;
  width: 100%;
}

.preview-about-label {
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  flex: 0 0 auto;
  white-space: pre-wrap;
  height: auto;
  position: relative;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
}

.preview-about-content {
  align-content: flex-start;
  align-items: flex-start;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 6px;
  height: min-content;
  justify-content: flex-start;
  overflow: visible;
  padding: 0px 120px;
  position: relative;
  width: 100%;
}

.preview-about-line {
  flex: 0 0 auto;
  height: auto;
  position: relative;
  width: 100%;
}

.preview-about-line-inner {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 10px;
  height: min-content;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0px;
  position: relative;
  width: 100%;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.preview-about-text {
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  flex: 0 0 auto;
  white-space: pre-wrap;
  height: auto;
  position: relative;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
}

.preview-about-spacer {
  flex: 0 0 auto;
  height: 65px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

/* ========== Shared Framer Button ========== */
.preview-btn-wrap {
  flex: 0 0 auto;
  height: auto;
  position: relative;
  width: auto;
}

.preview-btn {
  align-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 12px;
  height: 45px;
  justify-content: flex-start;
  padding: 0px 24px 0px 0px;
  position: relative;
  text-decoration: none;
  width: min-content;
  border-width: 0px;
  background: none;
  opacity: 1;
  white-space: nowrap;
}

.preview-btn-bg {
  aspect-ratio: 1 / 1;
  bottom: 0px;
  flex: 0 0 auto;
  left: 0px;
  overflow: visible;
  position: absolute;
  top: 0px;
  width: 45px;
  height: 45px;
  z-index: 0;
  border-radius: 24px;
  background-color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  transform-origin: 50% 50% 0px;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, border-radius;
  pointer-events: none;
}

.preview-btn-arrow {
  aspect-ratio: 1 / 1;
  flex: 0 0 auto;
  height: 45px;
  overflow: visible;
  position: relative;
  width: 45px;
  z-index: 1;
  pointer-events: none;
}

.preview-btn-pointer {
  aspect-ratio: 1 / 1;
  flex: 0 0 auto;
  height: 12px;
  left: 14px;
  overflow: visible;
  position: absolute;
  top: 50%;
  width: 12px;
  transform: translateY(-50%) rotate(45deg) translateZ(0px);
  transform-origin: 50% 50% 0px;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.preview-btn-pointer[data-border='true']::after {
  content: '';
  border-width: 2px 2px 0px 0px;
  border-color: var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
  border-style: solid;
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  left: 0;
  top: 0;
  border-radius: inherit;
  pointer-events: none;
}

.preview-btn-stem {
  top: 50%;
  flex: 0 0 auto;
  height: 2px;
  left: -7px;
  overflow: visible;
  position: absolute;
  right: -1px;
  background-color: var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
  transform: translateY(-50%) rotate(-45deg) translateZ(0px);
  transform-origin: 50% 50% 0px;
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.preview-btn-label {
  align-content: center;
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0px;
  height: min-content;
  justify-content: center;
  overflow: visible;
  padding: 2px 0px 0px;
  position: relative;
  width: min-content;
  z-index: 1;
  pointer-events: none;
}

/* ========== Typography Presets ========== */
.framer-styles-preset-v4r3qs {
  margin: 0px;
  padding: 0px;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  text-align: left;
  color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, #f2673d);
  text-decoration: none;
  text-transform: uppercase;
}

.framer-styles-preset-qy8qgc {
  margin: 0px;
  padding: 0px;
  font-family: 'Montserrat', sans-serif;
  font-size: 42px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0em;
  line-height: 1.5em;
  text-align: left;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, #030303);
  text-decoration: none;
  text-transform: none;
}

.framer-styles-preset-84k8fm {
  margin: 0px;
  padding: 0px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 1.5em;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (max-width: 1024px) {
  .preview-about {
    padding: 60px 40px;
    gap: 60px;
  }
  .preview-about-content {
    padding: 0px 20px;
  }
  .framer-styles-preset-qy8qgc {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .preview-about {
    padding: 40px 20px;
    gap: 40px;
  }
  .preview-about-content {
    padding: 0px;
  }
  .framer-styles-preset-qy8qgc {
    font-size: 24px;
    line-height: 1.4em;
  }
  .framer-styles-preset-v4r3qs {
    font-size: 16px;
  }
}
`,
        }}
      />

      <section id="about" className="preview-about" data-framer-name="About">
        {/* Label Container */}
        <div className="preview-about-label" data-framer-name="Label">
          <h2 className="framer-styles-preset-v4r3qs">
            Welcome to Roman24 - This is our Mission:
          </h2>
        </div>

        {/* Content Container with 4 scroll-reactive lines */}
        <div className="preview-about-content">
          {aboutLines.map((line, index) => (
            <div key={line} ref={lineRefs[index]} className="preview-about-line">
              <div className="preview-about-line-inner" style={{ opacity: opacities[index] }}>
                <div className="preview-about-text">
                  <h3 className="framer-styles-preset-qy8qgc">{line}</h3>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer */}
          <div className="preview-about-spacer" data-framer-name="Spacer" />

          {/* Button Link */}
          <div className="preview-btn-wrap">
            <a
              className="preview-btn"
              data-highlight="true"
              data-reset="button"
              data-framer-name="Color"
              href="https://roman24.framer.website/about"
              tabIndex={0}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              onFocus={() => setIsButtonHovered(true)}
              onBlur={() => setIsButtonHovered(false)}
            >
              {/* Expanding Orange Background Morph */}
              <div
                className="preview-btn-bg"
                data-framer-name="BG"
                style={{
                  borderRadius: isButtonHovered ? '10.9793% / 53.3333%' : '24px',
                  transform: isButtonHovered
                    ? 'translate3d(86.7969px, 0px, 0px) scale(4.85764, 1)'
                    : 'translate3d(0px, 0px, 0px) scale(1, 1)',
                }}
              />

              {/* Arrow Wrapper */}
              <div className="preview-btn-arrow" data-framer-name="Arrow">
                {/* Chevron Icon Pointer */}
                <div
                  className="preview-btn-pointer"
                  data-border="true"
                  data-framer-name="Pointer"
                  style={{
                    transform: isButtonHovered
                      ? 'translateY(-50%) rotate(45deg) translate(2px, -2px)'
                      : 'translateY(-50%) rotate(45deg) translateZ(0px)',
                  }}
                >
                  {/* Stem of Arrow (reveals on hover) */}
                  <div
                    className="preview-btn-stem"
                    data-framer-name="Stem"
                    style={{ opacity: isButtonHovered ? 1 : 0 }}
                  />
                </div>
              </div>

              {/* Text Label */}
              <div className="preview-btn-label">
                <p
                  className="framer-styles-preset-84k8fm"
                  style={{
                    color: isButtonHovered
                      ? 'var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247))'
                      : 'var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61))',
                  }}
                >
                  Read About Us
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}