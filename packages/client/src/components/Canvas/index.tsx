import { useEffect, useRef } from 'react'
import CanvasController from './controller'
import { IGame } from './interfaces'

export default function Canvas({ game }: { game: IGame }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      game.canvas = new CanvasController(canvasRef.current, game)

      game.init()

      return () => game.destroy()
    }
  }, [canvasRef])

  return <canvas ref={canvasRef} />
}
