"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw, Sparkles, ShieldCheck, Activity } from "lucide-react"
import { Product } from "@/types"

export default function V2Hero() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const CYCLE_DURATION = 5000 // 5 seconds per product

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data = await res.json()
          if (data.products && data.products.length > 0) {
            setProducts(data.products)
          }
        }
      } catch (err) {
        console.error("Error loading products:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Circular Neon Progress Timer
  useEffect(() => {
    if (products.length <= 1 || isHovered) return

    const startTime = Date.now()
    const interval = 50 // update every 50ms for buttery smooth neon glow trace

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = (elapsed / CYCLE_DURATION) * 100

      if (currentProgress >= 100) {
        setProgress(0)
        setCurrentIndex((prev) => (prev + 1) % products.length)
      } else {
        setProgress(currentProgress)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, products.length, isHovered])

  const currentProduct = products[currentIndex] || products[0] || null

  const handlePrev = () => {
    setProgress(0)
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const handleNext = () => {
    setProgress(0)
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const handleSelect = (idx: number) => {
    setProgress(0)
    setCurrentIndex(idx)
  }

  if (loading || !currentProduct) {
    return (
      <section className="min-h-[85vh] bg-[#fafafa] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </section>
    )
  }

  // SVG Circle calculation for neon ring
  const circleRadius = 175
  const circumference = 2 * Math.PI * circleRadius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#ffffff] text-slate-900 pt-28 pb-16 lg:py-28 relative overflow-hidden font-sans selection:bg-blue-600/20" style={{ colorScheme: 'light' }}>
      
      {/* Subtle Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Soft Ambient Radial Light Flare */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest">
              Bangalore Production Hub &bull; Sub-Micron Precision Active
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-blue-900">
              <Activity className="w-3.5 h-3.5 text-blue-600" /> Runout: &lt; 0.001 mm
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ISO 9001:2015 QA
            </span>
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[560px]">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Clean Corporate Value Proposition & Actions                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-widest">
                Est. 1999 &bull; Precision Motion Engineering
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-slate-950 uppercase leading-[1.04] font-display">
              We Can Make <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#122f87] via-[#2563eb] to-[#0284c7]">
                What You Can Imagine
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Bharat Machine Tools (BMT) manufactures high-precision machine tool spindles, zero-backlash planetary gearboxes, and CNC rotary tables engineered for sub-micron accuracy.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-900/15 hover:shadow-blue-900/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Full Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20am%20interested%20in%20a%20custom%20machine%20tool%20technical%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-2xl border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5"
              >
                Request Custom RFQ
              </a>
            </div>

            {/* Simple Key Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 max-w-md">
              <div>
                <span className="text-2xl font-black text-slate-900 block font-display">25+ Years</span>
                <span className="text-xs text-slate-500 font-medium">Industry Legacy</span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block font-display">&lt; 0.001mm</span>
                <span className="text-xs text-slate-500 font-medium">Runout Precision</span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block font-display">ISO 9001</span>
                <span className="text-xs text-slate-500 font-medium">Quality Certified</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Interactive Circular Neon Light Timer Stage                 */}
          {/* ========================================================================= */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-6 flex flex-col items-center justify-center relative"
          >
            
            {/* Main Circular Neon Container */}
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px] flex items-center justify-center">
              
              {/* Inner Soft White Glass Disc */}
              <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-b from-white via-slate-50 to-white border border-slate-200/80 shadow-[0_15px_40px_-10px_rgba(15,23,42,0.08)] flex flex-col items-center justify-between p-6 overflow-hidden z-10">
                
                {/* Dynamic Ambient Inner Glow */}
                <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />

                {/* Top Category Badge & Model Index */}
                <div className="w-full flex items-center justify-between z-20">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 font-mono font-bold text-blue-700 uppercase text-[9px] tracking-wider">
                    {currentProduct.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px] font-bold">
                    {currentIndex + 1} / {products.length}
                  </span>
                </div>

                {/* Central Product Image with Floating Levitation */}
                <div className="relative z-20 my-auto py-2 flex items-center justify-center w-full h-[180px] sm:h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentProduct.id}
                      initial={{ opacity: 0, scale: 0.9, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] select-none pointer-events-none"
                    />
                  </AnimatePresence>
                </div>

                {/* Bottom Product Name & Link */}
                <div className="w-full flex items-center justify-between gap-2 z-20 pt-2 border-t border-slate-100">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-tight truncate max-w-[170px] sm:max-w-[200px]">
                    {currentProduct.name}
                  </span>
                  <Link
                    href={`/products/${encodeURIComponent(currentProduct.slug || currentProduct.id)}`}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider shrink-0"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>

              {/* SVG Neon Light Progress Circle (Rotates around the circle as timer runs) */}
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-20"
                viewBox="0 0 400 400"
              >
                <defs>
                  {/* Neon Cyan to Royal Blue Gradient */}
                  <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>

                  {/* High-Intensity Neon Glow Filter */}
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur1" />
                    <feGaussianBlur stdDeviation="7" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer Base Subtle Guide Track */}
                <circle
                  cx="200"
                  cy="200"
                  r={circleRadius}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3.5"
                  strokeDasharray="4 4"
                  className="opacity-70"
                />

                {/* Animated Glowing Neon Light Ring */}
                <circle
                  cx="200"
                  cy="200"
                  r={circleRadius}
                  fill="none"
                  stroke="url(#neonGradient)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  filter="url(#neonGlow)"
                  className="transition-[stroke-dashoffset] duration-75 ease-linear"
                />
              </svg>

              {/* Arrow Controls positioned on perimeter */}
              <button
                onClick={handlePrev}
                className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200 transition-all hover:scale-110 cursor-pointer"
                title="Previous Product"
                aria-label="Previous Product"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-full shadow-md border border-slate-200 transition-all hover:scale-110 cursor-pointer"
                title="Next Product"
                aria-label="Next Product"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

            {/* Bottom Dots Indicator */}
            <div className="flex items-center gap-2 mt-6">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i 
                      ? "w-7 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  title={p.name}
                />
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
