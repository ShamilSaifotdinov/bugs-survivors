import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config()

import { dbConnect } from './db'
import router from './src/router'
import YandexAPI from './src/api/ya'

const port = Number(process.env.SERVER_PORT) || 3002

async function createServer() {
  const app = express()

  app.use(cors())

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.all('/api/v2/ya/*', YandexAPI.proxy)
  app.use('/api/v2', express.json(), YandexAPI.get_user, router)

  await dbConnect()

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

createServer()
