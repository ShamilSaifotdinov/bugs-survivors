import { Grid } from '@mui/material'
import styles from './styles.module.scss'
import { ReactNode } from 'react'

type BgImageLayoutProps = {
  children: ReactNode
}

const LayoutWithBgImage = ({ children }: BgImageLayoutProps) => {
  return (
    <Grid container className={styles.page}>
      <Grid item xs={12} md={6} xl={4} className={styles.contentBlock}>
        <div>
          <div className={styles.wrapper}>{children}</div>
        </div>
      </Grid>
    </Grid>
  )
}

export default LayoutWithBgImage
