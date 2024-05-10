import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

function ErrorPage404() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <img src="/images/404.png" alt="page background" />
      <Button
        type="button"
        onClick={() => navigate('/')}
        sx={{ marginBottom: '16vh', position: 'absolute' }}
        variant="contained"
        className={styles.img}>
        BACK TO MAIN MENU
      </Button>
    </div>
  )
}

export default ErrorPage404
