import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayloadLocale } from '@/i18n/getPayloadLocale'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Link } from '@/i18n/routing'
import { footerNav } from '@/utilities/navLinks'
import GetQuoteForm from './GetQuoteForm'

const SocialIconPaths: Record<string, React.ReactNode> = {
  LinkedIn: (
    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
  ),
  Facebook: (
    <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z" />
  ),
  Instagram: (
    <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z" />
  ),
  Telegram: (
    <path d="M236.88,26.19a9,9,0,0,0-9.16-1.57L25.06,103.93a14.22,14.22,0,0,0,2.43,27.21L80,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L173,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L239.77,35A9,9,0,0,0,236.88,26.19ZM183.53,208,100.85,135.5l119-85.29Z" />
  ),
}

const SocialIcons = [
  { key: 'LinkedIn', label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { key: 'Facebook', label: 'Facebook', href: 'https://www.facebook.com' },
  { key: 'Instagram', label: 'Instagram', href: 'https://www.instagram.com' },
  { key: 'Telegram', label: 'Telegram', href: 'https://telegram.org' },
]

export async function Footer() {
  const locale = await getPayloadLocale()
  const footerData = await getCachedGlobal('footer', 1, locale)()

  const navItems = footerData?.navItems || []

  const footerGroups = [
    { key: 'production', heading: 'Production', links: footerNav.production },
    { key: 'services', heading: 'Services', links: footerNav.services },
    { key: 'company', heading: 'Company', links: footerNav.company },
  ]

  return (
    <div id="footer" className="site-footer">
      <footer className="site-footer__panel">
        {/* Top Row */}
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__brand-name">BallisticBuddy</p>
          </div>

          <div className="site-footer__social">
            {SocialIcons.map(({ href, key, label }) => (
              <div className="footer-social" key={key}>
                <a className="footer-social__link" aria-label={label} href={href} target="_blank" rel="noopener">
                  <div className="footer-social__backdrop">
                    <div className="footer-social__icon">
                      <svg className="footer-social__svg" viewBox="0 0 256 256" focusable="false">
                        {SocialIconPaths[key]}
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Link groups */}
        <div className="site-footer__grid site-footer__grid--3col">
          {footerGroups.map((group) => (
            <div className="site-footer__col" key={group.key}>
              <div className="site-footer__col-heading">
                <p className="site-footer__text">
                  <strong>{group.heading}</strong>
                </p>
              </div>
              {group.links.map((item) => (
                <div className="site-footer__link-item" key={item.url}>
                  <p className="site-footer__text">
                    <Link className="site-footer__link" href={item.url}>
                      {item.label}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          ))}

          {/* CMS navItems, when configured */}
          {navItems.length > 0 && (
            <div className="site-footer__col">
              <div className="site-footer__col-heading">
                <p className="site-footer__text">
                  <strong>More</strong>
                </p>
              </div>
              {navItems.map(({ link }, i) => (
                <div className="site-footer__link-item" key={i}>
                  <p className="site-footer__text">
                    <CMSLink {...link} className="site-footer__link" />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Get a Quote — standalone block, sibling of the link grid */}
        <div className="site-footer__quote">
          <div className="site-footer__quote-inner">
            <div className="site-footer__quote-copy">
              <p className="site-footer__text site-footer__text--quote-heading">
                <strong>Get a Quote</strong>
              </p>
              <p className="site-footer__text">
                Tell us the vehicle and the threat level — we will send a specification and quote.
              </p>
            </div>
            <GetQuoteForm />
            <div className="site-footer__quote-theme">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}