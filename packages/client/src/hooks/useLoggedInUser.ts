import { useState } from 'react'
import { getUserInfo } from '../api/basic/auth'
import { useAsyncEffect } from './useAsyncEffect'
import { User } from '../api/basic/types'
import { useLocation, useNavigate } from 'react-router-dom'

export function useLoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useAsyncEffect(async () => {
    try {
      const userInfo = await getUserInfo()
      setLoggedInUser(userInfo)

      if (location.pathname === '/' || location.pathname === '/signup') {
        navigate('/main_menu')
      }
    } catch (error) {
      console.error(error)
      if (
        location.pathname !== '/' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/game' &&
        location.pathname !== '/gameOver'
      ) {
        navigate('/')
      }
    }
  }, [])

  return loggedInUser
}
