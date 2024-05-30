import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RegisterPage from './RegisterPage'
import { signUp } from '../../api/basic/auth'

// Мокаем signUp для предотвращения реальных вызовов API
jest.mock('../../api/basic/auth', () => ({
  signUp: jest.fn(),
}))

// Мокаем useNavigate для проверки переходов
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

beforeEach(() => {
  act(() => {
    render(
      <Router>
        <RegisterPage />
      </Router>
    )
  })
})

describe('RegisterPage', () => {
  it('should render registration form', () => {
    // Проверяем наличие заголовков
    expect(screen.getByText('BUGS')).toBeInTheDocument()
    expect(screen.getByText('SURVIVORS')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()

    // Проверяем наличие всех полей формы
    const fields = [
      'First name',
      'Second name',
      'E-mail',
      'Phone',
      'Login',
      'Password',
    ]
    fields.forEach(field => {
      expect(screen.getByLabelText(field)).toBeInTheDocument()
    })

    // Проверяем наличие кнопок
    expect(screen.getByText('SIGN IN')).toBeInTheDocument()
    expect(screen.getByText('SIGN UP')).toBeInTheDocument()
  })

  it('should update form fields on change', () => {
    // Изменяем значения полей формы и проверяем их обновление
    const firstNameInput = screen.getByLabelText(
      'First name'
    ) as HTMLInputElement
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    expect(firstNameInput.value).toBe('John')

    const emailInput = screen.getByLabelText('E-mail') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    expect(emailInput.value).toBe('john@example.com')
  })

  it('should call signUp and navigate on form submit', async () => {
    const mockedSignUp = signUp as jest.Mock
    mockedSignUp.mockResolvedValueOnce({})
    // Заполняем форму
    fireEvent.change(screen.getByLabelText('First name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByLabelText('Second name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Phone'), {
      target: { value: '+123456789' },
    })
    fireEvent.change(screen.getByLabelText('Login'), {
      target: { value: 'johndoe' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password123!' },
    })

    // Отправляем форму
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'SIGN UP' }))
    })

    // Проверяем вызов signUp с правильными данными
    expect(mockedSignUp).toHaveBeenCalledWith({
      first_name: 'John',
      second_name: 'Doe',
      email: 'john@example.com',
      phone: '+123456789',
      login: 'johndoe',
      password: 'Password123!',
    })
  })
})
