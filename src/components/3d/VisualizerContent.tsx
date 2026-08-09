'use client'

import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, Line, Html, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import {
  RotateCw,
  Compass,
  Scissors,
  Layers,
  Settings2,
  Sliders,
  Palette,
  Binary
} from 'lucide-react'
import { Product } from '@/types'

// Types
type VisualizerMode = 'render' | 'explode' | 'section' | 'cad'
type PaintColor = 'chrome' | 'yellow' | 'blue' | 'red'

interface VisualizerContentProps {
  product: Product
}

// ----------------------------------------------------
// Reusable CAD Detail Components
// ----------------------------------------------------

// Hexagonal Bolt Head or Socket Cap Screw
function Bolt({
  position,
  rotation = [0, 0, 0] as [number, number, number],
  color = '#94a3b8',
  scale = 1.0,
  clippingPlanes = [] as THREE.Plane[],
  wireframe = false
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  scale?: number
  clippingPlanes?: THREE.Plane[]
  wireframe?: boolean
}) {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Hex head */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 6]} />
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.9}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>
      {/* Washer base */}
      <mesh position={[0, -0.045, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.085, 0.015, 12]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.2}
          metalness={0.9}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>
    </group>
  )
}

// Cylinder with custom details to look like a gear or threaded part
function CylindricalGear({
  radius = 1,
  height = 0.5,
  teeth = 12,
  holeRadius = 0.18,
  color = '#8e9aaf',
  materialProps = {},
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  explodeOffset = 0,
  clippingPlanes = [] as THREE.Plane[],
  wireframe = false
}: {
  radius?: number
  height?: number
  teeth?: number
  holeRadius?: number
  color?: string
  materialProps?: any
  position?: [number, number, number]
  rotation?: [number, number, number]
  explodeOffset?: number
  clippingPlanes?: THREE.Plane[]
  wireframe?: boolean
}) {
  const geom = useMemo(() => {
    const shape = new THREE.Shape()
    const step = (Math.PI * 2) / teeth
    const innerRadius = radius * 0.8
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

    // Add central shaft hole
    if (holeRadius > 0) {
      const holePath = new THREE.Path()
      holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true)
      shape.holes.push(holePath)
    }

    const extrudeSettings = {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.center() // Center on origin
    return geometry
  }, [radius, height, teeth, holeRadius])

  const finalPos = [position[0], position[1], position[2] + explodeOffset] as [number, number, number]

  return (
    <mesh
      geometry={geom}
      position={finalPos}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={0.12}
        metalness={0.92}
        wireframe={wireframe}
        clippingPlanes={clippingPlanes}
        clipShadows
        {...materialProps}
      />
    </mesh>
  )
}

// Visual Dimensions Helper Lines
function DimensionHelper({
  start,
  end,
  label,
  color = '#22c55e',
  textOffset = [0, 0.4, 0] as [number, number, number]
}: {
  start: [number, number, number]
  end: [number, number, number]
  label: string
  color?: string
  textOffset?: [number, number, number]
}) {
  const midPoint = [
    (start[0] + end[0]) / 2 + textOffset[0],
    (start[1] + end[1]) / 2 + textOffset[1],
    (start[2] + end[2]) / 2 + textOffset[2]
  ] as [number, number, number]

  return (
    <group>
      {/* Main dimension line */}
      <Line points={[start, end]} color={color} lineWidth={1.5} dashed={false} />
      
      {/* Start tick */}
      <Line
        points={[
          [start[0], start[1] - 0.15, start[2]],
          [start[0], start[1] + 0.15, start[2]]
        ]}
        color={color}
        lineWidth={1.5}
      />
      {/* End tick */}
      <Line
        points={[
          [end[0], end[1] - 0.15, end[2]],
          [end[0], end[1] + 0.15, end[2]]
        ]}
        color={color}
        lineWidth={1.5}
      />

      {/* Measurement Text */}
      <Html position={midPoint} center distanceFactor={8}>
        <div className="bg-slate-950/80 backdrop-blur text-[10px] font-mono text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
          {label}
        </div>
      </Html>
    </group>
  )
}

// ----------------------------------------------------
// 1. Planetary Gearbox Model
// ----------------------------------------------------
function PlanetaryGearboxModel({
  explode,
  paintColor,
  clippingPlanes,
  wireframe
}: {
  explode: number
  paintColor: string
  clippingPlanes: THREE.Plane[]
  wireframe: boolean
}) {
  const gearRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (!wireframe && !explode) {
      const t = state.clock.getElapsedTime()
      if (gearRef.current) {
        gearRef.current.rotation.z = t * 0.18
      }
    }
  })

  // Lifted Hooks to the top level
  const ringGearShape = useMemo(() => {
    const shape = new THREE.Shape()
    // Outer casing inner boundary
    shape.absarc(0, 0, 1.95, 0, Math.PI * 2, false)

    // Inner gear profile (as a hole to subtract it)
    const holePath = new THREE.Path()
    const teethCount = 30
    const step = (Math.PI * 2) / teethCount
    const rootRadius = 1.88
    const tipRadius = 1.74 // pointing inwards

    for (let i = 0; i <= teethCount; i++) {
      const angle = i * step
      const a0 = angle
      const a1 = angle + step * 0.25
      const a2 = angle + step * 0.45
      const a3 = angle + step * 0.70

      const x0 = Math.cos(a0) * rootRadius
      const y0 = Math.sin(a0) * rootRadius
      const x1 = Math.cos(a1) * rootRadius
      const y1 = Math.sin(a1) * rootRadius
      const x2 = Math.cos(a2) * tipRadius
      const y2 = Math.sin(a2) * tipRadius
      const x3 = Math.cos(a3) * tipRadius
      const y3 = Math.sin(a3) * tipRadius

      if (i === 0) {
        holePath.moveTo(x0, y0)
      } else {
        holePath.lineTo(x0, y0)
      }
      holePath.lineTo(x1, y1)
      holePath.lineTo(x2, y2)
      holePath.lineTo(x3, y3)
    }
    shape.holes.push(holePath)
    return shape
  }, [])

  const extrudeSettings = useMemo(() => ({
    depth: 1.16,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.012,
    bevelThickness: 0.012
  }), [])

  // Explode distances along Z axis
  const zOutputShaft = explode * 2.4
  const zCarrier = explode * 1.5
  const zPlanets = explode * 0.9
  const zSun = explode * -0.6
  const zHousing = explode * -1.8

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Housing (Outer Ring Gear Casing) */}
      <mesh position={[0, 0, zHousing]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 1.2, 32, 1, true]} />
        <meshStandardMaterial
          color={paintColor}
          roughness={0.18}
          metalness={0.8}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>
      
      {/* Housing Outer Shell flanges */}
      <mesh position={[0, 0, zHousing]} castShadow receiveShadow>
        <cylinderGeometry args={[2.18, 2.18, 0.15, 32]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.25}
          metalness={0.9}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* Assembly bolts fastening the housing flange (6 bolts) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 6
        const r = 2.08
        const bx = Math.cos(angle) * r
        const by = Math.sin(angle) * r
        return (
          <Bolt
            key={i}
            position={[bx, by, zHousing + 0.08]}
            rotation={[Math.PI / 2, 0, -angle]}
            color="#64748b"
            clippingPlanes={clippingPlanes}
            wireframe={wireframe}
          />
        )
      })}

      {/* 2. Ring Gear Inner Teeth (Procedural Extruded Shape) */}
      <mesh position={[0, 0, zHousing - 0.58]} castShadow receiveShadow>
        <extrudeGeometry args={[ringGearShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.12}
          metalness={0.95}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* 3. Central Sun Gear (Polished Ground Steel) */}
      <CylindricalGear
        radius={0.65}
        height={0.9}
        teeth={14}
        color="#cbd5e1"
        position={[0, 0, zSun]}
        rotation={[0, 0, 0]}
        clippingPlanes={clippingPlanes}
        wireframe={wireframe}
      />
      {/* Input Shaft attached to Sun Gear */}
      <mesh position={[0, 0, zSun - 0.95]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 1.1, 32]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.08}
          metalness={0.98}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* Input shaft keyway block */}
      <mesh position={[0, 0.18, zSun - 1.1]} castShadow>
        <boxGeometry args={[0.06, 0.08, 0.35]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.4}
          metalness={0.9}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* 4. Planet Carrier & Planet Gears Group */}
      <group ref={gearRef}>
        {/* Planet Carrier (Triangular metal disc) */}
        <mesh position={[0, 0, zCarrier]} castShadow receiveShadow>
          <cylinderGeometry args={[1.35, 1.35, 0.16, 3]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.25}
            metalness={0.85}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>

        {/* Output Shaft (Attached to Carrier) */}
        <mesh position={[0, 0, zOutputShaft]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 1.1, 32]} />
          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.06}
            metalness={0.98}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        
        {/* Output shaft keyway slot detail */}
        <mesh position={[0, 0.33, zOutputShaft + 0.1]} castShadow>
          <boxGeometry args={[0.09, 0.1, 0.4]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.3}
            metalness={0.95}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>

        {/* 3 Planet Gears */}
        {Array.from({ length: 3 }).map((_, idx) => {
          const angle = (idx * Math.PI * 2) / 3
          const distance = 1.15
          const px = Math.cos(angle) * distance
          const py = Math.sin(angle) * distance

          return (
            <group key={idx} position={[px, py, zPlanets]}>
              <CylindricalGear
                radius={0.58}
                height={0.8}
                teeth={11}
                color="#f1f5f9" // Chrome Steel
                clippingPlanes={clippingPlanes}
                wireframe={wireframe}
              />
              
              {/* Planetary pin connecting planet to carrier */}
              <mesh position={[0, 0, zCarrier - zPlanets]} castShadow>
                <cylinderGeometry args={[0.13, 0.13, 0.65, 24]} />
                <meshStandardMaterial
                  color="#0f172a"
                  metalness={0.92}
                  roughness={0.2}
                  wireframe={wireframe}
                  clippingPlanes={clippingPlanes}
                  clipShadows
                />
              </mesh>
              
              {/* Washer retaining cap on the planet pin (Brass/Bronze detail accent) */}
              <mesh position={[0, 0, 0.42]} castShadow>
                <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
                <meshStandardMaterial
                  color="#d4af37"
                  metalness={0.95}
                  roughness={0.12}
                  wireframe={wireframe}
                  clippingPlanes={clippingPlanes}
                  clipShadows
                />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* CAD Overlay helper lines */}
      {wireframe && (
        <>
          <DimensionHelper start={[-2.18, 0, zHousing]} end={[2.18, 0, zHousing]} label="Ø 170mm (Casing)" color="#22c55e" />
          <DimensionHelper start={[0, 0, zSun - 1.5]} end={[0, 0, zOutputShaft + 0.55]} label="Length 340mm" color="#3b82f6" textOffset={[0.5, 0, 0]} />
        </>
      )}
    </group>
  )
}

// ----------------------------------------------------
// 2. Hydrostatic Spindle Model
// ----------------------------------------------------
function HydrostaticSpindleModel({
  explode,
  paintColor,
  clippingPlanes,
  wireframe
}: {
  explode: number
  paintColor: string
  clippingPlanes: THREE.Plane[]
  wireframe: boolean
}) {
  const shaftRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!wireframe && !explode && shaftRef.current) {
      shaftRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
    }
  })

  // Explode translations (axial along Y/Z)
  const zShaft = explode * 2.5
  const zSleeveLeft = explode * 0.8
  const zSleeveRight = explode * -0.8
  const zHousing = explode * -1.8

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* 1. Main Spindle Shaft with Nose and Jaws */}
      <group ref={shaftRef} position={[0, 0, zShaft]}>
        {/* Main core shaft */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 4.8, 32]} />
          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.06}
            metalness={0.98}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        
        {/* Front nose chuck holder */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.92, 0.92, 0.6, 32]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.12}
            metalness={0.9}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>

        {/* 3-Jaw Chuck clamps (adds extreme realism) */}
        {Array.from({ length: 3 }).map((_, j) => {
          const angle = (j * Math.PI * 2) / 3
          const rx = Math.cos(angle) * 0.55
          const rz = Math.sin(angle) * 0.55
          return (
            <mesh
              key={j}
              position={[rx, 2.75, rz]}
              rotation={[0, -angle, 0]}
              castShadow
            >
              <boxGeometry args={[0.2, 0.35, 0.28]} />
              <meshStandardMaterial
                color="#e2e8f0"
                roughness={0.1}
                metalness={0.95}
                wireframe={wireframe}
                clippingPlanes={clippingPlanes}
                clipShadows
              />
            </mesh>
          )
        })}

        {/* Rear timing belt pulley steps */}
        <mesh position={[0, -2.5, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.2}
            metalness={0.88}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Pulley grooves */}
        <mesh position={[0, -2.5, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.05, 32]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.9}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>

        {/* Shaft detailing sleeve rings */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.62, 0.62, 0.18, 32]} />
          <meshStandardMaterial
            color="#64748b"
            roughness={0.1}
            metalness={0.95}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
      </group>

      {/* 2. Hydrostatic Sleeve Bearings (with spiral distribution grooves) */}
      <group position={[0, 1.0, zSleeveLeft]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 1.2, 32, 1, true]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.15}
            metalness={0.8}
            side={THREE.DoubleSide}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Inner brass sleeve lining */}
        <mesh>
          <cylinderGeometry args={[0.77, 0.77, 1.18, 32, 1, true]} />
          <meshStandardMaterial
            color="#b45309"
            roughness={0.15}
            metalness={0.85}
            side={THREE.DoubleSide}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Micro oil entry port slots */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 4
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.77, 0, Math.sin(angle) * 0.77]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.1, 0.35, 0.3]} />
              <meshStandardMaterial
                color="#60a5fa"
                emissive="#2563eb"
                emissiveIntensity={wireframe ? 0 : 0.9}
                wireframe={wireframe}
                clippingPlanes={clippingPlanes}
                clipShadows
              />
            </mesh>
          )
        })}
      </group>

      <group position={[0, -1.0, zSleeveRight]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 1.2, 32, 1, true]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.15}
            metalness={0.8}
            side={THREE.DoubleSide}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.77, 0.77, 1.18, 32, 1, true]} />
          <meshStandardMaterial
            color="#b45309"
            roughness={0.15}
            metalness={0.85}
            side={THREE.DoubleSide}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Micro pockets */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 4
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.77, 0, Math.sin(angle) * 0.77]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.1, 0.35, 0.3]} />
              <meshStandardMaterial
                color="#60a5fa"
                emissive="#2563eb"
                emissiveIntensity={wireframe ? 0 : 0.9}
                wireframe={wireframe}
                clippingPlanes={clippingPlanes}
                clipShadows
              />
            </mesh>
          )
        })}
      </group>

      {/* 3. Outer Spindle Housing casting with hydraulic inlet fittings */}
      <group position={[0, 0, zHousing]}>
        {/* Main box block */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.0, 3.4, 2.0]} />
          <meshStandardMaterial
            color={paintColor}
            roughness={0.22}
            metalness={0.7}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        
        {/* Heavy casing end flange cap front */}
        <mesh position={[0, 1.7, 0]} castShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.3}
            metalness={0.85}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Flange bolts (4 bolts front) */}
        {Array.from({ length: 4 }).map((_, b) => {
          const angle = (b * Math.PI * 2) / 4
          const r = 1.05
          return (
            <Bolt
              key={b}
              position={[Math.cos(angle) * r, 1.73, Math.sin(angle) * r]}
              color="#94a3b8"
              clippingPlanes={clippingPlanes}
              wireframe={wireframe}
            />
          )
        })}

        {/* Flange cap rear */}
        <mesh position={[0, -1.7, 0]} castShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.3}
            metalness={0.85}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        
        {/* Inlet hex fittings */}
        <mesh position={[1.1, 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.35, 6]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.9}
            roughness={0.2}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Tube inlet connector joint */}
        <mesh position={[1.3, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.25, 8]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>

        <mesh position={[1.1, -0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.35, 6]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.9}
            roughness={0.2}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        <mesh position={[1.3, -0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.25, 8]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
      </group>

      {/* CAD Helper overlay */}
      {wireframe && (
        <>
          <DimensionHelper start={[0, -2.7, 0]} end={[0, 2.7, 0]} label="L: 540mm" color="#22c55e" textOffset={[0.8, 0, 0]} />
          <DimensionHelper start={[-1, 0, 0]} end={[1, 0, 0]} label="W: 200mm" color="#3b82f6" />
        </>
      )}
    </group>
  )
}

// ----------------------------------------------------
// 3. Ball Screw Model
// ----------------------------------------------------
function BallScrewModel({
  explode,
  paintColor,
  clippingPlanes,
  wireframe
}: {
  explode: number
  paintColor: string
  clippingPlanes: THREE.Plane[]
  wireframe: boolean
}) {
  const screwRef = useRef<THREE.Group>(null!)
  
  // High fidelity helical spline points
  const helixPoints = useMemo(() => {
    const points = []
    const length = 5.0
    const turns = 24
    const radius = 0.405
    const steps = 400
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const z = (t - 0.5) * length
      const angle = t * turns * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, z))
    }
    return points
  }, [])

  useFrame((state) => {
    if (!wireframe && !explode && screwRef.current) {
      screwRef.current.rotation.z = state.clock.getElapsedTime() * 0.4
    }
  })

  const zNut = explode * 1.8
  const zBalls = explode * 0.9

  return (
    <group ref={screwRef}>
      {/* 1. Main helical threaded screw shaft */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 5.0, 32]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.08}
          metalness={0.98}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* Helix thread (rendered as a thick tube winding around) */}
      <mesh castShadow>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(helixPoints), 200, 0.045, 8, false]} />
        <meshStandardMaterial
          color="#e2e8f0"
          roughness={0.05}
          metalness={0.98}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>
      
      {/* Shaft mounting bearing shoulder step ends */}
      <mesh position={[0, 0, 2.6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.95}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>
      <mesh position={[0, 0, -2.6]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.95}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* 2. Ball Nut Casing */}
      <group position={[0, 0, zNut]}>
        {/* Cylindrical nut body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.85, 1.3, 32]} />
          <meshStandardMaterial
            color={paintColor}
            roughness={0.2}
            metalness={0.8}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        
        {/* Flange on the ball nut */}
        <mesh position={[0, 0, 0.4]} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.25, 32]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.25}
            metalness={0.9}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>

        {/* Flange mounting bolts (6 bolts) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 6
          const r = 1.0
          const bx = Math.cos(angle) * r
          const by = Math.sin(angle) * r
          return (
            <Bolt
              key={i}
              position={[bx, by, 0.42]}
              rotation={[Math.PI / 2, 0, -angle]}
              color="#64748b"
              clippingPlanes={clippingPlanes}
              wireframe={wireframe}
            />
          )
        })}

        {/* End wipers sealing rings */}
        <mesh position={[0, 0, -0.66]} castShadow>
          <cylinderGeometry args={[0.84, 0.84, 0.08, 32]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.6}
            metalness={0.2}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        <mesh position={[0, 0, 0.54]} castShadow>
          <cylinderGeometry args={[0.84, 0.84, 0.08, 32]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.6}
            metalness={0.2}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
      </group>

      {/* 3. Recirculating Steel Balls (Visualized in between nut and shaft) */}
      <group position={[0, 0, zBalls]}>
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 18
          const spiralZ = -0.55 + (i / 18) * 1.1
          const r = 0.44
          return (
            <mesh
              key={i}
              position={[Math.cos(angle * 3.5) * r, Math.sin(angle * 3.5) * r, spiralZ]}
              castShadow
            >
              <sphereGeometry args={[0.065, 16, 16]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.02}
                metalness={1.0}
                wireframe={wireframe}
                clippingPlanes={clippingPlanes}
                clipShadows
              />
            </mesh>
          )
        })}
      </group>

      {/* CAD Helper overlay */}
      {wireframe && (
        <>
          <DimensionHelper start={[0, 0, -2.5]} end={[0, 0, 2.5]} label="Length: 500mm" color="#22c55e" textOffset={[0.8, 0, 0]} />
          <DimensionHelper start={[-1.2, 0, zNut + 0.4]} end={[1.2, 0, zNut + 0.4]} label="Flange Ø 120mm" color="#3b82f6" />
        </>
      )}
    </group>
  )
}

// ----------------------------------------------------
// 4. Rotary Table Model
// ----------------------------------------------------
function RotaryTableModel({
  explode,
  paintColor,
  clippingPlanes,
  wireframe
}: {
  explode: number
  paintColor: string
  clippingPlanes: THREE.Plane[]
  wireframe: boolean
}) {
  const tableRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!wireframe && !explode && tableRef.current) {
      tableRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  // Explode along Y axis
  const yPlatter = explode * 1.8
  const yWormWheel = explode * 0.9
  const xWormShaft = explode * 1.6
  const yBase = explode * -1.0

  return (
    <group position={[0, -0.4, 0]}>
      {/* 1. Base Casting Casing */}
      <mesh position={[0, yBase, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.2, 3.2]} />
        <meshStandardMaterial
          color={paintColor}
          roughness={0.3}
          metalness={0.6}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>
      {/* Base mounting flanges */}
      <mesh position={[0, yBase - 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.2, 3.6]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.35}
          metalness={0.8}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* Assembly bolts securing table base corners (4 heavy bolts) */}
      {[-1.6, 1.6].map((x) =>
        [-1.6, 1.6].map((z) => (
          <Bolt
            key={`${x}-${z}`}
            position={[x, yBase - 0.4, z]}
            scale={1.4}
            clippingPlanes={clippingPlanes}
            wireframe={wireframe}
          />
        ))
      )}

      {/* Servo Drive Motor Enclosure (Extreme realism detail) */}
      <group position={[xWormShaft + 1.8, yWormWheel - 0.15, -0.8]}>
        {/* Drive motor housing */}
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.8, 1.2]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.3}
            metalness={0.6}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Cooling fins (stacked heat sinks) */}
        {Array.from({ length: 5 }).map((_, f) => (
          <mesh key={f} position={[0, 0, -0.4 + f * 0.2]}>
            <boxGeometry args={[0.85, 0.85, 0.02]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.8}
              roughness={0.4}
              clippingPlanes={clippingPlanes}
            />
          </mesh>
        ))}
        {/* Power connector cap */}
        <mesh position={[0, 0.44, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} />
        </mesh>
      </group>

      {/* 2. Worm Shaft (Drive Pinion) from the side */}
      <group position={[xWormShaft + 1.2, yWormWheel + 0.1, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        {/* shaft */}
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.18, 2.2, 16]} />
          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.08}
            metalness={0.98}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        {/* Thread helix detail */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 1.0, 16]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.15}
            metalness={0.88}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
      </group>

      {/* 3. Internal Worm Wheel (Main Gear Ring) */}
      <CylindricalGear
        radius={1.25}
        height={0.4}
        teeth={36}
        color="#fbbf24"
        position={[0, yWormWheel, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        clippingPlanes={clippingPlanes}
        wireframe={wireframe}
      />

      {/* 4. Rotating Face Plate / Platter on Top */}
      <group ref={tableRef} position={[0, yPlatter + 0.7, 0]}>
        {/* Face platter */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.35, 64]} />
          <meshStandardMaterial
            color="#94a3b8"
            roughness={0.12}
            metalness={0.95}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        
        {/* Center alignment plug */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.98}
            roughness={0.08}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>
        
        {/* Radial T-slots (4 slots carved internally) */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 4
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.85, 0.18, Math.sin(angle) * 0.85]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[1.0, 0.03, 0.08]} />
              <meshStandardMaterial
                color="#0f172a"
                metalness={0.95}
                roughness={0.3}
                wireframe={wireframe}
                clippingPlanes={clippingPlanes}
                clipShadows
              />
            </mesh>
          )
        })}
      </group>

      {/* CAD Helper overlay */}
      {wireframe && (
        <>
          <DimensionHelper start={[-1.5, yPlatter + 0.7, 0]} end={[1.5, yPlatter + 0.7, 0]} label="Platter Ø 300mm" color="#22c55e" />
          <DimensionHelper start={[0, yBase - 0.6, 1.8]} end={[0, yPlatter + 0.9, 1.8]} label="H: 180mm" color="#3b82f6" textOffset={[0.5, 0, 0]} />
        </>
      )}
    </group>
  )
}

// ----------------------------------------------------
// 4.5. SPM Machine Tool Model
// ----------------------------------------------------
function SpmMachineModel({
  explode,
  paintColor,
  clippingPlanes,
  wireframe
}: {
  explode: number
  paintColor: string
  clippingPlanes: THREE.Plane[]
  wireframe: boolean
}) {
  const spindleRef = useRef<THREE.Group>(null!)
  const pulleyRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!wireframe && !explode) {
      if (spindleRef.current) {
        spindleRef.current.rotation.z = state.clock.getElapsedTime() * 0.4
      }
      if (pulleyRef.current) {
        pulleyRef.current.rotation.z = state.clock.getElapsedTime() * 1.2
      }
    }
  })

  // Explode positions
  const yBase = explode * -0.6
  const zChuck = explode * 1.5
  const xPulley = explode * -1.2
  const yTubes = explode * 1.0
  const zBackPlate = explode * -1.4
  const radialJaws = explode * 0.35

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Heavy Base Casting Platform */}
      <mesh position={[-0.2, -1.0 + yBase, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.3, 2.2]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.4}
          metalness={0.8}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* Base mounting bolts (4 units) */}
      {[-1.5, 1.1].map((x) =>
        [-0.9, 0.9].map((z) => (
          <Bolt
            key={`${x}-${z}`}
            position={[x, -0.85 + yBase, z]}
            scale={1.2}
            clippingPlanes={clippingPlanes}
            wireframe={wireframe}
          />
        ))
      )}

      {/* 2. Main Casing Body - Asymmetrical Cream Casting (Merged shapes) */}
      {/* Right-hand side large spindle cylinder housing */}
      <mesh position={[0.3, -0.05 + yBase, -0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.22, 1.22, 1.7, 32]} />
        <meshStandardMaterial
          color={paintColor}
          roughness={0.3}
          metalness={0.5}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* Left-hand side lower block housing (pulley support block) */}
      <mesh position={[-0.95, -0.3 + yBase, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.2, 1.6]} />
        <meshStandardMaterial
          color={paintColor}
          roughness={0.3}
          metalness={0.5}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* 3. Front Faceplate Flange Assembly (Polished Silver Flange) */}
      <group position={[0.3, -0.05 + yBase, 0.8 + zChuck]}>
        {/* Large steel ring/flange flush with front cylinder face */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[1.22, 1.22, 0.12, 32]} />
          <meshStandardMaterial
            color="#cbd5e1"
            roughness={0.15}
            metalness={0.9}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
          />
        </mesh>

        {/* 16 flange rim mounting screws */}
        {Array.from({ length: 16 }).map((_, sIdx) => {
          const angle = (sIdx * Math.PI * 2) / 16
          const rx = Math.cos(angle) * 1.08
          const ry = Math.sin(angle) * 1.08
          return (
            <mesh key={sIdx} position={[rx, ry, 0.05]} rotation={[Math.PI / 2, 0, -angle]}>
              <cylinderGeometry args={[0.024, 0.024, 0.03, 8]} />
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </mesh>
          )
        })}

        {/* Inner steel collar recess */}
        <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.08, 32]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.2}
            metalness={0.95}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
          />
        </mesh>
      </group>

      {/* 4. Rotating Spindle Chuck Assembly (Center core & Jaws) */}
      <group ref={spindleRef} position={[0.3, -0.05 + yBase, 0.82 + zChuck]}>
        {/* Steel core chuck spindle */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.15, 32]} />
          <meshStandardMaterial
            color="#94a3b8"
            roughness={0.1}
            metalness={0.95}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
          />
        </mesh>

        {/* 4 Segmented Jaws (trapezoidal sliding clamp wedges) */}
        {Array.from({ length: 4 }).map((_, j) => {
          const angle = (j * Math.PI * 2) / 4
          const rBase = 0.28 + radialJaws
          return (
            <group key={j} rotation={[0, 0, angle]}>
              {/* Main trapezoidal jaw block */}
              <mesh position={[0, rBase, 0.08]} castShadow>
                <boxGeometry args={[0.28, 0.28, 0.14]} />
                <meshStandardMaterial
                  color="#64748b"
                  roughness={0.2}
                  metalness={0.9}
                  wireframe={wireframe}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {/* Jaw tooth/gripper segment */}
              <mesh position={[0, rBase - 0.1, 0.12]} castShadow>
                <boxGeometry args={[0.18, 0.12, 0.06]} />
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.1}
                  metalness={0.95}
                  wireframe={wireframe}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* 5. Drive Pulley (Left side) */}
      <group ref={pulleyRef} position={[-1.5 + xPulley, -0.2 + yBase, 0.3]}>
        {/* Main Drive Shaft */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.8, 16]} />
          <meshStandardMaterial
            color="#94a3b8"
            roughness={0.15}
            metalness={0.92}
            clippingPlanes={clippingPlanes}
          />
        </mesh>

        {/* Brown grooved pulley body */}
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.52, 0.52, 0.45, 32]} />
          <meshStandardMaterial
            color="#5e4c44"
            roughness={0.35}
            metalness={0.7}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
          />
        </mesh>

        {/* 4 grooves */}
        {[-0.15, -0.05, 0.05, 0.15].map((zOffset, gIdx) => (
          <mesh key={gIdx} position={[0, 0, 0.08 + zOffset]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.52, 0.024, 8, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
        ))}

        {/* Central locking bolt */}
        <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.06, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.355]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* 6. Top Controller Block */}
      <mesh position={[0.3, 1.2 + yBase, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.3, 0.8]} />
        <meshStandardMaterial
          color={paintColor}
          roughness={0.35}
          metalness={0.5}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
        />
      </mesh>

      {/* Top flange outlet */}
      <mesh position={[0.3, 1.2 + yBase, 0.38]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
      </mesh>

      {/* 7. White Tube Lines & Coils on Top */}
      <group position={[0.5, 1.35 + yTubes, -0.1]}>
        {/* Bundled coil loops */}
        {Array.from({ length: 5 }).map((_, cIdx) => {
          const rx = Math.sin(cIdx * 1.2) * 0.03
          const ry = cIdx * 0.035
          const rz = Math.cos(cIdx * 0.7) * 0.03
          const tiltX = Math.PI / 2 + (cIdx - 2) * 0.08
          const tiltY = (cIdx - 2) * 0.05
          return (
            <mesh key={cIdx} position={[rx, ry, rz]} rotation={[tiltX, tiltY, 0]}>
              <torusGeometry args={[0.42, 0.016, 8, 48]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.55} metalness={0.1} />
            </mesh>
          )
        })}
      </group>

      {/* Procedural curved lines representing individual pneumatic feeds */}
      {!wireframe && (
        <>
          <Line
            points={[
              [0.5, 1.4 + yTubes, 0.0],
              [0.4, 1.2 + yTubes, 0.4],
              [0.3, 1.3 + yBase, 0.45]
            ]}
            color="#f8fafc"
            lineWidth={2.2}
            clippingPlanes={clippingPlanes}
          />
          <Line
            points={[
              [0.6, 1.35 + yTubes, -0.1],
              [0.8, 1.0 + yTubes, 0.1],
              [0.8, 0.6 + yBase, 0.4]
            ]}
            color="#f8fafc"
            lineWidth={2.2}
            clippingPlanes={clippingPlanes}
          />
          <Line
            points={[
              [0.3, 1.35 + yTubes, -0.3],
              [-0.2, 1.0 + yTubes, -0.4],
              [-0.6, 0.5 + yBase, -0.2]
            ]}
            color="#f8fafc"
            lineWidth={2.2}
            clippingPlanes={clippingPlanes}
          />
        </>
      )}

      {/* Brass fittings for the tubes */}
      {[
        [0.3, 1.2 + yBase, 0.42],
        [0.8, 0.6 + yBase, 0.42],
        [-0.6, 0.5 + yBase, -0.22]
      ].map((pos, fIdx) => (
        <mesh key={fIdx} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.06, 8]} />
          <meshStandardMaterial color="#ca8a04" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* 8. Rear Plate & Star Tube Distributor (Rear manifold distribution) */}
      <group position={[0.3, -0.05 + yBase, -0.9 + zBackPlate]}>
        {/* Steel plate */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.04, 32]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.2}
            metalness={0.88}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
          />
        </mesh>

        {/* Distributor center hub */}
        <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.12, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.15} metalness={0.95} />
        </mesh>

        {/* 8 Radial feed pipes */}
        {Array.from({ length: 8 }).map((_, pIdx) => {
          const angle = (pIdx * Math.PI * 2) / 8
          const dx = Math.cos(angle)
          const dy = Math.sin(angle)
          return (
            <group key={pIdx} rotation={[0, 0, angle]}>
              {/* Radial pipe */}
              <mesh position={[0.25, 0, -0.08]} rotation={[0, Math.PI / 2, 0]} castShadow>
                <cylinderGeometry args={[0.016, 0.016, 0.5, 8]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
              </mesh>
              {/* 90 degree elbow joint */}
              <mesh position={[0.5, 0, -0.08]} castShadow>
                <sphereGeometry args={[0.026, 8, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
              </mesh>
              {/* Axial connector going forward into plate */}
              <mesh position={[0.5, 0, -0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.016, 0.016, 0.1, 8]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
          )
        })}
      </group>

      {/* 9. BMT Logo Emblem on Front Base */}
      <Html position={[-1.2, -0.5 + yBase, 0.78]} transform distanceFactor={1.5}>
        <div className="flex items-center gap-1 bg-white border border-slate-300 rounded px-1.5 py-0.5 shadow-sm select-none">
          <svg className="w-3.5 h-3.5 text-red-600 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="10" strokeDasharray="4,3" />
          </svg>
          <span className="text-[10px] font-black tracking-tighter text-blue-900 font-sans">BMT</span>
        </div>
      </Html>

      {/* 10. Dimension overlay guides in CAD mode */}
      {wireframe && (
        <>
          <DimensionHelper start={[-1.6, -1.0 + yBase, 0]} end={[1.5, -1.0 + yBase, 0]} label="W: 310mm" color="#22c55e" />
          <DimensionHelper start={[0.3, -0.05 + yBase, 0.9 + zChuck]} end={[0.3, -0.05 + yBase, -0.9 + zBackPlate]} label="L: 180mm" color="#3b82f6" textOffset={[0.6, 0, 0]} />
        </>
      )}
    </group>
  )
}

// ----------------------------------------------------
// 5. Cross Roller / YRT Bearing Model (Smart Default)
// ----------------------------------------------------
function BearingModel({
  explode,
  paintColor,
  clippingPlanes,
  wireframe
}: {
  explode: number
  paintColor: string
  clippingPlanes: THREE.Plane[]
  wireframe: boolean
}) {
  const bearingRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!wireframe && !explode && bearingRef.current) {
      bearingRef.current.rotation.y = state.clock.getElapsedTime() * 0.25
    }
  })

  // Explode along Y axis
  const yOuter = explode * 1.8
  const yInner = explode * -1.8
  const yRollers = explode * 0.2

  return (
    <group ref={bearingRef} rotation={[Math.PI / 6, 0, 0]}>
      {/* 1. Outer Ring */}
      <mesh position={[0, yOuter, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 0.8, 48, 1, true]} />
        <meshStandardMaterial
          color={paintColor}
          roughness={0.12}
          metalness={0.88}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>
      
      {/* Outer flange details */}
      <mesh position={[0, yOuter, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.1, 2.1, 0.1, 48]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.2}
          metalness={0.9}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* Retainer/lubrication holes on outer ring */}
      {Array.from({ length: 6 }).map((_, h) => {
        const angle = (h * Math.PI * 2) / 6
        const rx = Math.cos(angle) * 2.06
        const rz = Math.sin(angle) * 2.06
        return (
          <mesh
            key={h}
            position={[rx, yOuter, rz]}
            rotation={[0, -angle, 0]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
        )
      })}

      {/* 2. Inner Ring */}
      <mesh position={[0, yInner, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.35, 0.78, 48, 1, true]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.06}
          metalness={0.98}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          clippingPlanes={clippingPlanes}
          clipShadows
        />
      </mesh>

      {/* 3. Cage and Rolling Elements (Cross Rollers) */}
      <group position={[0, yRollers, 0]}>
        {/* Cage structure */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.68, 1.68, 0.6, 48, 1, true]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.25}
            metalness={0.8}
            side={THREE.DoubleSide}
            wireframe={wireframe}
            clippingPlanes={clippingPlanes}
            clipShadows
          />
        </mesh>

        {/* 16 alternating rollers angled at 45 / 135 degrees */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 16
          const rx = Math.cos(angle) * 1.68
          const rz = Math.sin(angle) * 1.68
          const slant = i % 2 === 0 ? Math.PI / 4 : -Math.PI / 4

          return (
            <mesh
              key={i}
              position={[rx, 0, rz]}
              rotation={[slant, -angle, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.13, 0.13, 0.45, 16]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.05}
                metalness={1.0}
                wireframe={wireframe}
                clippingPlanes={clippingPlanes}
                clipShadows
              />
            </mesh>
          )
        })}
      </group>

      {/* CAD Helper overlay */}
      {wireframe && (
        <>
          <DimensionHelper start={[-2.1, 0, 0]} end={[2.1, 0, 0]} label="OD Ø 210mm" color="#22c55e" />
          <DimensionHelper start={[-1.35, 0, 0]} end={[1.35, 0, 0]} label="ID Ø 135mm" color="#3b82f6" />
        </>
      )}
    </group>
  )
}

// ----------------------------------------------------
// 3D Scene Wrapper
// ----------------------------------------------------
interface ModelSelectorProps {
  slug: string
  explode: number
  paintColor: string
  clippingPlanes: THREE.Plane[]
  wireframe: boolean
}

function ModelSelector({ slug, explode, paintColor, clippingPlanes, wireframe }: ModelSelectorProps) {
  switch (slug) {
    case 'spm-machine-tools':
    case 'flow-forming-machine-mandrels':
      return (
        <SpmMachineModel
          explode={explode}
          paintColor={paintColor}
          clippingPlanes={clippingPlanes}
          wireframe={wireframe}
        />
      )
    case 'planetary-gear-box':
      return (
        <PlanetaryGearboxModel
          explode={explode}
          paintColor={paintColor}
          clippingPlanes={clippingPlanes}
          wireframe={wireframe}
        />
      )
    case 'hydro-static-spindles':
      return (
        <HydrostaticSpindleModel
          explode={explode}
          paintColor={paintColor}
          clippingPlanes={clippingPlanes}
          wireframe={wireframe}
        />
      )
    case 'ball-screws':
      return (
        <BallScrewModel
          explode={explode}
          paintColor={paintColor}
          clippingPlanes={clippingPlanes}
          wireframe={wireframe}
        />
      )
    case 'rotary-tables':
      return (
        <RotaryTableModel
          explode={explode}
          paintColor={paintColor}
          clippingPlanes={clippingPlanes}
          wireframe={wireframe}
        />
      )
    default:
      return (
        <BearingModel
          explode={explode}
          paintColor={paintColor}
          clippingPlanes={clippingPlanes}
          wireframe={wireframe}
        />
      )
  }
}

// Light configurations for studio/CAD
function SceneLights({ isCad }: { isCad: boolean }) {
  if (isCad) {
    return <ambientLight intensity={1.8} />
  }
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* Studio main light */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow color="#f8fafc" />
      {/* Fill lighting */}
      <directionalLight position={[-8, 4, -4]} intensity={0.6} color="#cbd5e1" />
      {/* Cool background glowing lights */}
      <directionalLight position={[0, -5, 3]} intensity={0.4} color="#60a5fa" />
      <pointLight position={[3, 2, 3]} intensity={0.8} color="#e0e7ff" />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color="#3b82f6" />
    </>
  )
}

// ----------------------------------------------------
// Main Visualizer Content Component
// ----------------------------------------------------
export default function VisualizerContent({ product }: VisualizerContentProps) {
  const [mode, setMode] = useState<VisualizerMode>('render')
  const [explodeVal, setExplodeVal] = useState(0.0)
  const [sectionVal, setSectionVal] = useState(0.0)
  const [paint, setPaint] = useState<PaintColor>('chrome')
  const [autoRotate, setAutoRotate] = useState(true)

  // Paint Finish Mapping (Metallic base paint finishes)
  const paintColorHex = useMemo(() => {
    switch (paint) {
      case 'yellow':
        return '#f59e0b' // Safety Industrial Yellow
      case 'blue':
        return '#1e40af' // Heavy Machinery Blue
      case 'red':
        return '#b91c1c' // Signal Crimson Red
      case 'chrome':
      default:
        return '#64748b' // Ground Cast Steel (Neutral Metallic)
    }
  }, [paint])

  // Reset sliders when switching modes
  useEffect(() => {
    if (mode === 'explode') {
      setExplodeVal(0.5)
      setSectionVal(0)
    } else if (mode === 'section') {
      setExplodeVal(0)
      setSectionVal(0.1)
    } else {
      setExplodeVal(0)
      setSectionVal(0)
    }
  }, [mode])

  // Setup local clipping plane cutting lengthwise in half
  const clippingPlanes = useMemo(() => {
    if (mode === 'section') {
      const planeX = new THREE.Plane(new THREE.Vector3(1, 0, 0), sectionVal)
      return [planeX]
    }
    return []
  }, [mode, sectionVal])

  // Spec Data for CAD Spec HUD overlay
  const specData = useMemo(() => {
    const slug = product.slug
    switch (slug) {
      case 'spm-machine-tools':
      case 'flow-forming-machine-mandrels':
        return {
          id: 'BMT-SPM-400',
          mass: '185.0 kg',
          material: 'High-Tensile Structural Cast & Alloy Steel',
          precision: 'Clamping force 120 kN / Runout ≤ 0.005 mm',
          parts: 'Beige Casing, Segmented Clamping Jaws, Main Pulley, Hydraulic Star distributor, Manifold Lines',
          polyCount: '49,800 vertices'
        }
      case 'planetary-gear-box':
        return {
          id: 'BMT-PG-170',
          mass: '12.4 kg',
          material: 'Case-Hardened Steel (20MnCr5)',
          precision: 'DIN 6 / AGMA 11',
          parts: 'Sun Gear, 3x Planets, Carrier, Ring Gear Housing, Keyways',
          polyCount: '34,220 vertices'
        }
      case 'hydro-static-spindles':
        return {
          id: 'BMT-HSS-80',
          mass: '24.8 kg',
          material: 'Hardened Tool Steel (58 HRC)',
          precision: 'Runout ≤ 0.001 mm',
          parts: 'Precision Shaft, Hydraulic Sleeves, Outer Jacket, End Flanges',
          polyCount: '42,910 vertices'
        }
      case 'ball-screws':
        return {
          id: 'BMT-BS-3210',
          mass: '6.2 kg',
          material: 'Carbon Steel (CF53) / GCr15 Balls',
          precision: 'ISO Class 3 (C3)',
          parts: 'Helical Screw Shaft, Return Flange Nut, 60x Spheres, Wiper Seals',
          polyCount: '28,140 vertices'
        }
      case 'rotary-tables':
        return {
          id: 'BMT-RT-300',
          mass: '72.0 kg',
          material: 'Meehanite Cast Iron (FC300) / Bronze Gear',
          precision: 'Index accuracy 5 arc-sec',
          parts: 'T-Slot Platter, Base Cast, Worm Wheel, Servo Drive Motor',
          polyCount: '58,200 vertices'
        }
      default:
        return {
          id: 'BMT-XBRG-210',
          mass: '4.8 kg',
          material: 'High-Chrome Bearing Steel (100Cr6)',
          precision: 'P4 / P2 Class stiffness',
          parts: 'Inner Ring, Outer Ring, Retainer Cage, 16x Rollers, Ports',
          polyCount: '22,460 vertices'
        }
    }
  }, [product.slug])

  const isCadMode = mode === 'cad'

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950 text-white select-none overflow-hidden font-sans rounded-2xl">
      
      {/* 3D View Canvas Viewport */}
      <div className="relative flex-1 w-full min-h-[360px] bg-slate-950">
        
        {/* Blueprint background grid for CAD mode */}
        {isCadMode && (
          <div className="absolute inset-0 bg-blue-950/25 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />
        )}

        <Canvas
          shadows
          camera={{ position: [0, 2.2, 5.8], fov: 46 }}
          gl={{ localClippingEnabled: true, antialias: true }}
          className="absolute inset-0 z-10"
        >
          {/* Background color */}
          <color attach="background" args={[isCadMode ? '#080d1a' : '#020617']} />
          
          <SceneLights isCad={isCadMode} />

          {/* Model selection */}
          <group>
            <ModelSelector
              slug={product.slug}
              explode={explodeVal}
              paintColor={paintColorHex}
              clippingPlanes={clippingPlanes}
              wireframe={isCadMode}
            />
          </group>

          {/* Realistic physical ground shadows and reflection environment */}
          {!isCadMode ? (
            <>
              {/* Warehouse PBR Environment map reflection (Crucial for chrome/steel realism) */}
              <Environment preset="warehouse" />
              
              {/* Soft ground contact shadow */}
              <ContactShadows
                position={[0, -1.49, 0]}
                opacity={0.8}
                scale={9}
                blur={1.8}
                far={3}
              />
            </>
          ) : (
            <Grid
              position={[0, -1.5, 0]}
              args={[10.5, 10.5]}
              cellSize={0.2}
              cellThickness={0.5}
              cellColor="#1e293b"
              sectionSize={1.0}
              sectionThickness={1.0}
              sectionColor="#2563eb"
              fadeDistance={25}
            />
          )}

          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            minDistance={2.2}
            maxDistance={8.5}
            autoRotate={autoRotate && mode !== 'explode' && mode !== 'section'}
            autoRotateSpeed={1.2}
          />
        </Canvas>

        {/* CAD Grid Header Tag */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <h4 className="font-mono text-[9px] font-bold tracking-widest text-blue-400 uppercase">
              BMT ENGINE v3.5 // PBR_ACTIVE
            </h4>
          </div>
          <p className="text-[9px] font-mono text-slate-500">
            {specData.id} - HDR STUDIO LOADED // WebGL 2.0
          </p>
        </div>

        {/* Top Right Action Overlay (Auto Rotate) */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-lg border font-mono text-[9px] uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
              autoRotate
                ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Spin</span>
          </button>
        </div>

        {/* Lower Left Live Engineering Terminal Overlay */}
        <div className="absolute bottom-4 left-4 z-20 max-w-[280px] sm:max-w-[320px] bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
            <Binary className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-xs font-bold tracking-wider text-slate-300">Live CAD Spec Data</span>
          </div>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 font-mono text-[10px]">
            <span className="text-slate-500 uppercase font-medium">Model ID:</span>
            <span className="text-slate-300 font-semibold">{specData.id}</span>
            <span className="text-slate-500 uppercase font-medium">Est. Weight:</span>
            <span className="text-slate-300 font-semibold">{specData.mass}</span>
            <span className="text-slate-500 uppercase font-medium">Material:</span>
            <span className="text-slate-300 truncate font-semibold" title={specData.material}>
              {specData.material}
            </span>
            <span className="text-slate-500 uppercase font-medium">Tolerance:</span>
            <span className="text-slate-300 font-semibold">{specData.precision}</span>
            <span className="text-slate-500 uppercase font-medium">Polys (WebGL):</span>
            <span className="text-slate-300 font-semibold">{specData.polyCount}</span>
          </div>
        </div>

        {/* Floating instructions */}
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-right hidden sm:block">
          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
            Drag to Rotate • Scroll to Zoom
          </span>
        </div>
      </div>

      {/* Control Panel Section */}
      <div className="z-20 bg-slate-900 border-t border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'render', label: 'Rotating Render', icon: Compass },
              { id: 'explode', label: '3D Exploded', icon: Layers },
              { id: 'section', label: 'Section View', icon: Scissors },
              { id: 'cad', label: 'CAD Preview', icon: Settings2 }
            ] as const
          ).map((t) => {
            const IconComp = t.icon
            const active = mode === t.id
            return (
              <button
                key={t.id}
                onClick={() => setMode(t.id)}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${active ? 'scale-110 text-white' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Explode / Section dynamic slider controls */}
        {mode === 'explode' && (
          <div className="flex-1 max-w-sm flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
            <Sliders className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="font-mono text-[10px] text-slate-400 uppercase w-20">Explosion:</span>
            <input
              type="range"
              min="0.0"
              max="1.5"
              step="0.01"
              value={explodeVal}
              onChange={(e) => setExplodeVal(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="font-mono text-[10px] text-slate-300 w-12 text-right">
              {Math.round(explodeVal * 100)}%
            </span>
          </div>
        )}

        {mode === 'section' && (
          <div className="flex-1 max-w-sm flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
            <Scissors className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-mono text-[10px] text-slate-400 uppercase w-20">Cut Depth:</span>
            <input
              type="range"
              min="-1.5"
              max="1.5"
              step="0.01"
              value={sectionVal}
              onChange={(e) => setSectionVal(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="font-mono text-[10px] text-slate-300 w-12 text-right">
              {Math.round((sectionVal + 1.5) * 33.3)}%
            </span>
          </div>
        )}

        {/* Color picker finishes (only active outside CAD mode) */}
        {!isCadMode && mode !== 'explode' && mode !== 'section' && (
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl self-start md:self-auto">
            <Palette className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-[10px] text-slate-400 uppercase mr-1">Finish:</span>
            <div className="flex items-center gap-2">
              {(
                [
                  { id: 'chrome', color: '#64748b', label: 'Steel' },
                  { id: 'yellow', color: '#f59e0b', label: 'Yellow' },
                  { id: 'blue', color: '#1e40af', label: 'Blue' },
                  { id: 'red', color: '#b91c1c', label: 'Red' }
                ] as const
              ).map((col) => (
                <button
                  key={col.id}
                  onClick={() => setPaint(col.id)}
                  style={{ backgroundColor: col.color }}
                  className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                    paint === col.id ? 'border-white scale-125 ring-2 ring-blue-500/50' : 'border-slate-800 hover:scale-110'
                  }`}
                  title={col.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
