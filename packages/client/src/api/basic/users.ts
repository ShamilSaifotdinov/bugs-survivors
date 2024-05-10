import basicInstance from './basicInstance'
import { User } from './types'

type ChangeUserProfileData = Partial<Omit<User, 'id' | 'avatar'>>

export type ChangeUserPasswordData = {
  oldPassword: string
  newPassword: string
}

type GetUserByLoginData = {
  login: string
}

export const changeUserProfile = async (
  data: ChangeUserProfileData
): Promise<User> => {
  return basicInstance.put(`/user/profile`, { data })
}

export const changeUserAvatar = async (data: FormData): Promise<User> => {
  return basicInstance.put(`/user/profile/avatar`, { data })
}

export const changeUserPassword = async (
  data: ChangeUserPasswordData
): Promise<unknown> => {
  return basicInstance.put(`/user/password`, { data })
}

export const getUserByLogin = async (
  data: GetUserByLoginData
): Promise<User[]> => {
  return basicInstance.post(`/user/search`, { data })
}
