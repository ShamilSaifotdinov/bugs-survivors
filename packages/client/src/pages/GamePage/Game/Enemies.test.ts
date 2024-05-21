import Enemies from './Enemies'
import Game from './'

describe('Enemies', () => {
  let mockGame: Game
  let enemies: Enemies

  beforeEach(() => {
    mockGame = {
      CanvasWidth: 800,
      CanvasHeight: 600,
      GameTick: 0,
      spawnRate: 60,
      minEnemyLevel: 1,
      maxEnemyLevel: 3,
      bossChance: 10,
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
      Enemies: { state: [] },
      Exp: {
        createExp: jest.fn(),
      },
      TextParticles: {
        createTextParticles: jest.fn(),
      },
    } as unknown as Game
    enemies = new Enemies(mockGame)
    enemies.spriteIsLoaded = true
  })

  test('should create enemy objects', () => {
    enemies.createEnemy()
    expect(enemies.state.length).toBe(1)
    expect(enemies.state[0]).toMatchObject({
      width: expect.any(Number),
      height: expect.any(Number),
      x: expect.any(Number),
      y: expect.any(Number),
      speed: 1,
      frame: 0,
      frameLine: 0,
      frameSize: 16,
      hp: expect.any(Number),
      level: expect.any(Number),
    })
  })

  test('should move enemy towards the player', () => {
    enemies.createEnemy()
    const enemy = enemies.state[0]
    const initialX = enemy.x
    const initialY = enemy.y

    enemies.moveEnemyTowardsPlayer(enemy, mockGame.Player, enemies.state)

    expect(enemy.x).not.toBe(initialX)
    expect(enemy.y).not.toBe(initialY)
  })

  test('should avoid collision with other enemies', () => {
    enemies.createEnemy()
    enemies.createEnemy()

    const enemy1 = enemies.state[0]
    const enemy2 = enemies.state[1]
    enemy2.x = enemy1.x + 20
    enemy2.y = enemy1.y + 20

    enemies.moveEnemyTowardsPlayer(enemy1, mockGame.Player, enemies.state)
    enemies.moveEnemyTowardsPlayer(enemy2, mockGame.Player, enemies.state)

    const distanceBetweenEnemies = Math.sqrt(
      (enemy1.x - enemy2.x) ** 2 + (enemy1.y - enemy2.y) ** 2
    )
    expect(distanceBetweenEnemies).toBeGreaterThan(20)
  })

  test('should remove enemy when hp is 0 and create exp', () => {
    enemies.createEnemy()
    const enemy = enemies.state[0]
    enemy.hp = 0

    const ctx = document.createElement('canvas').getContext('2d')
    enemies.renderEnemies(ctx as CanvasRenderingContext2D)

    expect(enemies.state.length).toBe(0)
    expect(enemies.diedEnemies).toBe(1)
    expect(mockGame.Exp.createExp).toHaveBeenCalledWith(
      enemy.x,
      enemy.y,
      enemy.level * enemy.level
    )
  })
})
