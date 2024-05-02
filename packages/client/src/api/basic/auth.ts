import basicInstance from './basicInstance'
import { User } from './types'

export type SignUpData = {
  first_name: string
  second_name: string
  // display_name: string;
  login: string
  email: string
  phone: string
  password: string
}

export type SignInData = {
  login: string
  password: string
}

export const signUp = async (data: SignUpData): Promise<unknown> => {
  return basicInstance.post(`/auth/signup`, { data })
}

export const signIn = async (data: SignInData): Promise<unknown> => {
  return basicInstance.post(`/auth/signin`, { data })
}

export const getUserInfo = async (): Promise<User> => {
  return basicInstance.get(`/auth/user`)
}

export const logOut = async (): Promise<unknown> => {
  return basicInstance.post(`/auth/logout`)
}
