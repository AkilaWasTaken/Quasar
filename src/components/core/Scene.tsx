import { useCallback, useState, type ComponentType } from 'react'
import * as THREE from 'three'
import { useCameraPath, useChapterNavigation, useFrameLoop, useThreeScene } from '../../hooks'
import type { FrameSubscribe } from '../../hooks'
import { BRANDING } from '../../config'

export interface SceneContext {
  scene: THREE.Scene
  subscribeFrame: FrameSubscribe
  currentChapter: number
  isAtStart: boolean
  navigateToChapter: (chapter: number) => void
}

interface SceneProps {
  content: ComponentType<SceneContext>
}

const START_PROGRESS_LIMIT = 0.05

export const Scene = ({ content: Content }: SceneProps) => {
  const { mountRef, sceneObjects } = useThreeScene()
  const [isAtStart, setIsAtStart] = useState(true)

  const moveCamera = useCameraPath(sceneObjects?.camera)

  const handleProgress = useCallback((progress: number) => {
    moveCamera(progress)
    mountRef.current?.style.setProperty('--scroll-progress', String(progress))
    setIsAtStart(progress < START_PROGRESS_LIMIT)
  }, [moveCamera, mountRef])

  const { currentChapter, navigateToChapter } = useChapterNavigation(handleProgress)

  const renderScene = useCallback(() => {
    if (!sceneObjects) return
    sceneObjects.renderer?.render(sceneObjects.scene, sceneObjects.camera)
  }, [sceneObjects])

  const subscribeFrame = useFrameLoop(renderScene, sceneObjects !== null)

  return (
    <div className="canvas" ref={mountRef}>
      <h1 className="sr-only">{`${BRANDING.teamName} - ${BRANDING.teamNumber} echipa de robotică`}</h1>
      {sceneObjects && (
        <Content
          scene={sceneObjects.scene}
          subscribeFrame={subscribeFrame}
          currentChapter={currentChapter}
          isAtStart={isAtStart}
          navigateToChapter={navigateToChapter}
        />
      )}
    </div>
  )
}
