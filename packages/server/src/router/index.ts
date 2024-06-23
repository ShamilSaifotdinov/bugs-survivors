import { Router } from 'express'
import { ForumRoutes } from './routes/forum'
import { TopicRoutes } from './routes/topic'
import { CommentRoutes } from './routes/comment'
import { userThemeRoutes } from './routes/userTheme'

const router: Router = Router()

userThemeRoutes(router)
ForumRoutes(router)
TopicRoutes(router)
CommentRoutes(router)

export default router
