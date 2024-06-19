import {
  CommentAndReplyResponse,
  CreateCommentRequest,
  CreateReplyRequest,
  GetReplyRequest,
} from './types'
import Comment from '../models/comment'
import UserService from './user'
import Reply from '../models/reply'
import User from '../models/user'
import { Sequelize } from 'sequelize'

class CommentService {
  public static create = async (data: CreateCommentRequest) => {
    await UserService.upsert_user(data.creator)
    const comment = await Comment.create({
      content: data.content,
      creatorId: data.creator.id,
      topicId: data.topicId,
    })

    return { id: comment.id }
  }

  public static get_replies = async (
    commentId: number,
    query: GetReplyRequest
  ) => {
    const comment = await Comment.findByPk(commentId)

    if (comment === null) {
      throw Error('Not found')
    }

    const result = await Reply.findAll({
      ...query,
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(replies.id)
              FROM replies
              WHERE replies.reply_id = "Reply"."id"
            )`),
            'replies_count',
          ],
        ],
        exclude: ['creatorId', 'commentId', 'replyId'],
      },
      where: {
        commentId,
        replyId: query.replyId,
      },
      include: [User],
    })

    result.forEach(reply => {
      const data = reply.dataValues as unknown as CommentAndReplyResponse
      data.replies_count = Number(data.replies_count)
    })

    return result
  }

  public static create_reply = async (data: CreateReplyRequest) => {
    await UserService.upsert_user(data.creator)
    const reply = await Reply.create({
      content: data.content,
      creatorId: data.creator.id,
      replyId: data.replyId,
      commentId: data.commentId,
    })

    return { id: reply.id }
  }
}

export default CommentService
