import React, { useState } from 'react'
import ButtonModal from '../../../components/ButtonModal/ButtonModal'
import { Button, Grid, TextField, FormHelperText } from '@mui/material'
import { useValidationForm } from '../../../hooks/useValidationForm'
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
  const {
    form: passwords,
    setForm: setPasswords,
    valid: { oldPassword, newPassword },
    formIsValid,
  } = useValidationForm(initialPassword)

  const [errorPasswords, setErrorPasswords] = useState(' ')
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setPasswords(initialPassword)
    setErrorPasswords(' ')
    oldPassword.blur.setDirty(false)
    newPassword.blur.setDirty(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await changeUserPassword(passwords as ChangeUserPasswordData)
      handleClose()
    } catch (error) {
      setErrorPasswords((error as Error).message)
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
            helperText={
              !oldPassword.valid.isValid && oldPassword.blur.isDirty
                ? oldPassword.valid.errorText
                : ' '
            }
            type="password"
            label="Old password"
            name="old_password"
            error={oldPassword.blur.isDirty && !oldPassword.valid.isValid}
            onBlur={oldPassword.blur.onBlur}
            value={passwords.oldPassword}
          />
          <FormHelperText error={!!errorPasswords}>
            {errorPasswords}
          </FormHelperText>
          <TextField
            helperText={
              !newPassword.valid.isValid && newPassword.blur.isDirty
                ? newPassword.valid.errorText
                : ' '
            }
            type="password"
            label="New password"
            name="password"
            error={newPassword.blur.isDirty && !newPassword.valid.isValid}
            onBlur={newPassword.blur.onBlur}
            value={passwords.newPassword}
          />
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            disabled={!formIsValid}
            type="submit">
            CHANGE PASSWORD
          </Button>
        </Grid>
      </form>
    </ButtonModal>
  )
}

export default PasswordChange
