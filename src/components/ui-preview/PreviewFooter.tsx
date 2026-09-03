'use client'

import { useState, type ReactElement } from 'react'

const SocialIcons = {
  LinkedIn: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="footer-social__svg">
      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="footer-social__svg">
      <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="footer-social__svg">
      <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z" />
    </svg>
  ),
  Telegram: () => (
    <svg viewBox="0 0 256 256" focusable="false" className="footer-social__svg">
      <path d="M236.88,26.19a9,9,0,0,0-9.16-1.57L25.06,103.93a14.22,14.22,0,0,0,2.43,27.21L80,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L173,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L239.77,35A9,9,0,0,0,236.88,26.19ZM183.53,208,100.85,135.5l119-85.29Z" />
    </svg>
  ),
}

function SocialButton({ href, label, icon: Icon }: { href: string; label: string; icon: () => ReactElement }) {
  return (
    <div className="footer-social">
      <a className="footer-social__link" aria-label={label} href={href} target="_blank" rel="noopener">
        <div className="footer-social__backdrop">
          <div className="footer-social__icon">
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
    <div className="newsletter">
      <div
        className={`newsletter__field ${isHovered || isFocused ? 'is-hovered' : ''}`}
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The morphing pill background: 100% by default -> collapses to 120px behind SIGN UP on hover/focus */}
        <div className="newsletter__pill" />

        <div className="newsletter__form-wrap">
          <form className="newsletter__form" onSubmit={handleSubmit} method="POST">
            <div className="newsletter__honeypot" aria-hidden="true">
              <input type="text" name="b_1487cc549a49109c00fe60a80_93cd7be172" tabIndex={-1} />
            </div>

            <input
              className="newsletter__input"

              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <div className="newsletter__submit-wrap">
              <input type="submit" value="SIGN UP" className="newsletter__submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function PreviewFooter() {
  return (
    <div id="footer" className="site-footer">
      <footer className="site-footer__panel">
        {/* Top Row */}
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__brand-name">ROMANXXIV</p>
          </div>

          <div className="site-footer__social">
            <SocialButton href="https://www.linkedin.com" label="LinkedIn" icon={SocialIcons.LinkedIn} />
            <SocialButton href="https://www.facebook.com" label="Facebook" icon={SocialIcons.Facebook} />
            <SocialButton href="https://www.linkedin.com" label="LinkedIn" icon={SocialIcons.Instagram} />
            <SocialButton href="https://www.linkedin.com" label="LinkedIn" icon={SocialIcons.Telegram} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="site-footer__grid">
          {/* Column 1: Pages - Main */}
          <div className="site-footer__col site-footer__col--pages">
            <div className="site-footer__col-heading">
              <p className="site-footer__text">
                <strong>Pages</strong>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="./">
                  Home
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="./about">
                  About
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="./blog">
                  Blog (CMS)
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="./services">
                  Services
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a
                  className="site-footer__link"
                  href="https://www.framer.com/legal/terms-of-service/?via=artech-web"
                  target="_blank"
                  rel="noopener"
                >
                  Terms &amp; Conditions
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a
                  className="site-footer__link"
                  href="https://www.framer.com/legal/privacy-statement/?via=artech-web"
                  target="_blank"
                  rel="noopener"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a
                  className="site-footer__link"
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
          <div className="site-footer__col site-footer__col--utility">
            <div className="site-footer__col-heading">
              <p className="site-footer__text">
                <strong>Utility</strong>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="./404">
                  404
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="./styleguide">
                  Style Guide
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="./blog/unleashing-creativity-in-digital-solutions">
                  Blog (CMS) - Single
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: Subscribe / Newsletter */}
          <div className="site-footer__col site-footer__col--newsletter">
            <div className="site-footer__col-heading">
              <p className="site-footer__text">
                <strong>Newsletter</strong>
              </p>
            </div>
            <div className="site-footer__newsletter-desc">
              <p className="site-footer__text">
                Stay updated with our latest news, inspirations, and ideas.
              </p>
            </div>
            <NewsletterForm />
          </div>

          {/* Column 4: Pages - Other */}
          <div className="site-footer__col site-footer__col--other">
            <div className="site-footer__col-heading">
              <p className="site-footer__text">
                <strong>Other</strong>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a className="site-footer__link" href="https://www.framer.com?via=artech-web" target="_blank" rel="noopener">
                  Framer
                </a>
              </p>
            </div>
            <div className="site-footer__link-item">
              <p className="site-footer__text">
                <a
                  className="site-footer__link"
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
  )
}
