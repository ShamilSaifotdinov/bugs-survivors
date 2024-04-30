import { Button, Grid, TextField, Typography } from '@mui/material'
import style from './styles.module.scss'
import { useState } from 'react'

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
        // navigate('/login')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Grid container justifyContent={'right'} className={style.registration}>
      <Grid
        item
        xs={4}
        height={'100vh'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2F464AB2',
        }}>
        <Grid
          item
          xs={6}
          sx={{
            height: '74%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Grid
            item
            sx={{
              background:
                'linear-gradient(180deg, #FF5C00 50%, #FFFFFF 67.91%, #4396B5 89.37%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            <Typography variant="h1" component="h1">
              BUGS
            </Typography>
            <Typography variant="h2" component="h1">
              SURVIVORS
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <Grid container gap="1.5rem">
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
                <Grid
                  item
                  display={'flex'}
                  width={'100%'}
                  justifyContent={'space-between'}>
                  <Button
                    type="button"
                    onClick={() => console.log('to login')}
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
  )
}

export default RegisterPage
