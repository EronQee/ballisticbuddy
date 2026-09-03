'use client'

import { useState } from 'react'

const LogoSvg = () => (
  <svg className="block w-full h-full" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="16" height="16" rx="2" fill="currentColor" />
    <rect x="22" y="2" width="16" height="16" rx="2" fill="currentColor" />
    <rect x="2" y="22" width="16" height="16" rx="2" fill="currentColor" />
    <path d="M22 22 L38 38 M38 22 L22 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 256 256">
    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 256 256">
    <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 256 256">
    <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z" />
  </svg>
)

const TelegramIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 256 256">
    <path d="M236.88,26.19a9,9,0,0,0-9.16-1.57L25.06,103.93a14.22,14.22,0,0,0,2.43,27.21L80,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L173,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L239.77,35A9,9,0,0,0,236.88,26.19ZM183.53,208,100.85,135.5l119-85.29Z" />
  </svg>
)

export default function PreviewHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="w-full bg-[#f7f7f7] flex flex-col items-center relative"
      style={{ padding: '12px 0' }}
    >
      {/* Main Container Envelope */}
      <div className="w-full max-w-[1920px] flex flex-col items-center justify-start relative">
        {/* Top Navigation Bar Header */}
        <div className="site-header-bar">
          {/* Brand Logo & Title Container */}
          <div className="site-header-brand">
            {/* Logo Link */}
            <a
              className="site-header-logo"
              href="https://roman24.framer.website/"
              aria-label="ROMANXXIV Logo"
            >
              <div className="w-full h-full">
                <LogoSvg />
              </div>
            </a>

            {/* Brand Title Heading */}
            <div className="site-header-title">
              <h6>
                <a href="https://roman24.framer.website/">ROMANXXIV</a>
              </h6>
            </div>
          </div>

          {/* Menu Toggle Button with 3 Animated Orange Bars */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            tabIndex={0}
            className="nav-burger"
          >
            {/* Top Bar */}
            <div
              className="nav-burger-bar nav-burger-bar--top"
              style={
                isOpen
                  ? {
                      top: '12px',
                      left: '6px',
                      width: '51%',
                      transform: 'rotate(45deg)',
                      transformOrigin: '50% 50%',
                    }
                  : {
                      top: '0px',
                      left: '0px',
                      width: '50%',
                      transform: 'none',
                    }
              }
            />

            {/* Middle Bar */}
            <div
              className="nav-burger-bar nav-burger-bar--middle"
              style={
                isOpen
                  ? {
                      top: 'calc(50% - 2.5px)',
                      left: 'calc(50% - 37.5%)',
                      width: '75%',
                      transform: 'rotate(-45deg)',
                      transformOrigin: '50% 50%',
                    }
                  : {
                      top: 'calc(50% - 2.5px)',
                      left: '0%',
                      width: '100%',
                      transform: 'none',
                    }
              }
            />

            {/* Bottom Bar */}
            <div
              className="nav-burger-bar nav-burger-bar--bottom"
              style={
                isOpen
                  ? {
                      bottom: '12px',
                      right: '5px',
                      width: '51%',
                      transform: 'rotate(45deg)',
                      transformOrigin: '50% 50%',
                    }
                  : {
                      bottom: '0px',
                      right: '0px',
                      width: '50%',
                      transform: 'none',
                    }
              }
            />
          </button>
        </div>

        {isOpen && (
          <div className="nav-overlay">
            {/* Left Nav Stack */}
            <div className="flex-none w-auto">
              <nav className="flex flex-col gap-3 items-start justify-start p-0">
                <div>
                  <a href="./about" className="nav-overlay-link">
                    ABOUT
                  </a>
                </div>
                <div>
                  <a href="./blog" className="nav-overlay-link">
                    BLOG
                  </a>
                </div>
                <div>
                  <a href="./services" className="nav-overlay-link">
                    SERVICES
                  </a>
                </div>
                <div>
                  <a href="./404" className="nav-overlay-link">
                    404 PAGE
                  </a>
                </div>
                <div>
                  <a href="./styleguide" className="nav-overlay-link">
                    STYLE GUIDE
                  </a>
                </div>
                <div>
                  <a
                    href="https://artechwebagency.lemonsqueezy.com/checkout/buy/35c14280-fe59-46c4-b020-3d3086657832?logo=0&discount=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-overlay-link"
                  >
                    BUY TEMPLATE
                  </a>
                </div>
              </nav>
            </div>

            {/* Right Contact Info Stack */}
            <div className="flex flex-col justify-end items-start self-stretch gap-6 w-auto p-0">
              {/* Phone Block */}
              <div className="flex flex-col items-start justify-center overflow-hidden">
                <p className="text-[16px] leading-[2em] font-normal text-[#030303]">
                  <strong className="font-bold">Phone</strong>
                </p>
                <p className="text-[16px] leading-[2em] font-normal">
                  <a href="tel:12535555555" className="nav-overlay-contact">
                    +1 (253) 555 5555
                  </a>
                </p>
              </div>

              {/* Email Block */}
              <div className="flex flex-col items-start justify-center overflow-hidden">
                <p className="text-[16px] leading-[2em] font-normal text-[#030303]">
                  <strong className="font-bold">Email</strong>
                </p>
                <p className="text-[16px] leading-[2em] font-normal">
                  <a
                    href="mailto:contact@roman24.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-overlay-contact"
                  >
                    contact@roman24.com
                  </a>
                </p>
              </div>

              {/* Location Block */}
              <div className="flex flex-col items-start justify-center overflow-hidden">
                <p className="text-[16px] leading-[2em] font-normal text-[#030303]">
                  <strong className="font-bold">Location</strong>
                </p>
                <p className="text-[16px] leading-[2em] font-normal">
                  <a
                    href="https://www.google.com/maps/dir//Seattle,+WA/@47.6131549,-122.5072183,11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x5490102c93e83355:0x102565466944d59a!2m2!1d-122.3328481!2d47.6061389?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-overlay-contact"
                  >
                    24 Roman Street Seattle, WA 98106
                  </a>
                </p>
              </div>

              {/* Social Icons Bar */}
              <div className="flex flex-row items-end justify-start gap-12 pt-[72px] overflow-hidden">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Link"
                  className="nav-overlay-social"
                >
                  <LinkedinIcon />
                </a>

                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Link"
                  className="nav-overlay-social"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Link"
                  className="nav-overlay-social"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram Link"
                  className="nav-overlay-social"
                >
                  <TelegramIcon />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
