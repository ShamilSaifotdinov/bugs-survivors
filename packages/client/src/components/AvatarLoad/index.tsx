import Button from '@mui/material/Button'
import { Avatar, styled } from '@mui/material'
import styles from './styles.module.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { changeUserAvatar } from '../../api/basic/users'
import getAvatarSrc from '../../helpers/getAvatarSrc'

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
  className?: string
}

function AvatarLoad({ src, className }: AvatarLoadProps) {
  const [avatar, setAvatar] = useState(src)

  const handleAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData()
      if (e.target.files) {
        formData.append('avatar', e.target.files[0])
      }
      try {
        const response = await changeUserAvatar(formData)
        setAvatar(response.avatar)
      } catch (error) {
        alert(error)
      }
    },
    []
  )

  useEffect(() => {
    setAvatar(src)
  }, [src])

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
      <Avatar className={className} src={getAvatarSrc(avatar)} />
      <div className={styles.layout}>Load avatar</div>
      <VisuallyHiddenInput
        accept="image/*"
        onChange={handleAvatar}
        type="file"
      />
    </Button>
  )
}

export default AvatarLoad
