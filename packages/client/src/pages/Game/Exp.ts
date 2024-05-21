import { Game } from '.'
import { isPointInsideCircle, rand } from './util'
import { SoundPlayer } from './SoundPlayer'

const soundPlayer = new SoundPlayer()
soundPlayer.setVolume(0.2)
interface Exp {
  width: number
  height: number
  x: number
  y: number
  vx: number
  vy: number
  frameSize: number
  frameLine: number
  frame: number
  lifeTime: number
  isPlayer: boolean
}

class Exps {
  game: Game
  state: Exp[] = []

  sprite: HTMLImageElement
  spriteIsLoaded = false

  constructor(game: Game) {
    this.game = game

    this.sprite = new Image()
    this.sprite.src = 'src/pages/Game/assets/exp.png'

    this.sprite.onload = () => {
      this.spriteIsLoaded = true
    }
  }

  moveExpTowardsPlayer(player: typeof this.game.Player, exp: Exp) {
    for (let i = 0; i < this.state.length; i++) {
      const dxPlayer = player.x + player.width / 2 - exp.x
      const dyPlayer = player.y + player.height / 2 - exp.y
      const distancePlayer = Math.sqrt(
        dxPlayer * dxPlayer + dyPlayer * dyPlayer
      )

      const directionXPlayer = dxPlayer / distancePlayer
      const directionYPlayer = dyPlayer / distancePlayer

      if (
        isPointInsideCircle(
          exp.x,
          exp.y,
          this.game.Player.x + this.game.Player.width / 2,
          this.game.Player.y + this.game.Player.height / 2,
          this.game.Player.expRadius
        )
      ) {
        exp.vx = directionXPlayer * (this.game.Player.speed + 3)
        exp.vy = directionYPlayer * (this.game.Player.speed + 3)
      }
    }
  }

  renderExp(ctx: CanvasRenderingContext2D) {
    if (this.spriteIsLoaded) {
      for (let i = 0; i < this.state.length; i++) {
        ctx.drawImage(
          this.sprite,
          this.state[i].frame,
          this.state[i].frameLine,
          this.state[i].frameSize,
          this.state[i].frameSize,
          Math.floor(this.state[i].x + this.game.Camera.x),
          Math.floor(this.state[i].y + this.game.Camera.y),
          this.state[i].width,
          this.state[i].height
        )

        this.state[i].x += this.state[i].vx
        this.state[i].y += this.state[i].vy

        this.moveExpTowardsPlayer(this.game.Player, this.state[i])

        if (
          isPointInsideCircle(
            this.state[i].x,
            this.state[i].y,
            this.game.Player.x + this.game.Player.width / 2,
            this.game.Player.y + this.game.Player.height / 2,
            20
          )
        ) {
          this.state.splice(i, 1)
          this.game.Player.exp++
          soundPlayer.playSound(500 + rand(100, 250), 0.02, 'triangle')
          this.game.TextParticles.createTextParticles(
            '+1',
            this.game.Player.x + this.game.Player.width / 2,
            this.game.Player.y + this.game.Player.height / 2,
            'rgb(50, 200, 50)'
          )
        }

        if (this.state[i]) {
          this.state[i].lifeTime--
          if (this.state[i].lifeTime <= 0) {
            this.state.splice(i, 1)
          }
        }
      }
    }
  }

  createExp(x: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      this.state.push({
        x: x + rand(-count * count, count * count),
        y: y + rand(-count * count, count * count),
        vx: 0,
        vy: 0,
        frame: [0, 8][rand(0, 1)],
        frameLine: 0,
        frameSize: 8,
        width: 35,
        height: 35,
        lifeTime: 2000,
        isPlayer: false,
      })
    }
  }
}

export default Exps
