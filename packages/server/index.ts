import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config()

import { createClientAndConnect } from './db'

async function createServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  const db = await createClientAndConnect()

  app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  async function getPostgres() {
    const time = await db?.query('SELECT NOW()')
    return time?.rows
  }

  app.get('/testUsers', async (_, res) => {
    const postgresData = await getPostgres()

    res.json({ postgresData })
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

createServer()
