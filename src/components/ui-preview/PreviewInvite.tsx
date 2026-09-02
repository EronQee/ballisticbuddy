'use client'

export default function PreviewInvite() {
  return (
    <>
      <div id="invite" className="iv-section">
        {/* Background image */}
        <div className="iv-bg">
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
          className="iv-gradient"

          style={{
            background:
              'radial-gradient(114.4% 240.8% at 8.4% 55.2%, rgba(3,3,3,0) 0%, var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3)) 41.56%)',
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
          className="iv-noise"
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
        <div className="iv-content">
          {/* Eyebrow (H2) */}
          <div className="iv-text-block">
            <h2 className="iv-eyebrow">work with our team of experts</h2>
          </div>

          {/* Headline */}
          <div className="iv-text-block">
            <p className="iv-headline">GET YOUR BRAND TO THE NEXT LEVEL</p>
          </div>

          {/* Description */}
          <div className="iv-text-block">
            <p className="iv-desc">
              Begin your creative exploration with us! Reach out today to initiate a conversation.
              Our team is dedicated to transforming your concepts into vibrant artistic realities.
            </p>
          </div>
        </div>

        {/* Interactive button */}
        <div className="iv-btn-wrap">
          <a className="iv-btn" tabIndex={0} href="#contact">
            {/* Orange icon circle */}
            <div className="iv-btn-icon">
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
            <div className="iv-btn-label">
              <p className="iv-btn-copy">Start Working with Out Team</p>
            </div>
          </a>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
.iv-section {
  place-content: flex-end center;
  border-radius: 24px;
  flex: 0 0 auto;
  flex-flow: column;
  gap: 72px;
  overflow: hidden;
  padding: 48px 0;
  align-items: flex-end;
  display: flex;
  height: 800px;
  position: relative;
  scroll-margin-top: 72px;
  width: 100%;
  opacity: 1;
}

.iv-bg {
  border-radius: inherit;
  inset: 0px;
  position: absolute;
}

.iv-gradient {
  flex: 0 0 auto;
  overflow: hidden;
}

.iv-noise {
  flex: 0 0 auto;
  overflow: hidden;
}

.iv-content {
  place-content: center;
  flex: 0 0 auto;
  flex-flow: column;
  gap: 16px;
  overflow: hidden;
  padding: 0px;
  align-items: flex-start;
  display: flex;
  height: min-content;
  position: relative;
  width: 52%;
  max-width: 640px;
  z-index: 2;
}

.iv-text-block {
  flex: 0 0 auto;
  white-space: pre-wrap;
  height: auto;
  position: relative;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
  z-index: 1;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
}

.iv-eyebrow {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-family: var(--framer-font-family, 'Inter', sans-serif);
  font-style: normal;
  font-weight: 500;
  color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.2em;
  text-align: start;
}

.iv-headline {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-family: var(--framer-font-family, 'Inter', sans-serif);
  font-style: normal;
  font-weight: 700;
  color: var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
  font-size: 42px;
  letter-spacing: -0.03em;
  text-transform: none;
  line-height: 1.15em;
  text-align: start;
}

.iv-desc {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-family: var(--framer-font-family, 'Inter', sans-serif);
  font-style: normal;
  font-weight: 400;
  color: rgba(247, 247, 247, 0.72);
  font-size: 16px;
  letter-spacing: -0.01em;
  text-transform: none;
  line-height: 1.6em;
  text-align: start;
}

.iv-btn-wrap {
  flex: 0 0 auto;
  height: auto;
  position: relative;
  width: 52%;
  max-width: 640px;
  z-index: 2;
}

.iv-btn {
  border-width: 0px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  place-content: center;
  flex-flow: row;
  gap: 14px;
  padding: 6px 24px 6px 6px;
  text-decoration: none;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  height: min-content;
  position: relative;
  width: min-content;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.iv-btn-icon {
  flex: 0 0 auto;
  overflow: hidden;
  width: 44px;
  height: 44px;
  z-index: 1;
  border-radius: 50%;
  background-color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.iv-btn-label {
  place-content: center;
  flex: 0 0 auto;
  flex-flow: column;
  gap: 0px;
  overflow: visible;
  padding: 0px 6px 0px 0px;
  align-items: center;
  display: flex;
  height: min-content;
  position: relative;
  width: min-content;
  opacity: 1;
}

.iv-btn-copy {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-family: var(--framer-font-family, 'Inter', sans-serif);
  font-style: normal;
  font-weight: 500;
  color: var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
  font-size: 15px;
  letter-spacing: 0;
  text-transform: none;
  line-height: 1.2em;
  text-align: start;
  white-space: pre;
}

.iv-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.iv-btn:hover .iv-btn-icon {
  transform: scale(1.05);
}

.iv-btn:hover svg {
  transform: translate(2px, -2px);
}

@media (max-width: 1024px) {
  .iv-section {
    height: auto;
    min-height: 700px;
    padding: 40px 0;
  }
  .iv-content,
  .iv-btn-wrap {
    width: 80%;
  }
}

@media (max-width: 640px) {
  .iv-section {
    padding: 24px 0;
    gap: 48px;
    align-items: flex-start;
  }
  .iv-content,
  .iv-btn-wrap {
    width: 100%;
  }
  .iv-headline {
    font-size: 32px;
  }
}
`,
        }}
      />
    </>
  )
}