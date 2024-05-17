import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useValidationForm } from '../../hooks/useValidationForm'
import style from './styles.module.scss'
import { SignUpData } from '../../api/basic/auth'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'

const fields: SignUpData = {
  first_name: 'First name',
  second_name: 'Second name',
  email: 'E-mail',
  phone: 'Phone',
  login: 'Login',
  password: 'Password',
}

function RegisterPage() {
  const initialData = {
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
    login: '',
    password: '',
  }
  const {
    form: dataForm,
    setForm: setDataForm,
    valid,
  } = useValidationForm(initialData)
  const formIsValid =
    !valid.first_name.valid.isValid ||
    !valid.second_name.valid.isValid ||
    !valid.login.valid.isValid ||
    !valid.email.valid.isValid ||
    !valid.phone.valid.isValid ||
    !valid.password.valid.isValid
  const navigate = useNavigate()
  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    switch (event.target.name) {
      case 'first_name':
        setDataForm({ ...dataForm, first_name: event.target.value })
        break
      case 'second_name':
        setDataForm({ ...dataForm, second_name: event.target.value })
        break
      case 'email':
        setDataForm({ ...dataForm, email: event.target.value })
        break
      case 'phone':
        setDataForm({ ...dataForm, phone: event.target.value })
        break
      case 'login':
        setDataForm({ ...dataForm, login: event.target.value })
        break
      case 'password':
        setDataForm({ ...dataForm, password: event.target.value })
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`Network response with status ${response.status}`)
      }
      setDataForm(initialData)
      navigate('/signin')
    } catch (error) {
      alert(error)
    }
  }
  return (
    <Grid container className={style.registration}>
      <Grid item xs={12} md={6} className={style.gridItem}>
        {' '}
        <Grid container justifyContent={'center'}>
          <Grid item xs={6}>
            <Grid container gap={'3.8rem'}>
              <Grid container justifyContent={'center'}>
                <Grid item className={style.title}>
                  <Typography variant="h1" component="h1">
                    BUGS
                  </Typography>
                  <Typography variant="h2" component="h1">
                    SURVIVORS
                  </Typography>
                </Grid>
              </Grid>
              <form onSubmit={handleSubmit} onChange={handleChange}>
                <Grid container rowGap={'1.5rem'}>
                  <Typography variant="h5">Sign Up</Typography>
                  {Object.keys(fields).map(field => {
                    const key = field as keyof SignUpData
                    const isError =
                      !valid[key].valid.isValid && valid[key].blur.isDirty
                    const isHelperText =
                      !valid[key].valid.isValid && valid[key].blur.isDirty
                        ? valid[key].valid.errorText
                        : ' '
                    return (
                      <TextField
                        key={key}
                        value={dataForm[field]}
                        name={field}
                        label={fields[key]}
                        error={isError}
                        helperText={isHelperText}
                        onBlur={valid[key].blur.onBlur}></TextField>
                    )
                  })}
                  <Box className={style.containerButton}>
                    <Button
                      type="button"
                      onClick={() => navigate('/signin')}
                      color="secondary"
                      variant="contained">
                      SIGN IN
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      disabled={formIsValid}>
                      SIGN UP
                    </Button>
                  </Box>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RegisterPage
