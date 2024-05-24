import App from './App'
import { render, screen } from '@testing-library/react'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)
jest.mock('react-redux')
test('Example test', async () => {
  render(<App />)
  expect(screen.getByText('Sign In')).toBeDefined()
})
