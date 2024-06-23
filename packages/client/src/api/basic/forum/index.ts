import {
  ForumSubjectData,
  ForumTopicData,
} from '../../../pages/Forum/components/constants'
import { localInstance } from '../basicInstance'
import {
  CreateCommentData,
  CreateCommentReplyData,
  CreateTopicData,
  IdType,
  TopicInfoType,
  topicsAmount,
} from './types'

export const getTopicsAmount = async (): Promise<topicsAmount> => {
  return localInstance.get(`/forum`)
}

export const getTopics = async (data: {
  offset: number
  limit: number
}): Promise<ForumSubjectData[]> => {
  return localInstance.get(`/forum/topics`, { data })
}

export const createTopic = async (data: CreateTopicData): Promise<IdType> => {
  return localInstance.post('/topic', { data })
}

export const getTopicInfo = async (topicId: number): Promise<TopicInfoType> => {
  return localInstance.get(`/topic/${topicId}`)
}

export const getTopicComments = async (
  topicId: number,
  data: {
    offset: number
    limit: number
  }
): Promise<ForumTopicData[]> => {
  return localInstance.get(`/topic/${topicId}/comments`, { data })
}

export const createComment = async (
  data: CreateCommentData
): Promise<IdType> => {
  return localInstance.post('/comment', { data })
}

export const getCommentReplies = async (
  commentId: number,
  data: {
    offset: number
    limit: number
    replyId?: number
  }
): Promise<ForumTopicData[]> => {
  return localInstance.get(`/comment/${commentId}`, { data })
}

export const createCommentReply = async (
  data: CreateCommentReplyData
): Promise<IdType> => {
  return localInstance.post('/comment/reply', { data })
}
