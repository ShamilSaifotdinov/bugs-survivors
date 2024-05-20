import Camera from './Camera'
import TextParticles from './TextParticles'
import Player from './Player'
import Enemies from './Enemies'
import Exps from './Exp'
import Bullets from './Bullets'

const Timer = {
  seconds: 0,
  minutes: 0,
}

class Game {
  CanvasRef?: React.RefObject<HTMLCanvasElement>
  CanvasWidth = window.innerWidth
  CanvasHeight = window.innerHeight
  GameTick = 0

  pause = false
  spawnRate = 100
  minEnemyLevel = 1
  maxEnemyLevel = 1
  bossChance = 1000

  Camera: Camera
  TextParticles: TextParticles
  Player: Player
  Enemies: Enemies
  Exp: Exps
  Bullets: Bullets

  destroyers: Array<() => void> = []

  constructor(
    public setShowCards: React.Dispatch<React.SetStateAction<boolean>>,
    public gameOver: () => void
  ) {
    this.Camera = new Camera(this)
    this.TextParticles = new TextParticles(this)
    this.Player = new Player(this)
    this.Enemies = new Enemies(this)
    this.Exp = new Exps(this)
    this.Bullets = new Bullets(this)
  }

  init() {
    Promise.all(
      [this.Player, this.Enemies, this.Bullets, this.Exp].map(
        component =>
          new Promise(resolve => {
            component.spriteIsLoaded = true
            component.sprite.onload = resolve
          })
      )
    ).then(() => {
      const destroyAnimate = this.initAnimate()

      if (destroyAnimate !== undefined) {
        this.destroyers.push(
          destroyAnimate,
          this.initLinter(),
          this.initTimer()
        )
      }
    })
  }

  initAnimate() {
    const canvas = this.CanvasRef?.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = false

    let animationFrameId: number
    let lastFrameTime = performance.now()
    const fpsInterval = 1000 / 60

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsed = timestamp - lastFrameTime

      if (elapsed > fpsInterval) {
        lastFrameTime = timestamp - (elapsed % fpsInterval)

        if (!this.pause) {
          this.clearCanvas(ctx, canvas)
          this.render(ctx)
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }

  initLinter() {
    // Создание листнера для отслеживания нажатых клавиш
    const pressedKeys: Record<string, boolean> = {}

    const handleKeyDown = (event: KeyboardEvent) => {
      pressedKeys[event.code] = true
      updatePlayerVelocity()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys[event.code] = false
      updatePlayerVelocity()
    }

    const updatePlayerVelocity = () => {
      this.Player.vx =
        (pressedKeys['KeyD'] ? this.Player.speed : 0) -
        (pressedKeys['KeyA'] ? this.Player.speed : 0)
      this.Player.vy =
        (pressedKeys['KeyS'] ? this.Player.speed : 0) -
        (pressedKeys['KeyW'] ? this.Player.speed : 0)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }

  initTimer() {
    //таймер
    const intervalId = setInterval(() => {
      if (!this.pause) {
        Timer.seconds++
        if (this.bossChance > 10) {
          this.bossChance -= 2
        }
        if (Timer.seconds == 60) {
          Timer.minutes++
          Timer.seconds = 0
          if (this.maxEnemyLevel < 4) {
            if (Timer.minutes % 2 == 0) {
              this.maxEnemyLevel += 1
            }
          }

          this.spawnRate = Math.floor(this.spawnRate / 1.2) + 1
        }
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }

  render(ctx: CanvasRenderingContext2D) {
    this.Bullets.renderBullet(ctx)
    this.Bullets.createBullet()
    this.Enemies.renderEnemies(ctx)
    this.Exp.renderExp(ctx)
    this.Camera.cameraMovement()
    this.Player.renderPlayer(ctx)
    this.TextParticles.renderTextParticles(ctx)
    this.Enemies.createEnemy()
    this.drawTimer(ctx)

    this.GameTick++
  }

  destroy() {
    this.destroyers.forEach(func => func())
  }

  clearCanvas(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement) {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
  }

  handleUpgrade(id: number) {
    this.pause = false
    this.setShowCards(false)
    this.Player.upgrade(id)
  }

  drawTimer(ctx: CanvasRenderingContext2D) {
    const minutes = Timer.minutes < 10 ? '0' + Timer.minutes : Timer.minutes
    const seconds = Timer.seconds < 10 ? '0' + Timer.seconds : Timer.seconds
    ctx.save()
    ctx.strokeStyle = 'white'
    ctx.fillStyle = '#242424'
    ctx.font = '24px pixel'
    ctx.fillText(minutes + ':' + seconds, this.CanvasWidth / 2 - 40, 50)
    ctx.strokeText(minutes + ':' + seconds, this.CanvasWidth / 2 - 40, 50)
    ctx.fillText('HP: ' + this.Player.hp, this.CanvasWidth - 85, 50)
    ctx.strokeText('HP: ' + this.Player.hp, this.CanvasWidth - 85, 50)
    ctx.fillText('LVL: ' + this.Player.level, 8, 50)
    ctx.strokeText('LVL: ' + this.Player.level, 8, 50)
    ctx.restore()
  }
}

export default Game
