import TopicAPI from '../../api/topic'
import { Router } from 'express'

export const TopicRoutes = (router: Router) => {
  const topicRouter: Router = Router()

  topicRouter
    .post('/', TopicAPI.create)
    .get('/:topicId', TopicAPI.get_info)
    .get('/:topicId/comments', TopicAPI.get_comments)

  router.use('/topic', topicRouter)
}
