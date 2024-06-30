import { LOCAL_API, YA_API, YA_GAME_API } from '../../constants'
import fetchApi from '../../services/request'

export const localInstance = fetchApi(LOCAL_API)
export const basicInstance = fetchApi(YA_API)
export const gameInstance = fetchApi(YA_GAME_API)

export default basicInstance
