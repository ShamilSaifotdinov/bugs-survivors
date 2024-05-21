import { useEffect, useRef } from 'react'
import CanvasController from './controller'
import { IGame } from './interfaces'

export default function Canvas({ game }: { game: IGame }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new CanvasController(canvasRef.current, game)

      return () => canvas.stop()
    }
  }, [canvasRef])

  return <canvas ref={canvasRef} />
}
