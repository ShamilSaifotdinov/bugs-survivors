import User, { _IUser } from '../models/user'

class UserService {
  public static upsert_user = async (data: _IUser) => {
    if (data.avatar === undefined) {
      data.avatar = null
    }
    return await User.upsert({
      id: data.id,
      login: data.login,
      avatar: data.avatar,
    })
  }
}

export default UserService
