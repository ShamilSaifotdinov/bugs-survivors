import { Button, Grid, TextField, Typography, Box } from '@mui/material'
import React, { useState, useEffect, useCallback } from 'react'
import styles from './styles.module.scss'
import AvatarLoad from '../../components/AvatarLoad/AvatarLoad'

const BASE_URL = 'https://ya-praktikum.tech/api/v2'

function ProfilePage() {
  const [changePass, setChangPass] = useState(true)
  const [loadAvatar, setLoadAvatar] = useState(false)

  const handleSubmit = () => {
    return
  }

  return (
    <Grid container className={styles.profile}>
      <Grid item xs={12} md={6} xl={4} className={styles.gridItem}>
        <Grid container justifyContent={'center'}>
          <Grid item xs={8}>
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
                  {changePass ? (
                    <Box
                      className={styles.fieldItem}
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
