import { Game } from '.'
import { rand } from './util'

interface Bullet {
  width: number
  height: number
  x: number
  y: number
  speed: number
  damage: number
  vx: number
  vy: number
  frameSize: number
  frameLine: number
  frame: number
}

class Bullets {
  game: Game
  state: Bullet[] = []

  sprite: HTMLImageElement
  spriteIsLoaded = false

  constructor(game: Game) {
    this.game = game

    this.sprite = new Image()
    this.sprite.src = 'src/pages/Game/assets/bullet.png'

    this.sprite.onload = () => {
      this.spriteIsLoaded = true
    }
  }

  renderBullet(ctx: CanvasRenderingContext2D) {
    if (this.spriteIsLoaded) {
      for (let i = 0; i < this.state.length; i++) {
        ctx.drawImage(
          this.sprite,
          this.state[i].frame,
          this.state[i].frameLine + (this.state[i].damage - 1) * 16,
          this.state[i].frameSize,
          this.state[i].frameSize,
          Math.floor(this.state[i].x + this.game.Camera.x),
          Math.floor(this.state[i].y + this.game.Camera.y),
          this.state[i].width,
          this.state[i].height
        )

        this.state[i].x +=
          this.state[i].vx * this.state[i].speed +
          rand(-this.state[i].damage, this.state[i].damage)
        this.state[i].y +=
          this.state[i].vy * this.state[i].speed +
          rand(-this.state[i].damage, this.state[i].damage)

        if (this.game.GameTick % 12 == 0) {
          this.state[i].frame += this.state[i].frameSize
          if (this.state[i].frame >= 16 * 4) {
            this.state[i].frame = 0
          }
        }

        const bxcx = this.state[i].x + this.game.Camera.x
        const bycy = this.state[i].y + this.game.Camera.y

        if (
          bxcx > this.game.CanvasWidth ||
          bxcx + this.state[i].width < 0 ||
          bycy > this.game.CanvasHeight ||
          bycy + this.state[i].height < 0
        ) {
          this.state.splice(i, 1)
        }

        if (this.state[i]) {
          for (let j = 0; j < this.game.Enemies.state.length; j++) {
            if (
              this.state[i].x + this.state[i].width / 2 >
                this.game.Enemies.state[j].x &&
              this.state[i].x <
                this.game.Enemies.state[j].x +
                  this.game.Enemies.state[j].width / 2 &&
              this.state[i].y > this.game.Enemies.state[j].y &&
              this.state[i].y <
                this.game.Enemies.state[j].y +
                  this.game.Enemies.state[j].height / 2
            ) {
              this.game.Enemies.state[j].hp -= this.state[i].damage
              this.game.TextParticles.createTextParticles(
                '-' + this.state[i].damage,
                this.game.Enemies.state[j].x +
                  this.game.Enemies.state[j].width / 2,
                this.game.Enemies.state[j].y +
                  this.game.Enemies.state[j].height / 2,
                'pink'
              )
              this.state.splice(i, 1)
              break
            }
          }
        }
      }
    }
  }

  createBullet() {
    if (this.game.GameTick % this.game.Player.reloadTime == 0) {
      this.state.push({
        width: 70,
        height: 70,
        x: this.game.Player.x,
        y: this.game.Player.y,
        vx: this.game.Player.lastDirectionX,
        vy: this.game.Player.lastDirectionY,
        damage: this.game.Player.damage,
        speed: 5 + this.game.Player.speed,
        frameSize: 16,
        frameLine: 0,
        frame: 0,
      })
    }

    if (this.game.Player.flameThrow > 0) {
      this.state.push({
        width: 85,
        height: 85,
        x: this.game.Player.x,
        y: this.game.Player.y,
        vx: this.game.Player.lastDirectionX,
        vy: this.game.Player.lastDirectionY,
        damage: 6,
        speed: 8 + this.game.Player.speed,
        frameSize: 16,
        frameLine: 0,
        frame: 0,
      })

      this.game.Player.flameThrow--
    }
  }
}

export default Bullets
