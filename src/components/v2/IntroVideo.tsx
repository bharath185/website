"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Shield, SkipForward, Cpu } from "lucide-react"

export default function IntroVideo() {
  const [visible, setVisible] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [typingText, setTypingText] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const fullText = "BHARAT MACHINE TOOLS • SYSTEM INITIALIZED • ESTABLISHED 1999 • BANGALORE"

  // Typing Effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTypingText((prev) => prev + fullText[index])
      index++
      if (index >= fullText.length - 1) {
        clearInterval(interval)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [])

  // Canvas Fallback Animation (Precision Engineering Toolpath)
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Particles representing CNC toolpath sparks
    const particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      angle: number
      speed: number
      life: number
    }> = []

    const center = { x: canvas.width / 2, y: canvas.height / 2 }
    let angleOffset = 0

    const render = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
      ctx.lineWidth = 1
      const gridSize = 40
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw concentric blueprint circles
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.beginPath()
      ctx.arc(center.x, center.y, 150, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(center.x, center.y, 250, 0, Math.PI * 2)
      ctx.stroke()

      // Spawn sparks along a CNC toolpath
      angleOffset += 0.02
      const pathX = center.x + Math.cos(angleOffset) * 200 * Math.sin(angleOffset * 0.5)
      const pathY = center.y + Math.sin(angleOffset) * 200 * Math.cos(angleOffset * 0.3)

      // Draw active tool head pointer
      ctx.fillStyle = "rgba(59, 130, 246, 0.8)"
      ctx.beginPath()
      ctx.arc(pathX, pathY, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(pathX, pathY, 12, 0, Math.PI * 2)
      ctx.stroke()

      if (particles.length < 120) {
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: pathX,
            y: pathY,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? "rgba(96, 165, 250, 0.8)" : "rgba(34, 211, 238, 0.8)",
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 2 + 1,
            life: 1.0
          })
        }
      }

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += Math.cos(p.angle) * p.speed
        p.y += Math.sin(p.angle) * p.speed
        p.life -= 0.015

        if (p.life <= 0) {
          particles.splice(idx, 1)
          return
        }

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1.0

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      center.x = canvas.width / 2
      center.y = canvas.height / 2
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [visible])

  // Session storage check to only show preloader once per session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("seen_intro")
    if (hasSeenIntro) {
      setVisible(false)
    }
  }, [])

  const handleSkip = () => {
    sessionStorage.setItem("seen_intro", "true")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#020617] overflow-hidden"
        >
          {/* Background Canvas sparks (Precision Engineering backdrop) */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Background Video player */}
          <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-machinery-in-a-large-industrial-factory-40348-large.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover opacity-[0.25] transition-opacity duration-1000 z-0 pointer-events-none ${
              videoLoaded ? "opacity-[0.25]" : "opacity-0"
            }`}
          />

          {/* Top segment: bootloader telemetry details */}
          <div className="relative z-10 px-8 py-6 w-full flex items-center justify-between font-mono text-[10px] text-blue-400/70 select-none">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 animate-pulse text-blue-500" />
              <span>BMT CONFIG LOADED: OK</span>
            </div>
            <span>LOC: BLR_IN // LAT: 12.9716° N</span>
          </div>

          {/* Center segment: Corporate Logo & Slogan */}
          <div className="relative z-10 text-center px-4 max-w-xl mx-auto flex flex-col items-center">
            {/* Spinning glowing blueprint geometry */}
            <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-blue-500/20 animate-[spin_10s_linear_infinite_reverse]" />
              <div className="absolute inset-6 rounded-full border-2 border-blue-500/10 flex items-center justify-center">
                <Shield className="w-12 h-12 text-blue-500/80 animate-pulse" />
              </div>
            </div>

            <motion.h1 
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-widest uppercase mb-3 font-display drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]"
            >
              BHARAT MACHINE TOOLS
            </motion.h1>

            <div className="h-6 font-mono text-[10px] text-cyan-400 tracking-wider font-semibold uppercase mt-2">
              {typingText}
              <span className="animate-ping">|</span>
            </div>
          </div>

          {/* Bottom segment: Skip connection control */}
          <div className="relative z-10 w-full px-8 py-8 flex justify-center">
            <button
              onClick={handleSkip}
              className="group px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all duration-300 flex items-center gap-2 backdrop-blur-md shadow-lg shadow-black/30"
            >
              Skip Intro
              <SkipForward className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
