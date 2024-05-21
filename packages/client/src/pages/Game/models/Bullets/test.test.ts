import Bullets from '../../Bullets'
import { Game } from '../../'

describe('Bullets', () => {
  let bullets: Bullets
  let mockGame: Game
  let mockCtx: CanvasRenderingContext2D

  beforeEach(() => {
    mockGame = {
      Camera: { x: 0, y: 0 },
      CanvasWidth: 800,
      CanvasHeight: 600,
      GameTick: 0,
      Player: {
        x: 100,
        y: 100,
        lastDirectionX: 1,
        lastDirectionY: 1,
        damage: 10,
        speed: 1,
        reloadTime: 10,
        flameThrow: 0,
      },
      Enemies: { state: [] },
      TextParticles: { createTextParticles: jest.fn() },
    } as unknown as Game
    bullets = new Bullets(mockGame)

    const canvas = document.createElement('canvas')
    mockCtx = canvas.getContext('2d') as CanvasRenderingContext2D
  })

  it('should initialize with the correct state', () => {
    expect(bullets.state).toEqual([])
    expect(bullets.spriteIsLoaded).toBe(false)
  })

  it('should create a bullet at the correct interval', () => {
    mockGame.GameTick = 10
    bullets.createBullet()

    expect(bullets.state.length).toBe(1)
    expect(bullets.state[0]).toEqual(
      expect.objectContaining({
        width: 70,
        height: 70,
        x: 100,
        y: 100,
        vx: 1,
        vy: 1,
        damage: 10,
        speed: 6,
        frameSize: 16,
        frameLine: 0,
        frame: 0,
      })
    )
  })

  it('should render bullets on the canvas', () => {
    bullets.spriteIsLoaded = true
    bullets.state.push({
      width: 70,
      height: 70,
      x: 100,
      y: 100,
      vx: 1,
      vy: 1,
      damage: 10,
      speed: 6,
      frameSize: 16,
      frameLine: 0,
      frame: 0,
    })

    bullets.renderBullet(mockCtx)

    expect(mockCtx.fillRect).toHaveBeenCalledWith(100, 100, 70, 70)
  })
})
