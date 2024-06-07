import { useCallback, useEffect, useState } from 'react'

export const useFullScreen = () => {
  const [isFullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    return () => {
      if (isFullScreen) exitFullscreen()
    }
  }, [isFullScreen])

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

  const openFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    }
  }

  const toggleFullScreen = useCallback(() => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      openFullscreen()
      setFullScreen(true)
    } else {
      exitFullscreen()
      setFullScreen(false)
    }
  }, [])

  return { isFullScreen, toggleFullScreen }
}
