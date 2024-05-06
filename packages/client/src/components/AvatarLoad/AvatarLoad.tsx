import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Avatar, Input } from '@mui/material'
import styles from './styles.module.scss'

type AvatarLoadProps = {
  src?: string
  className?: any
  onClick?: () => void
  onChange?: () => void
}

function AvatarLoad({ src, className, onChange }: AvatarLoadProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Button
      disableFocusRipple={true}
      onClick={handleOpen}
      component="label"
      sx={{
        p: 0,
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: '#fff',
        },
      }}>
      <Avatar className={className} src={src}></Avatar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Загружай аватарку
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: 'inherit', mb: '0.8rem' }}>
            Пока ветер без камней :)
          </Typography>
          <Input
            size="small"
            type="file"
            onChange={onChange}
            sx={{
              '.MuiInput-input': {
                color: '--primary-color-dark',
                fontSize: '0.8rem',
              },
            }}
          />
        </Box>
      </Modal>
    </Button>
  )
}

export default AvatarLoad
