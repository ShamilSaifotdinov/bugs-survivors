import { clsx } from 'clsx'
import { Typography } from '@mui/material'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import LeaderboardTable from './components/LeaderboardTable'
import styles from './styles.module.scss'

const Leaderboard = () => {
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.container)}>
        <div className={styles.wrapper}>
          <Typography variant="h2">
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
