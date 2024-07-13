import { useState, useEffect, useCallback } from 'react'
import {
  getTheme,
  setTheme,
  ThemeGetData,
  ThemePostData,
} from '../api/basic/theme'

type UseThemeResult = {
  theme: string
  updateTheme: (newTheme: string) => Promise<void>
  loading: boolean
  error: string | null
}

const useTheme = (): UseThemeResult => {
  const [theme, setThemeState] = useState<string>('light')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTheme = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response: ThemeGetData = await getTheme()
      setThemeState(response.theme)
    } catch (err) {
      setThemeState('dark')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateTheme = useCallback(async (newTheme: string) => {
    try {
      setLoading(true)
      setError(null)
      const response: ThemePostData = await setTheme({ theme: newTheme })
      setThemeState(newTheme)
    } catch (err) {
      setError('Failed to update theme')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTheme()
  }, [fetchTheme])

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme === 'dark' ? 'dark' : 'light'
    )
  }, [theme])

  return {
    theme,
    updateTheme,
    loading,
    error,
  }
}

export default useTheme
