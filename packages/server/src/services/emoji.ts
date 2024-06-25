import Comment from '../models/comment'
import Emoji from '../models/emoji'
import { IEmoji } from './types'
import { fn, col } from 'sequelize'

export class EmojiService {
  public static find = async (commentId: number) => {
    const comment = await Comment.findByPk(commentId)

    if (comment === null) throw new Error('Comment not found')

    const emoji = await Emoji.findAll({
      where: {
        commentId,
      },
      attributes: ['emoji', [fn('count', col('emoji')), 'emoji_count']],
      group: 'emoji',
    })
    return emoji
  }

  public static update = async ({ commentId, creatorId, emoji }: IEmoji) => {
    try {
      const instance = await Emoji.findOne({
        where: {
          commentId,
          creatorId,
          emoji,
        },
      })
      if (instance) {
        await instance.destroy()
      } else {
        await Emoji.create({
          commentId,
          creatorId,
          emoji,
        })
      }
    } catch {
      throw new Error('Error during find or update emoji')
    }
    const result = await EmojiService.find(commentId)
    return result
  }
}
