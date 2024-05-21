import { NavigateFunction } from 'react-router-dom'
import CanvasController from '../../../components/Canvas/controller'
import { IGame } from '../../../components/Canvas/interfaces'
import convertSeconds from '../../../helpers/convertSeconds'
import Camera from './Camera'
import TextParticles from './TextParticles'
import Player from './Player'
import Enemies from './Enemies'
import Exps from './Exp'
import Bullets from './Bullets'

class Game implements IGame {
  Camera: Camera
  TextParticles: TextParticles
  Player: Player
  Enemies: Enemies
  Exp: Exps
  Bullets: Bullets

  canvas?: CanvasController
  CanvasWidth = window.innerWidth
  CanvasHeight = window.innerHeight
  GameTick = 0
  timer = 0
  lastTimerUpdate?: number // Время последнего обновления таймера

  pause = false
  spawnRate = 100
  minEnemyLevel = 1
  maxEnemyLevel = 1
  bossChance = 1000

  destroyers: Array<() => void> = []

  constructor(
    public setShowCards: React.Dispatch<React.SetStateAction<boolean>>,
    public navigate: NavigateFunction
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
      this.initAnimate()

      this.destroyers.push(this.initLinter())

      this.lastTimerUpdate = performance.now()
      this.updateTimer()
    })
  }

  private initAnimate() {
    if (this.canvas) {
      this.canvas.canvas.width = this.CanvasWidth
      this.canvas.canvas.height = this.CanvasHeight
      this.canvas.initAnimate()
    }
  }

  private initLinter() {
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

  private updateTimer() {
    if (!this.pause && this.lastTimerUpdate) {
      const now = performance.now()
      if (now - this.lastTimerUpdate >= 1000) {
        this.lastTimerUpdate = now
        this.timer++

        if (this.bossChance > 10) {
          this.bossChance -= 2
        }
        if (this.timer % 60 === 0) {
          if (this.timer % 120 === 0 && this.maxEnemyLevel < 4) {
            this.maxEnemyLevel += 1
          }
          this.spawnRate = Math.floor(this.spawnRate / 1.2) + 1
        }
      }
    }
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
    this.updateTimer()

    if (this.Player.hp === 0) {
      this.finishGame()
    }

    this.GameTick++
  }

  destroy() {
    this.destroyers.forEach(func => func())
  }

  handleUpgrade(id: number) {
    this.pause = false
    this.canvas?.resume()
    this.setShowCards(false)
    this.Player.upgrade(id)
  }

  private drawTimer(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.strokeStyle = 'white'
    ctx.fillStyle = '#242424'
    ctx.font = '24px pixel'
    ctx.fillText(convertSeconds(this.timer), this.CanvasWidth / 2 - 40, 50)
    ctx.strokeText(convertSeconds(this.timer), this.CanvasWidth / 2 - 40, 50)
    ctx.fillText('HP: ' + this.Player.hp, this.CanvasWidth - 85, 50)
    ctx.strokeText('HP: ' + this.Player.hp, this.CanvasWidth - 85, 50)
    ctx.fillText('LVL: ' + this.Player.level, 8, 50)
    ctx.strokeText('LVL: ' + this.Player.level, 8, 50)
    ctx.restore()
  }

  private finishGame() {
    this.navigate('/gameOver', {
      state: {
        time: this.timer,
        level: this.Player.level,
        diedEnemies: this.Enemies.diedEnemies,
      },
    })
  }
}

export default Game
