export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}
export type Message = {
  chat_id: number
  content: string
  file: string | null
  id: number
  is_read: true
  time: string
  type: string
  user_id: number
}
