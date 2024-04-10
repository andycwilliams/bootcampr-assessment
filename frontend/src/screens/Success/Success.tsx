import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import './Success.scss'

export const Success: React.FC = () => {
  const navigate = useNavigate()
  const handleSignUpButton = () => {
    navigate('/')
  }
  return (
    <div className='success-container'>
      <div className='header-container'>
        <div className='header-grid'>
          <h1>Congrats on making it to the end!</h1>
          <p>You have successfully signed up.</p>
          <Button onClick={handleSignUpButton} variant='contained'>
            Return home
          </Button>
        </div>
      </div>
    </div>
  )
}
