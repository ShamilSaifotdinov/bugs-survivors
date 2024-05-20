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
  test('Check successful submit form', () => {
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
      target: { value: '+74834343435' },
    })
    fireEvent.change(screen.getByLabelText(/Login/i), {
      target: { value: 'john' },
    })
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    })

    expect(
      screen.getByLabelText(/Capitalized and no shorter than 2 chars!/i)
    ).not.toBeInTheDocument()
    expect(
      screen.getByLabelText(/8 to 40 chars, without space and spec chars/i)
    ).not.toBeInTheDocument()
    expect(
      screen.getByLabelText(/8 to 40 chars: cap letter, spec char and number/i)
    ).not.toBeInTheDocument()
    expect(
      screen.getByLabelText(/Enter correct e-mail/i)
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText(/10 to 15 numbers/i)).not.toBeInTheDocument()
  })

  test('Check First Name error message', () => {
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: 'j' },
    })

    expect(
      screen.getByLabelText(/Capitalized and no shorter than 2 chars!/i)
    ).toBeInTheDocument()
  })
  test('Check Second Name error message', () => {
    fireEvent.change(screen.getByLabelText(/Second name/i), {
      target: { value: 's' },
    })

    expect(
      screen.getByLabelText(/Capitalized and no shorter than 2 chars!/i)
    ).toBeInTheDocument()
  })
  test('Check E-mail error message', () => {
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: 'john.com' },
    })

    expect(screen.getByLabelText(/Enter correct e-mail/i)).toBeInTheDocument()
  })
  test('Check Phone error message', () => {
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: '74834343435' },
    })

    expect(screen.getByLabelText(/10 to 15 numbers/i)).toBeInTheDocument()
  })
  test('Check Login error message', () => {
    fireEvent.change(screen.getByLabelText(/Login/i), {
      target: { value: 'jj' },
    })

    expect(
      screen.getByLabelText(/8 to 40 chars, without space and spec chars/i)
    ).toBeInTheDocument()
  })
  test('Check Password error message', () => {
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    })

    expect(
      screen.getByLabelText(/8 to 40 chars: cap letter, spec char and number/i)
    ).toBeInTheDocument()
  })
})
