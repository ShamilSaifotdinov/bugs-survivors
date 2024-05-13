import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import PasswordChange from './PasswordChange'
import { getUserInfo } from '../../api/basic/auth'
import { changeUserProfile } from '../../api/basic/users'
import { useCallback, useEffect, useState } from 'react'
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

const fields: Partial<User> = {
  first_name: 'First name',
  second_name: 'Second name',
  login: 'Login',
  email: 'E-mail',
  phone: 'Phone',
}

function ProfilePage() {
  const [profile, setProfile] = useState<Partial<User>>(initialData)

  useEffect(() => {
    ;(async function () {
      try {
        const data = await getUserInfo()
        setProfile(data)
      } catch (error) {
        alert(error)
      }
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
    }
  }

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await changeUserProfile(profile)
    setProfile(response)
  }

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.target.files) {
      formData.append('avatar', e.target.files[0])
    }
    try {
      const response = await changeUserAvatar(formData)
      setProfile(response)
    } catch (error) {
      alert(error)
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
                onChange={useCallback(handleAvatar, [])}
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
                    <PasswordChange />
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
