import { Router } from 'express'
import { ForumRoutes } from './routes/forum'
import { TopicRoutes } from './routes/topic'
import { CommentRoutes } from './routes/comment'

const router: Router = Router()

ForumRoutes(router)
TopicRoutes(router)
CommentRoutes(router)

export default router
