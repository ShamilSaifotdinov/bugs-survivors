export const rand = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min))

export const isPointInsideCircle = (
  x: number,
  y: number,
  px: number,
  py: number,
  r: number
) => (x - px) ** 2 + (y - py) ** 2 <= r ** 2

export function generateRandomNumbers(min: number, max: number): number[] {
  const result: number[] = []
  const numbers: number[] = []

  for (let i = min; i <= max; i++) {
    numbers.push(i)
  }

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    result.push(numbers[randomIndex])
    numbers.splice(randomIndex, 1)
  }

  return result
}
