import { Button, ButtonGroup, Grid, TextField, Typography } from '@mui/material'
import Form from '../../components/Form/Form'
import style from './styles.module.scss'

function RegisterPage() {
  return (
    <Grid container justifyContent="right" className={style.registration}>
      <Grid
        container
        direction="column"
        item
        xs={4}
        sx={{
          backgroundColor: '#2F464AB2',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Grid
          item
          sx={{
            background:
              'linear-gradient(180deg, #FF5C00 50%, #FFFFFF 67.91%, #4396B5 89.37%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // marginBottom: '80px',
            margin: '0 auto 80px auto ',
          }}>
          <Typography
            sx={{
              fontSize: '85px',
              lineHeight: '78px',
              margin: '0',
              textAlign: 'center',
            }}
            component="h1">
            BUGS
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: '38px',
              lineHeight: '35px',
              textAlign: 'center',
            }}>
            SURVIVORS
          </Typography>
        </Grid>
        <Grid item>
          <Form title="Sign Up">
            <TextField
              fullWidth={true}
              name="first_name"
              placeholder="First name"></TextField>
            <TextField
              fullWidth={true}
              name="second_name"
              placeholder="Second name"></TextField>
            <TextField
              fullWidth={true}
              name="email"
              placeholder="E-mail"></TextField>
            <TextField
              fullWidth={true}
              name="phone"
              placeholder="Phone"></TextField>
            <TextField
              fullWidth={true}
              name="login"
              placeholder="Login"></TextField>
            <TextField
              fullWidth={true}
              name="password"
              placeholder="Password"></TextField>
            <ButtonGroup
              sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="secondary">
                SIGN IN
              </Button>
              <Button variant="contained" color="primary">
                SIGN UP
              </Button>
            </ButtonGroup>
          </Form>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RegisterPage
