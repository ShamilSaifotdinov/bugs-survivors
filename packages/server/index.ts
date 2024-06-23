import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config()

import { dbConnect } from './db'
import router from './src/router'

const port = Number(process.env.SERVER_PORT) || 3001

async function createServer() {
  const app = express()

  app.use(cors()).use(express.json())

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.use('/api/v2', router)

  await dbConnect()

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

createServer()
