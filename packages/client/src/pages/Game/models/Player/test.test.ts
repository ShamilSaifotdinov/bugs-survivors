import Player from '../../Player'
import { isPointInsideCircle } from '../../util'
import { Game } from '../../'

jest.mock('../../util', () => ({
  isPointInsideCircle: jest.fn(),
}))

describe('Player', () => {
  let game: Game
  let player: Player
  let ctx: CanvasRenderingContext2D

  beforeEach(() => {
    game = {
      CanvasWidth: 800,
      CanvasHeight: 600,
      Player: {
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        speed: 5,
        exp: 0,
        expRadius: 100,
      },
      Camera: { x: 0, y: 0 },
      Enemies: {
        state: [],
      },
      TextParticles: {
        createTextParticles: jest.fn(),
      },
      setShowCards: jest.fn(),
    } as unknown as Game

    player = new Player(game)
    player.spriteIsLoaded = true
    ctx = document
      .createElement('canvas')
      .getContext('2d') as CanvasRenderingContext2D
  })

  test('should initialize with default values', () => {
    expect(player.width).toBe(70)
    expect(player.height).toBe(70)
    expect(player.speed).toBe(3)
    expect(player.hp).toBe(3)
    expect(player.exp).toBe(0)
    expect(player.level).toBe(0)
    expect(player.expRadius).toBe(100)
  })

  test('should increase exp and level up when exp exceeds nextExp', () => {
    player.exp = 2
    player.nextExp = 2
    player.renderPlayer(ctx)

    expect(player.exp).toBe(0)
    expect(player.level).toBe(1)
    expect(player.nextExp).toBeCloseTo(3)
    expect(game.setShowCards).toHaveBeenCalledWith(true)
  })

  test('should decrease hp and set deadless when colliding with enemy', () => {
    player.deadless = 0
    game.Enemies.state.push({
      x: 50,
      y: 50,
      width: 30,
      height: 30,
      speed: 1,
      frameSize: 16,
      frameLine: 0,
      frame: 0,
      hp: 1,
      level: 1,
    })
    ;(isPointInsideCircle as jest.Mock).mockReturnValue(true)
    player.renderPlayer(ctx)

    expect(player.hp).toBe(2)
    expect(player.deadless).toBe(200)
  })

  test('should upgrade player speed', () => {
    player.speed = 3
    player.upgrade(0)

    expect(player.speed).toBe(4)
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      '+1 speed',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'gold'
    )
  })

  test('should upgrade player hp', () => {
    player.hp = 3
    player.upgrade(1)

    expect(player.hp).toBe(4)
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      '+1 hp',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'gold'
    )
  })

  test('should upgrade player damage', () => {
    player.damage = 1
    player.upgrade(2)

    expect(player.damage).toBe(2)
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      '+1 damage',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'gold'
    )
  })

  test('should upgrade player reload speed', () => {
    player.reloadTime = 60
    player.upgrade(3)

    expect(player.reloadTime).toBe(48)
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      '-25% reload time',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'gold'
    )
  })

  test('should upgrade player exp radius', () => {
    player.expRadius = 100
    player.upgrade(4)

    expect(player.expRadius).toBe(120)
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      '+20% magnet radius',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'gold'
    )
  })

  test('should kill all enemies', () => {
    game.Enemies.state.push(
      {
        hp: 10,
        x: 0,
        y: 0,
        width: 30,
        height: 30,
        speed: 1,
        frameSize: 16,
        frameLine: 0,
        frame: 0,
        level: 1,
      },
      {
        hp: 10,
        x: 0,
        y: 0,
        width: 30,
        height: 30,
        speed: 1,
        frameSize: 16,
        frameLine: 0,
        frame: 0,
        level: 1,
      }
    )

    player.upgrade(5)

    expect(game.Enemies.state[0].hp).toBe(0)
    expect(game.Enemies.state[1].hp).toBe(10) // Second enemy remains unaffected
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      'ULTRA KILL',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'red'
    )
  })

  test('should enable flamethrow', () => {
    player.flameThrow = 0
    player.upgrade(6)

    expect(player.flameThrow).toBe(500)
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      'FLAMETHROW',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'red'
    )
  })

  test('should enable deadless', () => {
    player.deadless = 0
    player.upgrade(7)

    expect(player.deadless).toBe(900)
    expect(game.TextParticles.createTextParticles).toHaveBeenCalledWith(
      'DEADLESS',
      player.x + player.width / 2,
      player.y + player.height / 2,
      'red'
    )
  })
})
