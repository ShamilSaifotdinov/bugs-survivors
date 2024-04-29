import { Button, Grid, TextField, Typography } from '@mui/material'
import style from './styles.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'

function RegisterPage() {
  const navigate = useNavigate()
  const initialData = {
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
    login: '',
    password: '',
  }
  const [dataForm, setDataForm] = useState(initialData)
  const handleChange = (e: any) => {
    switch (e.target.name) {
      case 'first_name':
        setDataForm({ ...dataForm, first_name: e.target.value })
        break
      case 'second_name':
        setDataForm({ ...dataForm, second_name: e.target.value })
        break
      case 'email':
        setDataForm({ ...dataForm, email: e.target.value })
        break
      case 'phone':
        setDataForm({ ...dataForm, phone: e.target.value })
        break
      case 'login':
        setDataForm({ ...dataForm, login: e.target.value })
        break
      case 'password':
        setDataForm({ ...dataForm, password: e.target.value })
        break
    }
  }

  const handleSubmit = (e: any) => {
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
        navigate('/login')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Grid container justifyContent="right" className={style.registration}>
      <Grid
        container
        item
        xs={4}
        sx={{
          backgroundColor: '#2F464AB2',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Grid
          container
          xs={6}
          direction={'column'}
          justifyContent={'space-between'}
          sx={{ height: '74vh' }}>
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
            <Typography variant="h2" component="h2">
              SURVIVORS
            </Typography>
          </Grid>
          <form onChange={handleChange} onSubmit={handleSubmit}>
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
              <Grid container justifyContent={'space-between'}>
                <Button
                  type="button"
                  onClick={() => navigate('/login')}
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
  )
}

export default RegisterPage
