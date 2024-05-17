import { useState } from 'react'
import { getUserInfo } from '../api/basic/auth'
import { useAsyncEffect } from './useAsyncEffect'
import { User } from '../api/basic/types'

export function useLoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useAsyncEffect(async () => {
    try {
      const userInfo = await getUserInfo()
      setLoggedInUser(userInfo)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return [loggedInUser, isLoading]
}
