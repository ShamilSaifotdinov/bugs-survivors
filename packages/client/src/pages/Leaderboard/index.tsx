import { Typography } from '@mui/material'
import { clsx } from 'clsx'
import styles from './styles.module.scss'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import LeaderboardTable from './components/LeaderboardTable'

const Leaderboard = () => {
  return (
    <section className={styles.section}>
      <img
        className={styles.background}
        src="/images/leaderboardBackground.png"
        alt=""
      />
      <div className={clsx('container', styles.container)}>
        <div className={styles.wrapper}>
          <Typography variant="h2" color="white">
            <PreviousPageBtn />
            Leaderboard
          </Typography>
          <LeaderboardTable />
        </div>
      </div>
    </section>
  )
}
export default Leaderboard
