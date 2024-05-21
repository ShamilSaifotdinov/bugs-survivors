import { IGame } from './interfaces'

class CanvasController {
  animationFrameId?: number
  isPause = false

  constructor(public canvas: HTMLCanvasElement, private game: IGame) {
    this.game.canvas = this
    this.game.init()
  }

  initAnimate() {
    const ctx = this.canvas.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.imageSmoothingEnabled = false

    let lastFrameTime = performance.now()
    const fpsInterval = 1000 / 60

    const animate = (timestamp: number) => {
      this.animationFrameId = requestAnimationFrame(animate)

      const elapsed = timestamp - lastFrameTime

      if (elapsed > fpsInterval) {
        lastFrameTime = timestamp - (elapsed % fpsInterval)

        if (!this.isPause) {
          this.clearCanvas(ctx)
          this.game.render(ctx)
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(animate)
  }

  private clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.game.destroy()
    }
  }

  pause() {
    this.isPause = true
  }

  resume() {
    this.isPause = false
  }
}

export default CanvasController
