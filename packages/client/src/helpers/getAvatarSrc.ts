import { RESOURCES_URL } from '../constants'

const getAvatarSrc = (avatar?: string) => {
  return avatar ? `${RESOURCES_URL}${avatar}` : undefined
}

export default getAvatarSrc
