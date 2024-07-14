import { Router } from 'express'
import UserThemeAPI from '../../api/userTheme'

export const userThemeRoutes = (router: Router) => {
  const userThemeRouter: Router = Router()

  userThemeRouter.get('/', UserThemeAPI.find).put('/', UserThemeAPI.create)

  router.use('/theme', userThemeRouter)
}
