import { ReactNode } from 'react'
import { Typography } from '@mui/material'
import styles from './styles.module.scss'

interface FormProps {
  title: string
  children: ReactNode
}

function Form({ title, children }: FormProps) {
  return (
    <form className={styles.form}>
      <Typography className={styles.title} variant="h5" color={'#ffffff'}>
        {title}
      </Typography>
      {children}
    </form>
  )
}

export default Form
