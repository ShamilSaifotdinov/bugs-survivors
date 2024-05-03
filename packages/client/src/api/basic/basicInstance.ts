import fetchApi from '../../services/request'

export const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources'

export const basicInstance = fetchApi('https://ya-praktikum.tech/api/v2')
export const gameInstance = fetchApi('https://ya-praktikum.tech/game/api/v2')

export default basicInstance
