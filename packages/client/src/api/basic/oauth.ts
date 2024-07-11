import { CLIENT_HOST } from '../../constants'
import basicInstance from './basicInstance'

export const yandexOauth = async (code: string): Promise<unknown> => {
  return basicInstance.post(`/oauth/yandex`, {
    data: { code, redirect_uri: CLIENT_HOST },
  })
}

export const yandexServiceId = async (): Promise<{ service_id: string }> => {
  return basicInstance.get(
    `/oauth/yandex/service-id?redirect_uri=${CLIENT_HOST}`
  )
}
