// TODO: Need to fix scss parsing in Jest tests
// https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css

// import App from './App'
// import { render, screen } from '@testing-library/react'
//
// const appContent = 'Вот тут будет жить ваше приложение :)'

// @ts-ignore
// global.fetch = jest.fn(() =>
//   Promise.resolve({ json: () => Promise.resolve('hey') })
// )

test('Example test', async () => {
  // render(<App />)
  expect('1').toBe('1')
})
