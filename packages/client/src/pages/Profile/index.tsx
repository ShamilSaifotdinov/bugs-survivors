import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import PasswordChange from './PasswordChange'
import { useEffect } from 'react'
import { User } from '../../api/basic/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUser,
  changeProfile,
  setFirstname,
  setSecondname,
  setLogin,
  setEmail,
  setPhone,
} from '../../store/userSlice'
import { RootState } from '../../store'

const fields: Partial<User> = {
  first_name: 'First name',
  second_name: 'Second name',
  login: 'Login',
  email: 'E-mail',
  phone: 'Phone',
}

function ProfilePage() {
  const profile = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'first_name':
        dispatch(setFirstname(e.target.value))
        break
      case 'second_name':
        dispatch(setSecondname(e.target.value))
        break
      case 'login':
        dispatch(setLogin(e.target.value))
        break
      case 'email':
        dispatch(setEmail(e.target.value))
        break
      case 'phone':
        dispatch(setPhone(e.target.value))
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
