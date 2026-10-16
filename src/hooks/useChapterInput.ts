import { useEffect, useRef } from 'react'
import { canScrollInDirection, findScrollableAncestor, isTextEntryTarget } from '../utils'
import type { ScrollDirection } from '../utils'

interface ChapterInputHandlers {
  step: (direction: ScrollDirection) => void
  goToFirst: () => void
  goToLast: () => void
  isLocked: () => boolean
}

const WHEEL_THRESHOLD = 50
// Wheel events closer together than this belong to one gesture (including trackpad momentum),
// and one gesture moves at most one chapter.
const WHEEL_GESTURE_GAP_MS = 200
const SWIPE_THRESHOLD = 50

export const useChapterInput = (handlers: ChapterInputHandlers) => {
  const handlersRef = useRef(handlers)

  useEffect(() => {
    handlersRef.current = handlers
  }, [handlers])

  useEffect(() => {
    let wheelAccumulator = 0
    let lastWheelTime = 0
    let gestureUsed = false

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return

      const now = Date.now()
      const direction: ScrollDirection = event.deltaY > 0 ? 1 : -1

      if (now - lastWheelTime > WHEEL_GESTURE_GAP_MS) {
        wheelAccumulator = 0
        gestureUsed = false
      }
      lastWheelTime = now

      const scrollable = findScrollableAncestor(event.target)
      if (scrollable && canScrollInDirection(scrollable, direction)) {
        gestureUsed = true
        return
      }

      event.preventDefault()

      if (gestureUsed || handlersRef.current.isLocked()) return

      wheelAccumulator += event.deltaY

      if (Math.abs(wheelAccumulator) > WHEEL_THRESHOLD) {
        gestureUsed = true
        handlersRef.current.step(direction)
      }
    }

    let touchStart: { x: number; y: number; atTop: boolean; atBottom: boolean } | null = null

    const handleTouchStart = (event: TouchEvent) => {
      const scrollable = findScrollableAncestor(event.target)
      touchStart = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        atTop: !scrollable || !canScrollInDirection(scrollable, -1),
        atBottom: !scrollable || !canScrollInDirection(scrollable, 1),
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const start = touchStart
      touchStart = null
      if (!start || handlersRef.current.isLocked()) return

      const deltaY = start.y - event.changedTouches[0].clientY
      const deltaX = start.x - event.changedTouches[0].clientX

      if (Math.abs(deltaY) <= Math.abs(deltaX) || Math.abs(deltaY) <= SWIPE_THRESHOLD) return

      const direction: ScrollDirection = deltaY > 0 ? 1 : -1

      if (direction > 0 ? !start.atBottom : !start.atTop) return

      handlersRef.current.step(direction)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
      if (isModalOpen() || isTextEntryTarget(event.target)) return

      switch (event.key) {
        case 'Home':
          event.preventDefault()
          handlersRef.current.goToFirst()
          return
        case 'End':
          event.preventDefault()
          handlersRef.current.goToLast()
          return
        case 'ArrowRight':
          event.preventDefault()
          handlersRef.current.step(1)
          return
        case 'ArrowLeft':
          event.preventDefault()
          handlersRef.current.step(-1)
          return
        case 'ArrowDown':
        case 'PageDown':
        case 'ArrowUp':
        case 'PageUp': {
          const direction: ScrollDirection = event.key === 'ArrowDown' || event.key === 'PageDown' ? 1 : -1
          const scrollable = findScrollableAncestor(event.target)
          if (scrollable && canScrollInDirection(scrollable, direction)) return

          event.preventDefault()
          handlersRef.current.step(direction)
          return
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export const isModalOpen = () => document.querySelector('[aria-modal="true"]') !== null
