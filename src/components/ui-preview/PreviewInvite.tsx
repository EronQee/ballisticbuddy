'use client'

export default function PreviewInvite() {
  return (
    <div id="invite" className="invite">
      {/* Background image */}
      <div className="invite__bg">
        <img
          alt="Office workers"
          sizes="calc(min(100vw, 1920px) - 24px)"
          src="https://framerusercontent.com/images/l41Eir5TqzCXE1HR5V47L0i6RM.jpeg"
          srcSet="https://framerusercontent.com/images/l41Eir5TqzCXE1HR5V47L0i6RM.jpeg?scale-down-to=512 512w,https://framerusercontent.com/images/l41Eir5TqzCXE1HR5V47L0i6RM.jpeg?scale-down-to=1024 1024w,https://framerusercontent.com/images/l41Eir5TqzCXE1HR5V47L0i6RM.jpeg?scale-down-to=2048 2048w,https://framerusercontent.com/images/l41Eir5TqzCXE1HR5V47L0i6RM.jpeg 3024w"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectPosition: 'center center',
            objectFit: 'cover',
            imageRendering: 'auto',
          }}
        />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="invite__gradient"
        style={{
          background:
            'radial-gradient(114.4% 240.8% at 8.4% 55.2%, rgba(3,3,3,0) 0%, var(--color-ink) 41.56%)',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 0,
        }}
      />

      {/* Noise texture layer */}
      <div
        className="invite__noise"
        style={{
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            borderRadius: '0px',
            width: '100%',
            height: '100%',
            backgroundSize: '128px',
            backgroundRepeat: 'repeat',
            backgroundImage:
              'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
            opacity: 0.1,
          }}
        />
      </div>

      {/* Text content */}
      <div className="invite__content">
        {/* Eyebrow (H2) */}
        <div className="invite__text">
          <h2 className="invite__eyebrow">work with our team of experts</h2>
        </div>

        {/* Headline */}
        <div className="invite__text">
          <p className="invite__headline">GET YOUR BRAND TO THE NEXT LEVEL</p>
        </div>

        {/* Description */}
        <div className="invite__text">
          <p className="invite__desc">
            Begin your creative exploration with us! Reach out today to initiate a conversation.
            Our team is dedicated to transforming your concepts into vibrant artistic realities.
          </p>
        </div>
      </div>

      {/* Interactive button */}
      <div className="invite__cta">
        <a className="invite-cta" tabIndex={0} href="#contact">
          {/* Orange icon circle */}
          <div className="invite-cta__icon">
            {/* Arrow decoration SVG */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: 'block',
                transform: 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            >
              <path
                d="M3 11L11 3M11 3H4.5M11 3V9.5"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Button label */}
          <div className="invite-cta__label">
            <p className="invite-cta__text">Start Working with Out Team</p>
          </div>
        </a>
      </div>
    </div>
  )
}
