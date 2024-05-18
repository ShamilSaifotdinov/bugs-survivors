import { useEffect } from 'react'

export const useAsyncEffect = (
  effect: () => Promise<unknown>,
  dependencies: unknown[] = []
) => {
  useEffect(() => {
    let isMounted = true
    const cleanup = effect()

    cleanup.then(result => {
      if (isMounted && typeof result === 'function') {
        return result
      }
    })

    return () => {
      isMounted = false
    }
  }, dependencies)
}
