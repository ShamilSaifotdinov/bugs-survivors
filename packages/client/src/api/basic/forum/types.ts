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
}

export type CreateCommentData = {
  topicId: number
  content: string
}

export type CreateCommentReplyData = {
  commentId: number
  content: string
  replyId?: number
}

export type getCommentRepliesData = {
  offset: number
  limit: number
  replyId?: number
}

export type UpdateEmoji = {
  emoji: string
}
