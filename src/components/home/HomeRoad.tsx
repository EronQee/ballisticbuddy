'use client'

import { useState, useEffect, useRef } from 'react'

// ---- Damped spring constants (After-Effects grade) ----
// Card main body: heavy mass, ~0.9s period. Star: decoupled angular momentum.
// These `linear()` curves are pre-sampled from the underdamped oscillator
// x(t) = 1 - e^(-ζωn t)(cos(ωd t) + ζ/√(1-ζ²) sin(ωd t)), normalized over [0,1].
const CARD_SPRING_CURVE =
  'linear(0, 0.006, 0.025 2.8%, 0.101 6.1%, 0.539 18.9%, 0.721 25.3%, 0.849 31.5%, 0.937 38.1%, 1.008 45.4%, 1.026 52.8%, 1.018 60.6%, 0.998 70.1%, 0.996 79.4%, 1 100%)'
const STAR_SPRING_CURVE =
  'linear(0, 0.005 3%, 0.03 7%, 0.12 13%, 0.34 22%, 0.61 31%, 0.83 40%, 0.97 49%, 1.025 58%, 1.04 66%, 1.015 74%, 0.997 84%, 1 100%)'

const WORKFLOW_STEPS = [
  {
    id: '01',
    title: 'SHARE THE THREAT PROFILE',
    description:
      'Tell us the vehicle and the threat you want to stop — handgun, rifle, or both. We map the threat to a protection level and a fitting kit.',
    initialRotation: 223.128,
  },
  {
    id: '02',
    title: 'GET A SPEC & QUOTE',
    description: `You receive a full specification — thickness, weight, light transmission — and a transparent price range for glass, tires, or both. No opaque line items.`,
    initialRotation: 223.056,
  },
  {
    id: '03',
    title: 'TEST THE SAMPLE',
    description:
      'Order the sample, run your own ballistic test, verify the numbers. Every claim ships with a test protocol you can reproduce.',
    initialRotation: 223.056,
  },
  {
    id: '04',
    title: 'PRODUCTION & QA',
    description: `Once you confirm, we produce to spec and test each batch against the published standard. Test reports travel with the order.`,
    initialRotation: 223.056,
  },
  {
    id: '05',
    title: 'SHIP & INSTALL SUPPORT',
    description: `Panels and inserts ship with fitting documentation and installation support — so the protection you tested is the protection you drive with.`,
    initialRotation: 223.056,
  },
]

function StarIcon({ rotation }: { rotation: number }) {
  return (
    <div
      className="workflow-card__star"
      style={{
        boxSizing: 'border-box',
        flex: '0 0 auto',
        height: '30px',
        position: 'relative',
        width: '30px',
        opacity: 1,
        transform: `translateX(0px) translateY(0px) scale(1) rotate(${rotation}deg) rotateX(0deg) rotateY(0deg) skewX(0deg) skewY(0deg) translateZ(0px)`,
        // Decoupled angular momentum: higher angular velocity than the card body
        transition: `transform 1.25s ${STAR_SPRING_CURVE} 0.12s`,
        willChange: 'transform',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        focusable="false"
        style={{
          userSelect: 'none',
          width: '100%',
          height: '100%',
          display: 'inline-block',
          fill: 'var(--color-accent)',
          color: 'var(--color-accent)',
          flexShrink: 0,
        }}
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm64.12,133.14a8,8,0,0,1-8.24,13.72L136,142.13V194a8,8,0,0,1-16,0V142.13L72.12,170.86a8,8,0,0,1-8.24-13.72L112.45,128,63.88,98.86a8,8,0,0,1,8.24-13.72L120,113.87V62a8,8,0,0,1,16,0v51.87l47.88-28.73a8,8,0,1,1,8.24,13.72L143.55,128Z" />
      </svg>
    </div>
  )
}

function WorkflowCard({ step }: { step: (typeof WORKFLOW_STEPS)[number] }) {
  const cardRef = useRef<HTMLLIElement>(null)
  const [isEntered, setIsEntered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsEntered(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    const currentElem = cardRef.current
    if (currentElem) {
      observer.observe(currentElem)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <li
      ref={cardRef}
      className="workflow-card"
      style={{
        boxSizing: 'border-box',
        flex: '0 0 auto',
        height: 'auto',
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        zIndex: 1,
        listStyle: 'none',
      }}
    >
      <div
        className="workflow-card__inner"
        style={{
          boxSizing: 'border-box',
          placeContent: 'center flex-end',
          flexFlow: 'column',
          gap: '0px',
          overflow: 'visible',
          padding: '48px',
          alignItems: 'center',
          display: 'flex',
          height: 'auto',
          position: 'relative',
          borderRadius: '24px',
          backgroundColor: 'rgba(181, 181, 181, 0.15)',
          width: '100%',
          opacity: isEntered ? 1 : 0,
          transform: isEntered
            ? 'perspective(1200px) translateX(0px) translateY(0px) scale(1) rotateX(0deg)'
            : 'perspective(1200px) translateX(0px) translateY(120px) scale(0.92) rotateX(8deg)',
          // Damped spring on the transform channel: overshoot + oscillation baked into CSS
          transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s ${CARD_SPRING_CURVE}`,
          willChange: 'transform, opacity',
        }}
      >
        {/* Card Header: Icon & Step Number */}
        <div
          className="workflow-card__header"
          style={{
            placeContent: 'center flex-start',
            flex: '0 0 auto',
            flexFlow: 'row',
            gap: '10px',
            overflow: 'visible',
            padding: '0px 0px 48px',
            alignItems: 'center',
            display: 'flex',
            height: 'min-content',
            position: 'relative',
            width: '100%',
            opacity: 1,
          }}
        >
          <StarIcon rotation={isEntered ? 323.64 : step.initialRotation} />

          <div
            style={{
              flex: '0 0 auto',
              whiteSpace: 'pre',
              height: 'auto',
              position: 'relative',
              width: 'auto',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              flexShrink: 0,
              transform: 'none',
              opacity: 1,
            }}
          >
            <p className="eyebrow">{step.id}</p>
          </div>
        </div>

        {/* Card Body: Title and Description */}
        <div
          className="workflow-card__body"
          style={{
            placeContent: 'center flex-start',
            flex: '0 0 auto',
            flexFlow: 'column',
            gap: '24px',
            overflow: 'visible',
            padding: '0px',
            alignItems: 'center',
            display: 'flex',
            height: 'min-content',
            position: 'relative',
            width: '100%',
            opacity: 1,
          }}
        >
          <div
            style={{
              flex: '0 0 auto',
              whiteSpace: 'pre-wrap',
              height: 'auto',
              position: 'relative',
              width: '100%',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              flexShrink: 0,
              transform: 'none',
              opacity: 1,
            }}
          >
            <h4 className="card-title">{step.title}</h4>
          </div>

          <div
            style={{
              flex: '0 0 auto',
              whiteSpace: 'pre-wrap',
              height: 'auto',
              position: 'relative',
              width: '100%',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              flexShrink: 0,
              transform: 'none',
              opacity: 1,
            }}
          >
            <p className="text-body">{step.description}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function HomeRoad() {
  return (
    <section id="workflow" className="workflow">
      {/* Sticky Left Content Section */}
      <div className="workflow__sticky">
        {/* Label */}
        <div className="workflow__label">
          <h2 className="eyebrow">From threat profile to installed protection</h2>
        </div>

        {/* Header */}
        <div className="workflow__heading">
          <h3 className="display-lg">
            FROM SAMPLE TO INSTALLED — A PROCESS BUILT FOR VERIFICATION
          </h3>
        </div>

        {/* Message */}
        <div className="workflow__message">
          <p className="text-body">
            We guide you through every step — threat assessment, specification, sample testing,
            production and installation. You verify the protection at each stage, with the test
            protocol in hand.
          </p>
        </div>
      </div>

      {/* Right Cards List */}
      <ol className="workflow__cards">
        {WORKFLOW_STEPS.map((step) => (
          <WorkflowCard key={step.id} step={step} />
        ))}
      </ol>
    </section>
  )
}