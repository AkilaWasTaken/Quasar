import { useCallback, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getCameraPosition } from '../config'

export const useCameraPath = (camera: THREE.PerspectiveCamera | undefined) => {
  const progressRef = useRef(0)

  const placeCamera = useCallback(() => {
    if (!camera) return

    const position = getCameraPosition(progressRef.current, window.innerWidth)
    camera.position.set(position.x, position.y, position.z)
    camera.lookAt(position.x, position.y * 0.3, 0)
  }, [camera])

  useEffect(() => {
    placeCamera()
    window.addEventListener('resize', placeCamera)
    return () => window.removeEventListener('resize', placeCamera)
  }, [placeCamera])

  return useCallback((progress: number) => {
    progressRef.current = progress
    placeCamera()
  }, [placeCamera])
}
