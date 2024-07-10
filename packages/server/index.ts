import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config()

import { dbConnect } from './db'
import router from './src/router'
import YandexAPI from './src/api/ya'

import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'

const port = Number(process.env.SERVER_PORT) || 3002

async function createServer() {
  const app = express()

  app.use(cors())

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.all('/api/v2/ya/*', YandexAPI.proxy)

  const file = fs.readFileSync('./swagger.yaml', 'utf8')
  const swaggerDocument = YAML.parse(file)

  // @ts-ignore
  app.use('/api/v2/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  app.use('/api/v2', express.json(), YandexAPI.get_user, router)

  await dbConnect()

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

createServer()
