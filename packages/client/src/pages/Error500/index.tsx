import styles from './styles.module.scss'
import { Button } from '@mui/material'

function ErrorPage500() {
  return (
    <div className={styles.container}>
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
