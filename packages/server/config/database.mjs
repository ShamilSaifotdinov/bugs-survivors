const {
  POSTGRES_EXTERNAL_HOST,
  POSTGRES_INTERNAL_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

export default {
  development: {
    host: POSTGRES_EXTERNAL_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    dialect: 'postgres',
    seederStorage: "sequelize",
  },
  production: {
    host: POSTGRES_INTERNAL_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    dialect: 'postgres',
    seederStorage: "sequelize",
  }
}
