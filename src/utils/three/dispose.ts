import * as THREE from 'three'

export const disposeObject = (root: THREE.Object3D) => {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Points)) return

    child.geometry?.dispose()

    const materials: THREE.Material[] = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((material) => {
      if (!material) return
      Object.values(material).forEach((value) => {
        if (value instanceof THREE.Texture) value.dispose()
      })
      material.dispose()
    })
  })
}
