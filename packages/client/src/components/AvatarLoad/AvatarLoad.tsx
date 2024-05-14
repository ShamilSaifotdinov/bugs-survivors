import Button from '@mui/material/Button'
import { Avatar, styled } from '@mui/material'
import { RESOURCES_URL } from '../../api/basic/basicInstance'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changeAvatar } from '../../store/userSlice'
import { RootState } from '../../store'
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
  className?: any
}

function AvatarLoad({ className }: AvatarLoadProps) {
  const dispatch = useDispatch<any>()
  const { avatar } = useSelector((state: RootState) => state.user.user)
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.target.files) {
      formData.append('avatar', e.target.files[0])
    }
    dispatch(changeAvatar(formData))
  }
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
      <Avatar className={className} src={`${RESOURCES_URL}${avatar}`}></Avatar>
      <div className={styles.layout}>Load avatar</div>
      <VisuallyHiddenInput onChange={handleAvatar} type="file" />
    </Button>
  )
}

export default React.memo(AvatarLoad)
