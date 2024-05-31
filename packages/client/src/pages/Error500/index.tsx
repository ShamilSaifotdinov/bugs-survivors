import { Helmet } from 'react-helmet'
import styles from './styles.module.scss'
import { Button } from '@mui/material'

function ErrorPage500() {
  return (
    <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>500</title>
        <meta name="description" content="Internal Server Error" />
      </Helmet>
      <Button
        type="button"
        href="/"
        sx={{ marginBottom: '16vh', position: 'absolute' }}
        variant="contained">
        BACK TO MAIN MENU
      </Button>
    </div>
  )
}

export default ErrorPage500
