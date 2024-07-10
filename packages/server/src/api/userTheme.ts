import { Request, Response } from 'express'
import UserThemeService from '../services/userTheme'
import ThemeService from '../services/siteTheme'
import UserService from '../services/user'
import validation from '../utils/validation'
import { change_theme, get_theme } from './types'

class UserThemeAPI {
  @validation(get_theme)
  public static find = async (req: Request, res: Response) => {
    const { _user } = req.body
    const theme = await UserThemeService.find(_user.id)

    if (!theme) {
      return res.status(404).send()
    }

    return res.json({ theme: theme.theme.theme })
  }

  @validation(change_theme)
  public static create = async (req: Request, res: Response) => {
    const { body } = req

    const [user] = await UserService.upsert_user(body._user)
    const theme = await ThemeService.find({ title: body.theme })

    if (!theme) {
      return res.status(400).json({ reason: 'Theme not found' })
    }

    await UserThemeService.update({ themeId: theme.id, userId: user.id })

    return res.send('Ok')
  }
}

export default UserThemeAPI
