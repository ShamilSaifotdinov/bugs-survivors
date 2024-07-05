import { Emoji, ForumData, TopicData } from '../../../pages/Forum/constants'
import { localInstance } from '../basicInstance'
import {
  CreateCommentData,
  CreateCommentReplyData,
  CreateTopicData,
  IdType,
  TopicInfoType,
  topicsAmount,
  UpdateEmoji,
} from './types'

export const getTopicsAmount = async (): Promise<topicsAmount> => {
  return localInstance.get(`/forum`)
}

export const getTopics = async (data: {
  offset: number
  limit: number
}): Promise<ForumData[]> => {
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
): Promise<TopicData[]> => {
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
): Promise<TopicData[]> => {
  return localInstance.get(`/comment/${commentId}`, { data })
}

export const createCommentReply = async (
  data: CreateCommentReplyData
): Promise<IdType> => {
  return localInstance.post('/comment/reply', { data })
}

export const updateEmoji = async (
  commentId: number,
  data: UpdateEmoji
): Promise<Emoji[] | []> => {
  return localInstance.put(`/comment/${commentId}/emoji`, { data })
}
