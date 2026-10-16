import * as THREE from 'three'

export const createGridGeometry = (size: number, divisions: number) => {
  const points: THREE.Vector3[] = []
  const step = size / divisions

  for (let i = 0; i <= divisions; i++) {
    const pos = -size / 2 + i * step
    points.push(
      new THREE.Vector3(pos, 0, -size / 2),
      new THREE.Vector3(pos, 0, size / 2)
    )
    points.push(
      new THREE.Vector3(-size / 2, 0, pos),
      new THREE.Vector3(size / 2, 0, pos)
    )
  }

  return new THREE.BufferGeometry().setFromPoints(points)
}
