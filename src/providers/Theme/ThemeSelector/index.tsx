'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const t = useTranslations('Theme')
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    // Hydration sync: localStorage is unavailable during SSR render, read once after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(preference ?? 'auto')
  }, [])

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label={t('selectAria')}
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">{t('auto')}</SelectItem>
        <SelectItem value="light">{t('light')}</SelectItem>
        <SelectItem value="dark">{t('dark')}</SelectItem>
      </SelectContent>
    </Select>
  )
}
