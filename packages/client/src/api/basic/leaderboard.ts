import { gameInstance } from './basicInstance'
import { User } from './types'

export type ChangeUserPasswordData = {
  oldPassword: string
  newPassword: string
}

type GetUserByLoginData = {
  login: string
}

// POST
// /leaderboard
// Add user to leaderboard

// POST
// /leaderboard/all
// Get all leaderboard

// POST
// /leaderboard/{teamName}
// Get team leaderboard

type LeaderboardRequest = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const addUserToLeaderboard = async (data: User): Promise<User> => {
  return gameInstance.post(`/leaderboard`, { data })
}

export const getLeaderboard = async (
  data: LeaderboardRequest
): Promise<User> => {
  return gameInstance.post(`/leaderboard/all`, { data })
}

export const getTeamLeaderboard = async (
  teamName: string,
  data: LeaderboardRequest
): Promise<unknown> => {
  return gameInstance.post(`/leaderboard${teamName}`, { data })
}
