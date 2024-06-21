import CommentAPI from '../../api/comment'
import { Router } from 'express'

export const CommentRoutes = (router: Router) => {
  const commentRouter: Router = Router()

  commentRouter
    .post('/', CommentAPI.create)
    .get('/:commentId', CommentAPI.get_replies)
    .post('/reply', CommentAPI.create_reply)

  router.use('/comment', commentRouter)
}
