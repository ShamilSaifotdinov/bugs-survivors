import Comment from '../models/comment'
import Emoji, { EmojiRequest } from '../models/emoji'
import { EmojiResponse } from './types'
import { fn, col } from 'sequelize'

export class EmojiService {
  public static find = async (commentId: number) => {
    const comment = await Comment.findByPk(commentId)

    if (comment === null) throw new Error('Comment not found')

    const emoji = await Emoji.findAll({
      where: {
        commentId,
      },
      attributes: [[fn('COUNT', col('emoji')), 'count'], 'emoji'],
      group: 'emoji',
    })
    emoji.forEach(emoji => {
      const data = emoji.dataValues as unknown as EmojiResponse
      data.count = Number(data.count)
    })
    return emoji
  }

  public static update = async ({
    commentId,
    creatorId,
    emoji,
  }: EmojiRequest) => {
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
