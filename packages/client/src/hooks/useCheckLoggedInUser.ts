import { useState } from 'react'
import { getUserInfo } from '../api/basic/auth'
import { useAsyncEffect } from './useAsyncEffect'

export function useCheckUserLoggedIn() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  useAsyncEffect(
    async () => {
      try {
        await getUserInfo()
        setUserLoggedIn(true)
      } catch (error) {
        setUserLoggedIn(false)
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async () => {},
    []
  )

  return userLoggedIn
}
