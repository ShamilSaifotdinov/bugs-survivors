import User from '../models/user'
import {
  CommentAndReplyResponse,
  CreateTopicRequest,
  GetPaginationRequest,
  GetTopicInfo,
} from './types'
import Topic from '../models/topic'
import Comment from '../models/comment'
import UserService from './user'
import { Sequelize } from 'sequelize'

class TopicService {
  public static create_topic = async (data: CreateTopicRequest) => {
    await UserService.upsert_user(data.creator)
    const topic = await Topic.create({
      name: data.name,
      creatorId: data.creator.id,
    })

    return { id: topic.id }
  }

  public static get_info = async (topicId: number) => {
    const result = (await Topic.findByPk(topicId, {
      attributes: [
        'name',
        [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'comments_count'],
      ],
      include: [{ model: Comment, attributes: [] }],
      group: 'Topic.id',
      raw: true,
    })) as GetTopicInfo | null

    if (result === null) {
      throw Error('Not found')
    }

    result.comments_count = Number(result.comments_count)

    return result
  }

  public static get_comments = async (
    topicId: number,
    query: GetPaginationRequest
  ) => {
    const topic = await Topic.findByPk(topicId)

    if (topic === null) {
      throw Error('Not found')
    }

    const result = await Comment.findAll({
      ...query,
      where: { topicId },
      include: [User],
      attributes: [
        'id',
        'content',
        [
          Sequelize.literal(`(
            SELECT COUNT(replies.id)
            FROM replies
            WHERE replies.comment_id = "Comment"."id" AND replies.reply_id IS NULL
          )`),
          'replies_count',
        ],
        [
          Sequelize.literal(`(
         SELECT JSON_AGG(row_to_json(subquery))
         FROM  (
         SELECT COUNT(emoji) AS count, emoji
         FROM emoji
         WHERE emoji.comment_id="Comment"."id"
         GROUP BY emoji
         ) AS subquery
          )`),
          'emoji',
        ],
      ],
    })

    result.forEach(comment => {
      const data = comment.dataValues as unknown as CommentAndReplyResponse
      data.replies_count = Number(data.replies_count)
    })

    return result
  }
}

export default TopicService
