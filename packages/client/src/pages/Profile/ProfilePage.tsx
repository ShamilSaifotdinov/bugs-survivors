import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  Input,
  Box,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'

function ProfilePage() {
  const [changePass, setChangPass] = useState(true)
  const [loadAvatar, setLoadAvatar] = useState(false)

  // const formData = new FormData()
  const uploadAvatar = () => {
    return
  }
  return (
    <Grid container justifyContent="right" className={styles.profile}>
      <Grid
        item
        xs={12}
        md={4}
        className={styles.gridItem}
        justifyContent={'center'}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={8}>
            <Grid container gap={'3.8rem'} justifyContent={'center'}>
              <Grid item>
                <Button
                  color="secondary"
                  component="label"
                  sx={{
                    backgroundColor: 'white',
                    padding: 0,
                    borderRadius: '50%',
                  }}>
                  <Avatar
                    sx={{ width: '10rem', height: '10rem', opacity: '90%' }}
                  />
                  <Input
                    onChange={uploadAvatar}
                    sx={{ display: 'none' }}
                    type="file"
                  />
                </Button>
              </Grid>
              <form className={styles.form}>
                <Grid container gap="1rem" justifyContent={'center'}>
                  <Box
                    width={'100%'}
                    display="flex"
                    gap={'1rem'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Typography>First name</Typography>
                    <TextField
                      sx={{ width: '45%' }}
                      label="First name"></TextField>
                  </Box>
                  <Box
                    width={'100%'}
                    display="flex"
                    gap={'1rem'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Typography>Second name</Typography>
                    <TextField
                      sx={{ width: '45%' }}
                      label="Second name"></TextField>
                  </Box>
                  <Box
                    width={'100%'}
                    display="flex"
                    gap={'1rem'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Typography> Login</Typography>
                    <TextField sx={{ width: '45%' }} label="Login"></TextField>
                  </Box>
                  <Box
                    width={'100%'}
                    display="flex"
                    gap={'1rem'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Typography>E-mail</Typography>
                    <TextField sx={{ width: '45%' }} label="E-mail"></TextField>
                  </Box>
                  <Box
                    width={'100%'}
                    display="flex"
                    gap={'1rem'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Typography>Phone</Typography>
                    <TextField sx={{ width: '45%' }} label="Phone"></TextField>
                  </Box>
                  {changePass ? (
                    <Box
                      width={'100%'}
                      display="flex"
                      gap={'1rem'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      sx={{ marginBottom: '2.8rem' }}>
                      <Typography>Password</Typography>
                      <Button
                        onClick={() => {
                          setChangPass(!changePass)
                        }}
                        variant="contained"
                        color="secondary">
                        CHANGE
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      className={styles.containerInputPass}
                      sx={{ marginBottom: '2.8rem' }}>
                      <TextField
                        sx={{ width: '45%' }}
                        label="Old password"></TextField>
                      <TextField
                        sx={{ width: '45%' }}
                        label="New password"></TextField>
                      <button
                        className={styles.buttonClose}
                        onClick={() => setChangPass(true)}
                        type="button">
                        X
                      </button>
                    </Box>
                  )}

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
