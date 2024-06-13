import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
dotenv.config({ path: '../../.env' })

import { connectPostgres } from './postgres'
import { connectMongo } from './mongo'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

async function getAllUsersPostgres() {
  const db = await connectPostgres()
  const users = await db?.query('SELECT * FROM users')
  return users
}
async function getAllUsersMongo() {
  const db = await connectMongo()
  const users = await db?.collection('users').find({}).toArray()
  return users
}

app.get('/testUsers', async (_, res) => {
  const usersPostgres = await getAllUsersPostgres()
  const usersMongo = await getAllUsersMongo()

  res.json({ usersPostgres: usersPostgres, usersMongo: usersMongo })
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
