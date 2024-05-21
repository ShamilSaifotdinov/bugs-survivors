import Camera from '../../Camera'
import { Game } from '../../'

describe('Camera', () => {
  let camera: Camera
  let mockGame: Game

  beforeEach(() => {
    mockGame = {
      CanvasWidth: 800,
      CanvasHeight: 600,
      Player: {
        x: 100,
        y: 100,
        width: 50,
        height: 50,
      },
    } as unknown as Game
    camera = new Camera(mockGame)
  })

  test('initializes with correct default values', () => {
    expect(camera.x).toBe(0)
    expect(camera.y).toBe(0)
  })

  test('stops moving camera if the target position is very close', () => {
    // Set the camera position very close to the target position
    camera.x =
      mockGame.CanvasWidth / 2 -
      (mockGame.Player.x + mockGame.Player.width / 2) -
      0.5
    camera.y =
      mockGame.CanvasHeight / 2 -
      (mockGame.Player.y + mockGame.Player.height / 2) -
      0.5

    camera.cameraMovement()

    // The camera should not move significantly if it's already very close to the target
    expect(camera.x).toBeCloseTo(
      mockGame.CanvasWidth / 2 -
        (mockGame.Player.x + mockGame.Player.width / 2) -
        0.5
    )
    expect(camera.y).toBeCloseTo(
      mockGame.CanvasHeight / 2 -
        (mockGame.Player.y + mockGame.Player.height / 2) -
        0.5
    )
  })
})
