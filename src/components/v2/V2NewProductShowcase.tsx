'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { RotateCw, Compass, ShieldAlert, Sparkles, Settings2, HelpCircle } from 'lucide-react'

export default function V2NewProductShowcase() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSpinning, setIsSpinning] = useState(false)
  
  // Real-time telemetry simulation
  const [telemetry, setTelemetry] = useState({
    pressure: '60.0 BAR',
    torque: '1,800 N·m',
    clamped: 'ENGAGED'
  })

  // Log client events to server
  const logToBackend = (type: string, message: string) => {
    fetch('/api/debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, message })
    }).catch(() => {})
  }

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      if (!isSpinning) return
      count++
      const clampPressure = (60.0 + Math.sin(count * 0.15) * 0.4).toFixed(1)
      const dynamicTorque = (1800 + Math.floor(Math.sin(count * 0.05) * 5)).toLocaleString()
      setTelemetry(prev => ({
        ...prev,
        pressure: `${clampPressure} BAR`,
        torque: `${dynamicTorque} N·m`
      }))
    }, 200)
    return () => clearInterval(interval)
  }, [isSpinning])

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current

    const width = container.clientWidth || 450
    const height = container.clientHeight || 380

    const scene = new THREE.Scene()
    // No background color set - transparent so it floats on HTML bg-slate-50

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 1.8, 4.3)
    camera.lookAt(0, 0.15, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    container.appendChild(renderer.domElement)

    // PMREM Generator for realistic reflections
    const createFakeEnvironmentMap = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext("2d")
      if (!ctx) return null
      
      const gradient = ctx.createLinearGradient(0, 0, 0, 64)
      gradient.addColorStop(0, "#0f172a") // dark slate sky
      gradient.addColorStop(0.5, "#64748b") // steel gray horizon
      gradient.addColorStop(1, "#f1f5f9") // bright studio highlights
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 64, 64)
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.mapping = THREE.EquirectangularReflectionMapping
      return texture
    }

    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    const envTexture = createFakeEnvironmentMap()
    if (envTexture) {
      const envMap = pmremGenerator.fromEquirectangular(envTexture).texture
      scene.environment = envMap
      envTexture.dispose()
    }
    pmremGenerator.dispose()

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8)
    dirLight1.position.set(6, 10, 5)
    dirLight1.castShadow = true
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight2.position.set(-6, -4, -3)
    scene.add(dirLight2)

    const blueLight = new THREE.PointLight(0x3b82f6, 1.0, 10)
    blueLight.position.set(-4, 3, 2)
    scene.add(blueLight)

    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    let animateCallback = () => {}
    let modelContainer: THREE.Group | null = null

    // Load custom model
    setIsLoading(true)
    const loader = new GLTFLoader()
    loader.setMeshoptDecoder(MeshoptDecoder)
    logToBackend("info", "Starting GLTF load request for new products showcase")

    loader.load(
      "/Image%20to%203D.glb",
      (gltf: any) => {
        setIsLoading(false)
        logToBackend("info", "Showcase GLB loaded successfully")

        try {
          gltf.scene.updateMatrixWorld(true)

          const box = new THREE.Box3().setFromObject(gltf.scene)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())

          const maxDim = Math.max(size.x, size.y, size.z)
          let scale = 1.0
          if (maxDim > 0) {
            scale = 2.4 / maxDim
          }

          // Center model geometry inside the scene
          gltf.scene.position.set(-center.x, -center.y, -center.z)
          gltf.scene.scale.set(scale, scale, scale)

          // Double sided + high metalness for high-fidelity look
          gltf.scene.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              if (child.material) {
                child.material.side = THREE.DoubleSide
                if (child.material.color) {
                  child.material.color.setHex(0xffffff)
                }
                child.material.metalness = 0.85
                child.material.roughness = 0.24
                if (child.material.map) {
                  child.material.map.colorSpace = THREE.SRGBColorSpace
                }
                child.material.needsUpdate = true
              }
            }
          })

          modelContainer = new THREE.Group()
          modelContainer.position.set(0, 0.15, 0)
          modelContainer.add(gltf.scene)

          mainGroup.add(modelContainer)
          mainGroup.rotation.set(0.15, 0.25, 0)

          let spinAngle = 0
          animateCallback = () => {
            if (isSpinning && modelContainer) {
              spinAngle += 0.0035
              modelContainer.rotation.y = spinAngle
            }
          }
        } catch (err: any) {
          logToBackend("error", `Showcase GLB parse error: ${err.message}`)
        }
      },
      undefined,
      (error: any) => {
        setIsLoading(false)
        logToBackend("error", `Showcase GLB load failure: ${error.message}`)
      }
    )

    // Orbit Drag Controls
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      prevMouseX = e.clientX
      prevMouseY = e.clientY

      mainGroup.rotation.y += deltaX * 0.007
      mainGroup.rotation.x += deltaY * 0.007
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true
        prevMouseX = e.touches[0].clientX
        prevMouseY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return
      if (e.cancelable) {
        e.preventDefault()
      }
      const deltaX = e.touches[0].clientX - prevMouseX
      const deltaY = e.touches[0].clientY - prevMouseY
      prevMouseX = e.touches[0].clientX
      prevMouseY = e.touches[0].clientY

      mainGroup.rotation.y += deltaX * 0.007
      mainGroup.rotation.x += deltaY * 0.007
    }

    const handleTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    // Animation Loop
    let animationId: number
    const animate = () => {
      animateCallback()
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
      
      try {
        container.removeChild(renderer.domElement)
      } catch {}
      renderer.dispose()
    }
  }, [isSpinning])

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/60">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[10px] font-mono font-bold text-[#122f87] bg-blue-50 border border-blue-100 px-3 py-1 rounded-md uppercase tracking-widest">
            Engineering Breakthrough
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-3 tracking-tight font-display">
            Our New Innovations
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
            Discover our latest industrial manufacturing releases. Click and drag the model to inspect our new high-speed rotary indexing assembly in real-time.
          </p>
        </div>

        {/* Dual-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* Left Column: Details & Specs */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-blue-600 tracking-wider">Model: BMT-RH250</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 uppercase tracking-tight font-display">
                Precision Indexing Headstock
              </h3>
            </div>

            <p className="text-slate-600 text-xs font-light leading-relaxed">
              Engineered for multi-axis CNC milling centers, the RH250 features a pre-balanced drive pulley, integrated high-pressure clamping cylinders, and a precision-ground centering chuck. Designed to handle extreme radial cutting forces with zero harmonic distortion.
            </p>

            {/* Tech highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Indexing Accuracy</span>
                <span className="text-lg font-extrabold text-[#122f87] block mt-1">±0.002 mm</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Radial and axial runout</span>
              </div>
              
              <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Clamping Force</span>
                <span className="text-lg font-extrabold text-[#122f87] block mt-1">24.5 kN</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Hydraulic cylinder ring</span>
              </div>
            </div>

            {/* Specs Table */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="flex justify-between border-b border-slate-100 px-4 py-3 text-[10px] font-bold text-slate-700 font-mono">
                <span>SPECIFICATION</span>
                <span>VALUE</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-slate-500">Max Rotation Speed</span>
                  <span className="text-slate-900 font-bold">3,500 RPM</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-slate-500">Center Bore Diameter</span>
                  <span className="text-slate-900 font-bold">Ø 85 mm</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-slate-500">Hydraulic Clamping Torque</span>
                  <span className="text-slate-900 font-bold">1,800 N·m</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-slate-500">Lubrication Standard</span>
                  <span className="text-slate-900 font-bold">ISO VG 32 Synthetic Oil</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="px-6 py-3.5 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10 hover:shadow-blue-900/20 text-center cursor-pointer"
              >
                Request Quote for RH250
              </a>
              <a
                href="/products"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer"
              >
                Explore Full Catalog
              </a>
            </div>
          </div>

          {/* Right Column: WebGL Interactive viewport */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
            
            {/* Viewport Frame */}
            <div className="relative w-full h-[300px] sm:h-[380px] bg-slate-100/50 border border-slate-200/80 rounded-[2.5rem] shadow-inner overflow-hidden group">
              
              {/* Spinner loader overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-blue-900 gap-3">
                  <RotateCw className="w-8 h-8 animate-spin text-[#122f87]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Compiling 3D Assets...</span>
                </div>
              )}

              {/* Drag instructions HUD overlay */}
              <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl px-3 py-2 text-slate-600 font-mono text-[9px] shadow-sm flex flex-col gap-1">
                <span className="flex items-center gap-1.5 uppercase font-bold text-slate-900">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  3D Viewport Controls
                </span>
                <span className="text-[8px] text-slate-500">Drag to Orbit | Scroll to Zoom</span>
              </div>

              {/* Interactive canvas mounting point */}
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Live Telemetry Display overlay */}
              <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl text-slate-400 font-mono text-[9px] min-w-[160px] space-y-2">
                <div className="flex items-center gap-1.5 uppercase font-bold text-white border-b border-slate-800 pb-1.5">
                  <Settings2 className="w-3.5 h-3.5 text-[#3b82f6]" />
                  SYS TELEMETRY
                </div>
                <div className="flex justify-between">
                  <span>CLAMP PRES:</span>
                  <span className="text-white font-bold">{telemetry.pressure}</span>
                </div>
                <div className="flex justify-between">
                  <span>CLAMP TORQ:</span>
                  <span className="text-white font-bold">{telemetry.torque}</span>
                </div>
                <div className="flex justify-between">
                  <span>CLAMP STATE:</span>
                  <span className="text-emerald-400 font-bold">{telemetry.clamped}</span>
                </div>
              </div>

              {/* Toggle Spin Control Button overlay */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                <button
                  onClick={() => setIsSpinning(!isSpinning)}
                  className={`px-3 py-2 border rounded-xl font-mono text-[9px] uppercase tracking-wider font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSpinning 
                      ? 'bg-[#122f87] text-white border-blue-800 hover:bg-[#1a3fa8]' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${isSpinning ? 'animate-spin' : ''}`} />
                  {isSpinning ? 'Pause Spin' : 'Auto Spin'}
                </button>
              </div>

            </div>

            {/* Spec Warning banner */}
            <div className="flex items-start gap-2.5 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
              <ShieldAlert className="w-4 h-4 text-[#122f87] shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-900 leading-normal font-light">
                <strong>Clamping Integrity:</strong> Clamping torque is rated up to 1,800 N·m under continuous cycle pressures. Always verify supply hydraulic pressure conforms to ISO standards before starting automatic cycle runs.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
