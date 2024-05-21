import { Button, Link, Typography } from '@mui/material'
import { clsx } from 'clsx'
import styles from './styles.module.scss'

const Discovery = () => {
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.wrapper}>
          <Typography
            className={styles.title}
            variant="h2"
            color="text.secondary">
            Bugs Survivors
          </Typography>
          <Typography
            className={styles.title}
            variant="h5"
            color="text.secondary">
            By StathamGames
          </Typography>
          <Button variant="contained" href="/game">
            Play game
          </Button>
          <ul className={styles.links}>
            <li>
              <Link color="secondary" href="/forum">
                Forum
              </Link>
            </li>
            <li>
              <Link href="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
export default Discovery
