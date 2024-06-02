import { Helmet } from 'react-helmet'
import { Button } from '@mui/material'
import styles from './styles.module.scss'

function ErrorPage404() {
  return (
    <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Button
        type="button"
        href="/main_menu"
        sx={{ marginBottom: '16vh', position: 'absolute' }}
        variant="contained">
        BACK TO MAIN MENU
      </Button>
    </div>
  )
}

export default ErrorPage404
