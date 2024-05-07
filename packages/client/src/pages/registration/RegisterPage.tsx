import { Box, Button, Grid, TextField, Typography } from '@mui/material'
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
      console.log(error)
    }
  }

  return (
    <Grid container className={style.registration}>
      <Grid item xs={12} md={4} className={style.gridItem}>
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
                  <Box className={style.containerButton}>
                    <Button
                      type="button"
                      onClick={() => navigate('/signin')}
                      color="secondary"
                      variant="contained">
                      SIGN IN
                    </Button>
                    <Button variant="contained" type="submit" color="primary">
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
