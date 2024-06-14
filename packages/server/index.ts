import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config({ path: '../../.env' })

import { connectPostgres } from './postgres'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

async function getPostgres() {
  const db = await connectPostgres()
  const time = await db?.query('SELECT NOW()')
  return time
}

app.get('/testUsers', async (_, res) => {
  const postgresData = await getPostgres()

  res.json({ postgresData })
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
