import { fireEvent, render, screen } from '@testing-library/react'
import { Signup } from '../screens/Signup/Signup'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

describe('Signup Component', () => {
  test('renders the signup screen', () => {
    render(<Signup />)

    const formLabels = [
      'First name',
      'Last name',
      'Email address (ex. jeanine@bootcampr.io)',
      'Password (Min 8 characters, 1 upper, 1 lower, 1 symbol)',
      'Re-enter password',
      'I agree to receive email notification(s). We will only send emails with important information, like project start dates. We will not sell your information!',
      'Sign up',
    ]

    formLabels.forEach(label => {
      const field = screen.getByLabelText(label)
      expect(field).toBeInTheDocument()
    })
  })

  test('submits a populated signup form', () => {
    const onSubmit = jest.fn()

    render(<Signup />)

    const changeInputValue = (label: string, value: string) => {
      const inputField = screen.getByLabelText(label)
      fireEvent.change(inputField, { target: { value } })
    }

    changeInputValue('First name', 'Jeanine')
    changeInputValue('Last name', 'Smith')
    changeInputValue(
      'Email address (ex. jeanine@bootcampr.io)',
      'jeanine@bootcampr.io'
    )
    changeInputValue(
      'Password (Min 8 characters, 1 upper, 1 lower, 1 symbol)',
      'Password123!@#'
    )
    changeInputValue('Re-enter password', 'Password123!@#')

    const checkboxField = screen.getByLabelText(
      'I agree to receive email notification(s). We will only send emails with important information, like project start dates. We will not sell your information!'
    )
    fireEvent.click(checkboxField)

    const submitButton = screen.getByRole('button', { name: 'Sign up' })
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'Jeanine',
      lastName: 'Smith',
      email: 'jeanine@bootcampr.io',
      password: 'Password123!@#',
      reenterPassword: 'Password123!@#',
      emailNotification: true,
    })
  })
})
