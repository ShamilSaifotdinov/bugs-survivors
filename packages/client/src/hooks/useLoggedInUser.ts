import { useState } from 'react'
import { getUserInfo } from '../api/basic/auth'
import { useAsyncEffect } from './useAsyncEffect'
import { User } from '../api/basic/types'
import { useNavigate } from 'react-router-dom'

export function useLoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useAsyncEffect(async () => {
    try {
      const userInfo = await getUserInfo()
      setLoggedInUser(userInfo)
    } catch (error) {
      console.error(error)
      navigate('/')
    }
  }, [])

  return loggedInUser
}
