import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config()

import { dbConnect } from './db'
import router from './src/router'

async function createServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  const db = await dbConnect()

  app.get('/api/v2/test', async (_, res) => {
    const postgresData = await db?.query('SELECT NOW()')

    res.json({ postgresData })
  })

  app.use('/api/v2', router)
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

createServer()
