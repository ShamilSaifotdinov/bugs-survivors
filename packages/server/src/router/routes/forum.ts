import ForumAPI from '../../api/forum'
import { Router } from 'express'

export const ForumRoutes = (router: Router) => {
  const forumRouter: Router = Router()

  forumRouter
    // .get('/', ForumAPI.find)
    // .post('/', ForumAPI.create)
    .get('/', ForumAPI.get_topics_count)
    .get('/topics', ForumAPI.get_topics)

  router.use('/forum', forumRouter)
}
