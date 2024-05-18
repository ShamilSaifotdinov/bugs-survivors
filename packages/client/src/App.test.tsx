import App from './App'
import { render } from '@testing-library/react'

test('Should render root app in document', () => {
  render(<App />)
})
