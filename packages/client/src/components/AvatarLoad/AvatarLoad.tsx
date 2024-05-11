import Button from '@mui/material/Button'
import { Avatar, styled } from '@mui/material'

import styles from './styles.module.scss'
import React from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

type AvatarLoadProps = {
  src?: string
  className?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function AvatarLoad({ src, className, onChange }: AvatarLoadProps) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="text"
      sx={{
        padding: 0,
        borderRadius: '50%',
      }}
      tabIndex={-10}>
      <Avatar className={className} src={src}></Avatar>
      <div className={styles.layout}>Load avatar</div>
      <VisuallyHiddenInput onChange={onChange} type="file" />
    </Button>
  )
}

export default AvatarLoad
