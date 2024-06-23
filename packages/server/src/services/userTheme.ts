import SiteTheme from '../models/siteTheme'
import UserTheme from '../models/userTheme'
import BaseRESTService from './BaseREST'

interface UpdateRequest {
  userId: number
  themeId: number
}

class UserThemeService implements BaseRESTService {
  public static find = (userId: number) => {
    return UserTheme.findOne({
      where: {
        ownerId: userId,
      },
      include: [SiteTheme],
    })
  }

  public static update = async (data: UpdateRequest) => {
    const userTheme = await UserThemeService.find(data.userId)

    if (!userTheme) {
      return UserTheme.create({
        themeId: data.themeId,
        ownerId: data.userId,
      })
    }

    return UserTheme.update(
      {
        themeId: data.themeId,
        ownerId: data.userId,
      },
      { where: { id: userTheme.theme.id } }
    )
  }
}

export default UserThemeService
