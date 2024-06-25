import basicInstance from './basicInstance'

export type Data = {
  name: string | undefined
  score: number
  seconds: number
  user_id: number | undefined
}

export type LeaderboardData = {
  data: Data
  ratingFieldName: string
  teamName: string
}

export type Options = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const leaderboardPost = async (
  data: LeaderboardData
): Promise<unknown> => {
  return basicInstance.post(`/leaderboard`, { data })
}

export const getLeaderboard = async (
  teamname: string,
  cursor: number,
  limit: number
): Promise<unknown> => {
  const data: Options = {
    ratingFieldName: 'score',
    cursor: cursor,
    limit: limit,
  }

  return basicInstance.post(`/leaderboard/${teamname}`, {
    data,
  })
}
