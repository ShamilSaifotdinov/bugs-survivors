import ReactDOM from 'react-dom/server'

import { Request as ExpressRequest } from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import { createEmotionCache, createFetchRequest } from './entry-server.utils'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import { theme } from './mui-workplace-preset'
import routes from './routes'

export const render = async (req: ExpressRequest) => {
  // 1.
  const { query, dataRoutes } = createStaticHandler(routes)
  // 2.
  const fetchRequest = createFetchRequest(req)
  // 3.
  const context = await query(fetchRequest)

  // 4.
  if (context instanceof Response) {
    throw context
  }

  const cache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache)

  // 6.
  const router = createStaticRouter(dataRoutes, context)

  const html = ReactDOM.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StaticRouterProvider router={router} context={context} />
      </ThemeProvider>
    </CacheProvider>
  )

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)

  return { html, emotionCss }
}
