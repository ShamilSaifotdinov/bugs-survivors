import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import ButtonModal from '../../components/ButtonModal/ButtonModal'
import { getUserInfo } from '../../api/basic/auth'
import { changeUserProfile, changeUserPassword } from '../../api/basic/users'
import { useCallback, useEffect, useState } from 'react'
import { ChangeUserPasswordData } from '../../api/basic/users'
import { User } from '../../api/basic/types'
import { RESOURCES_URL } from '../../api/basic/basicInstance'
import { changeUserAvatar } from '../../api/basic/users'

const initialData = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
}

const initialPassword = {
  oldPassword: '',
  newPassword: '',
}

const fields: Partial<User> = {
  first_name: 'First name',
  second_name: 'Second name',
  login: 'Login',
  email: 'E-mail',
  phone: 'Phone',
}

function ProfilePage() {
  const [profile, setProfile] = useState<Partial<User>>(initialData)
  const [passwords, setPasswords] =
    useState<ChangeUserPasswordData>(initialPassword)
  const [errorPasswords, setErrorPasswords] = useState(' ')
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setPasswords(initialPassword)
    setErrorPasswords(' ')
  }

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.target.files) formData.append('avatar', e.target?.files[0])
    const response = await changeUserAvatar(formData)
    setProfile({ ...profile, avatar: response.avatar })
  }

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault()
    if (open) {
      try {
        await changeUserPassword(passwords)
        handleClose()
      } catch (error) {
        // @ts-ignore
        setErrorPasswords(error.message)
      }
    } else {
      const response = await changeUserProfile(profile)
      setProfile(response)
    }
  }

  useEffect(() => {
    ;(async function () {
      const data = await getUserInfo()
      setProfile(data)
    })()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'first_name':
        setProfile({ ...profile, first_name: e.target?.value })
        break
      case 'second_name':
        setProfile({ ...profile, second_name: e.target?.value })
        break
      case 'login':
        setProfile({ ...profile, login: e.target?.value })
        break
      case 'email':
        setProfile({ ...profile, email: e.target?.value })
        break
      case 'phone':
        setProfile({ ...profile, phone: e.target?.value })
        break
      case 'password':
        setPasswords({ ...passwords, newPassword: e.target.value })
        break
      case 'old_password':
        setPasswords({ ...passwords, oldPassword: e.target.value })
        break
    }
  }

  return (
    <Grid container className={styles.profile}>
      <Grid item xs={12} md={6} xl={4} className={styles.gridItem}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={8} sx={{ position: 'relative' }}>
            <PreviousPageBtn className={styles.buttonPrev} />
            <Grid container gap={'3.8rem'} justifyContent={'center'}>
              <AvatarLoad
                src={`${RESOURCES_URL}${profile.avatar}`}
                onChange={useCallback(uploadAvatar, [])}
                className={styles.avatar}></AvatarLoad>
              <form
                className={styles.form}
                onSubmit={handleSubmitData}
                onChange={handleChange}>
                <Grid container gap="1rem" justifyContent={'center'}>
                  {Object.keys(fields).map(field => {
                    const key = field as keyof User
                    return (
                      <Box key={key} className={styles.fieldItem}>
                        <Typography>{fields[key]}</Typography>
                        <TextField
                          sx={{ width: '45%' }}
                          label="First name"
                          value={profile[key]}
                          name={field}></TextField>
                      </Box>
                    )
                  })}
                  <Box
                    className={styles.fieldItem}
                    sx={{ marginBottom: '2.8rem' }}>
                    <Typography>Password</Typography>
                    <ButtonModal
                      color="secondary"
                      variant="contained"
                      label="CHANGE"
                      open={open}
                      handleClose={handleClose}
                      handleOpen={handleOpen}>
                      <Grid container gap={'1.5rem'} justifyContent={'center'}>
                        <TextField
                          helperText={errorPasswords}
                          error={errorPasswords.length > 1 ? true : false}
                          label="Old password"
                          name="old_password"
                          value={passwords.oldPassword}
                        />
                        <TextField
                          helperText={' '}
                          label="New password"
                          name="password"
                          value={passwords.newPassword}
                        />
                        <Button
                          onClick={handleSubmitData}
                          color="secondary"
                          variant="contained"
                          type="submit">
                          CHANGE PASSWORD
                        </Button>
                      </Grid>
                    </ButtonModal>
                  </Box>
                  <Button type="submit" variant="contained" color="primary">
                    SAVE CHANGES
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfilePage
