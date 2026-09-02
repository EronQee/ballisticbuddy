'use client'

import { useState, type ReactElement } from 'react'

const SocialIcons = {
  LinkedIn: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="ft-social-svg">
      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="ft-social-svg">
      <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="ft-social-svg">
      <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z" />
    </svg>
  ),
  Telegram: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="ft-social-svg">
      <path d="M236.88,26.19a9,9,0,0,0-9.16-1.57L25.06,103.93a14.22,14.22,0,0,0,2.43,27.21L80,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L173,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L239.77,35A9,9,0,0,0,236.88,26.19ZM183.53,208,100.85,135.5l119-85.29Z" />
    </svg>
  ),
}

function SocialButton({ href, label, icon: Icon }: { href: string; label: string; icon: () => ReactElement }) {
  return (
    <div className="ft-social-btn-container">
      <a className="ft-social-anchor" aria-label={label} href={href} target="_blank" rel="noopener">
        <div className="ft-social-backdrop" data-border="true">
          <div className="ft-social-icon-box">
            <Icon />
          </div>
        </div>
      </a>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
  }

  return (
    <div className="ft-newsletter-container">
      <div
        className={`ft-newsletter ${isHovered || isFocused ? 'hover' : ''}`}
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The morphing pill background: 100% by default -> collapses to 120px behind SIGN UP on hover/focus */}
        <div className="ft-newsletter-pill" data-border="true" />

        <div className="ft-newsletter-form-wrap">
          <form className="ft-newsletter-form" onSubmit={handleSubmit} method="POST">
            <div className="ft-hidden-field" aria-hidden="true">
              <input type="text" name="b_1487cc549a49109c00fe60a80_93cd7be172" tabIndex={-1} />
            </div>

            <input
              className="ft-newsletter-input"

              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <div className="ft-submit-holder">
              <input type="submit" value="SIGN UP" className="ft-submit-btn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function PreviewFooter() {
  return (
    <>
      <div id="footer" className="ft-container">
        <footer className="ft-footer">
          {/* Top Row */}
          <div className="ft-toprow" data-border="true">
            <div className="ft-brand">
              <p className="ft-brand-copy">ROMANXXIV</p>
            </div>

            <div className="ft-social-row">
              <SocialButton href="https://www.linkedin.com" label="LinkedIn" icon={SocialIcons.LinkedIn} />
              <SocialButton href="https://www.facebook.com" label="Facebook" icon={SocialIcons.Facebook} />
              <SocialButton href="https://www.linkedin.com" label="LinkedIn" icon={SocialIcons.Instagram} />
              <SocialButton href="https://www.linkedin.com" label="LinkedIn" icon={SocialIcons.Telegram} />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="ft-grid">
            {/* Column 1: Pages - Main */}
            <div className="ft-col ft-col-pages">
              <div className="ft-col-heading">
                <p className="ft-link-text">
                  <strong>Pages</strong>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="./" data-framer-page-link-current="true">
                    Home
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="./about">
                    About
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="./blog">
                    Blog (CMS)
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="./services">
                    Services
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a
                    className="ft-link"
                    href="https://www.framer.com/legal/terms-of-service/?via=artech-web"
                    target="_blank"
                    rel="noopener"
                  >
                    Terms &amp; Conditions
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a
                    className="ft-link"
                    href="https://www.framer.com/legal/privacy-statement/?via=artech-web"
                    target="_blank"
                    rel="noopener"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a
                    className="ft-link"
                    href="https://www.framer.com/legal/cookie-policy/?via=artech-web"
                    target="_blank"
                    rel="noopener"
                  >
                    Cookie Policy
                  </a>
                </p>
              </div>
            </div>

            {/* Column 2: Pages - Utility */}
            <div className="ft-col ft-col-utility">
              <div className="ft-col-heading">
                <p className="ft-link-text">
                  <strong>Utility</strong>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="./404">
                    404
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="./styleguide">
                    Style Guide
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="./blog/unleashing-creativity-in-digital-solutions">
                    Blog (CMS) - Single
                  </a>
                </p>
              </div>
            </div>

            {/* Column 3: Subscribe / Newsletter */}
            <div className="ft-col ft-col-newsletter">
              <div className="ft-col-heading">
                <p className="ft-link-text">
                  <strong>Newsletter</strong>
                </p>
              </div>
              <div className="ft-newsletter-desc">
                <p className="ft-link-text">
                  Stay updated with our latest news, inspirations, and ideas.
                </p>
              </div>
              <NewsletterForm />
            </div>

            {/* Column 4: Pages - Other */}
            <div className="ft-col ft-col-other">
              <div className="ft-col-heading">
                <p className="ft-link-text">
                  <strong>Other</strong>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a className="ft-link" href="https://www.framer.com?via=artech-web" target="_blank" rel="noopener">
                    Framer
                  </a>
                </p>
              </div>
              <div className="ft-link-item">
                <p className="ft-link-text">
                  <a
                    className="ft-link"
                    href="https://artechwebagency.lemonsqueezy.com/checkout/buy/35c14280-fe59-46c4-b020-3d3086657832?logo=0&discount=0"
                    target="_blank"
                    rel="noopener"
                  >
                    Buy Template
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
.ft-container {
  flex: 0 0 auto;
  height: auto;
  position: relative;
  scroll-margin-top: 72px;
  width: 100%;
}

.ft-footer {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 72px;
  height: auto;
  justify-content: flex-start;
  overflow: visible;
  padding: 24px 0;
  position: relative;
  background-color: var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
  width: 100%;
  opacity: 1;
}

/* Top Row */
.ft-toprow {
  align-content: flex-end;
  align-items: flex-end;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 48px;
  height: min-content;
  justify-content: center;
  max-width: 1920px;
  overflow: hidden;
  padding: 48px 0px 0px;
  position: relative;
  width: 100%;
  border-top: 1px solid var(--token-cfc0fde9-680d-4640-ae43-a7a5aeebce91, rgb(181, 181, 181));
  opacity: 1;
}

.ft-brand {
  flex: 1 0 0px;
  white-space: pre-wrap;
  height: auto;
  position: relative;
  width: 1px;
  word-break: break-word;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-shrink: 0;
  opacity: 1;
}

.ft-brand-copy {
  font-family: 'Kalnia', serif;
  font-size: clamp(48px, 8vw, 115px);
  font-style: normal;
  font-weight: 500;
  line-height: 0.9em;
  letter-spacing: 0em;
  text-transform: uppercase;
  text-align: start;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
  margin: 0px;
  padding: 0px;
}

.ft-social-row {
  align-content: center;
  align-items: center;
  display: flex;
  flex: 1 0 0px;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 48px;
  height: min-content;
  justify-content: flex-start;
  overflow: visible;
  padding: 0px;
  position: relative;
  width: 1px;
  opacity: 1;
}

/* Social Buttons */
.ft-social-btn-container {
  flex: 0 0 auto;
  aspect-ratio: 1 / 1;
  height: 40px;
  position: relative;
  width: 40px;
  opacity: 1;
}

.ft-social-anchor {
  display: block;
  text-decoration: none;
  position: relative;
  aspect-ratio: 1 / 1;
  height: 100%;
  width: 100%;
  opacity: 1;
}

.ft-social-backdrop {
  flex: 0 0 auto;
  overflow: hidden;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  will-change: transform;
  border-radius: 10px;
  background-color: rgba(242, 103, 61, 0.15);
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.25s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1)), transform 0.25s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1));
}

.ft-social-anchor:hover .ft-social-backdrop {
  background-color: rgba(242, 103, 61, 0.25);
  transform: translateY(-2px);
}

.ft-social-icon-box {
  flex: 0 0 auto;
  height: 100%;
  left: 17.5%;
  position: absolute;
  top: 0;
  width: 65%;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ft-social-svg {
  user-select: none;
  width: 100%;
  height: 100%;
  display: inline-block;
  fill: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  flex-shrink: 0;
}

/* Bottom Grid Layout */
.ft-grid {
  flex: 0 0 auto;
  gap: 48px;
  overflow: visible;
  padding: 0px 120px;
  display: grid;
  grid-auto-rows: minmax(0px, 1fr);
  grid-template-columns: repeat(4, minmax(50px, 1fr));
  grid-template-rows: repeat(2, minmax(0px, 1fr));
  height: 400px;
  justify-content: center;
  max-width: 1920px;
  position: relative;
  width: 100%;
  opacity: 1;
}

.ft-col {
  place-content: flex-start;
  place-self: start;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  padding: 0px;
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
  opacity: 1;
}

.ft-col-pages {
  grid-row: auto / span 2;
  align-items: flex-start;
}

.ft-col-utility {
  align-items: center;
}

.ft-col-newsletter {
  grid-column: auto / span 2;
  align-items: flex-start;
}

.ft-col-other {
  align-items: center;
}

/* Typography */
.ft-link-text {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
  font-size: 16px;
  letter-spacing: 0em;
  text-transform: none;
  line-height: 2em;
  text-align: left;
  margin: 0px;
  padding: 0px;
}

.ft-link-text strong {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
}

.ft-link {
  cursor: pointer;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
  font-size: 16px;
  text-transform: none;
  transition: color 0.25s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1));
  display: inline-block;
}

.ft-link:hover {
  color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  text-decoration: underline;
}

/* =========================================================
   NEWSLETTER PILL MORPHING ANIMATION
   ========================================================= */

.ft-newsletter-container {
  flex: 0 0 auto;
  height: auto;
  max-width: 500px;
  position: relative;
  width: 100%;
  opacity: 1;
}

.ft-newsletter {
  place-content: center;
  flex-flow: column;
  gap: 0px;
  padding: 13px 24px 12px;
  align-items: center;
  cursor: pointer;
  display: flex;
  height: min-content;
  min-width: 350px;
  position: relative;
  max-width: 100%;
  width: 100%;
  opacity: 1;
  outline: none;
}

/* Morphing Capsule Background */
.ft-newsletter-pill {
  flex: 0 0 auto;
  overflow: visible;
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  user-select: none;
  z-index: 0;
  border-radius: 24px;
  background-color: rgba(242, 103, 61, 0.15);
  transform-origin: 50% 50% 0px;
  width: 100%;
  transition: width 0.35s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1)), background-color 0.25s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1)), box-shadow 0.25s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1));
}

/* Hover/Focus State -> Collapses to 120px behind SIGN UP button */
.ft-newsletter:hover .ft-newsletter-pill,
.ft-newsletter.hover .ft-newsletter-pill,
.ft-newsletter:focus-within .ft-newsletter-pill {
  width: 120px;
  background-color: rgba(242, 103, 61, 0.2);
}

.ft-newsletter-form-wrap {
  flex: 0 0 auto;
  align-self: stretch;
  height: auto;
  position: relative;
  width: auto;
  z-index: 1;
  opacity: 1;
}

.ft-newsletter-form {
  gap: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: 1fr;
}

.ft-hidden-field {
  position: absolute;
  visibility: hidden;
}

.ft-newsletter-input {
  outline: none;
  border: none;
  padding: 0px;
  border-radius: 0px;
  background: rgba(247, 247, 247, 0);
  appearance: none;
  width: 100%;
  line-height: 1.4em;
  font-family: 'Montserrat', Inter, sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  box-shadow: transparent 0px 0px 0px 1px inset;
}

.ft-newsletter-input::placeholder {
  color: rgba(242, 103, 61, 0.5);
  transition: opacity 0.2s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1));
}

.ft-submit-holder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ft-submit-btn {
  outline: none;
  border: none;
  border-radius: 0px;
  padding: 0px;
  background: rgba(0, 0, 0, 0);
  appearance: none;
  width: 100%;
  line-height: 1.4em;
  cursor: pointer;
  font-family: 'Montserrat', Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
  z-index: 1;
  opacity: 1;
  user-select: none;
  transition: transform 0.2s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1)), opacity 0.2s var(--framer-ease, cubic-bezier(0.44, 0, 0.56, 1));
}

.ft-submit-btn:hover {
  opacity: 0.85;
}

.ft-submit-btn:active {
  transform: scale(0.97);
}

/* Responsive Queries */
@media (max-width: 1024px) {
  .ft-grid {
    padding: 0 40px;
    height: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
  .ft-col-pages,
  .ft-col-newsletter {
    grid-column: span 1;
    grid-row: auto;
  }
}

@media (max-width: 768px) {
  .ft-toprow {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding-top: 24px;
  }
  .ft-social-row {
    gap: 24px;
  }
  .ft-grid {
    grid-template-columns: 1fr;
    padding: 0 16px;
    gap: 36px;
  }
  .ft-col-utility,
  .ft-col-other {
    align-items: flex-start;
  }
  .ft-newsletter {
    min-width: 100%;
  }
}
`,
        }}
      />
    </>
  )
}
