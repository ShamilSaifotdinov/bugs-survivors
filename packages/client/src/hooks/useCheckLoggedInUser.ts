import { useState } from 'react'
import { getUserInfo } from '../api/basic/auth'
import { useAsyncEffect } from './useAsyncEffect'

export function useCheckUserLoggedIn() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  useAsyncEffect(async () => {
    try {
      await getUserInfo()
    } catch (error) {
      setUserLoggedIn(false)
    }
  })

  return userLoggedIn
}
