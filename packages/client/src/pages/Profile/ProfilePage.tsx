import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'
import PreviousPageBtn from '../../components/PreviousPageBtn'
import ButtonModal from '../../components/ButtonModal/ButtonModal'

// const BASE_URL = 'https://ya-praktikum.tech/api/v2'

function ProfilePage() {
  const handleSubmit = () => {
    return
  }

  return (
    <Grid container className={styles.profile}>
      <Grid item xs={12} md={6} xl={4} className={styles.gridItem}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={8} sx={{ position: 'relative' }}>
            <PreviousPageBtn className={styles.buttonPrev} />
            <Grid container gap={'3.8rem'} justifyContent={'center'}>
              <AvatarLoad
                onChange={() => console.log('submit avatar')}
                className={styles.avatar}></AvatarLoad>
              <form className={styles.form} onSubmit={handleSubmit}>
                <Grid container gap="1rem" justifyContent={'center'}>
                  <Box className={styles.fieldItem}>
                    <Typography>First name</Typography>
                    <TextField
                      sx={{ width: '45%' }}
                      label="First name"></TextField>
                  </Box>
                  <Box className={styles.fieldItem}>
                    <Typography>Second name</Typography>
                    <TextField
                      sx={{ width: '45%' }}
                      label="Second name"></TextField>
                  </Box>
                  <Box className={styles.fieldItem}>
                    <Typography> Login</Typography>
                    <TextField sx={{ width: '45%' }} label="Login"></TextField>
                  </Box>
                  <Box className={styles.fieldItem}>
                    <Typography>E-mail</Typography>
                    <TextField sx={{ width: '45%' }} label="E-mail"></TextField>
                  </Box>
                  <Box className={styles.fieldItem}>
                    <Typography>Phone</Typography>
                    <TextField sx={{ width: '45%' }} label="Phone"></TextField>
                  </Box>
                  <Box
                    className={styles.fieldItem}
                    sx={{ marginBottom: '2.8rem' }}>
                    <Typography>Password</Typography>
                    <ButtonModal
                      color="secondary"
                      variant="contained"
                      label="CHANGE">
                      <form>
                        <Grid
                          container
                          gap={'1.5rem'}
                          justifyContent={'center'}>
                          <TextField label="Old password" name="old_password" />
                          <TextField label="New password" name="password" />
                          <Button
                            color="secondary"
                            variant="contained"
                            type="submit">
                            CHANGE AVATAR
                          </Button>
                        </Grid>
                      </form>
                    </ButtonModal>
                  </Box>
                  <Button type="submit" variant="contained" color="primary">
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
