"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Settings, ShieldCheck, Zap } from "lucide-react"

export default function V2Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Floating dots background animation
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      radius: number
      dx: number
      dy: number
      alpha: number
    }> = []

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2
      })
    }

    const render = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.dx
        p.y += p.dy

        if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx
        if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy

        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw subtle connecting lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="min-h-screen bg-[#030712] relative overflow-hidden flex flex-col justify-center pt-24 pb-16">
      {/* Background elements */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Tech Pill Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6 font-mono">
            <Zap className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            V2 DESIGN PLATFORM
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-display leading-[1.1] uppercase">
            Rotational
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 font-display">
              Precision
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-light">
            Aerospace-toleranced Spindles, High-Capacity Bearings, and Advanced Motion Control. Engineered in Bangalore for Global Machinery Leaders.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-20 w-full sm:w-auto">
            <Link
              href="/products"
              className="w-full sm:w-auto group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              Explore Catalogue
              <ArrowRight className="w-4 h-4 text-slate-200 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-blue-500/30 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
            >
              Request Custom Quote
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {/* Card 1 */}
          <div className="relative group backdrop-blur-xl bg-slate-900/30 border border-white/5 hover:border-blue-500/30 p-6 rounded-3xl transition-all duration-300 text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Settings className="w-5 h-5 animate-[spin_8s_linear_infinite]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 font-display">25+ Years</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium mb-1">Industrial Heritage</p>
            <p className="text-xs text-slate-400 leading-relaxed font-light">Manufacturing high-precision assemblies for heavy industries across Bangalore.</p>
          </div>

          {/* Card 2 */}
          <div className="relative group backdrop-blur-xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/30 p-6 rounded-3xl transition-all duration-300 text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all" />
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 font-display">10k+ Units</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium mb-1">Shipped Nationally</p>
            <p className="text-xs text-slate-400 leading-relaxed font-light">Spindles, bearings, and locknuts delivered to top CNC machining and automotive hubs.</p>
          </div>

          {/* Card 3 */}
          <div className="relative group backdrop-blur-xl bg-slate-900/30 border border-white/5 hover:border-indigo-500/30 p-6 rounded-3xl transition-all duration-300 text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 font-display">0.002 mm</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium mb-1">Rotational Tolerance</p>
            <p className="text-xs text-slate-400 leading-relaxed font-light">Ultra-precise manufacturing balancing specifications to guarantee runout tolerances.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
