import { clsx } from 'clsx'
import { Typography } from '@mui/material'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import LeaderboardTable from './components/LeaderboardTable'
import styles from './styles.module.scss'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'

const Leaderboard = () => {
  useLoggedInUser()

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
