"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, ShieldAlert, Cpu, Settings, CheckCircle2 } from "lucide-react"
import * as THREE from "three"

type SectorId = "aerospace" | "defense" | "robotics" | "machinetools"

export default function V2Industries() {
  const [activeSector, setActiveSector] = useState<SectorId>("aerospace")
  const mountRef = useRef<HTMLDivElement>(null)
  
  // Real-time sensor state variables for fluctuation
  const [telemetry, setTelemetry] = useState({ val1: "", val2: "" })

  const sectors = [
    {
      id: "aerospace" as SectorId,
      title: "Aerospace Engineering",
      icon: Plane,
      desc: "Supplying sub-micron tolerance spindles and YRT axial-radial roller bearings to withstand heavy thrust forces during titanium wing spar and turbine blade milling.",
      spec: "Radial Runout: ≤ 0.002mm",
      apps: [
        "Turbofan engine mount machining",
        "Aircraft wing spar high-speed milling",
        "Aerospace composite tooling fixtures"
      ],
      telemetry: { label1: "SPINDLE ROTATION", val1: "42,000 RPM", label2: "VIB LEVEL", val2: "0.04 MM/S" }
    },
    {
      id: "defense" as SectorId,
      title: "Defense & Space Systems",
      icon: ShieldAlert,
      desc: "Engineering heavy-duty telescopic leveling outriggers, pneumatic mast arrays, and high-stabilization hydraulic actuators for mobile defense radar arrays.",
      spec: "Gear Teeth Profile: Helical Spur",
      apps: [
        "Mobile communication telescoping masts",
        "Launcher vehicle level-stabilizers",
        "Satellite array pitch positioners"
      ],
      telemetry: { label1: "INPUT SHAFT SPEED", val1: "1,500 RPM", label2: "COUPLED TORQUE", val2: "450 N·M" }
    },
    {
      id: "robotics" as SectorId,
      title: "Industrial Automation",
      icon: Cpu,
      desc: "Providing JIS Class C3 precision ground linear guides and zero-backlash planetary speed reducers for multi-axis pick-and-place lines and robotic weld joints.",
      spec: "Travel Flatness: ≤ 0.003mm",
      apps: [
        "Robotic arm positioning actuators",
        "Automotive welding line linear guides",
        "Automated assembly feed fixtures"
      ],
      telemetry: { label1: "CARRIAGE VELOCITY", val1: "2.8 M/S", label2: "CYCLES COMPLETED", val2: "14,820" }
    },
    {
      id: "machinetools" as SectorId,
      title: "CNC Machine Tools",
      icon: Settings,
      desc: "Manufacturing custom high-rigidity spindles, tailstocks, and 4th/5th axis rotary tables. We also offer dynamic slideway scraping and spindle refurbishing.",
      spec: "Balancing Standard: ISO G0.4",
      apps: [
        "4th & 5th axis CNC rotary tables",
        "High-torque lathe spindle heads",
        "Slideway scraping & retrofitting"
      ],
      telemetry: { label1: "TABLE INDEX", val1: "360.000°", label2: "LOCK PRESSURE", val2: "60 BAR" }
    }
  ]

  const activeData = sectors.find((s) => s.id === activeSector) || sectors[0]

  // Fluctuate sensor feed telemetry numbers in real-time
  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count++
      if (activeSector === "aerospace") {
        const rpm = 42000 + Math.floor(Math.sin(count * 0.5) * 45)
        const vib = (0.04 + Math.sin(count * 0.3) * 0.003).toFixed(4)
        setTelemetry({ val1: `${rpm.toLocaleString()} RPM`, val2: `${vib} MM/S` })
      } else if (activeSector === "defense") {
        const rpm = 1500 + Math.floor(Math.sin(count * 0.5) * 8)
        const torque = 450 + Math.floor(Math.sin(count * 0.2) * 3)
        setTelemetry({ val1: `${rpm} RPM`, val2: `${torque} N·M` })
      } else if (activeSector === "robotics") {
        const velocity = Math.abs(Math.sin(count * 0.2) * 2.8).toFixed(2)
        const cycles = 14820 + Math.floor(count * 0.1)
        setTelemetry({ val1: `${velocity} M/S`, val2: `${cycles}` })
      } else if (activeSector === "machinetools") {
        const index = ((count * 15) % 360).toFixed(3)
        const press = 60 + Math.floor(Math.sin(count * 0.4) * 2)
        setTelemetry({ val1: `${index}°`, val2: `${press} BAR` })
      }
    }, 150)
    return () => clearInterval(interval)
  }, [activeSector])

  // Live Three.js render loop with Custom Interactive Mouse Controls
  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current

    // Dimensions
    const width = container.clientWidth || 400
    const height = container.clientHeight || 300

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#f8fafc") // Matches light slate-50 background

    // Camera (Zoomed in closer for detailed inspection)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 1.8, 4.8)
    camera.lookAt(0, 0.25, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Lighting Layout (Optimized for shiny Phong steel diffusion)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    // Main Overhead light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
    dirLight.position.set(3, 8, 5)
    dirLight.castShadow = true
    scene.add(dirLight)

    // Secondary backlight to eliminate dark sides
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5)
    fillLight.position.set(-3, -4, -3)
    scene.add(fillLight)

    // Colored Accent Backlights
    const blueLight = new THREE.PointLight(0x3b82f6, 1.2, 10)
    blueLight.position.set(-3, 2, -2)
    scene.add(blueLight)

    const redLight = new THREE.PointLight(0xef233c, 0.6, 8)
    redLight.position.set(3, -1, 2)
    scene.add(redLight)

    // --- HIGH-FIDELITY PHONG MATERIALS (Guarantees bright steel color without envMap black void) ---
    const steelMaterial = new THREE.MeshPhongMaterial({
      color: 0xdddddd, // Bright silver/grey steel
      emissive: 0x181818, // Subtle ambient glow so metal faces never look black
      shininess: 120, // High specularity for bright glossy reflections
      specular: 0xffffff // White reflection highlights
    })

    const brassMaterial = new THREE.MeshPhongMaterial({
      color: 0xd97706,
      shininess: 90,
      specular: 0xffffff
    })

    const anodizedRed = new THREE.MeshPhongMaterial({
      color: 0xef233c,
      shininess: 80,
      specular: 0xffffff
    })

    const darkIron = new THREE.MeshPhongMaterial({
      color: 0x475569,
      shininess: 40,
      specular: 0x94a3b8
    })

    // Create realistic 3D groups based on active sector
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // Helper to build a realistic CAD spur gear (perfect straight teeth profiles, recessed web, weight-reduction cutouts)
    const createSplineGear = (
      minorRadius: number,
      majorRadius: number,
      length: number,
      teethCount: number,
      hasWebRecess: boolean = false
    ) => {
      const gearGroup = new THREE.Group()
      
      if (hasWebRecess) {
        // Central Hub
        const hubGeom = new THREE.CylinderGeometry(minorRadius * 0.45, minorRadius * 0.45, length * 1.05, 32)
        const hubMesh = new THREE.Mesh(hubGeom, steelMaterial)
        gearGroup.add(hubMesh)

        // Recessed Web (machined thin center connector plate)
        const webGeom = new THREE.CylinderGeometry(minorRadius * 0.88, minorRadius * 0.88, length * 0.35, 32)
        const webMesh = new THREE.Mesh(webGeom, steelMaterial)
        gearGroup.add(webMesh)

        // Weight reduction holes in the center disc web area (6 circular cuts)
        for (let i = 0; i < 6; i++) {
          const theta = (i * Math.PI * 2) / 6
          const hole = new THREE.Mesh(new THREE.CylinderGeometry(minorRadius * 0.16, minorRadius * 0.16, length * 0.4, 16), darkIron)
          hole.position.set(Math.cos(theta) * (minorRadius * 0.65), 0, Math.sin(theta) * (minorRadius * 0.65))
          gearGroup.add(hole)
        }

        // Outer rim core cylinder
        const rimGeom = new THREE.CylinderGeometry(minorRadius, minorRadius, length, 32)
        const rimMesh = new THREE.Mesh(rimGeom, steelMaterial)
        gearGroup.add(rimMesh)
      } else {
        // Original simple solid core cylinder (For Aerospace spline gears as requested)
        const core = new THREE.Mesh(new THREE.CylinderGeometry(minorRadius, minorRadius, length, 32), steelMaterial)
        gearGroup.add(core)
      }

      // Straight Teeth ridges (No rotation.z skewing to prevent weird conical/frustum distortion!)
      const toothWidth = (2 * Math.PI * minorRadius) / (teethCount * 2.2)
      const toothThickness = majorRadius - minorRadius
      
      for (let i = 0; i < teethCount; i++) {
        const theta = (i * Math.PI * 2) / teethCount
        const toothGeom = new THREE.BoxGeometry(toothWidth, length, toothThickness)
        const tooth = new THREE.Mesh(toothGeom, steelMaterial)
        
        tooth.position.set(Math.cos(theta) * minorRadius, 0, Math.sin(theta) * minorRadius)
        tooth.rotation.y = -theta
        
        gearGroup.add(tooth)
      }

      return gearGroup
    }

    // Helper to construct a mathematically precise 3D Helical Thread (Continuous spiral curve extruded as tube)
    const createHelicalThread = (radius: number, length: number, turns: number, tubeRadius: number, material: THREE.Material) => {
      const points = []
      const segments = 200
      for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * turns * Math.PI * 2
        const y = (i / segments) * length - length / 2
        const x = Math.cos(t) * radius
        const z = Math.sin(t) * radius
        points.push(new THREE.Vector3(x, y, z))
      }
      const curve = new THREE.CatmullRomCurve3(points)
      const geom = new THREE.TubeGeometry(curve, segments, tubeRadius, 8, false)
      return new THREE.Mesh(geom, material)
    }

    if (activeSector === "aerospace") {
      // --- Aerospace: Spindle Shaft Exploded Assembly Animation ---
      const spindleGroup = new THREE.Group()
      
      // Define Part 1 (Main Central Core Shaft Cylinder with multiple steps)
      const part1Group = new THREE.Group()
      const coreGeom = new THREE.CylinderGeometry(0.2, 0.2, 2.4, 32)
      const corePart = new THREE.Mesh(coreGeom, steelMaterial)
      part1Group.add(corePart)
      // Add a brass spacer ring on the shaft core
      const brassSpacer = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.2, 32), brassMaterial)
      brassSpacer.position.y = 0.5
      part1Group.add(brassSpacer)
      // Add a dark steel collar lock
      const darkCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.15, 32), darkIron)
      darkCollar.position.y = -0.5
      part1Group.add(darkCollar)

      part1Group.rotation.z = Math.PI / 2
      part1Group.position.set(-0.2, 0.5, 0)
      spindleGroup.add(part1Group)

      // Define Part 2 (Left End Spline Gear with original flat/vertical teeth)
      const part2Group = new THREE.Group()
      const leftGear = createSplineGear(0.12, 0.16, 0.6, 10)
      part2Group.add(leftGear)
      // Chamfered tip
      const tipCone = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.15, 12), darkIron)
      tipCone.position.y = -0.37
      part2Group.add(tipCone)

      part2Group.rotation.z = Math.PI / 2
      part2Group.position.set(-1.6, 0.5, 0)
      spindleGroup.add(part2Group)

      // Define Part 3 (Center Spline Gear with original flat/vertical teeth)
      const part3Group = new THREE.Group()
      const centerGear = createSplineGear(0.22, 0.3, 0.6, 12)
      part3Group.add(centerGear)
      // Brass washer shoulder
      const washer = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 32), brassMaterial)
      washer.position.y = 0.34
      part3Group.add(washer)

      part3Group.rotation.z = Math.PI / 2
      part3Group.position.set(-0.7, 0.5, 0)
      spindleGroup.add(part3Group)

      // Define Part 4 (Right Flange Shoulder Sleeve with dark locknut)
      const part4Group = new THREE.Group()
      const flangePart = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.5, 32), steelMaterial)
      part4Group.add(flangePart)
      // Dark locknut ring
      const locknut = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.39, 0.15, 6, 1, false), darkIron) // Hex shape for realism!
      locknut.position.y = 0.325
      part4Group.add(locknut)

      part4Group.rotation.z = Math.PI / 2
      part4Group.position.set(0.6, 0.5, 0)
      spindleGroup.add(part4Group)

      // Define Part 5 (Right End Spline Gear with original flat/vertical teeth)
      const part5Group = new THREE.Group()
      const rightGear = createSplineGear(0.22, 0.3, 0.6, 12)
      part5Group.add(rightGear)
      // Threaded brass nose tip (Continuous Helix)
      const threadTip = createHelicalThread(0.2, 0.15, 3, 0.015, brassMaterial)
      threadTip.position.y = 0.37
      part5Group.add(threadTip)

      part5Group.rotation.z = Math.PI / 2
      part5Group.position.set(1.2, 0.5, 0)
      spindleGroup.add(part5Group)

      // FUNCTIONAL WORKPIECE & MILLING LASER
      // Red laser indicator beam targeting the rotating spindle
      const laserBeam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 2.0),
        new THREE.MeshBasicMaterial({ color: 0xef233c, transparent: true, opacity: 0.8 })
      )
      laserBeam.position.set(1.2, 1.5, 0)
      spindleGroup.add(laserBeam)

      // Glowing spark contact point sphere
      const spark = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffe600 })
      )
      spark.position.set(1.2, 0.5, 0)
      spindleGroup.add(spark)

      mainGroup.add(spindleGroup)

      // Set initial orientation once (Fixed angle)
      mainGroup.rotation.set(0.2, 0.45, 0.08)

      // Assembled Target X Positions (Parent Group coordinates along horizontal line)
      const targets = {
        core: -0.2,
        leftGear: -1.6,
        centerGear: -0.7,
        flange: 0.6,
        rightGear: 1.2
      }

      // Exploded X Offsets
      const explodedOffsets = {
        core: 0,
        leftGear: -1.8,
        centerGear: -0.9,
        flange: 1.0,
        rightGear: 2.2
      }

      // Assembly animation timeline ticker (No spindle rotation!)
      let frame = 0
      const tick = () => {
        frame = (frame + 1) % 650 // Loop timeline

        // Reset positions during explode phase
        if (frame >= 580) {
          // Exploding out (Animating parent groups horizontally)
          const factor = (frame - 580) / 70 // 0 to 1
          part2Group.position.x = targets.leftGear + explodedOffsets.leftGear * factor
          part3Group.position.x = targets.centerGear + explodedOffsets.centerGear * factor
          part4Group.position.x = targets.flange + explodedOffsets.flange * factor
          part5Group.position.x = targets.rightGear + explodedOffsets.rightGear * factor
          
          spindleGroup.rotation.x = 0 // reset rotation
          laserBeam.visible = false
          spark.visible = false
        } else if (frame < 300) {
          // Assembly one-by-one
          laserBeam.visible = false
          spark.visible = false
          
          // Part 2 Left Gear slides in (frame 30 to 85)
          if (frame < 30) {
            part2Group.position.x = targets.leftGear + explodedOffsets.leftGear
          } else if (frame >= 30 && frame < 85) {
            const t = (frame - 30) / 55
            part2Group.position.x = (targets.leftGear + explodedOffsets.leftGear) + (explodedOffsets.leftGear * -1) * t
          } else {
            part2Group.position.x = targets.leftGear
          }

          // Part 3 Center Gear slides in (frame 95 to 150)
          if (frame < 95) {
            part3Group.position.x = targets.centerGear + explodedOffsets.centerGear
          } else if (frame >= 95 && frame < 150) {
            const t = (frame - 95) / 55
            part3Group.position.x = (targets.centerGear + explodedOffsets.centerGear) + (explodedOffsets.centerGear * -1) * t
          } else {
            part3Group.position.x = targets.centerGear
          }

          // Part 4 Flange Sleeve slides in (frame 160 to 215)
          if (frame < 160) {
            part4Group.position.x = targets.flange + explodedOffsets.flange
          } else if (frame >= 160 && frame < 215) {
            const t = (frame - 160) / 55
            part4Group.position.x = (targets.flange + explodedOffsets.flange) + (explodedOffsets.flange * -1) * t
          } else {
            part4Group.position.x = targets.flange
          }

          // Part 5 Right Gear slides in (frame 225 to 280)
          if (frame < 225) {
            part5Group.position.x = targets.rightGear + explodedOffsets.rightGear
          } else if (frame >= 225 && frame < 280) {
            const t = (frame - 225) / 55
            part5Group.position.x = (targets.rightGear + explodedOffsets.rightGear) + (explodedOffsets.rightGear * -1) * t
          } else {
            part5Group.position.x = targets.rightGear
          }
          
          spindleGroup.rotation.x = 0
        } else {
          // Fully assembled static phase (Object rotation set to 0 to satisfy 'object rotation dont want')
          part2Group.position.x = targets.leftGear
          part3Group.position.x = targets.centerGear
          part4Group.position.x = targets.flange
          part5Group.position.x = targets.rightGear
          
          spindleGroup.rotation.x = 0 // Stays completely still
          
          laserBeam.visible = true
          spark.visible = true
          // Spark flickering simulation
          spark.scale.setScalar(0.7 + Math.random() * 0.6)
        }
      }
      (mainGroup as any).customTick = tick
    } 
    
    else if (activeSector === "defense") {
      // --- Defense: Dual Gear Reducer Transmission Gearbox ---
      const gearboxGroup = new THREE.Group()

      // Base cast-iron block
      const basePlate = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.25, 2.2), darkIron)
      basePlate.position.y = -0.3
      gearboxGroup.add(basePlate)

      // Supporting stand brackets (Left and Right)
      const leftStand = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 2.0), darkIron)
      leftStand.position.set(-1.0, 0.1, 0)
      gearboxGroup.add(leftStand)

      const rightStand = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 2.0), darkIron)
      rightStand.position.set(1.0, 0.1, 0)
      gearboxGroup.add(rightStand)

      // Parallel Shaft 1: Lower Front Shaft
      const shaft1Group = new THREE.Group()
      
      const shaft1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.4, 32), steelMaterial)
      shaft1.rotation.z = Math.PI / 2
      shaft1Group.add(shaft1)

      // Threaded Screw ends (Continuous Helix)
      const thread1 = createHelicalThread(0.2, 0.7, 14, 0.02, steelMaterial)
      thread1.position.x = 0.85
      thread1.rotation.z = Math.PI / 2
      shaft1Group.add(thread1)

      // Small Spur Gear (Front Gear - 18 teeth, straight teeth core with web recess)
      const gear1 = createSplineGear(0.35, 0.45, 0.5, 18, true)
      gear1.position.x = -0.4
      shaft1Group.add(gear1)

      shaft1Group.position.set(0, 0.3, 0.4)
      gearboxGroup.add(shaft1Group)

      // Parallel Shaft 2: Upper Rear Shaft
      const shaft2Group = new THREE.Group()

      const shaft2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.4, 32), steelMaterial)
      shaft2.rotation.z = Math.PI / 2
      shaft2Group.add(shaft2)

      // Threaded Screw ends (Continuous Helix)
      const thread2 = createHelicalThread(0.2, 0.7, 14, 0.02, steelMaterial)
      thread2.position.x = 0.85
      thread2.rotation.z = Math.PI / 2
      shaft2Group.add(thread2)

      // Large Spur Gear (Rear Gear - 28 teeth, straight teeth core with web recess & cutout holes)
      const gear2 = createSplineGear(0.7, 0.8, 0.5, 28, true)
      gear2.position.x = -0.4
      shaft2Group.add(gear2)

      // Upper shaft position: higher and set back to mesh
      shaft2Group.position.set(0, 1.1, -0.4)
      gearboxGroup.add(shaft2Group)

      // Brass bolts on stand corners
      const bolts = [
        { x: -1.0, z: 0.8 }, { x: -1.0, z: -0.8 },
        { x: 1.0, z: 0.8 }, { x: 1.0, z: -0.8 }
      ]
      bolts.forEach((b) => {
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8), brassMaterial)
        bolt.position.set(b.x, 0.5, b.z)
        gearboxGroup.add(bolt)
      })

      // FUNCTIONAL DIAGNOSTIC WIREFRAME GLOW BOX
      // Neon green bounding box overlay wrapping the gears to show stress diagnostic scanning
      const glowBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.6, 1.6),
        new THREE.MeshBasicMaterial({ color: 0x00ff66, wireframe: true, transparent: true, opacity: 0.25 })
      )
      glowBox.position.set(-0.2, 0.6, 0)
      gearboxGroup.add(glowBox)

      mainGroup.add(gearboxGroup)
      mainGroup.rotation.set(0.35, 0.6, 0) // Fixed starting angle matching reference photo

      // Animate gear meshing rotation (Object rotation set to 0 to satisfy 'object rotation dont want')
      let time = 0
      const tick = () => {
        time += 0.025
        shaft1Group.rotation.x = 0 // Stays completely still
        shaft2Group.rotation.x = 0 // Stays completely still
        // Rotate bounding scanner box slowly to make it attractive
        glowBox.rotation.y = Math.sin(time * 0.1) * 0.15
      }
      (gearboxGroup as any).customTick = tick
    } 
    
    else if (activeSector === "robotics") {
      // --- Robotics: HIWIN-style Linear Guideway Rail & Block Assembly ---
      const linearGroup = new THREE.Group()

      // 1. Linear Guide Rail (I-beam profile constructed with overlapping shapes)
      const railGroup = new THREE.Group()
      
      const railCore = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.3, 0.4), steelMaterial)
      railGroup.add(railCore)

      const railTop = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.08, 0.52), steelMaterial)
      railTop.position.y = 0.19
      railGroup.add(railTop)

      const railBottom = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.08, 0.52), steelMaterial)
      railBottom.position.y = -0.19
      railGroup.add(railBottom)

      // Spaced recessed countersunk mounting holes along the rail top
      const holeGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16)
      const holePositions = [-1.5, -0.9, -0.3, 0.3, 0.9, 1.5]
      holePositions.forEach((pos) => {
        const hole = new THREE.Mesh(holeGeom, darkIron)
        hole.position.set(pos, 0.231, 0)
        railGroup.add(hole)
      })

      linearGroup.add(railGroup)

      // 2. Sliding Carriage Block (Saddle block straddling the rail)
      const carriageGroup = new THREE.Group()

      // Silver polished carriage body top plate
      const carriageTop = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 0.8), steelMaterial)
      carriageTop.position.y = 0.3
      carriageGroup.add(carriageTop)

      // Side wings flanking the rail
      const leftWing = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.34, 0.16), steelMaterial)
      leftWing.position.set(0, 0.15, 0.36)
      carriageGroup.add(leftWing)

      const rightWing = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.34, 0.16), steelMaterial)
      rightWing.position.set(0, 0.15, -0.36)
      carriageGroup.add(rightWing)

      // Black composite end caps (Front and Back covers)
      const frontCap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.44, 0.82), darkIron)
      frontCap.position.set(0.57, 0.18, 0)
      carriageGroup.add(frontCap)

      const backCap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.44, 0.82), darkIron)
      backCap.position.set(-0.57, 0.18, 0)
      carriageGroup.add(backCap)

      // Detail: Mounting bolt threads/screws on the front cover
      const screwGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8)
      const screw1 = new THREE.Mesh(screwGeom, brassMaterial)
      screw1.rotation.z = Math.PI / 2
      screw1.position.set(0.61, 0.26, 0.22)
      carriageGroup.add(screw1)

      const screw2 = new THREE.Mesh(screwGeom, brassMaterial)
      screw2.rotation.z = Math.PI / 2
      screw2.position.set(0.61, 0.26, -0.22)
      carriageGroup.add(screw2)

      const lubeNipple = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.08, 8), brassMaterial)
      lubeNipple.rotation.z = Math.PI / 2
      lubeNipple.position.set(0.63, 0.18, 0)
      carriageGroup.add(lubeNipple)

      // FUNCTIONAL TELEMETRY SCAN LASERS
      // Downward shooting blue distance sensor beam mapping the track position in real-time
      const laserTrack = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.3),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 })
      )
      laserTrack.position.set(0, -0.1, 0)
      carriageGroup.add(laserTrack)

      const laserDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 })
      )
      laserDot.position.set(0, -0.25, 0)
      carriageGroup.add(laserDot)

      linearGroup.add(carriageGroup)

      // Orientation matching reference photo
      linearGroup.rotation.set(0.2, -0.6, 0)

      // Slide Animation (This is linear sliding translation, NOT rotation, so we keep it!)
      let time = 0
      const tick = () => {
        time += 0.015
        const slideX = Math.sin(time) * 1.3
        carriageGroup.position.x = slideX
        
        // Fluctuate sensor beam slightly as carriage travels
        laserTrack.scale.y = 1.0 + Math.sin(time * 10) * 0.15
        laserDot.position.y = -0.25 - (laserTrack.scale.y - 1.0) * 0.08
      }
      (linearGroup as any).customTick = tick
      mainGroup.add(linearGroup)
    }
    
    else if (activeSector === "machinetools") {
      // --- Machine Tools: Rotary Index Table ---
      const tableGroup = new THREE.Group()

      const platter = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.35, 32), steelMaterial)
      platter.position.y = 0.5
      tableGroup.add(platter)

      const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.38, 32), brassMaterial)
      bore.position.y = 0.5
      tableGroup.add(bore)

      for (let i = 0; i < 4; i++) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.36, 0.08), darkIron)
        slot.position.y = 0.69
        slot.rotation.y = (i * Math.PI) / 4
        tableGroup.add(slot)
      }

      const baseBlock = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.6, 3.6), darkIron)
      baseBlock.position.y = -0.15
      tableGroup.add(baseBlock)

      // FUNCTIONAL HEAVY MACHINING TELEMETRY GLOW
      // A glowing circular green grid overlay displaying indexing sectors
      const gridHelper = new THREE.GridHelper(3.0, 8, 0x00ff66, 0x00ff66)
      gridHelper.position.y = 0.7
      gridHelper.material.transparent = true
      gridHelper.material.opacity = 0.15
      tableGroup.add(gridHelper)

      mainGroup.add(tableGroup)
      mainGroup.rotation.set(0.6, 0.3, 0)

      // Platter rotation set to 0 to satisfy 'object rotation dont want'
      const tick = () => {
        platter.rotation.y = 0.4 // Stays completely still
      }
      (tableGroup as any).customTick = tick
    }

    // --- CUSTOM INTERACTIVE MOUSE CONTROLS (OrbitControls Replacement) ---
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      prevMouseX = e.clientX
      prevMouseY = e.clientY

      // Rotate the main 3D group directly with drag
      mainGroup.rotation.y += deltaX * 0.007
      mainGroup.rotation.x += deltaY * 0.007
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      // Adjust camera distance (zoom)
      camera.position.z += e.deltaY * 0.004
      // Clamp zoom distance limits
      camera.position.z = Math.max(2.0, Math.min(camera.position.z, 9.0))
    }

    // Attach listeners to WebGL element
    const canvasElement = renderer.domElement
    canvasElement.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    canvasElement.addEventListener("wheel", onWheel, { passive: false })

    // Animation Loop
    let reqId: number
    const animate = () => {
      reqId = requestAnimationFrame(animate)

      // Run custom assembly timelines
      if ((mainGroup as any).customTick) {
        (mainGroup as any).customTick()
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize/Cleanup
    return () => {
      cancelAnimationFrame(reqId)
      renderer.dispose()
      canvasElement.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      canvasElement.removeEventListener("wheel", onWheel)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [activeSector])

  return (
    <section className="py-24 bg-slate-50 relative border-t border-slate-200 overflow-hidden">
      
      {/* Background Tooling Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Spotlight blur behind the animated diagram */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-red-655 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md border border-red-200/40">
            SECTOR SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-4 font-display">
            Industries We Serve
          </h2>
          <p className="text-slate-655 max-w-xl mx-auto text-xs leading-relaxed font-light">
            Click on any industrial division below to view realistic interactive Three.js 3D mechanical models and diagnostic sensors.
          </p>
        </div>

        {/* Dynamic Split Layout: Left Tabs selector, Right Animated Visualizer viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Industrial Sector Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {sectors.map((sec) => {
              const Icon = sec.icon
              const isActive = activeSector === sec.id

              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSector(sec.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur-md ${
                    isActive
                      ? "bg-white border-slate-200 shadow-md"
                      : "bg-white/40 border-slate-200/50 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  {/* Sliding Red indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="sectorActiveIndicator"
                      className="absolute top-0 bottom-0 left-0 w-[4px] bg-red-550"
                    />
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl border ${
                      isActive 
                        ? "bg-red-50 border-red-100 text-red-600" 
                        : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs sm:text-sm font-extrabold uppercase tracking-tight font-display transition-colors ${
                      isActive ? "text-red-600" : "text-slate-800"
                    }`}>
                      {sec.title}
                    </span>
                  </div>
                </button>
              )
            })}

            {/* Spec details Card under tabs (Light Theme) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 mt-4 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSector}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[9px] font-mono text-red-655 bg-red-50 px-2.5 py-0.5 rounded border border-red-200/40 uppercase font-bold tracking-wider mb-3.5 inline-block">
                    {activeData.spec}
                  </span>
                  <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                    {activeData.desc}
                  </p>
                  
                  {/* Checklist */}
                  <div className="flex flex-col gap-2.5">
                    {activeData.apps.map((app, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-655 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Viewport */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden aspect-[16/11]">
              
              {/* Header status indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 text-slate-500 font-mono text-[9px] relative z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-slate-900 font-bold uppercase tracking-wider">Three.js 3D WebGL Studio</span>
                </div>
                <span className="text-[8px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded uppercase font-bold">DRAG TO ROTATE • SCROLL TO ZOOM</span>
              </div>

              {/* Three.js Mounting Element Display frame */}
              <div 
                ref={mountRef}
                key={activeSector}
                className="w-full h-[220px] sm:h-[280px] bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center shadow-inner cursor-grab active:cursor-grabbing"
              >
                {/* Visual camera crosshairs */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-slate-300 pointer-events-none z-10" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-slate-300 pointer-events-none z-10" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-slate-300 pointer-events-none z-10" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-slate-300 pointer-events-none z-10" />
                
                {/* Dynamic Laser scanner overlay sweep */}
                <motion.div 
                  animate={{ y: [-100, 100, -100] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-6 right-6 h-[1.5px] bg-red-500/80 shadow-[0_0_12px_rgba(239,35,60,0.6)] z-20 pointer-events-none"
                />

                {/* Bottom Center Indicator Label */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-xl px-4 py-1.5 text-slate-800 text-[9px] font-mono flex items-center gap-2 z-25 shadow-md">
                  <span className="text-slate-500">DIAGNOSTIC STATUS:</span>
                  <span className="text-red-600 font-bold">100% NOMINAL</span>
                </div>
              </div>

              {/* Bottom Real-Time Telemetry sensor output */}
              <div className="grid grid-cols-2 gap-4 relative z-20">
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm">
                  <span className="text-[8px] font-mono text-slate-455 block uppercase tracking-wider mb-0.5">
                    {activeData.telemetry.label1}
                  </span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {telemetry.val1 || activeData.telemetry.val1}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm">
                  <span className="text-[8px] font-mono text-slate-455 block uppercase tracking-wider mb-0.5">
                    {activeData.telemetry.label2}
                  </span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {telemetry.val2 || activeData.telemetry.val2}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
