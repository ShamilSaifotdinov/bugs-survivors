import { Button, FormHelperText, TextField, Typography } from '@mui/material'
import style from './styles.module.scss'
import { Helmet } from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInData, signIn } from '../../api/basic/auth'
import { useValidationForm } from '../../hooks/useValidationForm'
import { useLoggedInUser } from '../../hooks/useLoggedInUser'
import { yandexOauth, yandexServiceId } from '../../api/basic/oauth'
import { useAppSelector } from '../../hooks/reduxHooks'
import Clue from '../../components/Clue'
import { CLIENT_HOST } from '../../constants'
import getAppliedXSS from '../../helpers/getAppliedXSS'

function Login() {
  const user = useAppSelector(state => state.user)
  useLoggedInUser()
  const navigate = useNavigate()

  const [serviceId, setServiceId] = useState<string | null>(null)

  useEffect(() => {
    if (![null, undefined, 'resolved', 'rejected'].includes(user.status)) {
      return
    }
    if (user?.user.id) {
      return navigate('/main_menu')
    }

    if (window.location.search) {
      const code = window.location.search.substring(1).split('&')[0].slice(5)

      yandexOauth(code)
        .then(() => navigate('/main_menu'))
        .catch(error => setLoginError(error.message))
    } else {
      yandexServiceId().then((data: { service_id: string }) => {
        setServiceId(data.service_id)
      })
    }
  }, [])

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
        setDataForm({ ...dataForm, login: getAppliedXSS(event.target.value) })
        break
      case 'password':
        setDataForm({
          ...dataForm,
          password: getAppliedXSS(event.target.value),
        })
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
        <meta name="description" content="Sign In" />
      </Helmet>
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
              value={getAppliedXSS(dataForm.login)}
              name="login"
              label="Login"
              error={loginErr}
              onBlur={valid.login.blur.onBlur}
            />
            <TextField
              value={getAppliedXSS(dataForm.password)}
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
          {serviceId && (
            <Button
              href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${CLIENT_HOST}`}
              variant="contained"
              color="primary"
              className={style.oauth_button}
            />
          )}
          <Button href="/game" variant="contained" color="primary">
            Demo
          </Button>
        </div>
      </div>
      <Clue />
    </section>
  )
}

export default Login
