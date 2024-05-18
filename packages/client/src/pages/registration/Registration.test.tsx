import { MemoryRouter } from 'react-router-dom'
import Page from './RegisterPage'
import { render, screen, fireEvent } from '@testing-library/react'

const renderWithRouter = (component: JSX.Element) => {
  return {
    ...render(<MemoryRouter>{component}</MemoryRouter>),
  }
}

beforeEach(() => {
  renderWithRouter(<Page />)
})

test('renders the registration form with all fields and submit button', () => {
  expect(screen.getByLabelText(/First name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Second name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Login/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /SIGN IN/i })).toBeInTheDocument()
})

test('allows the user to fill out the form', () => {
  fireEvent.change(screen.getByLabelText(/First name/i), {
    target: { value: 'Jason' },
  })
  fireEvent.change(screen.getByLabelText(/Second name/i), {
    target: { value: 'Statham' },
  })
  fireEvent.change(screen.getByLabelText(/E-mail/i), {
    target: { value: 'john@example.com' },
  })
  fireEvent.change(screen.getByLabelText(/Phone/i), {
    target: { value: '+7943453632' },
  })
  fireEvent.change(screen.getByLabelText(/Login/i), {
    target: { value: 'john_doe' },
  })
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'Password123' },
  })

  expect(screen.getByLabelText<HTMLInputElement>(/First name/i).value).toBe(
    'Jason'
  )
  expect(screen.getByLabelText<HTMLInputElement>(/Second name/i).value).toBe(
    'Statham'
  )
  expect(screen.getByLabelText<HTMLInputElement>(/E-mail/i).value).toBe(
    'john@example.com'
  )
  expect(screen.getByLabelText<HTMLInputElement>(/Phone/i).value).toBe(
    '+7943453632'
  )
  expect(screen.getByLabelText<HTMLInputElement>(/Login/i).value).toBe(
    'john_doe'
  )
  expect(screen.getByLabelText<HTMLInputElement>(/Password/i).value).toBe(
    'Password123'
  )
})

describe('Validation checks', () => {
  test.skip('displays error when fields are empty and submit button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /SIGN IN/i }))

    expect(screen.getByText(/all fields are required/i)).toBeInTheDocument()
  })

  test.skip('submits the form when all fields are filled out', () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'john_doe' },
    })
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: 'john@example.com' },
    })

    fireEvent.click(screen.getByRole('button', { name: /SIGN IN/i }))

    expect(
      screen.queryByText(/all fields are required/i)
    ).not.toBeInTheDocument()
  })
})
