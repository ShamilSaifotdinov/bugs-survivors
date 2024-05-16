import { useEffect, useState } from 'react'
import { getUserInfo } from '../../api/basic/auth'

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsAuth(false)
    setError(null)
    setIsAuthLoading(true)

    getUserInfo()
      .then(() => setIsAuth(true))
      .catch((err: Error) => setError(err))
      .finally(() => setIsAuthLoading(false))
  }, [])

  return [isAuth, isAuthLoading, error]
}
