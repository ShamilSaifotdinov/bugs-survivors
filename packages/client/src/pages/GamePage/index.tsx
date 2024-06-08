import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Cards from './Game/Cards'
import styles from './styles.module.scss'
import Game from './Game'
import { useNavigate } from 'react-router-dom'
import Canvas from '../../components/Canvas'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import { useFullScreen } from '../../hooks/useFullScreen'

function GamePage() {
  const [showCards, setShowCards] = useState(false)
  const navigate = useNavigate()
  const [game, setGame] = useState<Game | null>(null)
  const { isFullScreen, toggleFullScreen } = useFullScreen()

  useEffect(() => {
    if (game === null && typeof window !== 'undefined') {
      setGame(new Game(setShowCards, navigate))
    }
  }, [game, navigate])

  const handleUpgrade = useCallback(
    (id: number) => game?.handleUpgrade(id),
    [game]
  )

  return (
    <div className={styles.canvas_container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bugs Survivors</title>
        <meta name="description" content="Game Bugs Survivors" />
      </Helmet>
      {showCards && <Cards upgradePick={handleUpgrade} />}
      {game && <Canvas game={game} />}
      <div className={styles.button_container}>
        <IconButton
          onClick={toggleFullScreen}
          disableRipple={true}
          sx={{ padding: '0.3rem', marginRight: '1rem' }}>
          {isFullScreen ? (
            <FullscreenExitIcon fontSize="large" />
          ) : (
            <FullscreenIcon fontSize="large" />
          )}
        </IconButton>
        <Button href="/main_menu" variant="contained" color="primary">
          Exit
        </Button>
      </div>
    </div>
  )
}

export default GamePage
