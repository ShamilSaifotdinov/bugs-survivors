import { RESOURCES_URL } from '../api/basic/basicInstance'

const DEFAULT_AVATAR = 'images/defaultAvatar.png'

const getAvatarSrc = (avatar?: string) => {
  return avatar ? `${RESOURCES_URL}${avatar}` : DEFAULT_AVATAR
}

export default getAvatarSrc
