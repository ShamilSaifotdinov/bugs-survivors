import { Client } from 'pg'

const { HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const client = new Client({
  user: POSTGRES_USER,
  host: HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
})

export const connectPostgres = async (): Promise<Client | null> => {
  try {
    await client.connect()

    return client
  } catch (e) {
    console.error(e)
  }

  return null
}
