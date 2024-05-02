import { Button, Typography } from '@mui/material'
import styles from './styles.module.scss'

const breakpointSizes = {
  fontSize: {
    xxl: '7rem',
    xl: '6.75rem',
    xs: '5.5rem',
  },
}

const MainMenu = () => (
  <div className={styles['main-menu']}>
    <Typography
      sx={breakpointSizes}
      className={styles['main-menu_title']}
      variant="h1"
      component="h1">
      BUGS SURVIVORS
    </Typography>
    <div className={styles['main-menu_buttons']}>
      <Button href="#" variant="contained">
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
      <Button href="#" variant="contained" color="secondary">
        Logout
      </Button>
    </div>
  </div>
)

export default MainMenu
