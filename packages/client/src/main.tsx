import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.scss'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './mui-workplace-preset'
import { createEmotionCache } from './entry-server.utils'
import { CacheProvider } from '@emotion/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes'
import store from './store/index'
import { Provider } from 'react-redux'

const cache = createEmotionCache()
const router = createBrowserRouter(routes)

const App = () => {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
