import type * as THREE from 'three'
import type { FrameSubscribe } from '../../hooks'

export interface ChapterProps {
  scene: THREE.Scene
  subscribeFrame: FrameSubscribe
  visible: boolean
}
