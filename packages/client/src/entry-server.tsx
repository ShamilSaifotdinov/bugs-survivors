import ReactDOM from 'react-dom/server'
import { Helmet } from 'react-helmet'

import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { fetchUser } from './store/slices/userSlice'
import { reducer } from './store'

import {
  createContext,
  createEmotionCache,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import { theme } from './mui-workplace-preset'
import routes from './routes'
import { setPageHasBeenInitializedOnServer } from './store/slices/ssrSlice'
import { matchRoutes } from 'react-router-dom'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })
  await store.dispatch(fetchUser())

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes

  try {
    console.log(routes, url, foundRoutes, fetchData)
    if (fetchData) {
      await fetchData({
        dispatch: store.dispatch,
        state: store.getState(),
        ctx: createContext(req),
      })
    }
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const cache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache)

  const router = createStaticRouter(dataRoutes, context)

  const html = ReactDOM.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <StaticRouterProvider router={router} context={context} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )

  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)

  const helmet = Helmet.renderStatic()

  return { html, emotionCss, helmet, initialState: store.getState() }
}
