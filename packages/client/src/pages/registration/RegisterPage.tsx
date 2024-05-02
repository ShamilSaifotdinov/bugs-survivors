import { Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './styles.module.scss'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'

function RegisterPage() {
  const initialData = {
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
    login: '',
    password: '',
  }
  const [dataForm, setDataForm] = useState(initialData)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(dataForm),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response with status ${response.status}`)
        }
        return response.json()
      })
      .then(() => {
        setDataForm(initialData)
        navigate('/signin')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Grid
      container
      rowGap={4}
      justifyContent={'right'}
      className={style.registration}>
      <Grid item xs={4} className={style.gridItem}>
        {' '}
        <Grid container justifyContent={'center'}>
          <Grid xs={6}>
            <Grid container gap={'3.8rem'}>
              <Grid container justifyContent={'center'}>
                <Grid className={style.title}>
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
                  <TextField
                    value={dataForm.first_name}
                    name="first_name"
                    label="First name"></TextField>

                  <TextField
                    value={dataForm.second_name}
                    name="second_name"
                    label="Second name"></TextField>
                  <TextField
                    value={dataForm.email}
                    name="email"
                    label="E-mail"></TextField>
                  <TextField
                    value={dataForm.phone}
                    name="phone"
                    label="Phone"></TextField>
                  <TextField
                    value={dataForm.login}
                    name="login"
                    label="Login"></TextField>
                  <TextField
                    value={dataForm.password}
                    name="password"
                    label="Password"></TextField>
                  <Grid container gap={'10px'} justifyContent={'space-between'}>
                    <Button
                      type="button"
                      onClick={() => navigate('/signin')}
                      color="secondary">
                      SIGN IN
                    </Button>
                    <Button type="submit" color="primary">
                      SIGN UP
                    </Button>
                  </Grid>
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