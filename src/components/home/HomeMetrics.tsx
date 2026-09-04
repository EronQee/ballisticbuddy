'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

// Metrics data config (keeps component structure clean and maintainable)
const PROTECTION_DATA = [
  { id: 'levels', value: '1–7', label: 'Protection Levels' },
  { id: 'thickness', value: '20–60', label: 'Glass Thickness (mm)' },
  { id: 'standard', value: 'GA/T', label: 'National Test Standard' },
  { id: 'threats', value: 'P–R', label: 'Pistol to Rifle Threats' },
]

const TIRE_DATA = [
  { id: 'distance', value: '50+', label: 'Run-Flat Distance (km)' },
  { id: 'vehicles', value: '100+', label: 'Fitting Kits & Vehicles' },
  { id: 'install', value: '4h', label: 'Typical Install Time' },
  { id: 'downtime', value: '0', label: 'Wheel Downtime' },
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
          className="text-sm font-medium uppercase tracking-[0.08em] text-[var(--color-ink-soft)]"
          style={{ fontFamily: 'var(--font-display)' }}
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

export default function HomeMetrics() {
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
      {/* Protection Column */}
      <MetricColumn title="Protection" items={PROTECTION_DATA} isVisible={isVisible} labelDelay={100} />

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

      {/* Tires Column */}
      <MetricColumn title="Run-Flat Tires" items={TIRE_DATA} isVisible={isVisible} labelDelay={150} />
    </section>
  )
}