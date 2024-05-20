import { useCallback, useEffect, useRef, useState } from 'react'
import Cards from './Game/Cards'
import styles from './styles.module.scss'
import Game from './Game'
import { useNavigate } from 'react-router-dom'

function GamePage() {
  const [showCards, setShowCards] = useState(false)
  const navigate = useNavigate()

  function gameOver() {
    navigate('/gameOver')
  }

  const game = new Game(setShowCards, gameOver)
  game.CanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (game.CanvasRef?.current) {
      game.init()
    }

    return () => game.destroy()
  }, [game.CanvasRef])

  const handleUpgrade = useCallback((id: number) => game.handleUpgrade(id), [])

  return (
    <div className={styles.canvas_container}>
      {showCards && <Cards upgradePick={handleUpgrade} />}
      <canvas
        ref={game.CanvasRef}
        width={game.CanvasWidth}
        height={game.CanvasHeight}></canvas>
    </div>
  )
}

export default GamePage
