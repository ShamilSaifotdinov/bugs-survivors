import { ReactNode } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { Link } from '@mui/material'

import styles from './styles.module.scss'

type PreviousPageBtnProps = {
  className?: string
  children?: ReactNode
}

const PreviousPageBtn = ({ className, children }: PreviousPageBtnProps) => {
  const navigate = useNavigate()
  return (
    <Link
      classes={{
        root: clsx(className, styles.previousPageBtn),
      }}
      onClick={() => navigate(-1)}>
      {children}
    </Link>
  )
}

export default PreviousPageBtn
