import type { ReactNode } from 'react'
import type * as THREE from 'three'
import { getChapter } from '../../../config'
import type { ChapterId } from '../../../config'
import { ChapterParticles } from '../../core/ChapterParticles'
import type { ChapterParticlesOptions } from '../../core/ChapterParticles'
import { ChapterHeader } from '../ChapterHeader/ChapterHeader'
import './ChapterOverlay.css'

interface ChapterOverlayProps {
  id: ChapterId
  visible: boolean
  scene?: THREE.Scene
  particles?: ChapterParticlesOptions | boolean
  header?: 'full' | 'logo-only' | 'none'
  className?: string
  children?: ReactNode
}

export const ChapterOverlay = ({
  id,
  visible,
  scene,
  particles,
  header = 'full',
  className = '',
  children,
}: ChapterOverlayProps) => {
  const { title } = getChapter(id)

  return (
    <section
      className={`chapter-overlay ${className}`}
      aria-label={title}
      hidden={!visible}
    >
      {scene && particles && (
        <ChapterParticles scene={scene} chapterId={id} visible={visible} {...(particles === true ? {} : particles)} />
      )}
      {header !== 'none' && <ChapterHeader title={title} hideTitle={header === 'logo-only'} />}
      {children}
    </section>
  )
}
