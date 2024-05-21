import { useEffect, useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import convertSeconds from '../../helpers/convertSeconds'
import styles from './styles.module.scss'
import Camera from './Camera'
import TextParticles from './TextParticles'
import Player from './Player'
import Enemies from './Enemies'
import Exps from './Exp'
import Bullets from './Bullets'

let timer = 0
let lastTimerUpdate = performance.now() // Время последнего обновления таймера

export class Game {
  Camera: Camera
  TextParticles: TextParticles
  Player: Player
  Enemies: Enemies
  Exp: Exps
  Bullets: Bullets
  CanvasRef?: React.RefObject<HTMLCanvasElement>
  setShowCards: React.Dispatch<React.SetStateAction<boolean>>

  CanvasWidth = window.innerWidth
  CanvasHeight = window.innerHeight
  GameTick = 0

  pause = false
  spawnRate = 100
  minEnemyLevel = 1
  maxEnemyLevel = 1
  bossChance = 1000

  constructor(
    setShowCards: React.Dispatch<React.SetStateAction<boolean>>,
    public navigate: NavigateFunction
  ) {
    this.Camera = new Camera(this)
    this.TextParticles = new TextParticles(this)
    this.Player = new Player(this)
    this.Enemies = new Enemies(this)
    this.Exp = new Exps(this)
    this.Bullets = new Bullets(this)
    this.setShowCards = setShowCards
  }

  init() {
    useEffect(() => {
      timer = 0
      lastTimerUpdate = performance.now()

      this.initAnimate()

      this.initLinter()
    }, [])
  }

  private initAnimate() {
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
            cancelAnimationFrame(animationFrameId)
            this.finishGame()
          }

          this.GameTick++
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
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
    const now = performance.now()
    if (now - lastTimerUpdate >= 1000) {
      lastTimerUpdate = now
      timer++

      if (this.bossChance > 10) {
        this.bossChance -= 2
      }
      if (timer % 60 === 0) {
        if (timer % 120 === 0 && this.maxEnemyLevel < 4) {
          this.maxEnemyLevel += 1
        }
        this.spawnRate = Math.floor(this.spawnRate / 1.2) + 1
      }
    }
  }

  clearCanvas(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement) {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
  }

  handleUpgrade(id: number) {
    this.pause = false
    this.setShowCards(false)
    this.Player.upgrade(id)
    console.log(this.pause)
  }

  private drawTimer(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.strokeStyle = 'white'
    ctx.fillStyle = '#242424'
    ctx.font = '24px pixel'
    ctx.fillText(convertSeconds(timer), this.CanvasWidth / 2 - 40, 50)
    ctx.strokeText(convertSeconds(timer), this.CanvasWidth / 2 - 40, 50)
    ctx.fillText('HP: ' + this.Player.hp, this.CanvasWidth - 85, 50)
    ctx.strokeText('HP: ' + this.Player.hp, this.CanvasWidth - 85, 50)
    ctx.fillText('LVL: ' + this.Player.level, 8, 50)
    ctx.strokeText('LVL: ' + this.Player.level, 8, 50)
    ctx.restore()
  }

  private finishGame() {
    this.navigate('/gameOver', {
      state: {
        time: timer,
        level: this.Player.level,
        diedEnemies: this.Enemies.diedEnemies,
      },
    })
  }
}

function layout() {
  const navigate = useNavigate()
  const [showCards, setShowCards] = useState(false)
  const game = new Game(setShowCards, navigate)
  game.CanvasRef = useRef<HTMLCanvasElement>(null)
  game.init()

  function upgrade(id: number) {
    game.handleUpgrade(id)
  }

  return (
    <div className={styles.canvas_container}>
      <canvas
        ref={game.CanvasRef}
        width={game.CanvasWidth}
        height={game.CanvasHeight}></canvas>
    </div>
  )
}

export default layout
