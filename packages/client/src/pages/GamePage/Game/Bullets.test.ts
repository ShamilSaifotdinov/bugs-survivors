import Bullets from './Bullets'
import Game from './'

// Мокаем CanvasRenderingContext2D
import 'jest-canvas-mock'

const mockGame = {
  Camera: { x: 0, y: 0 },
  CanvasWidth: 800,
  CanvasHeight: 600,
  GameTick: 0,
  Player: {
    x: 50,
    y: 50,
    lastDirectionX: 1,
    lastDirectionY: 0,
    damage: 10,
    speed: 5,
    reloadTime: 60,
    flameThrow: 0,
  },
  Enemies: {
    state: [{ x: 100, y: 100, width: 50, height: 50, hp: 100 }],
  },
  TextParticles: {
    createTextParticles: jest.fn(),
  },
} as unknown as Game

describe('Bullets class', () => {
  let bullets: Bullets

  beforeEach(() => {
    bullets = new Bullets(mockGame)
    bullets.spriteIsLoaded = true
  })

  it('should create a bullet', () => {
    mockGame.GameTick = 60 // Simulate game tick for reloading
    bullets.createBullet()
    expect(bullets.state.length).toBe(1)
    expect(bullets.state[0]).toMatchObject({
      x: mockGame.Player.x,
      y: mockGame.Player.y,
      damage: mockGame.Player.damage,
      speed: 10, // 5 + player speed
    })
  })

  it.skip('should create a flame throw bullet', () => {
    mockGame.Player.flameThrow = 1
    bullets.createBullet()
    expect(bullets.state.length).toBe(1)
    expect(bullets.state[0]).toMatchObject({
      x: mockGame.Player.x,
      y: mockGame.Player.y,
      damage: 6,
      speed: 13, // 8 + player speed
    })
    expect(mockGame.Player.flameThrow).toBe(0)
  })

  it('should remove bullets out of canvas bounds', () => {
    bullets.state.push({
      width: 70,
      height: 70,
      x: 800,
      y: 600,
      vx: 1,
      vy: 0,
      speed: 10,
      damage: 10,
      frameSize: 16,
      frameLine: 0,
      frame: 0,
    })

    const ctx = document.createElement('canvas').getContext('2d')!

    bullets.renderBullet(ctx)

    // Check if bullet is removed after going out of bounds
    expect(bullets.state.length).toBe(0)
  })
})
