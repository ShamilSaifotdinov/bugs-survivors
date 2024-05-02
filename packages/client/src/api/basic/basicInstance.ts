import axios from 'axios'

export const basicInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
})

export const gameInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/game/api/v2',
})

export default basicInstance
