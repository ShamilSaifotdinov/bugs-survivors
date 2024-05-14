import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import PasswordChange from './PasswordChange'
import { useEffect, useState } from 'react'
import { User } from '../../api/basic/types'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, changeProfile } from '../../store/userSlice'
import { RootState } from '../../store'

const fields: Partial<User> = {
  first_name: 'First name',
  second_name: 'Second name',
  login: 'Login',
  email: 'E-mail',
  phone: 'Phone',
}

function ProfilePage() {
  const user = useSelector(
    (state: RootState) => state.user.user as Partial<User>
  )
  const dispatch = useDispatch<any>()
  const [profile, setProfile] = useState<Partial<User>>(user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])
  useEffect(() => {
    if (user) setProfile(user)
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'first_name':
        setProfile({ ...profile, first_name: e.target.value })
        break
      case 'second_name':
        setProfile({ ...profile, second_name: e.target.value })
        break
      case 'login':
        setProfile({ ...profile, login: e.target.value })
        break
      case 'email':
        setProfile({ ...profile, email: e.target.value })
        break
      case 'phone':
        setProfile({ ...profile, phone: e.target.value })
        break
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(changeProfile(profile))
  }

  return (
    <Grid container className={styles.profile}>
      <Grid item xs={12} md={6} xl={4} className={styles.gridItem}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={8} sx={{ position: 'relative' }}>
            <PreviousPageBtn className={styles.buttonPrev} />
            <Grid container gap={'3.8rem'} justifyContent={'center'}>
              <AvatarLoad className={styles.avatar}></AvatarLoad>
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                onChange={handleChange}>
                <Grid container gap="1rem" justifyContent={'center'}>
                  {Object.keys(fields).map(field => {
                    const key = field as keyof User
                    return (
                      <Box key={key} className={styles.fieldItem}>
                        <Typography>{fields[key]}</Typography>
                        <TextField
                          sx={{ width: '45%' }}
                          label={fields[key]}
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
