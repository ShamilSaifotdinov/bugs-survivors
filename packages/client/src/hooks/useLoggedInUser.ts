import { useAsyncEffect } from './useAsyncEffect'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from './reduxHooks'
import { fetchUser } from '../store/slices/userSlice'

export function useLoggedInUser() {
  // Убрать проверку после совмещения SSR и Redux
  if (typeof window !== 'undefined') {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    useAsyncEffect(async () => {
      try {
        await dispatch(fetchUser()).unwrap()
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
  }
}
