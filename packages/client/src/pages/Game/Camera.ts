import { Game } from '.'

// interface Camera {
//   x: number
//   y: number
// }

class Camera {
  x = 0
  y = 0

  game: Game

  constructor(game: Game) {
    this.game = game
  }

  cameraMovement() {
    const targetCameraX =
      this.game.CanvasWidth / 2 -
      (this.game.Player.x + this.game.Player.width / 2)
    const targetCameraY =
      this.game.CanvasHeight / 2 -
      (this.game.Player.y + this.game.Player.height / 2)

    if (
      Math.abs(this.x - targetCameraX) > 1 ||
      Math.abs(this.y - targetCameraY) > 1
    ) {
      const lerpFactor = 0.1
      this.x += Math.floor((targetCameraX - this.x) * lerpFactor)
      this.y += Math.floor((targetCameraY - this.y) * lerpFactor)
    }
  }
}

export default Camera
