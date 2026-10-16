import { useCallback, useEffect, useRef } from 'react'

export type FrameCallback = (deltaTime: number, elapsedTime: number) => void
export type FrameSubscribe = (callback: FrameCallback) => () => void

export const useFrameLoop = (onFrameEnd: () => void, enabled: boolean): FrameSubscribe => {
  const subscribersRef = useRef(new Set<FrameCallback>())
  const onFrameEndRef = useRef(onFrameEnd)

  useEffect(() => {
    onFrameEndRef.current = onFrameEnd
  }, [onFrameEnd])

  useEffect(() => {
    if (!enabled) return

    let frameId: number
    let startTime: number | null = null
    let previousTime: number | null = null

    const tick = (time: number) => {
      if (startTime === null) startTime = time

      if (previousTime !== null) {
        const deltaTime = (time - previousTime) / 1000
        const elapsedTime = (time - startTime) / 1000

        subscribersRef.current.forEach(callback => callback(deltaTime, elapsedTime))
        onFrameEndRef.current()
      }

      previousTime = time
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [enabled])

  return useCallback<FrameSubscribe>((callback) => {
    const subscribers = subscribersRef.current
    subscribers.add(callback)
    return () => {
      subscribers.delete(callback)
    }
  }, [])
}
