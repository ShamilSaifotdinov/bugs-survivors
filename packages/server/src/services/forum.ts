// import BaseRESTService from "./BaseREST";

import User from '../models/user'
import { GetPaginationRequest, TopicResponse } from './types'
import Topic from '../models/topic'
import { Sequelize } from 'sequelize'

// interface FindRequest {
//   id?: number; // ID темы в таблице
//   title?: string; // Поиск по частичному совпадению в таблице
// }

// interface CreateRequest {
//   title: string;
//   description: string;
// }

// class ForumService implements BaseRESTService {
//   public find = ({ id, title }: FindRequest) => {
//     if (id) {
//       return siteThemeRepository.findByPk(id);
//     }

//     return siteThemeRepository.findOne({
//       where: {
//         theme: `%${title}%`, // Защита от SQL Injection присутствует
//       },
//     });
//   };

//   public create = (data: CreateRequest) => {
//     return siteThemeRepository.create(data);
//   }
// }

class ForumService {
  // public find = ({ id, title }: FindRequest) => {
  //   if (id) {
  //     return siteThemeRepository.findByPk(id);
  //   }

  //   return siteThemeRepository.findOne({
  //     where: {
  //       theme: `%${title}%`, // Защита от SQL Injection присутствует
  //     },
  //   });
  // };

  // public create = (data: CreateRequest) => {
  //   return siteThemeRepository.create(data);
  // }

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
