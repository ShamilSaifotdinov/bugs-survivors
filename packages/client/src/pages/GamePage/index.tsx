import { useCallback, useState } from 'react'
import Cards from './Game/Cards'
import styles from './styles.module.scss'
import Game from './Game'
import { useNavigate } from 'react-router-dom'
import Canvas from '../../components/Canvas'

function GamePage() {
  const [showCards, setShowCards] = useState(false)
  const navigate = useNavigate()
  const [game, setGame] = useState<Game | null>(null)

  function gameOver() {
    navigate('/gameOver')
  }

  if (game === null) {
    setGame(new Game(setShowCards, gameOver))
  }

  const handleUpgrade = useCallback(
    (id: number) => game?.handleUpgrade(id),
    [game]
  )

  return (
    <div className={styles.canvas_container}>
      {showCards && <Cards upgradePick={handleUpgrade} />}
      {game && <Canvas game={game} />}
    </div>
  )
}

export default GamePage
