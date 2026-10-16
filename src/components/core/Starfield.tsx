import { useEffect } from 'react'
import * as THREE from 'three'
import type { FrameSubscribe } from '../../hooks'

interface StarfieldProps {
  scene: THREE.Scene
  subscribeFrame: FrameSubscribe
}

const STAR_COUNT = 800

export const Starfield = ({ scene, subscribeFrame }: StarfieldProps) => {
  useEffect(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    const sizes = new Float32Array(STAR_COUNT)
    const twinkleOffsets = new Float32Array(STAR_COUNT)

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 15 + Math.random() * 35

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      sizes[i] = 0.3 + Math.random() * 0.7
      twinkleOffsets[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('twinkleOffset', new THREE.BufferAttribute(twinkleOffsets, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        attribute float size;
        attribute float twinkleOffset;
        varying float vTwinkle;
        uniform float time;

        void main() {
          vTwinkle = sin(time * 0.5 + twinkleOffset) * 0.5 + 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z) * (0.5 + vTwinkle * 0.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 baseColor;
        varying float vTwinkle;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = (1.0 - dist * 2.0) * (0.3 + vTwinkle * 0.7);
          gl_FragColor = vec4(baseColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const stars = new THREE.Points(geometry, material)
    scene.add(stars)

    const unsubscribe = subscribeFrame((_, elapsedTime) => {
      material.uniforms.time.value = elapsedTime

      stars.rotation.y = elapsedTime * 0.01
      stars.rotation.x = Math.sin(elapsedTime * 0.005) * 0.05
    })

    return () => {
      unsubscribe()
      scene.remove(stars)
      geometry.dispose()
      material.dispose()
    }
  }, [scene, subscribeFrame])

  return null
}

