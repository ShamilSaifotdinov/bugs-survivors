import './client.d'

const isDev = __NODE_ENV__ === 'development'

export const CLIENT_HOST = isDev
  ? `http://localhost:${__CLIENT_PORT__}`
  : `https://${__DOMAIN__}`

export const SERVER_HOST =
  typeof window === 'undefined' && !isDev
    ? __INTERNAL_SERVER_URL__
    : __EXTERNAL_SERVER_URL__

export const LOCAL_API =
  typeof window === 'undefined' ? SERVER_HOST + '/api/v2' : '/api/v2'
export const YA_API = LOCAL_API + '/ya'
export const YA_GAME_API = 'https://ya-praktikum.tech/game/api/v2'
export const RESOURCES_URL = `${YA_API}/resources`
