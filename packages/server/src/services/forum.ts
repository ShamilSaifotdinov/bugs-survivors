import User from '../models/user'
import { GetPaginationRequest, TopicResponse } from './types'
import Topic from '../models/topic'
import { Sequelize } from 'sequelize'

class ForumService {
  public static get_topics_count = async () => {
    const count = await Topic.count()
    return { count }
  }

  public static get_topics = async (query: GetPaginationRequest) => {
    const result = await Topic.findAll({
      ...query,
      include: [User],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(comments.id)
              FROM comments
              WHERE comments.topic_id = "Topic"."id"
            )`),
            'comments_count',
          ],
        ],
        exclude: ['creatorId'],
      },
    })

    result.forEach(topic => {
      const data = topic.dataValues as unknown as TopicResponse
      data.comments_count = Number(data.comments_count)
    })

    return result
  }
}

export default ForumService
