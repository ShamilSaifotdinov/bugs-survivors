import SiteTheme from '../models/siteTheme'
import BaseRESTService from './BaseREST'

interface FindRequest {
  id?: number
  title?: string
}

class ThemeService implements BaseRESTService {
  public static find = ({ id, title }: FindRequest) => {
    if (id) {
      return SiteTheme.findByPk(id)
    }

    return SiteTheme.findOne({
      where: {
        theme: title,
      },
    })
  }
}

export default ThemeService
