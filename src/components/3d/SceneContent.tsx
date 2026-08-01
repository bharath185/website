'use client'

import { useRef } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Core() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.3
    ref.current.rotation.x += delta * 0.15
  })
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <MeshDistortMaterial
        color="#f59e0b"
        emissive="#d97706"
        emissiveIntensity={2}
        metalness={0.9}
        roughness={0.1}
        distort={0.25}
        speed={2}
      />
    </mesh>
  )
}

function Ring({ radius, tube, color, emissive, intensity, rx, ry, rz, speed }: {
  radius: number; tube: number; color: string; emissive: string; intensity: number
  rx: number; ry: number; rz: number; speed: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * speed * rx
    ref.current.rotation.y += delta * speed * ry
    ref.current.rotation.z += delta * speed * rz
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, 32, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={intensity}
        metalness={0.85}
        roughness={0.15}
      />
    </mesh>
  )
}

function Orbiter({ radius, speed, offset, size }: {
  radius: number; speed: number; offset: number; size: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 0.7 + offset) * 0.5
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color="#fbbf24"
        emissive="#f59e0b"
        emissiveIntensity={1.5}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  )
}

function Particles({ count = 100 }) {
  const ref = useRef<THREE.Points>(null!)
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 4
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.cos(phi)
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#fcd34d" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#fde68a" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#6366f1" />
      <spotLight position={[0, 6, 0]} angle={0.5} penumbra={0.8} intensity={2} color="#f59e0b" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#f59e0b" distance={6} decay={1.5} />
    </>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.08
  })
  return (
    <group ref={groupRef}>
      <Core />
      <Ring radius={2.2} tube={0.06} color="#b8860b" emissive="#f59e0b" intensity={0.6} rx={0.4} ry={0.7} rz={0.2} speed={0.3} />
      <Ring radius={2.8} tube={0.04} color="#d4a574" emissive="#fbbf24" intensity={0.3} rx={0.7} ry={0.3} rz={0.5} speed={-0.4} />
      <Ring radius={1.8} tube={0.03} color="#6366f1" emissive="#818cf8" intensity={0.4} rx={0.9} ry={0.1} rz={0.3} speed={0.5} />
      {Array.from({ length: 8 }).map((_, i) => (
        <Orbiter key={i} radius={2.4 + Math.random() * 0.6} speed={0.4 + Math.random() * 0.3} offset={(Math.PI * 2 / 8) * i} size={0.06 + Math.random() * 0.04} />
      ))}
      <Particles />
      <Lights />
    </group>
  )
}

export default function SceneContent() {
  return <Canvas camera={{ position: [0, 0, 6], fov: 45 }}><Scene /></Canvas>
}
