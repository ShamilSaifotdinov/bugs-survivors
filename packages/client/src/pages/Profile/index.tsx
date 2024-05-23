import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import PasswordChange from './PasswordChange'
import { useEffect, useState } from 'react'
import { User } from '../../api/basic/types'
import { RESOURCES_URL } from '../../api/basic/basicInstance'
import { changeProfile, fetchUser } from '../../store/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

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
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<Partial<User>>(initialData)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  useEffect(() => {
    setProfile(user)
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmitData = async (e: React.FormEvent) => {
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
              <AvatarLoad
                src={`${RESOURCES_URL}${user.avatar}`}
                onChange={() => console.log('submit avatar')}
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
