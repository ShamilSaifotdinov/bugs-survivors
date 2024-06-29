import { Request, Response } from 'express'
import { EmojiService } from '../services/emoji'
import validation from '../utils/validation'
import { update_emoji, get_emoji } from './types'

export class EmojiApi {
  @validation(update_emoji)
  @validation(get_emoji, 'params')
  public static update_emoji = async (req: Request, res: Response) => {
    try {
      const result = await EmojiService.update({
        commentId: Number(req.params.commentId),
        ...req.body,
      })
      res.json(result)
    } catch (e) {
      res.status(400).json({ reason: (e as Error).message })
    }
  }
}
