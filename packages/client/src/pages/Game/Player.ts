import { Game } from '.'
import { isPointInsideCircle } from './util'
class Player {
  game: Game

  width = 70
  height = 70
  x = 0
  y = 0
  speed = 3 //max speed 16
  vx = 0
  vy = 0
  frameSize = 16
  frameLine = 0
  frame = 0
  lastDirectionX = 0
  lastDirectionY = 1
  reloadTime = 60
  damage = 1 //max damage 11
  level = 0
  exp = 0
  nextExp = 2
  expRadius = 100
  flameThrow = 0
  hp = 3
  deadless = 100

  sprite: HTMLImageElement
  spriteIsLoaded = false

  constructor(game: Game) {
    this.game = game

    this.sprite = new Image()
    this.sprite.src = 'src/pages/Game/assets/player.png'

    this.sprite.onload = () => {
      this.spriteIsLoaded = true
    }
  }

  renderPlayer(ctx: CanvasRenderingContext2D) {
    if (this.spriteIsLoaded) {
      if (this.deadless > 0) {
        ctx.globalAlpha = 0.5

        this.deadless--
      }

      ctx.drawImage(
        this.sprite,
        this.frame,
        this.frameLine,
        this.frameSize,
        this.frameSize,
        Math.floor(this.x + this.game.Camera.x),
        Math.floor(this.y + this.game.Camera.y),
        this.width,
        this.height
      )

      ctx.globalAlpha = 1

      ctx.save()
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, this.game.CanvasWidth, 10)
      ctx.fillStyle = 'rgb(55, 150, 155)'
      ctx.fillRect(0, 0, (this.exp / this.nextExp) * this.game.CanvasWidth, 10)

      this.x += this.vx
      this.y += this.vy

      if (this.vx === 0 && this.vy === 0) {
        this.frame = 0
      } else {
        if (this.vy > 0) {
          this.frameLine = 0
          this.lastDirectionY = 1
          this.lastDirectionX = 0
        } else if (this.vy < 0) {
          this.frameLine = 16 * 4
          this.lastDirectionY = -1
          this.lastDirectionX = 0
        }

        if (this.vx < 0) {
          this.frameLine = this.vy === 0 ? 16 * 2 : 16
          this.lastDirectionX = -1
          this.lastDirectionY = 0
        } else if (this.vx > 0) {
          this.frameLine = this.vy === 0 ? 16 * 6 : 16 * 7
          this.lastDirectionX = 1
          this.lastDirectionY = 0
        }

        if (this.vx !== 0 && this.vy !== 0) {
          if (this.vx < 0 && this.vy < 0) {
            this.frameLine = 16 * 3
            this.lastDirectionX = -1
            this.lastDirectionY = -1
          } else if (this.vx < 0 && this.vy > 0) {
            this.frameLine = 16
            this.lastDirectionX = -1
            this.lastDirectionY = 1
          } else if (this.vx > 0 && this.vy < 0) {
            this.frameLine = 16 * 5
            this.lastDirectionX = 1
            this.lastDirectionY = -1
          } else if (this.vx > 0 && this.vy > 0) {
            this.frameLine = 16 * 7
            this.lastDirectionX = 1
            this.lastDirectionY = 1
          }
        }
      }

      if (
        this.game.GameTick % (18 - this.speed) == 0 &&
        (this.vx != 0 || this.vy != 0)
      ) {
        this.frame += this.frameSize
        if (this.frame >= 16 * 4) {
          this.frame = 0
        }
      }

      const filteredEnemies = this.game.Enemies.state.filter(enemy =>
        isPointInsideCircle(
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2,
          this.x + this.width / 2,
          this.y + this.height / 2,
          50
        )
      )

      if (filteredEnemies.length > 0) {
        if (this.deadless == 0) {
          this.hp--
          this.deadless = 200
          this.game.Camera.y -= 20
        }
      }

      if (this.exp >= this.nextExp) {
        this.game.setShowCards(true)
        this.exp = 0
        this.level++
        this.nextExp += (this.level + 1) / 2
        // this.game.pause = true
      }
    }
  }

  upgrade(id: number) {
    switch (id) {
      //increase speed
      case 0:
        {
          if (this.speed < 16) {
            this.speed++
            this.game.TextParticles.createTextParticles(
              '+1 speed',
              this.x + this.width / 2,
              this.y + this.height / 2,
              'gold'
            )
          }
        }
        break

      //add 1 hp
      case 1:
        {
          this.hp++
          this.game.TextParticles.createTextParticles(
            '+1 hp',
            this.x + this.width / 2,
            this.y + this.height / 2,
            'gold'
          )
        }
        break

      //increase damage
      case 2:
        {
          if (this.damage < 11) {
            this.damage++
            this.game.TextParticles.createTextParticles(
              '+1 damage',
              this.x + this.width / 2,
              this.y + this.height / 2,
              'gold'
            )
          }
        }
        break

      //increase reload speed
      case 3:
        {
          this.reloadTime = Math.floor(this.reloadTime / 1.25)
          this.game.TextParticles.createTextParticles(
            '-25% reload time',
            this.x + this.width / 2,
            this.y + this.height / 2,
            'gold'
          )
        }
        break

      case 4:
        {
          this.expRadius = Math.floor(this.expRadius * 1.2)
          this.game.TextParticles.createTextParticles(
            '+20% magnet radius',
            this.x + this.width / 2,
            this.y + this.height / 2,
            'gold'
          )
        }
        break

      //kill all
      case 5:
        {
          for (let i = 0; i < this.game.Enemies.state.length; i++) {
            if (i % 2 == 0) {
              this.game.Enemies.state[i].hp = 0
              this.game.TextParticles.createTextParticles(
                'ULTRA KILL',
                this.x + this.width / 2,
                this.y + this.height / 2,
                'red'
              )
            }
          }
        }
        break

      //fire
      case 6:
        {
          this.flameThrow = 500
          this.game.TextParticles.createTextParticles(
            'FLAMETHROW',
            this.x + this.width / 2,
            this.y + this.height / 2,
            'red'
          )
        }
        break

      //deadless
      case 7: {
        this.deadless = 900
        this.game.TextParticles.createTextParticles(
          'DEADLESS',
          this.x + this.width / 2,
          this.y + this.height / 2,
          'red'
        )
      }
    }
  }
}

export default Player
