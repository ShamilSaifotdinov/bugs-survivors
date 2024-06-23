import clsx from 'clsx'
import { Helmet } from 'react-helmet'
import { Typography } from '@mui/material'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import styles from './styles.module.scss'

const Guide = () => {
  return (
    <section className={styles.section}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Guide</title>
        <meta name="description" content="Guide" />
        <style type="text/css">
          {`body {
            background: #365A36
          }`}
        </style>
      </Helmet>
      <div className={clsx('container', styles.wrapper)}>
        <div className={styles.header}>
          <PreviousPageBtn />
          <Typography variant="h4">Level progress</Typography>
        </div>
        <img className={styles.image} src="images/guide.png" alt="" />
        <ul className={styles.bugsList}>
          <li>
            <img src="images/bug1.png" alt="" />
            <span>1 lvl</span>
            <span>2 hp</span>
            <span>0 min</span>
          </li>
          <li>
            <img src="images/bug2.png" alt="" />
            <span>2 lvl</span>
            <span>8 hp</span>
            <span>2 min</span>
          </li>
          <li>
            <img src="images/bug3.png" alt="" />
            <span>3 lvl</span>
            <span>20 hp</span>
            <span>5 min</span>
          </li>
          <li>
            <img src="images/bug4.png" alt="" />
            <span>4 lvl</span>
            <span>50 hp</span>
            <span>8 min</span>
          </li>
          <li>
            <img src="images/bug5.png" alt="" />
            <span>5 lvl</span>
            <span>100 hp</span>
            <span>10 min</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Guide
