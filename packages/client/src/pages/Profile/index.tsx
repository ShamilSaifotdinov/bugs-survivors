import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import { Helmet } from 'react-helmet'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import PasswordChange from './PasswordChange'
import { useEffect } from 'react'
import { User } from '../../api/basic/types'
import { useValidationForm } from '../../hooks/useValidationForm'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { changeProfile } from '../../store/slices/userSlice'
import getAppliedXSS from '../../helpers/getAppliedXSS'

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
    formIsValid,
  } = useValidationForm(initialData)

  useLoggedInUser()

  const user = useAppSelector(state => state.user.user)

  const dispatch =
    typeof window !== 'undefined'
      ? useAppDispatch()
      : (args: any) => {
          console.log(args)
        }

  useEffect(() => {
    setProfile(user)
  }, [user, setProfile])

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setProfile({ ...profile, [e.target.name]: getAppliedXSS(e.target?.value) })
  }

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(changeProfile(profile))
  }
  return (
    <Grid container className={styles.profile}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
        <meta
          name="description"
          content="Profile page with information about user"
        />
      </Helmet>
      <Grid item xs={12} md={6} xl={4} className={styles.gridItem}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={8} sx={{ position: 'relative' }}>
            <PreviousPageBtn className={styles.buttonPrev} />
            <Grid container gap={'3.8rem'} justifyContent={'center'}>
              <AvatarLoad
                src={typeof profile.avatar === 'string' ? profile.avatar : ''}
                className={styles.avatar}
              />
              <form
                className={styles.form}
                onSubmit={handleSubmitData}
                onChange={handleChange}>
                <Grid container gap="1rem" justifyContent={'center'}>
                  {Object.keys(fields).map(field => {
                    const key = field as keyof User
                    const isError =
                      !valid[key].valid.isValid && valid[key].blur.isDirty
                    const isHelperText =
                      !valid[key].valid.isValid && valid[key].blur.isDirty
                        ? valid[key].valid.errorText
                        : ' '
                    return (
                      <Box key={key} className={styles.fieldItem}>
                        <Typography>{fields[key]}</Typography>
                        <TextField
                          error={isError}
                          helperText={isHelperText}
                          onBlur={valid[key].blur.onBlur}
                          sx={{ width: '45%' }}
                          label={fields[key]}
                          value={getAppliedXSS(profile[key] ?? '')}
                          name={field}
                        />
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
                    disabled={!formIsValid}>
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
