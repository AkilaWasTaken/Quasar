import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getChapter } from '../../../config'
import { ChapterOverlay } from '../../ui'
import type { ChapterProps } from '../types'
import {
  createGridGeometry,
  disposeObject,
} from '../../../utils/three'
import { createPollenText } from './pollenText'
import type { PollenText } from './pollenText'

const ROBOT_MODEL_URL = '/models/Robot.glb'
const FLOOR_Y = -0.5
const BASE_ROTATION = -Math.PI / 6

const fitToStage = (model: THREE.Object3D) => {
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  const scaleFactor = 0.9 / Math.max(size.x, size.y, size.z)
  model.scale.multiplyScalar(scaleFactor)
  model.position.multiplyScalar(scaleFactor)

  model.position.x -= center.x * scaleFactor
  model.position.z -= center.z * scaleFactor
  model.position.y += FLOOR_Y - box.min.y * scaleFactor
}

const loadRobotModel = async (): Promise<THREE.Object3D> => {
  const [{ GLTFLoader }, { DRACOLoader }] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/loaders/DRACOLoader.js'),
  ])

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}draco/`)

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)

  try {
    const gltf = await loader.loadAsync(ROBOT_MODEL_URL)
    return gltf.scene
  } finally {
    dracoLoader.dispose()
  }
}

export const RobotChapter = ({ scene, subscribeFrame, visible }: ChapterProps) => {
  const groupRef = useRef<THREE.Group | null>(null)
  const visibleRef = useRef(visible)
  const chapterX = getChapter('robot').x

  useEffect(() => {
    visibleRef.current = visible
    if (groupRef.current) groupRef.current.visible = visible
  }, [visible])

  useEffect(() => {
    let disposed = false
    // Shown instead of the robot until public/models/Robot.glb exists.
    let pollenText: PollenText | null = null
    const handleResize = () => pollenText?.fit()
    window.addEventListener('resize', handleResize)

    const group = new THREE.Group()
    group.position.x = chapterX
    group.visible = visibleRef.current
    scene.add(group)
    groupRef.current = group

    const grid = new THREE.LineSegments(
      createGridGeometry(2.5, 20),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })
    )
    grid.position.y = FLOOR_Y
    group.add(grid)

    const robotGroup = new THREE.Group()
    robotGroup.rotation.y = BASE_ROTATION
    group.add(robotGroup)

    if (__HAS_ROBOT_MODEL__) {
      loadRobotModel()
        .then((model) => {
          if (disposed) {
            disposeObject(model)
            return
          }
          fitToStage(model)
          robotGroup.add(model)
        })
        .catch((error: unknown) => {
          console.error('Could not load the robot model:', error)
        })
    } else {
      createPollenText().then((text) => {
        if (disposed) {
          disposeObject(text.object)
          return
        }
        pollenText = text
        group.add(text.object)
      })
    }

    group.add(new THREE.AmbientLight(0xffffff, 0.5))

    const key = new THREE.DirectionalLight(0xffffff, 1)
    key.position.set(3, 4, 2)
    group.add(key)

    const fill = new THREE.DirectionalLight(0xffffff, 0.5)
    fill.position.set(-2, 3, -1)
    group.add(fill)

    let phase = 0
    const unsubscribe = subscribeFrame((deltaTime) => {
      if (!group.visible) {
        phase = 0
        pollenText?.reset()
        return
      }
      phase += Math.min(deltaTime, 0.1) * 0.5
      robotGroup.rotation.y = BASE_ROTATION + Math.sin(phase) * 0.1
      pollenText?.update(deltaTime)
    })

    return () => {
      disposed = true
      groupRef.current = null
      unsubscribe()
      window.removeEventListener('resize', handleResize)
      scene.remove(group)
      disposeObject(group)
    }
  }, [scene, subscribeFrame, chapterX])

  return <ChapterOverlay id="robot" visible={visible} header="logo-only" />
}
