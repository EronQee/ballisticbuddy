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

        // Quintic ease-out (easeOutExpo)
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
      className="metrics__item"
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
      <div className="metrics__value">
        <p className="display-lg" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {animatedValue}
        </p>
      </div>
      <div className="metrics__stat">
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: 0,
            lineHeight: '1.5em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
          }}
        >
          {label}
        </p>
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
    <div className="metrics__column">
      <div
        className="metrics__label"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0px)' : 'translateY(16px)',
          transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${labelDelay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${labelDelay}ms`,
        }}
      >
        <h2 className="eyebrow">{title}</h2>
      </div>
      <div className="metrics__grid">
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
    <section
      id="metrics"
      ref={sectionRef}
      className="metrics"
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
        className="metrics__divider"
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
  )
}
