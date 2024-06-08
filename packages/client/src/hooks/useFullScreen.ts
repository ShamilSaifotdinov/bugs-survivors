import { useCallback, useEffect, useState } from 'react'
import {
  isNotFullScreen,
  exitFullscreen,
  openFullscreen,
} from '../helpers/fullscreenAPI'

export const useFullScreen = () => {
  const [isFullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    return () => {
      if (isFullScreen) exitFullscreen()
    }
  }, [isFullScreen])

  const toggleFullScreen = useCallback(() => {
    if (isNotFullScreen()) {
      openFullscreen()
      setFullScreen(true)
    } else {
      exitFullscreen()
      setFullScreen(false)
    }
  }, [])

  return { isFullScreen, toggleFullScreen }
}
