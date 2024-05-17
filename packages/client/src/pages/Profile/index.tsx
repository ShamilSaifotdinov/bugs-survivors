import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import PasswordChange from './PasswordChange'
import { getUserInfo } from '../../api/basic/auth'
import { changeUserProfile } from '../../api/basic/users'
import { useEffect } from 'react'
import { User } from '../../api/basic/types'
import { RESOURCES_URL } from '../../api/basic/basicInstance'
import { useValidationForm } from '../../hooks/useValidationForm'

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
  const {
    form: profile,
    setForm: setProfile,
    valid,
  } = useValidationForm(initialData)
  const formIsValid =
    !valid.first_name.valid.isValid ||
    !valid.second_name.valid.isValid ||
    !valid.login.valid.isValid ||
    !valid.email.valid.isValid ||
    !valid.phone.valid.isValid

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

  return (
    <Grid container className={styles.profile}>
      <Grid item xs={12} md={6} xl={4} className={styles.gridItem}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={8} sx={{ position: 'relative' }}>
            <PreviousPageBtn className={styles.buttonPrev} />
            <Grid container gap={'3.8rem'} justifyContent={'center'}>
              <AvatarLoad
                src={`${RESOURCES_URL}${profile.avatar}`}
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
                          error={
                            !valid[key].valid.isValid && valid[key].blur.isDirty
                          }
                          helperText={
                            !valid[key].valid.isValid && valid[key].blur.isDirty
                              ? valid[key].valid.errorText
                              : ' '
                          }
                          onBlur={valid[key].blur.onBlur}
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formIsValid}>
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
