import CanvasController from './controller'

export interface IGame {
  canvas?: CanvasController
  init: () => void
  render: (ctx: CanvasRenderingContext2D) => void
  destroy: () => void
}
