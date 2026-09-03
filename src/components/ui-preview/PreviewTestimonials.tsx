'use client'

import { useState } from 'react'

const TESTIMONIALS_DATA = [
  {
    id: 'quote-1',
    label: 'Quote 1',
    author: 'Evelyn Chen',
    company: 'Compass Sky Technologies',
    quote:
      "Roman24 blew our minds! They NAILED our vision and crafted a website that's as stunning as it is functional. We're obsessed!",
    image: 'https://framerusercontent.com/images/aabRsZbAqXiWmijW4bdKsDxvxk8.jpeg',
  },
  {
    id: 'quote-2',
    label: 'Quote 2',
    author: 'Amir Idris',
    company: 'Skyward Media',
    quote:
      'Prompt support? Check. Tailored solutions? Absolutely. Roman24 ticked all the boxes and then some. They truly understood our objectives and delivered the digital edge we needed. Big thumbs up!',
    image: 'https://framerusercontent.com/images/VLHkNCd2jXyCjCjrkRdDVxbgLZQ.jpeg',
  },
  {
    id: 'quote-3',
    label: 'Quote 3',
    author: 'Aurora Luna',
    company: 'Zephyr Innovations',
    quote:
      "Thanks to Roman24's vision and data-driven approach, our online presence underwent a dramatic makeover. Their creative campaigns and targeted strategies catapulted our brand to new heights.",
    image: 'https://framerusercontent.com/images/ybkD9oTo47bHPSfHPgj4iQMGk0Q.jpeg',
  },
]

function QuoteIcon({ isActive }: { isActive: boolean }) {
  return (
    <div
      className="testimonial__icon"
      style={{
        boxSizing: 'border-box',
        flex: '0 0 auto',
        aspectRatio: '1 / 1',
        position: 'relative',
        zIndex: 1,
        width: isActive ? '50px' : '20px',
        height: isActive ? '53px' : '23px',
        transform: 'rotate(180deg)',
        transformOrigin: '50% 50% 0px',
        transition:
          'width 0.6s cubic-bezier(0.25, 1, 0.5, 1), height 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      <svg
        focusable="false"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
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
        <path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z" />
      </svg>
    </div>
  )
}

export default function PreviewTestimonials() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const getAvatarSlotStyles = (itemIndex: number) => {
    const isHovered = hoveredAvatar === itemIndex
    const slotOffset = (itemIndex - activeIndex + 3) % 3

    if (slotOffset === 0) {
      return {
        width: '250px',
        height: '250px',
        top: '0px',
        right: '0px',
        zIndex: 2,
        opacity: 1,
        innerOpacity: 1,
        transform: isHovered
          ? 'translate3d(0px, 0px, 0px) scale(1.02)'
          : 'translate3d(0px, 0px, 0px) scale(1)',
      }
    }

    if (slotOffset === 1) {
      return {
        width: '125px',
        height: '125px',
        top: '225px',
        right: '61px',
        zIndex: 1,
        opacity: isHovered ? 0.85 : 0.5,
        innerOpacity: isHovered ? 0.85 : 0.5,
        transform: isHovered
          ? 'translate3d(0px, 0px, 0px) scale(1.04)'
          : 'translate3d(0px, 0px, 0px) scale(1)',
      }
    }

    return {
      width: '125px',
      height: '125px',
      top: '325px',
      right: '61px',
      zIndex: 0,
      opacity: isHovered ? 0.85 : 0.5,
      innerOpacity: isHovered ? 0.85 : 0.5,
      transform: isHovered
        ? 'translate3d(0px, 0px, 0px) scale(1.04)'
        : 'translate3d(0px, 0px, 0px) scale(1)',
    }
  }

  return (
    <div id="testimonials" className="testimonials">
      {/* Header Section */}
      <div className="testimonials__header">
        <div className="testimonials__header-item">
          <h2 className="eyebrow">Testimonials - What our clients have to say</h2>
        </div>

        <div className="testimonials__header-item">
          <h3 className="display-lg">
            JOIN A GROWING COMMUNITY OF SATISFIED CUSTOMERS
          </h3>
        </div>

        <div className="testimonials__header-sub">
          <p className="text-body">
            Having collaborated with more than 250 companies, our expanding community of
            delighted clients is a testament to our industry expertise and unwavering dedication.
            We invite you to join this thriving community and experience the excellence that
            defines our work.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="testimonials__content">
        <div className="testimonials__body">
          {/* Left Column: Reordered Quotes with Active Quote at Order 0 */}
          <div className="testimonials__quotes">
            {TESTIMONIALS_DATA.map((item, index) => {
              const isActive = activeIndex === index
              const isHovered = hoveredCard === index
              const displayOrder = (index - activeIndex + 3) % 3

              return (
                <div
                  key={item.id}
                  className="testimonial"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    boxSizing: 'border-box',
                    flex: '0 0 auto',
                    cursor: 'pointer',
                    height: 'auto',
                    position: 'relative',
                    width: '100%',
                    order: displayOrder,
                    transform: 'none',
                    transformOrigin: '50% 50% 0px',
                    transition: 'order 0.6s ease',
                  }}
                >
                  <div
                    className="testimonial__card"
                    tabIndex={0}
                    style={{
                      boxSizing: 'border-box',
                      placeContent: 'start flex-start',
                      gap: '24px',
                      padding: '24px',
                      alignItems: 'start',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      height: 'min-content',
                      position: 'relative',
                      borderRadius: '24px',
                      backgroundColor: isActive
                        ? 'var(--color-paper)'
                        : 'rgba(0, 0, 0, 0)',
                      width: '100%',
                      opacity: isActive ? 1 : isHovered ? 0.8 : 0.5,
                      transform:
                        isHovered && !isActive
                          ? 'translate3d(4px, 0px, 0px)'
                          : 'translate3d(0px, 0px, 0px)',
                      transformOrigin: '50% 50% 0px',
                      transition:
                        'background-color 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease',
                      boxShadow: isActive ? '0 10px 30px -10px rgba(0, 0, 0, 0.06)' : 'none',
                    }}
                  >
                    <QuoteIcon isActive={isActive} />

                    <div
                      className="testimonial__main"
                      style={{
                        boxSizing: 'border-box',
                        placeContent: 'start flex-start',
                        flex: '1 0 0px',
                        flexFlow: 'column',
                        gap: '24px',
                        overflow: 'visible',
                        padding: '24px 24px 0px 0px',
                        alignItems: 'start',
                        display: 'flex',
                        height: 'min-content',
                        position: 'relative',
                        width: '1px',
                        transform: 'none',
                        transformOrigin: '50% 50% 0px',
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
                          transformOrigin: '50% 50% 0px',
                        }}
                      >
                        <h4 className="card-title">{item.quote}</h4>
                      </div>

                      <div
                        className="testimonial__meta"
                        style={{
                          placeContent: 'start flex-start',
                          flex: '0 0 auto',
                          flexFlow: 'column',
                          gap: '0px',
                          overflow: 'visible',
                          padding: '0px',
                          alignItems: 'start',
                          display: 'flex',
                          height: 'min-content',
                          position: 'relative',
                          width: '100%',
                          transform: 'none',
                          transformOrigin: '50% 50% 0px',
                        }}
                      >
                        <h5 className="testimonial__author">{item.author}</h5>
                        <p className="testimonial__company">{item.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Floating Avatar Spheres aligned with active first row */}
          <div className="testimonials__avatars">
            {TESTIMONIALS_DATA.map((item, index) => {
              const slotStyle = getAvatarSlotStyles(index)

              return (
                <button
                  key={item.id}
                  className="testimonial__avatar"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredAvatar(index)}
                  onMouseLeave={() => setHoveredAvatar(null)}
                  style={{
                    boxSizing: 'border-box',
                    fontSize: '12px',
                    fontFamily: 'sans-serif',
                    borderWidth: '0px',
                    padding: '0px',
                    background: 'none',
                    flex: '0 0 auto',
                    overflow: 'visible',
                    aspectRatio: '1 / 1',
                    cursor: 'pointer',
                    position: 'absolute',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-blush)',
                    top: slotStyle.top,
                    right: slotStyle.right,
                    width: slotStyle.width,
                    height: slotStyle.height,
                    zIndex: slotStyle.zIndex,
                    opacity: slotStyle.opacity,
                    transform: slotStyle.transform,
                    transformOrigin: '50% 50% 0px',
                    transition:
                      'top 0.6s cubic-bezier(0.25, 1, 0.5, 1), right 0.6s cubic-bezier(0.25, 1, 0.5, 1), width 0.6s cubic-bezier(0.25, 1, 0.5, 1), height 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  <div
                    style={{
                      boxSizing: 'border-box',
                      flex: '0 0 auto',
                      inset: '10px',
                      overflow: 'visible',
                      position: 'absolute',
                      borderRadius: '50%',
                      opacity: slotStyle.innerOpacity,
                      transform: 'none',
                      transformOrigin: '50% 50% 0px',
                      transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                  >
                    <div
                      style={{
                        boxSizing: 'border-box',
                        borderRadius: 'inherit',
                        inset: '0px',
                        position: 'absolute',
                      }}
                    >
                      <img
                        decoding="async"
                        alt="Client Portrait"
                        src={item.image}
                        style={{
                          boxSizing: 'border-box',
                          borderRadius: 'inherit',
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          objectPosition: 'center center',
                          objectFit: 'cover',
                          imageRendering: 'auto',
                          transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                      />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
