'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'

// Same visual as the original ui-preview newsletter pill form,
// repurposed as a quote request entry point.
export default function GetQuoteForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    router.push(email ? `/contact?email=${encodeURIComponent(email)}` : '/contact')
  }

  return (
    <div className="newsletter">
      <div
        className={`newsletter__field ${isHovered || isFocused ? 'is-hovered' : ''}`}
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The morphing pill background: 100% by default -> collapses to 120px behind GET QUOTE on hover/focus */}
        <div className="newsletter__pill" />

        <div className="newsletter__form-wrap">
          <form className="newsletter__form" onSubmit={handleSubmit} method="POST">
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
              <input type="submit" value="GET QUOTE" className="newsletter__submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}