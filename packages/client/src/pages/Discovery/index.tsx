import { Button, Link } from '@mui/material'
import { clsx } from 'clsx'
import styles from './styles.module.scss'

const Discovery = () => {
  return (
    <section className={styles.discovery}>
      <img className={styles.background} src="/bgImage.png" alt="" />
      <div className={clsx('container', styles.container)}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Bugs Survivors</h1>
          <h4 className={styles.title}>By StathamGames</h4>
          <Button variant="contained">Play game</Button>
          <ul className={styles.links}>
            <li>
              <Link color="secondary" href={`/forum`}>
                Forum
              </Link>
            </li>
            <li>
              <Link href={`/leaderboard`}>Leaderboard</Link>
            </li>
            <li>
              <Link href={`/profile`}>Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
export default Discovery
