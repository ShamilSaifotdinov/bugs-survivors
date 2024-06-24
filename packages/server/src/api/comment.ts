import { Request, Response } from 'express'
import validation from '../utils/validation'
import { add_comment, add_reply, get_replies_query, get_replies } from './types'
import CommentService from '../services/comment'

class CommentAPI {
  @validation(add_comment)
  public static create = async (req: Request, res: Response) => {
    try {
      const result = await CommentService.create(req.body)
      res.json(result)
    } catch (e) {
      if ((e as Error).name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({ reason: 'Topic with ID not exist' })
      }
    }
  }

  @validation(get_replies_query, 'query')
  @validation(get_replies, 'params')
  public static get_replies = async (req: Request, res: Response) => {
    const replyId =
      req.query.replyId !== null &&
      req.query.replyId !== undefined &&
      req.query.replyId !== ''
        ? Number(req.query.replyId)
        : null
    try {
      const result = await CommentService.get_replies(
        Number(req.params.commentId),
        {
          offset: Number(req.query.offset),
          limit: Number(req.query.limit),
          replyId,
        }
      )
      res.json(result)
    } catch {
      res.status(404).send()
    }
  }

  @validation(add_reply)
  public static create_reply = async (req: Request, res: Response) => {
    const data = req.body

    data.replyId =
      data.replyId !== null && data.replyId !== undefined && data.replyId !== ''
        ? Number(data.replyId)
        : null

    try {
      const result = await CommentService.create_reply(req.body)
      res.json(result)
    } catch (e) {
      if ((e as Error).name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({ reason: 'Comment or reply with ID not exist' })
      }
    }
  }
}

export default CommentAPI
