import { Request, Response } from 'express'
import validation from '../utils/validation'
import { get_page } from './types'
import ForumService from '../services/forum'

class ForumAPI {
  // @validation({/* rules */ }) // Можно использовать декораторы, можно передавать в middlewares
  // public static create = async (request: ExpressRequestModeledType, response: ExpressRespinseModeledType) => {
  //   const { body } = request;

  //   /* Делаем что-то с данными */
  //   const data1 = await someService.find(body.someId);
  //   const data2 = await someOtherService.find(body.otherId); // Или что-то ещё
  //   const data3 = prepareBody(body, data1, data2);

  //   await forumService.create(body); // Можно обернуть в try..catch
  // }

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
