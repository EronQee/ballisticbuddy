'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

// Metrics data config (keeps component structure clean and maintainable)
const ACHIEVEMENTS_DATA = [
  { id: 'customers', value: '50K', label: 'Customers Worldwide' },
  { id: 'satisfaction', value: '98%', label: 'Client Satisfaction Rate' },
  { id: 'projects', value: '25K', label: 'Project Deliveries' },
  { id: 'awards', value: '75+', label: 'Industry Awards' },
]

const PERFORMANCE_DATA = [
  { id: 'traffic', value: '40%', label: 'Increased Traffic' },
  { id: 'hours', value: '125+', label: 'Hours Saved' },
  { id: 'speed', value: '10x', label: 'Optimized Speed' },
  { id: 'websites', value: '1M', label: 'Websites Created' },
]

function useCountUp(targetStr: string, isVisible: boolean, duration = 1600, delay = 0) {
  const [displayValue, setDisplayValue] = useState(targetStr)

  const parsed = useMemo(() => {
    const match = targetStr.match(/^(\d+(?:\.\d+)?)(.*)$/)
    if (!match) return null
    return { endValue: parseFloat(match[1]), suffix: match[2] || '' }
  }, [targetStr])

  useEffect(() => {
    if (!isVisible || !parsed) return

    const { endValue, suffix } = parsed
    let startTime: number | null = null
    let animationFrameId: number | null = null

    const timeoutId = setTimeout(() => {
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Classic Framer / Quintic ease-out (easeOutExpo)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        const currentVal = Math.round(easeOut * endValue)

        setDisplayValue(`${currentVal}${suffix}`)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setDisplayValue(targetStr)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
    }
  }, [targetStr, parsed, isVisible, duration, delay])

  return displayValue
}

function AnimatedMetricItem({
  value,
  label,
  isVisible,
  delayIndex = 0,
}: {
  value: string
  label: string
  isVisible: boolean
  delayIndex?: number
}) {
  const animatedValue = useCountUp(value, isVisible, 1600, delayIndex * 90 + 200)

  return (
    <div
      className="framer-metric-item framer-motion-item"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0px) perspective(1200px)'
          : 'translateY(24px) perspective(1200px)',
        transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${
          delayIndex * 80 + 150
        }ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delayIndex * 80 + 150}ms`,
      }}
    >
      <div className="framer-metric-value-container">
        <p className="framer-text framer-styles-preset-16toi5x" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {animatedValue}
        </p>
      </div>
      <div className="framer-metric-stat-container">
        <p className="framer-text framer-styles-preset-84k8fm">{label}</p>
      </div>
    </div>
  )
}

function MetricColumn({
  title,
  items,
  isVisible,
  labelDelay,
}: {
  title: string
  items: { id: string; value: string; label: string }[]
  isVisible: boolean
  labelDelay: number
}) {
  return (
    <div className="framer-metric-column">
      <div
        className="framer-metric-label-container"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0px)' : 'translateY(16px)',
          transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${labelDelay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${labelDelay}ms`,
        }}
      >
        <h2 className="framer-text framer-styles-preset-v4r3qs">{title}</h2>
      </div>
      <div className="framer-metric-grid">
        {items.map((item, index) => (
          <AnimatedMetricItem key={item.id} value={item.value} label={item.label} isVisible={isVisible} delayIndex={index} />
        ))}
      </div>
    </div>
  )
}

export default function PreviewMetrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        id="metrics"
        ref={sectionRef}
        className="framer-1eoihhm"
        data-framer-name="Metrics"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateY(0px) perspective(1200px)'
            : 'translateY(32px) perspective(1200px)',
          transition:
            'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Achievements Column */}
        <MetricColumn title="Achievements" items={ACHIEVEMENTS_DATA} isVisible={isVisible} labelDelay={100} />

        {/* Center Vertical Divider Line with scaleY expansion */}
        <div
          className="framer-i4ynwr"
          data-framer-name="Line"
          style={{
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'center top',
            transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 200ms, opacity 0.6s ease',
            opacity: isVisible ? 1 : 0,
          }}
        />

        {/* Performance Column */}
        <MetricColumn title="Performance" items={PERFORMANCE_DATA} isVisible={isVisible} labelDelay={150} />
      </section>

      {/* Embedded 1:1 CSS Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .framer-1eoihhm {
              place-content: center flex-start;
              align-items: center;
              background-color: rgba(181, 181, 181, 0.15);
              border-radius: 24px;
              display: flex;
              flex: 0 0 auto;
              flex-flow: row;
              gap: 0px;
              height: auto;
              overflow: visible;
              padding: 120px 0px;
              position: relative;
              scroll-margin-top: 120px;
              transform: perspective(1200px);
              width: 100%;
              opacity: 1;
            }

            .framer-metric-column {
              place-content: center;
              align-items: center;
              display: flex;
              flex: 1 0 0px;
              flex-flow: column;
              gap: 24px;
              height: min-content;
              padding: 0px 120px;
              position: relative;
              width: 1px;
            }

            .framer-metric-label-container {
              flex: 0 0 auto;
              height: auto;
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
              transform: none;
            }

            .framer-metric-grid {
              display: grid;
              flex: 0 0 auto;
              gap: 0px;
              grid-auto-rows: 150px;
              grid-template-columns: repeat(2, minmax(50px, 1fr));
              grid-template-rows: repeat(2, 150px);
              height: auto;
              justify-content: center;
              overflow: hidden;
              padding: 0px;
              position: relative;
              width: 100%;
            }

            .framer-metric-item {
              place-content: center;
              align-items: center;
              place-self: center;
              display: flex;
              flex: 0 0 auto;
              flex-flow: column;
              gap: 12px;
              height: 100%;
              overflow: hidden;
              padding: 0px;
              position: relative;
              width: 100%;
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }

            /* Framer hover micro-interaction */
            .framer-motion-item:hover {
              transform: translateY(-4px) scale(1.02) !important;
            }

            .framer-metric-value-container {
              flex: 0 0 auto;
              height: auto;
              position: relative;
              transform: perspective(1200px);
              white-space: pre-wrap;
              width: 100%;
              word-break: break-word;
              overflow-wrap: break-word;
              outline: none;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              flex-shrink: 0;
              opacity: 1;
            }

            .framer-metric-stat-container {
              flex: 0 0 auto;
              height: auto;
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
              transform: none;
            }

            .framer-i4ynwr {
              align-self: stretch;
              background-color: var(--token-cfc0fde9-680d-4640-ae43-a7a5aeebce91, #b5b5b5);
              flex: 0 0 auto;
              height: auto;
              overflow: hidden;
              position: relative;
              width: 1px;
            }

            h2.framer-text {
              margin: 0px;
              padding: 0px;
              font-family: var(--framer-font-family, 'Montserrat', sans-serif);
              font-style: var(--framer-font-style, normal);
              font-weight: var(--framer-font-weight, 700);
              color: var(--framer-text-color, var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, #f2673d));
              font-size: calc(var(--framer-font-size, 20px) * var(--framer-font-size-scale, 1));
              letter-spacing: var(--framer-letter-spacing, 0.1em);
              text-transform: var(--framer-text-transform, uppercase);
              text-decoration: var(--framer-text-decoration, none);
              line-height: var(--framer-line-height, 1.5em);
              text-align: var(--framer-text-alignment, start);
            }

            p.framer-text {
              margin: 0px;
              padding: 0px;
            }

            .framer-styles-preset-v4r3qs {
              --framer-font-family: 'Montserrat', sans-serif;
              --framer-font-size: 20px;
              --framer-font-style: normal;
              --framer-font-weight: 700;
              --framer-letter-spacing: 0.1em;
              --framer-line-height: 1.5em;
              --framer-text-alignment: start;
              --framer-text-color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, #f2673d);
              --framer-text-decoration: none;
              --framer-text-transform: uppercase;
            }

            .framer-styles-preset-16toi5x {
              --framer-font-family: 'Montserrat', sans-serif;
              --framer-font-size: 58px;
              --framer-font-style: normal;
              --framer-font-weight: 600;
              --framer-letter-spacing: 0em;
              --framer-line-height: 1.2em;
              --framer-text-alignment: left;
              --framer-text-color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, #030303);
              --framer-text-decoration: none;
              --framer-text-transform: none;
              font-family: var(--framer-font-family);
              font-size: var(--framer-font-size);
              font-style: var(--framer-font-style);
              font-weight: var(--framer-font-weight);
              letter-spacing: var(--framer-letter-spacing);
              line-height: var(--framer-line-height);
              text-align: var(--framer-text-alignment);
              color: var(--framer-text-color);
              text-transform: var(--framer-text-transform);
              text-decoration: var(--framer-text-decoration);
            }

            .framer-styles-preset-84k8fm {
              --framer-font-family: 'Montserrat', sans-serif;
              --framer-font-size: 16px;
              --framer-font-style: normal;
              --framer-font-weight: 500;
              --framer-letter-spacing: 0em;
              --framer-line-height: 1.5em;
              --framer-text-alignment: left;
              --framer-text-color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, #030303);
              --framer-text-decoration: none;
              --framer-text-transform: uppercase;
              font-family: var(--framer-font-family);
              font-size: var(--framer-font-size);
              font-style: var(--framer-font-style);
              font-weight: var(--framer-font-weight);
              letter-spacing: var(--framer-letter-spacing);
              line-height: var(--framer-line-height);
              text-align: var(--framer-text-alignment);
              color: var(--framer-text-color);
              text-transform: var(--framer-text-transform);
              text-decoration: var(--framer-text-decoration);
            }

            @media (max-width: 768px) {
              .framer-1eoihhm {
                flex-direction: column;
                padding: 80px 0;
                gap: 48px;
              }
              .framer-metric-column {
                padding: 0px;
                width: 100%;
              }
              .framer-i4ynwr {
                width: 100% !important;
                height: 1px !important;
              }
              .framer-styles-preset-16toi5x {
                --framer-font-size: 44px;
              }
            }
          `,
        }}
      />
    </>
  )
}
