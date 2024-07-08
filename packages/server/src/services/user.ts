import User, { IUser } from '../models/user'

class UserService {
  public static upsert_user = async (data: IUser) => {
    if (data.avatar === undefined) {
      data.avatar = null
    }
    return await User.upsert(data)
  }
}

export default UserService
