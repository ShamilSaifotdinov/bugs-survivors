import Game from '.'

interface TextParticle {
  text: string
  lifetime: number
  vx: number
  vy: number
  x: number
  y: number
  color: string
}

class TextParticles {
  state: TextParticle[] = []
  game: Game

  constructor(game: Game) {
    this.game = game
  }

  renderTextParticles(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.state.length; i++) {
      ctx.save()
      ctx.fillStyle = this.state[i].color
      ctx.strokeStyle = '#242424'
      ctx.font = '16px pixel'
      ctx.globalAlpha = this.state[i].lifetime / 100
      ctx.fillText(
        this.state[i].text,
        this.state[i].x + this.game.Camera.x,
        this.state[i].y + this.game.Camera.y
      )
      ctx.strokeText(
        this.state[i].text,
        this.state[i].x + this.game.Camera.x,
        this.state[i].y + this.game.Camera.y
      )
      ctx.restore()

      this.state[i].x += this.state[i].vx
      this.state[i].y += this.state[i].vy

      this.state[i].lifetime--
      if (this.state[i].lifetime <= 0) {
        this.state.splice(i, 1)
      }
    }
  }

  createTextParticles(text: string, x: number, y: number, color: string) {
    this.state.push({
      text: text,
      lifetime: 100,
      vx: 0,
      vy: -1,
      x: x,
      y: y,
      color: color,
    })
  }
}

export default TextParticles
