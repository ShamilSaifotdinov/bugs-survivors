import { Button, FormHelperText, TextField, Typography } from '@mui/material'
import style from './styles.module.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../api/basic/auth'

function Login() {
  const navigate = useNavigate()

  const initialData = {
    login: '',
    password: '',
  }

  const [dataForm, setDataForm] = useState(initialData)
  const [loginError, setLoginError] = useState('')

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

    signIn(dataForm)
      .then(() => navigate('/'))
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
            <TextField value={dataForm.login} name="login" label="Login" />
            <TextField
              value={dataForm.password}
              type="password"
              name="password"
              label="Password"
            />
            <FormHelperText children={loginError} error={!!loginError.length} />
            <div className={style.button_container}>
              <Button type="submit" variant="contained" color="secondary">
                SIGN IN
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/signup/')}>
                SIGN UP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
