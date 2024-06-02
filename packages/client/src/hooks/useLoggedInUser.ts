import { useAsyncEffect } from './useAsyncEffect'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { fetchUser } from '../store/slices/userSlice'

export function useLoggedInUser() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  useAsyncEffect(async () => {
    if (user.user.id) {
      if (location.pathname === '/' || location.pathname === '/signup') {
        navigate('/main_menu')
      }
      return
    }

    try {
      await dispatch(fetchUser()).unwrap()
      if (location.pathname === '/' || location.pathname === '/signup') {
        navigate('/main_menu')
      }
    } catch (error) {
      console.error(error)
      navigate('/')
    }
  }, [navigate, user.user.id])
}
