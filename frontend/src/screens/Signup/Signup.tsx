import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.scss'
import Logo from 'assets/Logo.svg'
// Material UI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// Axios Imports
import axios from 'axios'

const SignupHeader = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='h4' gutterBottom>
        Join Bootcampr today.
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        Get the experience. Get the job.
      </Typography>
    </Box>
  )
}

const SignupForm = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true)
  const [doPasswordsMatch, setDoPasswordsMatch] = useState<boolean>(true)
  const [isEmailInDatabase, setIsEmailInDatabase] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    reenterPassword: '',
    emailNotification: false,
  })
  const navigate = useNavigate()

  const handlePasswordVisibility = () => {
    setPasswordVisibility(prevState => !prevState)
  }

  const handleIsEmailInDatabase = async () => {
    if (!formData.email) {
      return
    }

    try {
      const encodedEmail = encodeURIComponent(formData.email)
      const response = await axios.get(
        `http://localhost:8001/users/${encodedEmail}`
      )
      console.log('User with this email was found:', response.data)
      setIsEmailInDatabase(true)
    } catch (error) {
      console.log('User not found')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setIsEmailInDatabase(false)

    if (name === 'reenterPassword') {
      setDoPasswordsMatch(value === formData.password)
    } else if (name === 'password') {
      setDoPasswordsMatch(value === formData.reenterPassword)
    }
  }

  const handleCheckboxChange = e => {
    const { name, checked } = e.target
    setFormData({ ...formData, [name]: checked })
  }

  const handleSubmitForm = async e => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8001/users', formData)
      console.log('User created successfully:', response.data)
      navigate('/success')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        {/* TODO: Update with Figma image */}
        <img src={Logo} alt='Logo' />
      </Grid>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmitForm}>
          <InputLabel htmlFor='first-name'>First name</InputLabel>
          <TextField
            id='first-name'
            variant='outlined'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
          <InputLabel htmlFor='last-name'>Last name</InputLabel>
          <TextField
            id='last-name'
            variant='outlined'
            name='lastName'
            value={formData.lastName}
            onChange={e =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            fullWidth
            required
          />
          <InputLabel htmlFor='email'>
            Email address (ex. jeanine@bootcampr.io)
          </InputLabel>
          <TextField
            id='email'
            variant='outlined'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            onBlur={handleIsEmailInDatabase}
            error={isEmailInDatabase}
            helperText={isEmailInDatabase ? 'Email already in database' : ''}
          />
          <InputLabel htmlFor='password'>
            Password (Min 8 characters, 1 upper, 1 lower, 1 symbol)
          </InputLabel>
          <TextField
            id='password'
            variant='outlined'
            name='password'
            type={passwordVisibility ? 'password' : 'text'}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={!doPasswordsMatch}
            helperText={!doPasswordsMatch ? 'Passwords must match!' : ''}
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
          <InputLabel htmlFor='reenter-password'>Re-enter password</InputLabel>
          <TextField
            id='reenter-password'
            variant='outlined'
            name='reenterPassword'
            type={passwordVisibility ? 'password' : 'text'}
            value={formData.reenterPassword}
            onChange={handleChange}
            fullWidth
            required
            error={!doPasswordsMatch}
            helperText={!doPasswordsMatch ? 'Passwords must match!' : ''}
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
          <FormControlLabel
            control={
              <Checkbox
                name='emailNotification'
                onChange={handleCheckboxChange}
              />
            }
            label='I agree to receive email notification(s). We will only send 
emails with important information, like project start dates. 
We will not sell your information!'
          />
          <Button
            aria-label='Sign up'
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Sign up
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export const Signup: React.FC = () => {
  return (
    <Container>
      <SignupHeader />
      <SignupForm />
    </Container>
  )
}
