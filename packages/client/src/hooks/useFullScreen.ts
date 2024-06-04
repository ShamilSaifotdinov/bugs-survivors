import { useCallback, useState } from 'react'

export const useFullScreen = () => {
  const [isFullScreen, setFullScreen] = useState(false)

  const toggleFullScreen = useCallback(() => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen()
      }
      setFullScreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      setFullScreen(false)
    }
  }, [])

  return { isFullScreen, setFullScreen, toggleFullScreen }
}
