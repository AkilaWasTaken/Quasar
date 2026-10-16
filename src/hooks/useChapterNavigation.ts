import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CHAPTERS } from '../config'
import type { ScrollDirection } from '../utils'
import { isModalOpen, useChapterInput } from './useChapterInput'

const CHAPTER_PROGRESS = CHAPTERS.map((_, index) => index / (CHAPTERS.length - 1))
const TRANSITION_MS = 600

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export const useChapterNavigation = (onProgress: (progress: number) => void) => {
  const [currentChapter, setCurrentChapter] = useState(1)

  const currentChapterRef = useRef(1)
  const progressRef = useRef(0)
  const isTransitioningRef = useRef(false)
  const onProgressRef = useRef(onProgress)

  useEffect(() => {
    onProgressRef.current = onProgress
  }, [onProgress])

  const navigateToChapter = useCallback((chapter: number) => {
    if (chapter < 1 || chapter > CHAPTERS.length) return
    if (chapter === currentChapterRef.current) return

    currentChapterRef.current = chapter
    isTransitioningRef.current = true
    setCurrentChapter(chapter)
  }, [])

  useChapterInput(useMemo(() => ({
    step: (direction: ScrollDirection) => navigateToChapter(currentChapterRef.current + direction),
    goToFirst: () => navigateToChapter(1),
    goToLast: () => navigateToChapter(CHAPTERS.length),
    isLocked: () => isTransitioningRef.current || isModalOpen(),
  }), [navigateToChapter]))

  useEffect(() => {
    const targetProgress = CHAPTER_PROGRESS[currentChapter - 1]
    const duration = prefersReducedMotion() ? 0 : TRANSITION_MS
    let animationId: number
    let startTime: number | null = null
    let startProgress = 0

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
        startProgress = progressRef.current
      }

      const t = duration === 0 ? 1 : Math.min((timestamp - startTime) / duration, 1)
      const progress = t < 1
        ? startProgress + (targetProgress - startProgress) * easeOutCubic(t)
        : targetProgress

      progressRef.current = progress
      onProgressRef.current(progress)

      if (t < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        isTransitioningRef.current = false
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [currentChapter])

  return { currentChapter, navigateToChapter }
}
