import React, { useState } from 'react'
import './Signup.scss'
// Material UI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export const Signup: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true)

  const handlePasswordVisibility = () => {
    setPasswordVisibility(prevState => !prevState)
  }

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Join Bootcampr today.
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        Get the experience. Get the job.
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel htmlFor='first-name'>First name</InputLabel>
            <TextField
              id='first-name'
              variant='outlined'
              name='firstName'
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor='last-name'>Last name</InputLabel>
            <TextField
              id='last-name'
              variant='outlined'
              name='lastName'
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor='email'>
              Email address (ex. jeanine@bootcampr.io)
            </InputLabel>
            <TextField
              id='email'
              variant='outlined'
              name='email'
              type='email'
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor='password'>
              Password (Min 8 characters, 1 upper, 1 lower, 1 symbol)
            </InputLabel>
            <TextField
              id='password'
              variant='outlined'
              name='password'
              type='password'
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handlePasswordVisibility}>
                      {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor='reenter-password'>
              Re-enter password
            </InputLabel>
            <TextField
              id='reenter-password'
              variant='outlined'
              name='reenterPassword'
              type='password'
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handlePasswordVisibility}>
                      {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox />}
              label='I agree to receive email notification(s). We will only send 
emails with important information, like project start dates. 
We will not sell your information!'
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
