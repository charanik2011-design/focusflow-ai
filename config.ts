import { useEffect } from 'react'
import { useStore } from '../store'

export function useTheme() {
  const { settings, setTheme } = useStore()

  useEffect(() => {
    const root = document.documentElement
    if (settings.theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [settings.theme])

  const toggleTheme = () => {
    setTheme(settings.theme === 'light' ? 'dark' : 'light')
  }

  return { theme: settings.theme, toggleTheme }
}
