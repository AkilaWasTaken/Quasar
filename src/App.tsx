import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { CHAPTER_COMPONENTS } from './components/chapters'
import { Scene, Starfield } from './components/core'
import type { SceneContext } from './components/core'
import { CameraOverlay } from './components/ui'
import { CHAPTERS, getChapterNumber, isChapterActive } from './config'
import './App.css'

const SceneContent = ({ scene, subscribeFrame, currentChapter, isAtStart, navigateToChapter }: SceneContext) => {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('donation') === 'success') {
      navigateToChapter(getChapterNumber('donate'))
    }
  }, [navigateToChapter])

  return (
    <>
      <Starfield scene={scene} subscribeFrame={subscribeFrame} />

      {CHAPTERS.map(({ id }) => {
        const Chapter = CHAPTER_COMPONENTS[id]
        return (
          <Chapter
            key={id}
            scene={scene}
            subscribeFrame={subscribeFrame}
            visible={isChapterActive(id, currentChapter)}
          />
        )
      })}

      <CameraOverlay
        currentChapter={currentChapter}
        showScrollHint={isAtStart}
        navigateToChapter={navigateToChapter}
      />
    </>
  )
}

export const App = () => (
  <>
    <Scene content={SceneContent} />
    <Analytics />
  </>
)
