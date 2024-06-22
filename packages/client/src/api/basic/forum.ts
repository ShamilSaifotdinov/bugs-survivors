import {
  ForumSubjectData,
  ForumTopicData,
} from '../../pages/Forum/components/constants'
import { localInstance } from './basicInstance'
import { User } from './types'

type topicsAmount = {
  count: number
}

type IdType = {
  id: number
}

type TopicInfoType = {
  name: string
  comments_count: number
}

type CreateTopicData = {
  name: string
  creator: Partial<User>
}

type CreateCommentData = {
  topicId: number
  content: string
  creator: Partial<User>
}

export type CreateCommentReplyData = {
  commentId: number
  content: string
  creator: Partial<User>
  replyId?: number
}

export const getTopicsAmount = async (): Promise<topicsAmount> => {
  return localInstance.get(`/forum`)
}

export const getTopics = async (
  offset: number,
  limit: number
): Promise<ForumSubjectData[]> => {
  return localInstance.get(`/forum/topics?offset=${offset}&limit=${limit}`)
}

export const createTopic = async (data: CreateTopicData): Promise<IdType> => {
  return localInstance.post('/topic', { data })
}

export const getTopicInfo = async (topicId: number): Promise<TopicInfoType> => {
  return localInstance.get(`/topic/${topicId}`)
}

export const getTopicComments = async (
  topicId: number,
  offset: number,
  limit: number
): Promise<ForumTopicData[]> => {
  return localInstance.get(
    `/topic/${topicId}/comments?offset=${offset}&limit=${limit}`
  )
}

export const createComment = async (
  data: CreateCommentData
): Promise<IdType> => {
  return localInstance.post('/comment', { data })
}

export const getCommentReplies = async (
  commentId: number,
  offset: number,
  limit: number,
  replyId?: number
): Promise<ForumTopicData[]> => {
  return localInstance.get(
    `/comment/${commentId}?offset=${offset}&limit=${limit}${
      replyId ? `&replyId=${replyId}` : ''
    }`
  )
}

export const createCommentReply = async (
  data: CreateCommentReplyData
): Promise<IdType> => {
  return localInstance.post('/comment/reply', { data })
}
