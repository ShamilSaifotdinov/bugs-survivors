import { EmojiApi } from '../../api/emoji'
import CommentAPI from '../../api/comment'
import { Router } from 'express'

export const CommentRoutes = (router: Router) => {
  const commentRouter: Router = Router()

  commentRouter
    .post('/', CommentAPI.create)
    .get('/:commentId', CommentAPI.get_replies)
    .post('/reply', CommentAPI.create_reply)
    .put('/:commentId/emoji', EmojiApi.update_emoji)

  router.use('/comment', commentRouter)
}
