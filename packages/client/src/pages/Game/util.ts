export const rand = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min))

export const isPointInsideCircle = (
  x: number,
  y: number,
  px: number,
  py: number,
  r: number
) => (x - px) ** 2 + (y - py) ** 2 <= r ** 2
