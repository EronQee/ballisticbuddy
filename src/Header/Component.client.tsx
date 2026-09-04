'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link, usePathname } from '@/i18n/routing'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import type { Header } from '@/payload-types'

import { defaultHeaderNav } from '@/utilities/navLinks'
import { CMSLink } from '@/components/Link'
import { SearchIcon } from 'lucide-react'

const LogoSvg = () => (
  <svg className="block w-full h-full" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="16" height="16" rx="2" fill="var(--color-accent)" />
    <rect x="22" y="2" width="16" height="16" rx="2" fill="var(--color-accent)" />
    <rect x="2" y="22" width="16" height="16" rx="2" fill="var(--color-accent)" />
    <path d="M22 22 L38 38 M38 22 L22 38" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const t = useTranslations('Navigation')

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    // Keep the last non-null header theme in local state so the header doesn't lose
    // its theme while navigating (context value is reset to null on pathname change).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = data?.navItems || []

  return (
    <div
      className="w-full flex flex-col items-center relative"
      style={{ padding: '12px 0 0' }}
      data-theme={theme || 'light'}
    >
      <div className="w-full max-w-[1920px] flex flex-col items-center justify-start relative">
        <div className="site-header-bar" style={{ backgroundColor: 'var(--color-paper)' }}>
          {/* Brand / Wordmark */}
          <Link className="site-header-brand" href="/" aria-label="BallisticBuddy homepage">
            <span className="site-header-logo">
              <LogoSvg />
            </span>
            <div className="site-header-title">
              <h6>BallisticBuddy</h6>
            </div>
          </Link>

          {/* Burger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            tabIndex={0}
            className="nav-burger"
          >
            <div
              className="nav-burger-bar nav-burger-bar--top"
              style={
                isOpen
                  ? { top: '12px', left: '6px', width: '51%', transform: 'rotate(45deg)', transformOrigin: '50% 50%' }
                  : { top: '0px', left: '0px', width: '50%', transform: 'none' }
              }
            />
            <div
              className="nav-burger-bar nav-burger-bar--middle"
              style={
                isOpen
                  ? { top: 'calc(50% - 2.5px)', left: 'calc(50% - 37.5%)', width: '75%', transform: 'rotate(-45deg)', transformOrigin: '50% 50%' }
                  : { top: 'calc(50% - 2.5px)', left: '0%', width: '100%', transform: 'none' }
              }
            />
            <div
              className="nav-burger-bar nav-burger-bar--bottom"
              style={
                isOpen
                  ? { bottom: '12px', right: '5px', width: '51%', transform: 'rotate(45deg)', transformOrigin: '50% 50%' }
                  : { bottom: '0px', right: '0px', width: '50%', transform: 'none' }
              }
            />
          </button>
        </div>

        {isOpen && (
          <div className="nav-overlay" onClick={() => setIsOpen(false)}>
            {/* Left Nav Stack */}
            <div className="flex-none w-auto">
              <nav className="flex flex-col gap-3 items-start justify-start p-0">
                {navItems.length > 0
                  ? navItems.map(({ link }, i) => {
                      return (
                        <div key={i} onClick={(e) => e.stopPropagation()}>
                          <CMSLink {...link} appearance="inline" className="nav-overlay-link" />
                        </div>
                      )
                    })
                  : defaultHeaderNav.map((item) => {
                      return (
                        <div key={item.url} onClick={(e) => e.stopPropagation()}>
                          <Link href={item.url} className="nav-overlay-link">
                            {item.label}
                          </Link>
                        </div>
                      )
                    })}
              </nav>
            </div>

            {/* Right Stack: Search */}
            <div className="flex flex-col justify-end items-start self-stretch gap-6 w-auto p-0">
              <Link
                href="/search"
                className="nav-overlay-link flex items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <SearchIcon className="w-8 h-8" />
                {t('search')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}