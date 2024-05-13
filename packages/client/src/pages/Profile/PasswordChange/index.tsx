import React, { useState } from 'react'
import ButtonModal from '../../../components/ButtonModal/ButtonModal'
import { Button, Grid, TextField } from '@mui/material'
import {
  ChangeUserPasswordData,
  changeUserPassword,
} from '../../../api/basic/users'

const initialPassword = {
  oldPassword: '',
  newPassword: '',
}

function PasswordChange() {
  const [open, setOpen] = useState(false)
  const [passwords, setPasswords] =
    useState<ChangeUserPasswordData>(initialPassword)
  const [errorPasswords, setErrorPasswords] = useState(' ')

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setPasswords(initialPassword)
    setErrorPasswords(' ')
  }

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'old_password':
        setPasswords({ ...passwords, oldPassword: e.target.value })
        break
      case 'password':
        setPasswords({ ...passwords, newPassword: e.target.value })
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await changeUserPassword(passwords)
      handleClose()
    } catch (error) {
      // @ts-ignore
      setErrorPasswords(error.message)
    }
  }

  return (
    <ButtonModal
      color="secondary"
      variant="contained"
      label="CHANGE"
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Grid container gap={'1.5rem'} justifyContent={'center'}>
          <TextField
            helperText={errorPasswords}
            error={errorPasswords.length > 1 ? true : false}
            type="password"
            label="Old password"
            name="old_password"
            value={passwords.oldPassword}
          />
          <TextField
            helperText={' '}
            type="password"
            label="New password"
            name="password"
            value={passwords.newPassword}
          />
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            type="submit">
            CHANGE PASSWORD
          </Button>
        </Grid>
      </form>
    </ButtonModal>
  )
}

export default PasswordChange
