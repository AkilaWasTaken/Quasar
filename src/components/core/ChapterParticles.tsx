import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getChapter } from '../../config'
import type { ChapterId } from '../../config'

export interface ChapterParticlesOptions {
  count?: number
  opacity?: number
  depth?: number
}

interface ChapterParticlesProps extends ChapterParticlesOptions {
  scene: THREE.Scene
  chapterId: ChapterId
  visible: boolean
}

const PARTICLE_RADIUS = 0.004
const SPREAD_X = 2
const SPREAD_Y = 1.5

export const ChapterParticles = ({
  scene,
  chapterId,
  visible,
  count = 15,
  opacity = 0.12,
  depth = 0.4,
}: ChapterParticlesProps) => {
  const particlesRef = useRef<THREE.InstancedMesh | null>(null)
  const visibleRef = useRef(visible)
  const chapterX = getChapter(chapterId).x

  useEffect(() => {
    visibleRef.current = visible
    if (particlesRef.current) particlesRef.current.visible = visible
  }, [visible])

  useEffect(() => {
    const geometry = new THREE.SphereGeometry(PARTICLE_RADIUS, 8, 8)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity })
    const particles = new THREE.InstancedMesh(geometry, material, count)
    particles.position.x = chapterX
    particles.visible = visibleRef.current

    const matrix = new THREE.Matrix4()
    for (let i = 0; i < count; i++) {
      matrix.setPosition(
        (Math.random() - 0.5) * SPREAD_X,
        (Math.random() - 0.5) * SPREAD_Y,
        (Math.random() - 0.5) * depth
      )
      particles.setMatrixAt(i, matrix)
    }
    particles.instanceMatrix.needsUpdate = true
    particles.computeBoundingSphere()

    scene.add(particles)
    particlesRef.current = particles

    return () => {
      particlesRef.current = null
      scene.remove(particles)
      particles.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [scene, chapterX, count, opacity, depth])

  return null
}
