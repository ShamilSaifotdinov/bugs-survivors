import styles from './styles.module.scss'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function ErrorPage500() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src="images/500.png"
        alt="page500 background"
      />
      <Button
        type="button"
        onClick={() => navigate('/')}
        sx={{ marginBottom: '16vh', position: 'absolute' }}
        variant="contained">
        BACK TO MAIN MENU
      </Button>
    </div>
  )
}

export default ErrorPage500
