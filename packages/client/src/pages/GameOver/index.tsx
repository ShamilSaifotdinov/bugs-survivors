import { Button, Grid, Link, List, ListItem, Typography } from '@mui/material'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import LayoutWithBgImage from '../../components/LayoutWithBgImage'

type Results = {
  time: string | null
  bugs: number | null
  levels: {
    hp: number
    gun: number
  } | null
}

const GameOver = () => {
  const [results, setResults] = useState<Results>({
    time: null,
    bugs: null,
    levels: null,
  })

  useEffect(() => {
    setResults({
      time: '02:56',
      bugs: 50,
      levels: {
        hp: 2,
        gun: 2,
      },
    })
  }, [])

  return (
    <LayoutWithBgImage>
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
          <img src="/public/images/time.png" alt="time" />
          <span className={styles.listTextLabel}>time</span>
          {results.time}
        </ListItem>
        <ListItem className={styles.listItem}>
          <img src="/public/images/bugs.png" alt="bugs" />
          <span className={styles.listTextLabel}>bugs</span>
          {results.bugs}
        </ListItem>
        <ListItem className={styles.listItem}>
          <img src="/public/images/levels.png" alt="levels" />
          <span className={styles.listTextLabel}>levels</span>
          <div>
            {results.levels?.hp && (
              <div className={styles.levelsItem}>
                <img src="/public/images/heart.png" alt="HP" />
                <span>{results.levels?.hp}</span>
              </div>
            )}
            {results.levels?.gun && (
              <div className={styles.levelsItem}>
                <img src="/public/images/gun.png" alt="Gun" />
                <span>{results.levels?.gun}</span>
              </div>
            )}
          </div>
        </ListItem>
      </List>
      <Button
        sx={{
          marginRight: 'auto',
        }}
        type="submit"
        variant="contained"
        color="primary">
        Restart
      </Button>
      <Button type="submit" variant="contained" color="secondary">
        <Link href="/">Main menu</Link>
      </Button>
    </LayoutWithBgImage>
  )
}

export default GameOver
