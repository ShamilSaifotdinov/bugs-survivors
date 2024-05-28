import { Button } from '@mui/material'
import styles from './styles.module.scss'

function ErrorPage404() {
  return (
    <div className={styles.container}>
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
