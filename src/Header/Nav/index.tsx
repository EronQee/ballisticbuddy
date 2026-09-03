'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Link } from '@/i18n/routing'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const t = useTranslations('Navigation')
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only">{t('search')}</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
