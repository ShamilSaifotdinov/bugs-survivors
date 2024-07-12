import { Button, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { logOutUser } from '../../store/slices/userSlice'
import { useAppDispatch } from '../../hooks/reduxHooks'
import Clue from '../../components/Clue'
import ThemeSwitcher from '../../components/ThemeSwitcher'
import styles from './styles.module.scss'

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

  return (
    <div className={styles['main-menu']}>
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
      <Clue />
      <ThemeSwitcher />
    </div>
  )
}

export default MainMenu
