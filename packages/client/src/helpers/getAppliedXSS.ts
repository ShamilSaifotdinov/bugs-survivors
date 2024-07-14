import { filterXSS } from 'xss'

function getAppliedXSS<T>(value: T): string | T {
  return typeof value === 'string' ? filterXSS(value) : value
}

export default getAppliedXSS
