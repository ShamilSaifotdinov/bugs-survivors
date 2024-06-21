import { Request, Response } from 'express'
import validation from '../utils/validation'
import { get_page } from './types'
import ForumService from '../services/forum'

class ForumAPI {
  public static get_topics_count = async (_: Request, res: Response) => {
    const result = await ForumService.get_topics_count()
    res.json(result)
  }

  @validation(get_page, 'query')
  public static get_topics = async (req: Request, res: Response) => {
    const result = await ForumService.get_topics({
      offset: Number(req.query.offset),
      limit: Number(req.query.limit),
    })
    res.json(result)
  }
}

export default ForumAPI
