import { useLocation } from 'react-router-dom'
import { Button, Grid, Link, List, ListItem, Typography } from '@mui/material'
import { Helmet } from 'react-helmet'
import LayoutWithBgImage from '../../components/LayoutWithBgImage'
import styles from './styles.module.scss'
import convertSeconds from '../../helpers/convertSeconds'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useEffect } from 'react'

import { leaderboardPost } from '../../api/basic/leaderboard'

const GameOver = () => {
  const location = useLocation()
  const { time, level, diedEnemies } = location.state

  const user = useAppSelector(state => state.user)

  useEffect(() => {
    if (user) {
      console.log(user)
      leaderboardPost({
        data: {
          name: user.user.display_name,
          score: diedEnemies,
          seconds: time,
          user_id: user.user.id,
          user_avatar: user.user.avatar,
        },
        ratingFieldName: 'seconds',
        teamName: 'StathamGames',
      })
    }
  }, [user])

  return (
    <LayoutWithBgImage>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Result</title>
        <meta name="description" content="Result of attempt" />
      </Helmet>
      <Grid item className={styles.title}>
        <Typography variant="h1" component="h1">
          BUGS
        </Typography>
        <Typography variant="h2" component="h1">
          SURVIVORS
        </Typography>
      </Grid>
      <List sx={{ width: '100%' }}>
        <ListItem className={styles.listItem}>
          <img src="/images/time.png" alt="time" />
          <span className={styles.listTextLabel}>time</span>
          {convertSeconds(time)}
        </ListItem>
        <ListItem className={styles.listItem}>
          <img src="/images/bugs.png" alt="bugs" />
          <span className={styles.listTextLabel}>bugs</span>
          {diedEnemies}
        </ListItem>
        <ListItem className={styles.listItem}>
          <img src="/images/levels.png" alt="levels" />
          <span className={styles.listTextLabel}>levels</span>
          {level}
          {/* <div>
            {hp && (
              <div className={styles.levelsItem}>
                <img src="/images/heart.png" alt="HP" />
                <span>{hp}</span>
              </div>
            )}
            {level && (
              <div className={styles.levelsItem}>
                <img src="/images/gun.png" alt="Gun" />
                <span>{level}</span>
              </div>
            )}
          </div> */}
        </ListItem>
      </List>
      <Button
        sx={{
          marginRight: 'auto',
        }}
        type="submit"
        variant="contained"
        color="primary"
        href="/game">
        Restart
      </Button>
      <Button type="submit" variant="contained" color="secondary">
        <Link href="/main_menu">Main menu</Link>
      </Button>
    </LayoutWithBgImage>
  )
}

export default GameOver
