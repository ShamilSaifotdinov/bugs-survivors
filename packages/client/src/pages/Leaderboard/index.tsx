import { clsx } from 'clsx'
import { Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import LeaderboardTable from './components/LeaderboardTable'
import styles from './styles.module.scss'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'

const Leaderboard = () => {
  useLoggedInUser()

  const currentTheme = 'light' // TODO

  return (
    <section className={styles.section}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Leaderboard</title>
        <meta
          name="description"
          content="Page of leaderboard with results of attempts"
        />
      </Helmet>
      <div className={clsx('container', styles.container)}>
        <div
          className={`${styles.wrapper}  ${
            styles[currentTheme === 'light' ? 'wrapper-light' : 'wrapper-dark']
          }`}>
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
