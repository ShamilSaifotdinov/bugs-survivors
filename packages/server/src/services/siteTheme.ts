import SiteTheme from '../models/siteTheme'
import BaseRESTService from './BaseREST'

interface FindRequest {
  id?: number // ID темы в таблице
  title?: string // Поиск по частичному совпадению в таблице
}

// interface CreateRequest {
//   title: string;
//   description: string;
// }

class ThemeService implements BaseRESTService {
  public static find = ({ id, title }: FindRequest) => {
    if (id) {
      return SiteTheme.findByPk(id)
    }

    return SiteTheme.findOne({
      where: {
        // theme: `%${title}%`, // Защита от SQL Injection присутствует
        theme: title,
      },
    })
  }

  // public static create = (data: CreateRequest) => {
  //   return siteThemeRepository.create(data);
  // }
}

export default ThemeService
