import './client.d'

export const SERVER_HOST =
  typeof window === 'undefined'
    ? __INTERNAL_SERVER_URL__
    : __EXTERNAL_SERVER_URL__

export const LOCAL_API = '/api/v2'
export const YA_API = 'https://ya-praktikum.tech/api/v2'
export const YA_GAME_API = 'https://ya-praktikum.tech/game/api/v2'
export const RESOURCES_URL = `${YA_API}/resources`
