import { render, screen } from '@testing-library/react'
import { Signup } from '../screens/Signup/Signup'

describe('Signup Component', () => {
  test('renders the signup screen', () => {
    render(<Signup />)

    const firstNameField = screen.getByLabelText('First name')
    expect(firstNameField).toBeInTheDocument()

    const lastNameField = screen.getByLabelText('Last name')
    expect(lastNameField).toBeInTheDocument()

    const emailField = screen.getByLabelText(
      'Email address (ex. jeanine@bootcampr.io)'
    )
    expect(emailField).toBeInTheDocument()

    const passwordField = screen.getByLabelText(
      'Password (Min 8 characters, 1 upper, 1 lower, 1 symbol)'
    )
    expect(passwordField).toBeInTheDocument()

    const reenterPasswordField = screen.getByLabelText('Re-enter password')
    expect(reenterPasswordField).toBeInTheDocument()

    const checkboxField = screen.getByLabelText(
      'I agree to receive email notification(s). We will only send emails with important information, like project start dates. We will not sell your information!'
    )
    expect(checkboxField).toBeInTheDocument()

    const submitButton = screen.getByRole('button', { name: 'Sign up' })
    expect(submitButton).toBeInTheDocument()
  })
})
