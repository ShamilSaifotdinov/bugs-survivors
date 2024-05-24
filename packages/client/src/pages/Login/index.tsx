import { Button, FormHelperText, TextField, Typography } from '@mui/material'
import style from './styles.module.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInData, signIn } from '../../api/basic/auth'
import { useValidationForm } from '../../hooks/useValidationForm'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'

function Login() {
  useLoggedInUser()
  const navigate = useNavigate()

  const initialData = {
    login: '',
    password: '',
  }
  const {
    form: dataForm,
    setForm: setDataForm,
    valid,
  } = useValidationForm(initialData)
  const [loginError, setLoginError] = useState('')
  const formIsValid =
    !valid.login.valid.isValid || !valid.password.valid.isValid
  const loginErr = !valid.login.valid.isValid && valid.login.blur.isDirty
  const passwordError =
    !valid.password.valid.isValid && valid.password.blur.isDirty

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    switch (event.target.name) {
      case 'login':
        setDataForm({ ...dataForm, login: event.target.value })
        break
      case 'password':
        setDataForm({ ...dataForm, password: event.target.value })
        break
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginError('')

    signIn(dataForm as SignInData)
      .then(() => navigate('/main_menu'))
      .catch(error => setLoginError(error.message))
  }

  return (
    <section className={style.login}>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.title}>
            <Typography variant="h1" component="h1">
              BUGS
            </Typography>
            <Typography variant="h2" component="h1">
              SURVIVORS
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className={style.form}>
            <Typography variant="h5">Sign In</Typography>
            <TextField
              value={dataForm.login}
              name="login"
              label="Login"
              error={loginErr}
              onBlur={valid.login.blur.onBlur}
            />
            <TextField
              value={dataForm.password}
              type="password"
              name="password"
              label="Password"
              error={passwordError}
              onBlur={valid.password.blur.onBlur}
            />
            <FormHelperText children={loginError} error={!!loginError.length} />
            <div className={style.button_container}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={formIsValid}>
                SIGN IN
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/signup')}>
                SIGN UP
              </Button>
            </div>
          </form>
          <Button href="/game" variant="contained" color="primary">
            Demo
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Login
