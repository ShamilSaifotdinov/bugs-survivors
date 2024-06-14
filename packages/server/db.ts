import { Client, Pool } from 'pg'

const {
  POSTGRES_EXTERNAL_HOST,
  POSTGRES_INTERNAL_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

const isDev = process.env.NODE_ENV === 'development'

const config = {
  user: POSTGRES_USER,
  host: isDev ? POSTGRES_EXTERNAL_HOST : POSTGRES_INTERNAL_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
}

export const createClientAndConnect = async (): Promise<Pool | null> => {
  try {
    const client = new Client(config)

    await client.connect()

    const res = await client.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
    client.end()

    const pool = new Pool(config)

    return pool
  } catch (e) {
    console.error(e)
  }

  return null
}
