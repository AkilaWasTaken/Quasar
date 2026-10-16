import * as THREE from 'three'
import { getCameraPosition } from '../../../config'

const LINES = [
  { text: 'BIOBUZZ', font: '900 150px Orbitron, sans-serif', y: 100 },
  { text: 'ROBOT IN THE WORKS', font: '700 58px Orbitron, sans-serif', y: 235 },
]
const CANVAS_WIDTH = 1400
const CANVAS_HEIGHT = 300
const STEP = 4

const TEXT_Y = 0.3
const TEXT_WIDTH = 2.1
const CLOUD_Y = -0.4
const CLOUD_RADIUS = 0.7
const FLIGHT_TIME = 1.6
const WRITE_TIME = 1.4

const COLORS = [0xffc93c, 0xf5a623, 0xffdd6b, 0xe8901a, 0xfff0a0].map((hex) => new THREE.Color(hex))

export interface PollenText {
  object: THREE.Group
  update: (deltaTime: number) => void
  reset: () => void
  fit: () => void
}

const samplePixels = () => {
  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []

  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (const line of LINES) {
    ctx.font = line.font
    ctx.fillText(line.text, CANVAS_WIDTH / 2, line.y)
  }

  const { data } = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  const pixels: [number, number][] = []
  for (let y = 0; y < CANVAS_HEIGHT; y += STEP) {
    for (let x = 0; x < CANVAS_WIDTH; x += STEP) {
      if (data[(y * CANVAS_WIDTH + x) * 4 + 3] > 127) {
        pixels.push([x + (Math.random() - 0.5) * STEP * 0.6, y + (Math.random() - 0.5) * STEP * 0.6])
      }
    }
  }
  return pixels
}

export const createPollenText = async (): Promise<PollenText> => {
  await Promise.all(LINES.map(({ font }) => document.fonts.load(font))).catch(() => {})

  const pixels = samplePixels()
  const count = pixels.length

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const [x, y] of pixels) {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }
  const pxToWorld = TEXT_WIDTH / (maxX - minX)
  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2

  // Per-speck data, packed xyz: where it lands, where it waits, and the bend of its flight.
  const target = new Float32Array(count * 3)
  const start = new Float32Array(count * 3)
  const arc = new Float32Array(count * 3)
  const delay = new Float32Array(count)
  const seed = new Float32Array(count)

  const mesh = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(0.0085, 0),
    new THREE.MeshStandardMaterial({ roughness: 0.4, emissive: 0xffa01e, emissiveIntensity: 0.55, flatShading: true }),
    count
  )
  mesh.frustumCulled = false

  const matrix = new THREE.Matrix4()
  const rotation = new THREE.Euler()
  const quaternion = new THREE.Quaternion()
  const size = new THREE.Vector3()
  const origin = new THREE.Vector3()

  pixels.forEach(([x, y], i) => {
    const j = i * 3
    target[j] = (x - midX) * pxToWorld
    target[j + 1] = (midY - y) * pxToWorld
    target[j + 2] = (Math.random() - 0.5) * 0.03

    const angle = Math.random() * Math.PI * 2
    const radius = Math.sqrt(Math.random()) * CLOUD_RADIUS
    start[j] = Math.cos(angle) * radius
    start[j + 1] = CLOUD_Y - TEXT_Y + Math.random() * 0.15
    start[j + 2] = Math.sin(angle) * radius * 0.6

    arc[j] = (Math.random() - 0.5) * 0.9
    arc[j + 1] = Math.random() * 0.25
    arc[j + 2] = 0.25 + Math.random() * 0.4

    delay[i] = (target[j] / TEXT_WIDTH + 0.5) * WRITE_TIME + Math.random() * 0.35
    seed[i] = Math.random() * Math.PI * 2

    // Rotation and size never change, so bake them in once; update() only rewrites the translation.
    rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    size.setScalar(0.75 + Math.random() * 0.6)
    matrix.compose(origin, quaternion.setFromEuler(rotation), size)
    mesh.setMatrixAt(i, matrix)
    mesh.setColorAt(i, COLORS[i % COLORS.length])
  })

  const object = new THREE.Group()
  object.position.y = TEXT_Y
  object.add(mesh)

  const matrices = mesh.instanceMatrix.array
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let time = reducedMotion ? 99 : 0

  const update = (deltaTime: number) => {
    time += Math.min(deltaTime, 0.1)

    for (let i = 0; i < count; i++) {
      const j = i * 3
      const t = Math.min(Math.max((time - delay[i]) / FLIGHT_TIME, 0), 1)
      const ease = 1 - (1 - t) ** 3
      const lift = Math.sin(t * Math.PI)

      let x = start[j] + (target[j] - start[j]) * ease + arc[j] * lift
      let y = start[j + 1] + (target[j + 1] - start[j + 1]) * ease + arc[j + 1] * lift
      let z = start[j + 2] + (target[j + 2] - start[j + 2]) * ease + arc[j + 2] * lift

      if (t === 0) {
        x += Math.sin(time * 1.5 + seed[i]) * 0.03
        y += Math.cos(time * 1.2 + seed[i]) * 0.02
      } else if (t === 1) {
        y += Math.cos(time * 1.6 + seed[i]) * 0.002
        z += Math.sin(time * 2 + seed[i]) * 0.006
      }

      const m = i * 16
      matrices[m + 12] = x
      matrices[m + 13] = y
      matrices[m + 14] = z
    }
    mesh.instanceMatrix.needsUpdate = true
  }

  const fit = () => {
    const distance = getCameraPosition(0, window.innerWidth).z
    const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(25)) * distance
    const viewWidth = viewHeight * (window.innerWidth / Math.max(window.innerHeight, 1))
    object.scale.setScalar(Math.min(1, (viewWidth * 0.9) / TEXT_WIDTH))
  }

  fit()
  update(0)

  return {
    object,
    update,
    reset: () => {
      if (!reducedMotion) time = 0
    },
    fit,
  }
}
