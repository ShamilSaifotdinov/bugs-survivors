import { User } from '../types'

export type topicsAmount = {
  count: number
}

export type IdType = {
  id: number
}

export type TopicInfoType = {
  name: string
  comments_count: number
}

export type CreateTopicData = {
  name: string
  creator: Partial<User>
}

export type CreateCommentData = {
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

export type getCommentRepliesData = {
  offset: number
  limit: number
  replyId?: number
}

export type UpdateEmoji = {
  creator: Partial<User>
  emoji: string
}
