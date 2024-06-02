import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.scss'
import { ThemeProvider } from '@mui/material'
import { theme } from './mui-workplace-preset'
import CssBaseline from '@mui/material/CssBaseline'
import { createEmotionCache } from './entry-server.utils'
import { CacheProvider } from '@emotion/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes'
import store from './store/index'
import { Provider } from 'react-redux'

const cache = createEmotionCache()
const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
)
