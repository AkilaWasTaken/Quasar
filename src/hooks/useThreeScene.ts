import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThreeScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer | null
}

const createRenderer = (width: number, height: number): THREE.WebGLRenderer | null => {
  try {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.outputColorSpace = THREE.SRGBColorSpace
    return renderer
  } catch (error) {
    console.warn('WebGL is unavailable - continuing without the 3D scene:', error)
    return null
  }
}

export const useThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const [sceneObjects, setSceneObjects] = useState<ThreeScene | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const mount = mountRef.current
    const { clientWidth, clientHeight } = mount

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      50,
      clientWidth / clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0.5, 3.5)
    camera.lookAt(0, 0, 0)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5)
    mainLight.position.set(3, 3, 3)
    scene.add(mainLight)

    const renderer = createRenderer(clientWidth, clientHeight)
    if (renderer) {
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)
    }

    setSceneObjects({ scene, camera, renderer })

    let resizeTimeout: number
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const width = mount.clientWidth
        const height = mount.clientHeight
        if (width === 0 || height === 0) return

        renderer?.setSize(width, height)
        camera.aspect = width / height

        camera.updateProjectionMatrix()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
      setSceneObjects(null)
      if (renderer) {
        renderer.dispose()
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return { mountRef, sceneObjects }
}
