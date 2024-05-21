import Exps from './Exp'
import Game from './'

describe('Exps', () => {
  let mockGame: Game
  let exps: Exps

  beforeEach(() => {
    mockGame = {
      CanvasWidth: 800,
      CanvasHeight: 600,
      GameTick: 0,
      Camera: { x: 0, y: 0 },
      Player: {
        x: 100,
        y: 150,
        width: 50,
        height: 50,
        lastDirectionX: 1,
        lastDirectionY: 0,
        damage: 10,
        speed: 5,
        reloadTime: 20,
        flameThrow: 0,
        expRadius: 50,
        exp: 0,
      },
      Enemies: {
        state: [],
      },
      TextParticles: {
        createTextParticles: jest.fn(),
      },
    } as unknown as Game
    exps = new Exps(mockGame)
    exps.spriteIsLoaded = true
  })

  test('should create exp objects', () => {
    exps.createExp(100, 100, 5)
    expect(exps.state.length).toBe(5)
    expect(exps.state[0]).toMatchObject({
      x: expect.any(Number),
      y: expect.any(Number),
      vx: 0,
      vy: 0,
      frame: expect.any(Number),
      frameLine: 0,
      frameSize: 8,
      width: 35,
      height: 35,
      lifeTime: 2000,
      isPlayer: false,
    })
  })

  test.skip('should move exp objects towards the player', () => {
    exps.createExp(100, 100, 1)
    const exp = exps.state[0]
    exp.x = 0
    exp.y = 0

    exps.moveExpTowardsPlayer(mockGame.Player, exp)

    expect(exp.vx).not.toBe(0)
    expect(exp.vy).not.toBe(0)
  })

  test.skip('should remove exp objects when they collide with the player', () => {
    exps.createExp(100, 100, 1)
    const exp = exps.state[0]
    exp.x = mockGame.Player.x
    exp.y = mockGame.Player.y

    const ctx = document.createElement('canvas').getContext('2d')
    exps.renderExp(ctx as CanvasRenderingContext2D)

    expect(exps.state.length).toBe(0)
    expect(mockGame.Player.exp).toBe(1)
    expect(mockGame.TextParticles.createTextParticles).toHaveBeenCalledWith(
      '+1',
      mockGame.Player.x + mockGame.Player.width / 2,
      mockGame.Player.y + mockGame.Player.height / 2,
      'rgb(50, 200, 50)'
    )
  })

  test('should decrement lifeTime and remove exp if lifeTime <= 0', () => {
    exps.createExp(100, 100, 1)
    const exp = exps.state[0]
    exp.lifeTime = 1

    const ctx = document.createElement('canvas').getContext('2d')
    exps.renderExp(ctx as CanvasRenderingContext2D)

    expect(exps.state.length).toBe(0)
  })
})
