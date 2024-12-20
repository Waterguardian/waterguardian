'use client'

import { useEffect, useMemo } from 'react'

export const DarkMode = () => {
  // Initialize dark mode immediately
  try {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const isDark = mediaQuery.matches

      if (isDark) {
        document.documentElement.classList.add('dark')
      }
    }
  } catch (e) {
    console.error('Error initializing dark mode:', e)
  }

  const mql = useMemo(() => {
    if (typeof matchMedia === 'undefined') {
      return
    }
    return matchMedia('(prefers-color-scheme: dark)')
  }, [])

  useEffect(() => {
    if (!mql) {
      return
    }

    const onChangeHandler = (e: MediaQueryList | MediaQueryListEvent) => {
      const isDark = e.matches
      document.querySelector('html')?.classList.toggle('dark', isDark)
    }
    onChangeHandler(mql)

    mql.addEventListener('change', onChangeHandler)

    return () => mql.removeEventListener('change', onChangeHandler)
  }, [mql])

  return null
}
