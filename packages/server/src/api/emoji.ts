import { Request, Response } from 'express'
import { EmojiService } from '../services/emoji'
import validation from '../utils/validation'
import { update_emoji } from './types'

export class EmojiApi {
  @validation(update_emoji)
  public static update_emoji = async (req: Request, res: Response) => {
    try {
      const result = await EmojiService.update({
        commentId: Number(req.params.commentId),
        ...req.body,
      })
      res.json(result)
    } catch (e) {
      if ((e as Error).name === 'SequelizeForeignKeyConstraintError') {
        res
          .status(400)
          .json({ reason: 'Comment ID, creator ID or emoji not exist' })
      }
    }
  }
}
