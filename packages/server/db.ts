import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const {
  POSTGRES_EXTERNAL_HOST,
  POSTGRES_INTERNAL_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

const isDev = process.env.NODE_ENV === 'development'

const sequelizeOptions: SequelizeOptions = {
  host: isDev ? POSTGRES_EXTERNAL_HOST : POSTGRES_INTERNAL_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  dialect: 'postgres',
  models: [__dirname + '/src/models'],
}

const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    console.log('DB connection has been established successfully.')

    const res = await sequelize.query('SELECT NOW()')
    // @ts-ignore
    console.log('  ➜ 🎸 Connected to the database at:', res[0][0].now)
    await sequelize.sync()

    return sequelize
  } catch (error) {
    console.log(error)

    return null
  }
}
