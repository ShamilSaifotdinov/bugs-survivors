import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import Cards from './Game/Cards'
import styles from './styles.module.scss'
import Game from './Game'
import { useNavigate } from 'react-router-dom'
import Canvas from '../../components/Canvas'
import { Button } from '@mui/material'

function GamePage() {
  const [showCards, setShowCards] = useState(false)
  const navigate = useNavigate()
  const [game, setGame] = useState<Game | null>(null)

  if (game === null) {
    setGame(new Game(setShowCards, navigate))
  }

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
      <Button
        className={styles.game_exit}
        href="/main_menu"
        variant="contained"
        color="primary">
        Exit
      </Button>
    </div>
  )
}

export default GamePage
