import { Router } from 'express'
import UserThemeAPI from '../../api/userTheme'

export const userThemeRoutes = (router: Router) => {
  const userThemeRouter: Router = Router()

  userThemeRouter
    // .post('/', [logger], ThemeAPI.create)
    // .get('/', [logger], ThemeAPI.find);
    .post('/', UserThemeAPI.find)
    .put('/', UserThemeAPI.create)

  router.use('/theme', userThemeRouter)
}
