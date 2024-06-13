import { MongoClient, Db } from 'mongodb'

const { HOST, MONGO_PORT } = process.env

const url = `mongodb://${HOST}:${MONGO_PORT}`
const client = new MongoClient(url)

export const connectMongo = async (): Promise<Db | null> => {
  try {
    await client.connect()
    return client.db('bugsSurvivors')
  } catch (e) {
    console.error(e)
  }

  return null
}
