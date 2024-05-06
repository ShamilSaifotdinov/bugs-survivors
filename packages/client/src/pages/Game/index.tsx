import { useEffect, useRef, useState } from 'react'
import Cards from './components/Cards/Cards'
import styles from './styles.module.scss'

const rand = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min))

const isPointInsideCircle = (
  x: number,
  y: number,
  px: number,
  py: number,
  r: number
) => (x - px) ** 2 + (y - py) ** 2 <= r ** 2

interface GameStage {
  pause: boolean
  spawnRate: number
  minEnemyLevel: number
  maxEnemyLevel: number
  bossChance: number
}

interface TextParticle {
  text: string
  lifetime: number
  vx: number
  vy: number
  x: number
  y: number
  color: string
}

interface Player {
  width: number
  height: number
  x: number
  y: number
  speed: number
  vx: number
  vy: number
  frameSize: number
  frameLine: number
  frame: number
  lastDirectionX: number
  lastDirectionY: number
  reloadTime: number
  damage: number
  exp: number
  level: number
  nextExp: number
  expRadius: number
  flameThrow: number
  hp: number
  deadless: number
}

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

interface Camera {
  x: number
  y: number
}

interface Bullet {
  width: number
  height: number
  x: number
  y: number
  speed: number
  damage: number
  vx: number
  vy: number
  frameSize: number
  frameLine: number
  frame: number
}

interface Exp {
  width: number
  height: number
  x: number
  y: number
  vx: number
  vy: number
  frameSize: number
  frameLine: number
  frame: number
  lifeTime: number
  isPlayer: boolean
}

const GameStage: GameStage = {
  pause: false,
  spawnRate: 100,
  minEnemyLevel: 1,
  maxEnemyLevel: 1,
  bossChance: 1000,
}

const Timer = {
  seconds: 0,
  minutes: 0,
}

const Camera: Camera = {
  x: 0,
  y: 0,
}

const Player: Player = {
  width: 70,
  height: 70,
  x: 0,
  y: 0,
  speed: 3, //max speed 16
  vx: 0,
  vy: 0,
  frameSize: 16,
  frameLine: 0,
  frame: 0,
  lastDirectionX: 0,
  lastDirectionY: 1,
  reloadTime: 60,
  damage: 1, //max damage 11
  level: 0,
  exp: 0,
  nextExp: 2,
  expRadius: 100,
  flameThrow: 0,
  hp: 3,
  deadless: 100,
}

const TextParticles: TextParticle[] = []

const Enemy: Enemy[] = []

const Bullet: Bullet[] = []

const Exp: Exp[] = []

function Game() {
  const CanvasRef = useRef<HTMLCanvasElement>(null)
  const CanvasWidth = window.innerWidth
  const CanvasHeight = window.innerHeight
  let GameTick = 0

  const [showCards, setShowCards] = useState(false)

  const [playerLoaded, setPlayerLoaded] = useState(false)
  const [enemyLoaded, setEnemyLoaded] = useState(false)
  const [bulletLoaded, setBulletLoaded] = useState(false)
  const [expLoaded, setExpLoaded] = useState(false)

  const PlayerSprite = new Image()
  PlayerSprite.src = 'src/pages/Game/assets/player.png'

  const EnemySprite = new Image()
  EnemySprite.src = 'src/pages/Game/assets/enemy.png'

  const BulletSprite = new Image()
  BulletSprite.src = 'src/pages/Game/assets/bullet.png'

  const ExpSprite = new Image()
  ExpSprite.src = 'src/pages/Game/assets/exp.png'

  function renderTextParticles(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < TextParticles.length; i++) {
      ctx.save()
      ctx.fillStyle = TextParticles[i].color
      ctx.strokeStyle = '#242424'
      ctx.font = '16px pixel'
      ctx.globalAlpha = TextParticles[i].lifetime / 100
      ctx.fillText(
        TextParticles[i].text,
        TextParticles[i].x + Camera.x,
        TextParticles[i].y + Camera.y
      )
      ctx.strokeText(
        TextParticles[i].text,
        TextParticles[i].x + Camera.x,
        TextParticles[i].y + Camera.y
      )
      ctx.restore()

      TextParticles[i].x += TextParticles[i].vx
      TextParticles[i].y += TextParticles[i].vy

      TextParticles[i].lifetime--
      if (TextParticles[i].lifetime <= 0) {
        TextParticles.splice(i, 1)
      }
    }
  }

  function createTextParticles(
    text: string,
    x: number,
    y: number,
    color: string
  ) {
    TextParticles.push({
      text: text,
      lifetime: 100,
      vx: 0,
      vy: -1,
      x: x,
      y: y,
      color: color,
    })
  }

  function renderExp(ctx: CanvasRenderingContext2D) {
    if (expLoaded) {
      for (let i = 0; i < Exp.length; i++) {
        ctx.fillStyle = 'lime'
        ctx.fillRect(
          Math.floor(Exp[i].x + Camera.x),
          Math.floor(Exp[i].y + Camera.y),
          Exp[i].width,
          Exp[i].height
        )

        Exp[i].x += Exp[i].vx
        Exp[i].y += Exp[i].vy

        moveExpTowardsPlayer(Player, Exp[i])

        if (
          isPointInsideCircle(
            Exp[i].x,
            Exp[i].y,
            Player.x + Player.width / 2,
            Player.y + Player.height / 2,
            20
          )
        ) {
          Exp.splice(i, 1)
          Player.exp++
          createTextParticles(
            '+1',
            Player.x + Player.width / 2,
            Player.y + Player.height / 2,
            'rgb(50, 200, 50)'
          )
        }

        if (Exp[i]) {
          Exp[i].lifeTime--
          if (Exp[i].lifeTime <= 0) {
            Exp.splice(i, 1)
          }
        }
      }
    }
  }

  function createExp(x: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      Exp.push({
        x: x + rand(-count * count, count * count),
        y: y + rand(-count * count, count * count),
        vx: 0,
        vy: 0,
        frame: [0, 8][rand(0, 1)],
        frameLine: 0,
        frameSize: 8,
        width: 35,
        height: 35,
        lifeTime: 2000,
        isPlayer: false,
      })
    }
  }

  function renderBullet(ctx: CanvasRenderingContext2D) {
    if (bulletLoaded) {
      for (let i = 0; i < Bullet.length; i++) {
        ctx.fillStyle = 'yellow'
        ctx.fillRect(
          Math.floor(Bullet[i].x + Camera.x),
          Math.floor(Bullet[i].y + Camera.y),
          Bullet[i].width,
          Bullet[i].height
        )

        Bullet[i].x +=
          Bullet[i].vx * Bullet[i].speed +
          rand(-Bullet[i].damage, Bullet[i].damage)
        Bullet[i].y +=
          Bullet[i].vy * Bullet[i].speed +
          rand(-Bullet[i].damage, Bullet[i].damage)

        if (GameTick % 12 == 0) {
          Bullet[i].frame += Bullet[i].frameSize
          if (Bullet[i].frame >= 16 * 4) {
            Bullet[i].frame = 0
          }
        }

        const bxcx = Bullet[i].x + Camera.x
        const bycy = Bullet[i].y + Camera.y

        if (
          bxcx > CanvasWidth ||
          bxcx + Bullet[i].width < 0 ||
          bycy > CanvasHeight ||
          bycy + Bullet[i].height < 0
        ) {
          Bullet.splice(i, 1)
        }

        if (Bullet[i]) {
          for (let j = 0; j < Enemy.length; j++) {
            if (
              Bullet[i].x + Bullet[i].width / 2 > Enemy[j].x &&
              Bullet[i].x < Enemy[j].x + Enemy[j].width / 2 &&
              Bullet[i].y > Enemy[j].y &&
              Bullet[i].y < Enemy[j].y + Enemy[j].height / 2
            ) {
              Enemy[j].hp -= Bullet[i].damage
              createTextParticles(
                '-' + Bullet[i].damage,
                Enemy[j].x + Enemy[j].width / 2,
                Enemy[j].y + Enemy[j].height / 2,
                'pink'
              )
              Bullet.splice(i, 1)
              break
            }
          }
        }
      }
    }
  }

  function createBullet() {
    if (GameTick % Player.reloadTime == 0) {
      Bullet.push({
        width: 70,
        height: 70,
        x: Player.x,
        y: Player.y,
        vx: Player.lastDirectionX,
        vy: Player.lastDirectionY,
        damage: Player.damage,
        speed: 5 + Player.speed,
        frameSize: 16,
        frameLine: 0,
        frame: 0,
      })
    }

    if (Player.flameThrow > 0) {
      Bullet.push({
        width: 85,
        height: 85,
        x: Player.x,
        y: Player.y,
        vx: Player.lastDirectionX,
        vy: Player.lastDirectionY,
        damage: 6,
        speed: 8 + Player.speed,
        frameSize: 16,
        frameLine: 0,
        frame: 0,
      })

      Player.flameThrow--
    }
  }

  function cameraMovement() {
    const targetCameraX = CanvasWidth / 2 - (Player.x + Player.width / 2)
    const targetCameraY = CanvasHeight / 2 - (Player.y + Player.height / 2)

    if (
      Math.abs(Camera.x - targetCameraX) > 1 ||
      Math.abs(Camera.y - targetCameraY) > 1
    ) {
      const lerpFactor = 0.1
      Camera.x += Math.floor((targetCameraX - Camera.x) * lerpFactor)
      Camera.y += Math.floor((targetCameraY - Camera.y) * lerpFactor)
    }
  }

  function renderPlayer(ctx: CanvasRenderingContext2D) {
    if (playerLoaded) {
      if (Player.deadless > 0) {
        ctx.globalAlpha = 0.5

        Player.deadless--
      }

      ctx.fillStyle = 'pink'
      ctx.fillRect(
        Math.floor(Player.x + Camera.x),
        Math.floor(Player.y + Camera.y),
        Player.width,
        Player.height
      )

      ctx.globalAlpha = 1

      // ctx.save();
      // ctx.strokeStyle = 'rgb(0,255,0,0.07)';
      // ctx.lineWidth = 5;
      // ctx.setLineDash([5, 15]);
      // ctx.beginPath();
      // ctx.arc(
      //   Player.x + Player.width / 2 + Camera.x,
      //   Player.y + Player.height / 2 + Camera.y,
      //   Player.expRadius,
      //   0,
      //   Math.PI * 2
      // );
      // ctx.stroke();
      // ctx.restore();

      ctx.save()
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, CanvasWidth, 10)
      ctx.fillStyle = 'rgb(55, 150, 155)'
      ctx.fillRect(0, 0, (Player.exp / Player.nextExp) * CanvasWidth, 10)

      Player.x += Player.vx
      Player.y += Player.vy

      if (Player.vx === 0 && Player.vy === 0) {
        Player.frame = 0
      } else {
        if (Player.vy > 0) {
          Player.frameLine = 0
          Player.lastDirectionY = 1
          Player.lastDirectionX = 0
        } else if (Player.vy < 0) {
          Player.frameLine = 16 * 4
          Player.lastDirectionY = -1
          Player.lastDirectionX = 0
        }

        if (Player.vx < 0) {
          Player.frameLine = Player.vy === 0 ? 16 * 2 : 16
          Player.lastDirectionX = -1
          Player.lastDirectionY = 0
        } else if (Player.vx > 0) {
          Player.frameLine = Player.vy === 0 ? 16 * 6 : 16 * 7
          Player.lastDirectionX = 1
          Player.lastDirectionY = 0
        }

        if (Player.vx !== 0 && Player.vy !== 0) {
          if (Player.vx < 0 && Player.vy < 0) {
            Player.frameLine = 16 * 3
            Player.lastDirectionX = -1
            Player.lastDirectionY = -1
          } else if (Player.vx < 0 && Player.vy > 0) {
            Player.frameLine = 16
            Player.lastDirectionX = -1
            Player.lastDirectionY = 1
          } else if (Player.vx > 0 && Player.vy < 0) {
            Player.frameLine = 16 * 5
            Player.lastDirectionX = 1
            Player.lastDirectionY = -1
          } else if (Player.vx > 0 && Player.vy > 0) {
            Player.frameLine = 16 * 7
            Player.lastDirectionX = 1
            Player.lastDirectionY = 1
          }
        }
      }

      if (
        GameTick % (18 - Player.speed) == 0 &&
        (Player.vx != 0 || Player.vy != 0)
      ) {
        Player.frame += Player.frameSize
        if (Player.frame >= 16 * 4) {
          Player.frame = 0
        }
      }

      const filteredEnemies = Enemy.filter(enemy =>
        isPointInsideCircle(
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2,
          Player.x + Player.width / 2,
          Player.y + Player.height / 2,
          50
        )
      )

      if (filteredEnemies.length > 0) {
        if (Player.deadless == 0) {
          Player.hp--
          Player.deadless = 200
          Camera.y -= 20
        }
      }

      if (Player.hp <= 0) {
        alert('YOU DEAD!!!')
        Player.hp = 3
      }

      if (Player.exp >= Player.nextExp) {
        setShowCards(true)
        Player.exp = 0
        Player.level++
        Player.nextExp += (Player.level + 1) / 2
        GameStage.pause = true
      }
    }
  }

  function renderEnemies(ctx: CanvasRenderingContext2D) {
    if (enemyLoaded) {
      for (let i = 0; i < Enemy.length; i++) {
        const side = Enemy[i].x > Player.x ? 16 : 0

        ctx.fillStyle = 'red'
        ctx.fillRect(
          Math.floor(Enemy[i].x + Camera.x),
          Math.floor(Enemy[i].y + Camera.y),
          Enemy[i].width,
          Enemy[i].height
        )

        if (GameTick % 9 == 0) {
          Enemy[i].frame += Enemy[i].frameSize
          if (Enemy[i].frame >= 16 * 4) {
            Enemy[i].frame = 0
          }
        }

        if (Enemy[i].x + Camera.x + Enemy[i].width < -100) {
          Enemy[i].x = Player.x + CanvasWidth / 2
        }

        if (Enemy[i].x + Camera.x > CanvasWidth + 100) {
          Enemy[i].x = Player.x - CanvasWidth / 2
        }

        if (Enemy[i].y + Camera.y < -100) {
          Enemy[i].y = Player.y + CanvasHeight / 2
        }

        if (Enemy[i].y + Enemy[i].height + Camera.y > CanvasHeight + 100) {
          Enemy[i].y = Player.y - CanvasHeight / 2
        }

        moveEnemyTowardsPlayer(Enemy[i], Player, Enemy)

        if (Enemy[i].hp <= 0) {
          createExp(Enemy[i].x, Enemy[i].y, Enemy[i].level * Enemy[i].level)
          Enemy.splice(i, 1)
        }
      }
    }
  }

  function createEnemy() {
    if (GameTick % GameStage.spawnRate == 0) {
      if (Enemy.length < 400) {
        const x = Player.x + (CanvasWidth / 2) * [-1, 1][rand(0, 1)]
        const y = Player.y + (CanvasHeight / 2) * [-1, 1][rand(0, 1)]
        const side = ['x', 'y'][rand(0, 1)]
        const level = rand(GameStage.minEnemyLevel, GameStage.maxEnemyLevel)
        const isBoss = rand(0, GameStage.bossChance) == GameStage.bossChance
        if (Enemy.length < 512) {
          Enemy.push({
            width: 70 + (isBoss ? 100 : 0),
            height: 70 + (isBoss ? 100 : 0),
            x: x + rand(0, CanvasWidth) * (side == 'x' ? 1 : 0),
            y: y + rand(0, CanvasHeight) * (side == 'y' ? 1 : 0),
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

  function moveEnemyTowardsPlayer(
    enemy: Enemy,
    player: Player,
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

  function upgrade(id: number) {
    switch (id) {
      //increase speed
      case 0:
        {
          if (Player.speed < 16) {
            Player.speed++
            createTextParticles(
              '+1 speed',
              Player.x + Player.width / 2,
              Player.y + Player.height / 2,
              'gold'
            )
          }
        }
        break

      //add 1 hp
      case 1:
        {
          Player.hp++
          createTextParticles(
            '+1 hp',
            Player.x + Player.width / 2,
            Player.y + Player.height / 2,
            'gold'
          )
        }
        break

      //increase damage
      case 2:
        {
          if (Player.damage < 11) {
            Player.damage++
            createTextParticles(
              '+1 damage',
              Player.x + Player.width / 2,
              Player.y + Player.height / 2,
              'gold'
            )
          }
        }
        break

      //increase reload speed
      case 3:
        {
          Player.reloadTime = Math.floor(Player.reloadTime / 1.25)
          createTextParticles(
            '-25% reload time',
            Player.x + Player.width / 2,
            Player.y + Player.height / 2,
            'gold'
          )
        }
        break

      case 4:
        {
          Player.expRadius = Math.floor(Player.expRadius * 1.2)
          createTextParticles(
            '+20% magnet radius',
            Player.x + Player.width / 2,
            Player.y + Player.height / 2,
            'gold'
          )
        }
        break

      //kill all
      case 5:
        {
          for (let i = 0; i < Enemy.length; i++) {
            if (i % 2 == 0) {
              Enemy[i].hp = 0
              createTextParticles(
                'ULTRA KILL',
                Player.x + Player.width / 2,
                Player.y + Player.height / 2,
                'red'
              )
            }
          }
        }
        break

      //fire
      case 6:
        {
          Player.flameThrow = 500
          createTextParticles(
            'FLAMETHROW',
            Player.x + Player.width / 2,
            Player.y + Player.height / 2,
            'red'
          )
        }
        break

      //deadless
      case 7: {
        Player.deadless = 900
        createTextParticles(
          'DEADLESS',
          Player.x + Player.width / 2,
          Player.y + Player.height / 2,
          'red'
        )
      }
    }
  }

  function moveExpTowardsPlayer(player: Player, exp: Exp) {
    for (let i = 0; i < Exp.length; i++) {
      const dxPlayer = player.x + player.width / 2 - exp.x
      const dyPlayer = player.y + player.height / 2 - exp.y
      const distancePlayer = Math.sqrt(
        dxPlayer * dxPlayer + dyPlayer * dyPlayer
      )

      const directionXPlayer = dxPlayer / distancePlayer
      const directionYPlayer = dyPlayer / distancePlayer

      if (
        isPointInsideCircle(
          exp.x,
          exp.y,
          Player.x + Player.width / 2,
          Player.y + Player.height / 2,
          Player.expRadius
        )
      ) {
        exp.vx = directionXPlayer * (Player.speed + 3)
        exp.vy = directionYPlayer * (Player.speed + 3)
      }
    }
  }

  function drawTimer(ctx: CanvasRenderingContext2D) {
    const minutes = Timer.minutes < 10 ? '0' + Timer.minutes : Timer.minutes
    const seconds = Timer.seconds < 10 ? '0' + Timer.seconds : Timer.seconds
    ctx.save()
    ctx.strokeStyle = 'white'
    ctx.fillStyle = '#242424'
    ctx.font = '24px pixel'
    ctx.fillText(minutes + ':' + seconds, CanvasWidth / 2 - 40, 50)
    ctx.strokeText(minutes + ':' + seconds, CanvasWidth / 2 - 40, 50)
    ctx.fillText('HP: ' + Player.hp, CanvasWidth - 85, 50)
    ctx.strokeText('HP: ' + Player.hp, CanvasWidth - 85, 50)
    ctx.fillText('LVL: ' + Player.level, 8, 50)
    ctx.strokeText('LVL: ' + Player.level, 8, 50)
    ctx.restore()
  }

  function clearCanvas(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement) {
    ctx.clearRect(0, 0, cnv.width, cnv.height)
  }

  useEffect(() => {
    const canvas = CanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = false

    PlayerSprite.onload = () => {
      setPlayerLoaded(true)
    }

    EnemySprite.onload = () => {
      setEnemyLoaded(true)
    }

    BulletSprite.onload = () => {
      setBulletLoaded(true)
    }

    ExpSprite.onload = () => {
      setExpLoaded(true)
    }

    const animate = () => {
      if (!GameStage.pause) {
        clearCanvas(ctx, canvas)
        renderBullet(ctx)
        createBullet()
        renderEnemies(ctx)
        renderExp(ctx)
        cameraMovement()
        renderPlayer(ctx)
        renderTextParticles(ctx)
        createEnemy()
        drawTimer(ctx)

        GameTick++
      }
    }

    const intervalId = setInterval(animate, 1000 / 60) // 60 FPS

    return () => clearInterval(intervalId)
  }, [CanvasRef, playerLoaded, enemyLoaded, bulletLoaded, expLoaded])

  // Создание листнера для отслеживания нажатых клавиш
  useEffect(() => {
    const pressedKeys: Record<number, boolean> = {}

    const handleKeyDown = (event: KeyboardEvent) => {
      pressedKeys[event.which] = true
      updatePlayerVelocity()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys[event.which] = false
      updatePlayerVelocity()
    }

    const updatePlayerVelocity = () => {
      Player.vx =
        (pressedKeys[68] ? Player.speed : 0) -
        (pressedKeys[65] ? Player.speed : 0)
      Player.vy =
        (pressedKeys[83] ? Player.speed : 0) -
        (pressedKeys[87] ? Player.speed : 0)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [CanvasRef, playerLoaded, enemyLoaded, bulletLoaded, expLoaded])

  //таймер
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(Enemy.length)
      if (!GameStage.pause) {
        Timer.seconds++
        if (GameStage.bossChance > 10) {
          GameStage.bossChance -= 2
        }
        if (Timer.seconds == 60) {
          Timer.minutes++
          Timer.seconds = 0
          if (GameStage.maxEnemyLevel < 4) {
            if (Timer.minutes % 2 == 0) {
              GameStage.maxEnemyLevel += 1
            }
          }

          GameStage.spawnRate = Math.floor(GameStage.spawnRate / 1.2) + 1
        }
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [CanvasRef, playerLoaded, enemyLoaded, bulletLoaded, expLoaded])

  const handleUpgrade = (id: number) => {
    GameStage.pause = false
    setShowCards(false)
    upgrade(id)
  }

  return (
    <div className={styles.canvas_container}>
      {showCards && (
        <Cards
          upgradePick={(id: number) => {
            handleUpgrade(id)
          }}
        />
      )}
      <canvas
        ref={CanvasRef}
        width={CanvasWidth}
        height={CanvasHeight}></canvas>
    </div>
  )
}

export default Game
