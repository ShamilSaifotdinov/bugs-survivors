import { Request, Response } from 'express'
import validation from '../utils/validation'
import { create_topic, get_comments, get_page, get_topic_info } from './types'
import { ValidationError } from 'sequelize'
import TopicService from '../services/topic'

class TopicAPI {
  @validation(create_topic)
  public static create = async (req: Request, res: Response) => {
    try {
      const result = await TopicService.create_topic(req.body)
      res.json(result)
    } catch (e) {
      if ((e as Error).name === 'SequelizeUniqueConstraintError') {
        const error = e as ValidationError
        res.status(400).json({ reason: error.errors[0].message })
      }
    }
  }

  @validation(get_topic_info, 'params')
  public static get_info = async (req: Request, res: Response) => {
    try {
      const result = await TopicService.get_info(Number(req.params.topicId))
      res.json(result)
    } catch {
      res.status(404).send()
    }
  }

  @validation(get_page, 'query')
  @validation(get_comments, 'params')
  public static get_comments = async (req: Request, res: Response) => {
    try {
      const result = await TopicService.get_comments(
        Number(req.params.topicId),
        {
          offset: Number(req.query.offset),
          limit: Number(req.query.limit),
        }
      )
      res.json(result)
    } catch {
      res.status(404).send()
    }
  }
}

export default TopicAPI
