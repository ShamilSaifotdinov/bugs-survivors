import Game from '.'
import { rand } from '../utils'
import { SoundPlayer } from './SoundPlayer'
interface Enemy {
  width: number
  height: number
  x: number
  y: number
  speed: number
  frameSize: number
  frameLine: number
  frame: number
  hp: number
  level: number
}

class Enemies {
  game: Game
  soundPlayer: SoundPlayer
  state: Enemy[] = []
  diedEnemies = 0

  sprite: HTMLImageElement
  spriteIsLoaded = false

  constructor(game: Game) {
    this.game = game

    this.soundPlayer = new SoundPlayer(this.game.audioContext)
    this.soundPlayer.setVolume(0.1)

    this.sprite = new Image()
    this.sprite.src = '/images/game/enemy.png'

    this.sprite.onload = () => {
      this.spriteIsLoaded = true
    }
  }

  renderEnemies(ctx: CanvasRenderingContext2D) {
    if (this.spriteIsLoaded) {
      for (let i = 0; i < this.state.length; i++) {
        const side = this.state[i].x > this.game.Player.x ? 16 : 0

        ctx.drawImage(
          this.sprite,
          this.state[i].frame,
          this.state[i].frameLine + side + (this.state[i].level - 1) * 32,
          this.state[i].frameSize,
          this.state[i].frameSize,
          Math.floor(this.state[i].x + this.game.Camera.x),
          Math.floor(this.state[i].y + this.game.Camera.y),
          this.state[i].width,
          this.state[i].height
        )

        if (this.game.GameTick % 9 == 0) {
          this.state[i].frame += this.state[i].frameSize
          if (this.state[i].frame >= 16 * 4) {
            this.state[i].frame = 0
          }
        }

        if (this.state[i].x + this.game.Camera.x + this.state[i].width < -100) {
          this.state[i].x = this.game.Player.x + this.game.CanvasWidth / 2
        }

        if (
          this.state[i].x + this.game.Camera.x >
          this.game.CanvasWidth + 100
        ) {
          this.state[i].x = this.game.Player.x - this.game.CanvasWidth / 2
        }

        if (this.state[i].y + this.game.Camera.y < -100) {
          this.state[i].y = this.game.Player.y + this.game.CanvasHeight / 2
        }

        if (
          this.state[i].y + this.state[i].height + this.game.Camera.y >
          this.game.CanvasHeight + 100
        ) {
          this.state[i].y = this.game.Player.y - this.game.CanvasHeight / 2
        }

        this.moveEnemyTowardsPlayer(this.state[i], this.game.Player, this.state)

        if (this.state[i].hp <= 0) {
          this.game.Exp.createExp(
            this.state[i].x,
            this.state[i].y,
            this.state[i].level * this.state[i].level
          )
          this.state.splice(i, 1)

          this.diedEnemies += 1
        }
      }
    }
  }

  createEnemy() {
    if (this.game.GameTick % this.game.spawnRate == 0) {
      if (this.state.length < 400) {
        const x =
          this.game.Player.x + (this.game.CanvasWidth / 2) * [-1, 1][rand(0, 1)]
        const y =
          this.game.Player.y +
          (this.game.CanvasHeight / 2) * [-1, 1][rand(0, 1)]
        const side = ['x', 'y'][rand(0, 1)]
        const level = rand(this.game.minEnemyLevel, this.game.maxEnemyLevel)
        const isBoss = rand(0, this.game.bossChance) == this.game.bossChance
        if (this.state.length < 512) {
          this.state.push({
            width: 70 + (isBoss ? 100 : 0),
            height: 70 + (isBoss ? 100 : 0),
            x: x + rand(0, this.game.CanvasWidth) * (side == 'x' ? 1 : 0),
            y: y + rand(0, this.game.CanvasHeight) * (side == 'y' ? 1 : 0),
            speed: 1,
            frame: 0,
            frameLine: 0,
            frameSize: 16,
            hp: 2 + (level - 1) * 4 + (isBoss ? level * 100 : 0),
            level: level,
          })
        }
      }
    }
  }

  moveEnemyTowardsPlayer(
    enemy: Enemy,
    player: typeof this.game.Player,
    enemies: Enemy[]
  ) {
    const avoidanceVector = { x: 0, y: 0 }

    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i] !== enemy) {
        const dx = enemy.x - enemies[i].x
        const dy = enemy.y - enemies[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 40) {
          avoidanceVector.x += dx
          avoidanceVector.y += dy
        }
      }
    }

    const dxPlayer = player.x - enemy.x
    const dyPlayer = player.y - enemy.y
    const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dyPlayer * dyPlayer)

    const directionXPlayer = dxPlayer / distancePlayer
    const directionYPlayer = dyPlayer / distancePlayer

    const avoidanceLength = Math.sqrt(
      avoidanceVector.x * avoidanceVector.x +
        avoidanceVector.y * avoidanceVector.y
    )
    if (avoidanceLength > 0) {
      avoidanceVector.x /= avoidanceLength
      avoidanceVector.y /= avoidanceLength
    }

    let correctedDirectionX = directionXPlayer + avoidanceVector.x
    let correctedDirectionY = directionYPlayer + avoidanceVector.y

    const correctedLength = Math.sqrt(
      correctedDirectionX * correctedDirectionX +
        correctedDirectionY * correctedDirectionY
    )
    if (correctedLength > 0) {
      correctedDirectionX /= correctedLength
      correctedDirectionY /= correctedLength
    }

    enemy.x += correctedDirectionX * enemy.speed
    enemy.y += correctedDirectionY * enemy.speed
  }
}

export default Enemies
