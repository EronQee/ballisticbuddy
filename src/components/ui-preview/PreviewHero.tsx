'use client'

const styles = `
  .framer-hero-section {
    align-content: center;
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 24px;
    height: min-content;
    justify-content: center;
    max-width: 1920px;
    margin: 0 auto;
    overflow: visible;
    padding: 24px;
    position: relative;
    scroll-margin-top: 72px;
    width: 100%;
    opacity: 1;
  }

  .framer-hero-image {
    align-content: flex-start;
    align-items: flex-start;
    border-radius: 24px;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 72px;
    height: 1080px;
    justify-content: flex-start;
    overflow: hidden;
    padding: 24px;
    position: relative;
    width: 100%;
  }

  .framer-hero-bg {
    position: absolute;
    border-radius: inherit;
    inset: 0px;
    pointer-events: none;
    z-index: 0;
  }

  .framer-hero-bg img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-position: center center;
    object-fit: cover;
  }

  .framer-hero-features {
    align-content: flex-start;
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 120px;
    height: auto;
    justify-content: flex-start;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .feature-col {
    align-content: flex-start;
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0px;
    height: min-content;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: min-content;
  }

  .num-text {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
    font-size: 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    line-height: 1.5em;
    text-align: start;
    margin: 0;
    padding: 0;
    white-space: pre;
  }

  .desc-text {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
    font-size: 16px;
    letter-spacing: 0em;
    text-transform: uppercase;
    line-height: 1.5em;
    text-align: start;
    margin: 0;
    padding: 0;
    white-space: pre;
  }

  .framer-hero-typography {
    align-content: flex-start;
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 12px;
    height: min-content;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .hero-heading {
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 600;
    color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
    font-size: 82px;
    letter-spacing: 0em;
    text-transform: none;
    line-height: 1.2em;
    text-align: start;
  }

  .hero-message {
    flex: 0 0 auto;
    height: auto;
    position: relative;
    white-space: pre-wrap;
    width: 50%;
    word-break: break-word;
    overflow-wrap: break-word;
    outline: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
  }

  .hero-subtext {
    margin: 0;
    padding: 0;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, rgb(3, 3, 3));
    font-size: 16px;
    letter-spacing: 0em;
    text-transform: none;
    line-height: 2em;
    text-align: start;
  }

  .hero-cta-container {
    flex: 0 0 auto;
    height: auto;
    position: relative;
    width: auto;
    z-index: 1;
  }

  .cta-button {
    box-sizing: border-box;
    border-width: 0px;
    background: none;
    place-content: center;
    flex-flow: row;
    gap: 12px;
    padding: 0px 24px 0px 0px;
    text-decoration: none;
    align-items: center;
    cursor: pointer;
    display: flex;
    height: min-content;
    position: relative;
    width: min-content;
    opacity: 1;
    outline: none;
  }

  .cta-circle-bg {
    box-sizing: border-box;
    flex: 0 0 auto;
    overflow: visible;
    aspect-ratio: 1 / 1;
    bottom: 0px;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 45px;
    height: 45px;
    z-index: 0;
    border-radius: 24px;
    background-color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
    opacity: 1;
    transform: translate3d(0px, 0px, 0px) scale(1, 1);
    transform-origin: 50% 50% 0px;
    transition: transform 0.42s cubic-bezier(0.2, 0.9, 0.3, 1), border-radius 0.42s cubic-bezier(0.2, 0.9, 0.3, 1);
  }

  .cta-arrow-box {
    box-sizing: border-box;
    flex: 0 0 auto;
    overflow: visible;
    aspect-ratio: 1 / 1;
    height: 45px;
    position: relative;
    width: 45px;
    opacity: 1;
    z-index: 1;
  }

  .cta-arrow-pointer {
    box-sizing: border-box;
    flex: 0 0 auto;
    overflow: visible;
    aspect-ratio: 1 / 1;
    height: 12px;
    left: 14px;
    position: absolute;
    top: 50%;
    width: 12px;
    border-top: 2px solid var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
    border-right: 2px solid var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
    transform: translateY(-50%) rotate(45deg);
    transform-origin: 50% 50% 0px;
    opacity: 1;
    transition: transform 0.42s cubic-bezier(0.2, 0.9, 0.3, 1);
  }

  .cta-arrow-stem {
    box-sizing: border-box;
    flex: 0 0 auto;
    overflow: visible;
    top: 50%;
    height: 2px;
    left: -7px;
    position: absolute;
    right: -1px;
    background-color: var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
    opacity: 0;
    transform: translateY(-50%) rotate(-45deg);
    transform-origin: 50% 50% 0px;
    transition: opacity 0.28s cubic-bezier(0.2, 0.9, 0.3, 1);
  }

  .cta-text-wrapper {
    box-sizing: border-box;
    place-content: center;
    flex: 0 0 auto;
    flex-flow: column;
    gap: 0px;
    overflow: visible;
    padding: 2px 0px 0px;
    align-items: center;
    display: flex;
    height: min-content;
    position: relative;
    width: min-content;
    opacity: 1;
    z-index: 1;
  }

  .cta-text-element {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    color: var(--token-cf5aac01-3fc4-453a-a04f-c350255779b2, rgb(242, 103, 61));
    font-size: 16px;
    letter-spacing: 0em;
    text-transform: uppercase;
    line-height: 1.5em;
    text-align: start;
    white-space: pre;
    transition: color 0.32s cubic-bezier(0.2, 0.9, 0.3, 1);
  }

  .cta-button:hover .cta-circle-bg,
  .cta-button:focus-visible .cta-circle-bg {
    border-radius: 10% / 53.3333%;
    transform: translate3d(97.8722px, 0px, 0px) scale(5.34988, 1);
  }

  .cta-button:hover .cta-arrow-pointer,
  .cta-button:focus-visible .cta-arrow-pointer {
    transform: translateY(-50%) translate3d(15.9094px, 0px, 0px) rotate(45deg);
  }

  .cta-button:hover .cta-arrow-stem,
  .cta-button:focus-visible .cta-arrow-stem {
    opacity: 1;
  }

  .cta-button:hover .cta-text-element,
  .cta-button:focus-visible .cta-text-element {
    color: var(--token-6ba02981-2279-4d33-a8b8-353ad611e0ff, rgb(247, 247, 247));
  }

  @media (max-width: 1024px) {
    .hero-heading {
      font-size: 56px;
    }
    .framer-hero-features {
      gap: 40px;
      flex-wrap: wrap;
    }
    .hero-message {
      width: 80%;
    }
  }

  @media (max-width: 640px) {
    .framer-hero-image {
      height: auto;
      min-height: 800px;
      padding: 20px;
      gap: 48px;
    }
    .hero-heading {
      font-size: 38px;
    }
    .framer-hero-features {
      flex-direction: column;
      gap: 20px;
    }
    .hero-message {
      width: 100%;
    }
  }
`

export default function PreviewHero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section id="hero" className="framer-hero-section">
        <div className="framer-hero-image">
          {/* Background Image Container */}
          <div className="framer-hero-bg">
            <img
              alt="Office Building"
              decoding="sync"
              loading="eager"
              sizes="min(min(100vw, 1920px) - 24px, 1920px)"
              src="https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg"
              srcSet="https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg?scale-down-to=512 512w,https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg?scale-down-to=1024 1024w,https://framerusercontent.com/images/wUNK12pfQY4c2eKIMLCTvj408.jpeg 1920w"
            />
          </div>

          {/* Top Features Header Row */}
          <div className="framer-hero-features">
            {/* Feature 01 */}
            <div className="feature-col">
              <div data-framer-name="Number">
                <p className="num-text">01</p>
              </div>
              <div data-framer-name="Text">
                <p className="desc-text">A CREATIVE DIGITAL AGENCY</p>
              </div>
            </div>

            {/* Feature 02 */}
            <div className="feature-col">
              <div data-framer-name="Number">
                <p className="num-text">02</p>
              </div>
              <div data-framer-name="Text">
                <p className="desc-text">SPECIALIZING IN VISUAL EXPERIENCES</p>
              </div>
            </div>

            {/* Feature 03 */}
            <div className="feature-col">
              <div data-framer-name="Number">
                <p className="num-text">03</p>
              </div>
              <div data-framer-name="Text">
                <p className="desc-text">BASED IN SEATTLE, WORKING WORLDWIDE</p>
              </div>
            </div>
          </div>

          {/* Middle Typography Section */}
          <div className="framer-hero-typography">
            <div data-framer-name="Title" className="w-full">
              <h1 className="hero-heading">CREATE, INNOVATE,</h1>
              <h1 className="hero-heading">COLLABORATE.</h1>
            </div>

            <div className="hero-message" data-framer-name="Message">
              <p className="hero-subtext">
                Choose Roman24 - where creativity meets digital excellence, unlocking the full
                potential of your brand in the dynamic digital landscape.
              </p>
            </div>
          </div>

          {/* Interactive Get Started Button */}
          <div className="hero-cta-container">
            <a tabIndex={0} href="#contact" className="cta-button">
              {/* Expanding Background Circle */}
              <div className="cta-circle-bg" data-framer-name="BG" />

              {/* Arrow Pointer Box */}
              <div className="cta-arrow-box" data-framer-name="Arrow">
                <div className="cta-arrow-pointer" data-border="true" data-framer-name="Pointer">
                  <div className="cta-arrow-stem" data-framer-name="Stem" />
                </div>
              </div>

              {/* Text Label */}
              <div className="cta-text-wrapper">
                <p className="cta-text-element">Get Started Now</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}