import basicInstance from './basicInstance'

export type yandexOauthData = {
  code: string
  redirect_uri: string
}

export const yandexOauth = async (data: yandexOauthData): Promise<unknown> => {
  return basicInstance.post(`/oauth/yandex`, { data })
}

export const yandexServiceId = async (): Promise<{ service_id: string }> => {
  return basicInstance.get(
    `/oauth/yandex/service-id?redirect_uri=http://localhost:3000`
  )
}
