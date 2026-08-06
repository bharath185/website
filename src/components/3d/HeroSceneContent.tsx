'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Helper component: Procedural Spur Gear
function SpurGear({
  radius = 0.5,
  height = 0.12,
  teeth = 18,
  color = '#9ea7b0',
  roughness = 0.16,
  metalness = 1.0,
  hasHole = true
}) {
  const gearGeom = useMemo(() => {
    const shape = new THREE.Shape()
    const step = (Math.PI * 2) / teeth
    const innerRadius = radius * 0.82
    const outerRadius = radius * 1.05

    for (let i = 0; i < teeth; i++) {
      const angle = i * step
      const a0 = angle
      const a1 = angle + step * 0.25
      const a2 = angle + step * 0.45
      const a3 = angle + step * 0.70

      const x0 = Math.cos(a0) * innerRadius
      const y0 = Math.sin(a0) * innerRadius
      const x1 = Math.cos(a1) * innerRadius
      const y1 = Math.sin(a1) * innerRadius
      const x2 = Math.cos(a2) * outerRadius
      const y2 = Math.sin(a2) * outerRadius
      const x3 = Math.cos(a3) * outerRadius
      const y3 = Math.sin(a3) * outerRadius

      if (i === 0) {
        shape.moveTo(x0, y0)
      } else {
        shape.lineTo(x0, y0)
      }
      shape.lineTo(x1, y1)
      shape.lineTo(x2, y2)
      shape.lineTo(x3, y3)
    }
    shape.closePath()

    // Central shaft hole
    if (hasHole) {
      const holePath = new THREE.Path()
      holePath.absarc(0, 0, radius * 0.35, 0, Math.PI * 2, true)
      shape.holes.push(holePath)
    }

    const settings = {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
      curveSegments: 64
    }

    const geometry = new THREE.ExtrudeGeometry(shape, settings)
    geometry.center()
    return geometry
  }, [radius, height, teeth, hasHole])

  return (
    <mesh geometry={gearGeom} castShadow receiveShadow>
      <meshPhysicalMaterial 
        color={color} 
        roughness={roughness} 
        metalness={metalness}
        clearcoat={1.0}
        clearcoatRoughness={0.08}
        envMapIntensity={1.6}
      />
    </mesh>
  )
}

// Helper component: Ball Bearing Track
function BearingTrack() {
  const ballCount = 8
  const ballRadius = 0.026
  const orbitRadius = 0.125
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(ballRadius, 16, 16), [])

  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.165, 0.165, 0.06, 32, 1, true]} />
        <meshPhysicalMaterial 
          color="#8a949f" 
          roughness={0.20} 
          metalness={1.0} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.4}
          side={THREE.DoubleSide} 
        />
      </mesh>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.088, 0.088, 0.06, 32, 1, true]} />
        <meshPhysicalMaterial 
          color="#9ea7b0" 
          roughness={0.14} 
          metalness={1.0} 
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          envMapIntensity={1.5}
          side={THREE.DoubleSide} 
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius, 0.008, 8, 24]} />
        <meshPhysicalMaterial 
          color="#9ea7b0" 
          roughness={0.16} 
          metalness={1.0} 
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          envMapIntensity={1.4}
        />
      </mesh>
      {Array.from({ length: ballCount }).map((_, i) => {
        const angle = (i * Math.PI * 2) / ballCount
        return (
          <mesh
            key={i}
            geometry={sphereGeom}
            position={[Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius]}
            castShadow
          >
            <meshPhysicalMaterial 
              color="#f1f5f9" 
              roughness={0.01} 
              metalness={1.0} 
              clearcoat={1.0}
              clearcoatRoughness={0.01}
              envMapIntensity={2.0}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// 1. Planetary Gear System
function PlanetaryGearbox() {
  const sunRef = useRef<THREE.Group>(null!)
  const carrierRef = useRef<THREE.Group>(null!)
  const planet1Ref = useRef<THREE.Group>(null!)
  const planet2Ref = useRef<THREE.Group>(null!)
  const planet3Ref = useRef<THREE.Group>(null!)

  const ringGeom = useMemo(() => {
    const shape = new THREE.Shape()
    shape.absarc(0, 0, 0.86, 0, Math.PI * 2, false)
    
    const hole = new THREE.Path()
    const teethCount = 36
    const step = (Math.PI * 2) / teethCount
    const innerRadiusTips = 0.685
    const innerRadiusGaps = 0.73

    for (let i = 0; i < teethCount; i++) {
      const angle = -i * step
      const a0 = angle
      const a1 = angle - step * 0.25
      const a2 = angle - step * 0.45
      const a3 = angle - step * 0.70

      const x0 = Math.cos(a0) * innerRadiusGaps
      const y0 = Math.sin(a0) * innerRadiusGaps
      const x1 = Math.cos(a1) * innerRadiusGaps
      const y1 = Math.sin(a1) * innerRadiusGaps
      const x2 = Math.cos(a2) * innerRadiusTips
      const y2 = Math.sin(a2) * innerRadiusTips
      const x3 = Math.cos(a3) * innerRadiusTips
      const y3 = Math.sin(a3) * innerRadiusTips

      if (i === 0) {
        hole.moveTo(x0, y0)
      } else {
        hole.lineTo(x0, y0)
      }
      hole.lineTo(x1, y1)
      hole.lineTo(x2, y2)
      hole.lineTo(x3, y3)
    }
    hole.closePath()
    shape.holes.push(hole)

    const settings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
      curveSegments: 64
    }

    const geometry = new THREE.ExtrudeGeometry(shape, settings)
    geometry.center()
    return geometry
  }, [])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const speedGears = 1.2
    const w_sun = elapsed * speedGears
    if (sunRef.current) sunRef.current.rotation.z = w_sun
    if (carrierRef.current) carrierRef.current.rotation.z = w_sun / 4
    
    const w_planet = -w_sun
    if (planet1Ref.current) planet1Ref.current.rotation.z = w_planet + 0.16
    if (planet2Ref.current) planet2Ref.current.rotation.z = w_planet - 0.12
    if (planet3Ref.current) planet3Ref.current.rotation.z = w_planet + 0.08
  })

  return (
    <group scale={[0.98, 0.98, 0.98]} rotation={[0.2, -0.4, 0]}>
      <mesh geometry={ringGeom} position={[0, 0, -0.06]} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color="#8a949f" 
          roughness={0.20} 
          metalness={1.0} 
          clearcoat={1.0}
          clearcoatRoughness={0.12}
          envMapIntensity={1.5}
        />
      </mesh>
      <group ref={sunRef} position={[0, 0, -0.06]}>
        <SpurGear radius={0.24} height={0.1} teeth={12} color="#9ea7b0" roughness={0.16} />
      </group>
      <group ref={carrierRef}>
        <group ref={planet1Ref} position={[0.48, 0, -0.06]}>
          <SpurGear radius={0.24} height={0.1} teeth={12} color="#9ea7b0" roughness={0.16} />
        </group>
        <group ref={planet2Ref} position={[-0.24, 0.416, -0.06]}>
          <SpurGear radius={0.24} height={0.1} teeth={12} color="#9ea7b0" roughness={0.16} />
        </group>
        <group ref={planet3Ref} position={[-0.24, -0.416, -0.06]}>
          <SpurGear radius={0.24} height={0.1} teeth={12} color="#9ea7b0" roughness={0.16} />
        </group>
      </group>
    </group>
  )
}

// 2. Exploded Spindle Assembly Component
function ExplodedSpindleAssembly() {
  const shaftRef = useRef<THREE.Group>(null!)
  const gearRef = useRef<THREE.Group>(null!)
  const bearing1Ref = useRef<THREE.Group>(null!)
  const bearing2Ref = useRef<THREE.Group>(null!)
  const flangeRef = useRef<THREE.Group>(null!)
  const locknutRef = useRef<THREE.Group>(null!)
  const casingRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const loopTimeSpindle = elapsed % 4
    
    let d = 0
    if (loopTimeSpindle < 1) {
      d = 0
    } else if (loopTimeSpindle >= 1 && loopTimeSpindle < 2) {
      d = THREE.MathUtils.smoothstep(loopTimeSpindle - 1, 0, 1)
    } else if (loopTimeSpindle >= 2 && loopTimeSpindle < 3) {
      d = 1
    } else {
      d = 1 - THREE.MathUtils.smoothstep(loopTimeSpindle - 3, 0, 1)
    }

    const spinSpeed = 1.0
    const w_spindle = elapsed * spinSpeed
    if (shaftRef.current) shaftRef.current.rotation.y = w_spindle
    if (bearing1Ref.current) bearing1Ref.current.rotation.y = w_spindle
    if (bearing2Ref.current) bearing2Ref.current.rotation.y = w_spindle
    if (flangeRef.current) flangeRef.current.rotation.y = w_spindle
    if (locknutRef.current) locknutRef.current.rotation.y = w_spindle

    if (gearRef.current) {
      gearRef.current.position.y = -0.22 - 0.60 * d
      gearRef.current.rotation.z = w_spindle
    }
    if (bearing1Ref.current) bearing1Ref.current.position.y = -0.15 - 0.35 * d
    if (bearing2Ref.current) bearing2Ref.current.position.y = 0.15 + 0.35 * d
    if (flangeRef.current) flangeRef.current.position.y = 0.20 + 0.60 * d
    if (locknutRef.current) locknutRef.current.position.y = 0.235 + 0.80 * d
    if (casingRef.current) casingRef.current.position.y = 0 - 0.10 * d
  })

  return (
    <group scale={[0.98, 0.98, 0.98]} rotation={[0.25, -0.4, -Math.PI / 2]}>
      <group ref={shaftRef}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.085, 0.085, 1.45, 64]} />
          <meshPhysicalMaterial 
            color="#cbd5e1" 
            roughness={0.12} 
            metalness={1.0} 
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            envMapIntensity={1.8}
          />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 32]} />
          <meshPhysicalMaterial 
            color="#9ea7b0" 
            roughness={0.18} 
            metalness={1.0} 
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>

      <group ref={gearRef} rotation={[Math.PI / 2, 0, 0]}>
        <SpurGear radius={0.24} height={0.08} teeth={16} color="#9ea7b0" roughness={0.16} />
      </group>

      <group ref={bearing1Ref}>
        <BearingTrack />
      </group>

      <group ref={bearing2Ref}>
        <BearingTrack />
      </group>

      <group ref={flangeRef}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 64]} />
          <meshPhysicalMaterial 
            color="#9ea7b0" 
            roughness={0.15} 
            metalness={1.0} 
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            envMapIntensity={1.6}
          />
        </mesh>
        <mesh position={[0, 0.021, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.005, 64]} />
          <meshPhysicalMaterial color="#55606d" roughness={0.25} metalness={1.0} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8
          const r = 0.13
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0.022, Math.sin(angle) * r]}>
              <cylinderGeometry args={[0.01, 0.01, 0.01, 12]} />
              <meshPhysicalMaterial color="#334155" roughness={0.3} metalness={1.0} />
            </mesh>
          )
        })}
      </group>

      <group ref={locknutRef}>
        <mesh castShadow>
          <cylinderGeometry args={[0.11, 0.11, 0.03, 32]} />
          <meshPhysicalMaterial 
            color="#cbd5e1" 
            roughness={0.14} 
            metalness={1.0} 
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            envMapIntensity={1.6}
          />
        </mesh>
      </group>

      <group ref={casingRef}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.36, 64]} />
          <meshPhysicalMaterial 
            color="#707d8a" 
            roughness={0.22} 
            metalness={1.0} 
            clearcoat={1.0}
            clearcoatRoughness={0.14}
            envMapIntensity={1.4}
          />
        </mesh>
        <mesh position={[0, -0.19, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.03, 64]} />
          <meshPhysicalMaterial 
            color="#8a949f" 
            roughness={0.20} 
            metalness={1.0} 
            clearcoat={1.0}
            clearcoatRoughness={0.12}
            envMapIntensity={1.4}
          />
        </mesh>
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[0, -0.08 + i * 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.015, 64]} />
            <meshPhysicalMaterial 
              color="#cbd5e1" 
              roughness={0.12} 
              metalness={1.0} 
              clearcoat={1.0}
              clearcoatRoughness={0.08}
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Master scene component that holds the Carousel switching logic for Designs 1 and 2
function SceneCarousel() {
  const gearsGroup = useRef<THREE.Group>(null!)
  const spindleGroup = useRef<THREE.Group>(null!)

  // Carousel values: 1 = Gears, 2 = Spindle
  const [activeDesign, setActiveDesign] = useState(1)

  // Switch designs every 4 seconds (4000ms) - permanently restricted to 1 and 2
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDesign((prev) => (prev === 1 ? 2 : 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    // --- 3D CROSS-FADE TRANSITION (Smooth Lerp Scaling & Visibility Toggles) ---
    const gearsTargetScale = activeDesign === 1 ? 1.0 : 0
    const spindleTargetScale = activeDesign === 2 ? 1.0 : 0

    if (gearsGroup.current) {
      const currentScale = gearsGroup.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, gearsTargetScale, 0.08)
      gearsGroup.current.scale.set(newScale, newScale, newScale)
      gearsGroup.current.visible = newScale > 0.01
    }

    if (spindleGroup.current) {
      const currentScale = spindleGroup.current.scale.x
      const newScale = THREE.MathUtils.lerp(currentScale, spindleTargetScale, 0.08)
      spindleGroup.current.scale.set(newScale, newScale, newScale)
      spindleGroup.current.visible = newScale > 0.01
    }
  })

  return (
    <group>
      {/* Design 1 Wrapper: Planetary Gears */}
      <group ref={gearsGroup} scale={[1, 1, 1]}>
        <PlanetaryGearbox />
      </group>

      {/* Design 2 Wrapper: Exploded Spindle Assembly */}
      <group ref={spindleGroup} scale={[0, 0, 0]} visible={false}>
        <ExplodedSpindleAssembly />
      </group>
    </group>
  )
}

export default function HeroSceneContent() {
  return (
    <Canvas
      shadows
      camera={{ position: [0.1, 0.1, 3.8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
      className="w-full h-full"
    >
      {/* Offline GPU-Rendered Reflection Cubemap Studio */}
      <Environment resolution={256}>
        {/* Top white panel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        {/* Left cool light panel */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-8, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#a5f3fc" side={THREE.DoubleSide} />
        </mesh>
        {/* Right warm light panel */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[8, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#fef08a" side={THREE.DoubleSide} />
        </mesh>
        {/* Behind camera highlights panel */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, 8]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
      </Environment>

      {/* High-Contrast Premium Studio Lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Powerful Top-Left Key Light */}
      <directionalLight 
        position={[5, 8, 4]} 
        intensity={3.2} 
        castShadow 
        color="#ffffff" 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Side Fill Light */}
      <directionalLight 
        position={[-6, 2, -3]} 
        intensity={1.4} 
        color="#93c5fd" 
      />
      
      {/* Bottom/Rear Rim Light */}
      <directionalLight 
        position={[0, -4, -3]} 
        intensity={2.2} 
        color="#fef08a" 
      />

      {/* Specular Point Lights */}
      <pointLight position={[2, 0.5, 2]} intensity={2.4} color="#ffffff" decay={2} distance={10} />
      <pointLight position={[-2, -0.5, 1.5]} intensity={1.4} color="#ffffff" decay={2} distance={10} />

      {/* Render the Carousel Assembly */}
      <SceneCarousel />

      {/* Soft floor shadow to ground the objects */}
      <ContactShadows
        position={[0, -0.92, 0]}
        opacity={0.88}
        scale={6}
        blur={1.8}
        far={2.2}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={3.8}
        maxDistance={3.8}
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  )
}
