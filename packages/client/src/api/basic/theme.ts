import { localInstance } from './basicInstance'

export type ThemeGetData = {
  theme: string
}

export type ThemePostData = {
  theme: string
}

export const setTheme = async (data: ThemePostData): Promise<ThemePostData> => {
  return localInstance.put(`/theme`, { data })
}

export const getTheme = async (): Promise<ThemeGetData> => {
  return localInstance.get(`/theme`)
}
