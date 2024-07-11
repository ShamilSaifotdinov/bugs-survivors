import { NextFunction, Request, Response } from 'express'
import http from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'

const yandexURL = 'https://ya-praktikum.tech'

class YandexAPI {
  public static proxy = createProxyMiddleware({
    target: yandexURL,
    changeOrigin: true,
    cookieDomainRewrite: process.env.DOMAIN,
    pathRewrite: { '^/api/v2/ya': '/api/v2' },
  })

  public static get_user = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const cookie = req.headers.cookie

    if (!cookie) {
      return res.status(401).json({ reason: 'Cookie is not valid' })
    }

    const options = {
      host: 'ya-praktikum.tech',
      path: '/api/v2/auth/user',
      headers: { Cookie: cookie },
    }

    const httpreq = http.get(options, function (response) {
      response.setEncoding('utf8')

      let data = ''
      response.on('data', function (chunk) {
        data = chunk
      })

      response.on('end', function () {
        try {
          const parsedData = JSON.parse(data)

          if (response.statusCode == 200) {
            req.body._user = parsedData
            next()
          } else {
            throw new Error(parsedData.reason)
          }
        } catch (e) {
          console.error((e as Error).message)
          res.status(400).json({ reason: (e as Error).message })
        }
      })

      req.on('error', e => {
        console.error(e.message)
        res.status(400).json({ reason: e.message })
      })
    })

    return httpreq.end()
  }
}

export default YandexAPI
