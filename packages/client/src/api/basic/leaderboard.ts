import basicInstance from './basicInstance'

export type LeaderboardPostData = {
  name: string | undefined
  score: number
  seconds: number
  user_avatar: string | null | undefined
}

export type LeaderboardUserData = {
  data: LeaderboardPostData
  ratingFieldName: string
  teamName: string
}

export type Options = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const leaderboardPost = async (
  data: LeaderboardUserData
): Promise<LeaderboardPostData> => {
  return basicInstance.post(`/leaderboard`, { data })
}

export const getLeaderboard = async (
  teamname: string,
  cursor: number,
  limit: number
): Promise<LeaderboardUserData[]> => {
  const data: Options = {
    ratingFieldName: 'seconds',
    cursor: cursor,
    limit: limit,
  }

  return basicInstance.post(`/leaderboard/${teamname}`, {
    data,
  })
}
