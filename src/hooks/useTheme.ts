import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

// Follows the OS setting until someone picks a theme with the toggle.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const explicit = document.documentElement.dataset.theme
    if (explicit === 'light' || explicit === 'dark') return explicit
    return readStored() ?? systemTheme()
  })

  useEffect(() => {
    const stored = readStored()
    if (stored) document.documentElement.dataset.theme = stored

    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(systemTheme())
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* storage blocked, the toggle still works for this visit */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
