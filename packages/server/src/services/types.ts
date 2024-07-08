import { _IUser, IUser } from '../models/user'

export interface GetPaginationRequest {
  offset: number
  limit: number
}

export interface TopicResponse {
  id: number
  name: string
  creator: IUser
  comments_count: number
}

export interface CreateTopicRequest {
  _user: _IUser
  name: string
}

export interface CreateCommentRequest {
  _user: _IUser
  topicId: number
  content: string
}

export interface GetTopicInfo {
  name: string
  comments_count: number
}

export interface CommentAndReplyResponse {
  id: number
  content: string
  creator: IUser
  replies_count: number
  emoji?: EmojiResponse[] | null
}

export interface GetReplyRequest extends GetPaginationRequest {
  replyId: number | null
}

export interface CreateReplyRequest {
  _user: _IUser
  commentId: number
  replyId: number | null
  content: string
}

export interface EmojiResponse {
  count: number
  emoji: string
}

export interface UpdateEmoji {
  _user: _IUser
  commentId: number
  emoji: string
}

export interface UpdateRequest {
  userId: number
  themeId: number
}
