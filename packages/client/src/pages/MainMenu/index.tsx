import { Button, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import styles from './styles.module.scss'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { logOutUser } from '../../store/slices/userSlice'
import { useAppDispatch } from '../../hooks/reduxHooks'

const breakpointSizes = {
  fontSize: {
    xxl: '7rem',
    xl: '6.75rem',
    xs: '5.5rem',
  },
}

function MainMenu() {
  useLoggedInUser()
  const dispatch = useAppDispatch()

  function handleLogout() {
    try {
      dispatch(logOutUser())
    } catch (error) {
      console.error(error)
    }
  }

  const currentTheme = 'light' // TODO

  return (
    <div
      className={`${styles['main-menu']} ${
        styles[currentTheme === 'light' ? 'main-menu-light' : 'main-menu-dark']
      }`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Main menu</title>
        <meta name="description" content="Main menu of game" />
      </Helmet>
      <Typography
        sx={breakpointSizes}
        className={styles['main-menu_title']}
        variant="h1"
        component="h1">
        BUGS SURVIVORS
      </Typography>
      <div className={styles['main-menu_buttons']}>
        <Button href="/game" variant="contained">
          Start Game
        </Button>
        <Button href="/profile" variant="contained" color="secondary">
          Profile
        </Button>
        <Button href="/leaderboard" variant="contained" color="secondary">
          Leaderbroad
        </Button>
        <Button href="/forum" variant="contained" color="secondary">
          Forum
        </Button>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </div>
    </div>
  )
}

export default MainMenu
