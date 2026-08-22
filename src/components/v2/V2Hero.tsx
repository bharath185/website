"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Maximize2,
  RefreshCw,
  Compass
} from "lucide-react"
import { Product } from "@/types"

export default function V2Hero() {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
  const stageRef = useRef<HTMLDivElement>(null)

  // 3D Parallax Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Fetch real products from the database
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data = await res.json()
          if (data.products && data.products.length > 0) {
            setProductsList(data.products)
          }
        }
      } catch (err) {
        console.error("Error loading products for hero stage:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Filter products by selected category
  const filteredProducts = selectedCategory === "ALL" 
    ? productsList 
    : productsList.filter(p => p.category?.toUpperCase() === selectedCategory.toUpperCase())

  const activeProducts = filteredProducts.length > 0 ? filteredProducts : productsList
  const currentProduct = activeProducts[activeIndex] || activeProducts[0] || null

  // Ensure activeIndex is within bounds when category changes
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedCategory])

  // Auto cycle products every 5 seconds if not hovering
  useEffect(() => {
    if (activeProducts.length <= 1 || isHovered) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeProducts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeProducts.length, isHovered])

  // Mouse Move Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Dampen the tilt angles (-12 to 12 deg)
    const tiltX = -(y / (rect.height / 2)) * 10
    const tiltY = (x / (rect.width / 2)) * 12

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const categories = ["ALL", "MACHINERY", "SPINDLES", "GEARBOX", "LOCKNUTS"]

  if (loading || !currentProduct) {
    return (
      <section className="min-h-[90vh] bg-slate-50 relative overflow-hidden flex flex-col justify-center items-center text-blue-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          Initializing 3D Precision Stage...
        </span>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#f8fafc] relative overflow-hidden flex flex-col justify-center pt-24 pb-16 lg:py-28">
      
      {/* Background Architectural Grid & Subtle Laser Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      
      {/* Dynamic Ambient Spotlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[700px] h-[700px] bg-[#122f87]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Operational Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">
              Bangalore Cleanrooms Operational &bull; ISO 9001:2015
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" /> Sub-Micron Tolerances
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% In-House QA
            </span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
          
          {/* Left Column: Brand Headline & Value Propositions */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-widest">
                Est. 1999 &bull; Precision Motion Engineering
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 uppercase tracking-tight leading-[1.05] font-display">
              We Can Make <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#122f87] via-blue-600 to-indigo-600">
                What You Can Imagine
              </span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal max-w-lg">
              Bharat Machine Tools (BMT) is India's leading manufacturer of high-precision spindle systems, zero-backlash planetary gearboxes, and multi-axis rotary tables designed for demanding aerospace, automotive, and defense OEMs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full pt-2">
              <Link
                href="/products"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-900/15 hover:shadow-blue-900/25 hover:-translate-y-0.5 cursor-pointer"
              >
                Explore Full Catalog <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20am%20looking%20for%20custom%20machine%20tool%20specifications.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-2xl border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5"
              >
                Request Custom RFQ
              </a>
            </div>

            {/* Industrial Metrics Matrix */}
            <div className="grid grid-cols-3 gap-4 w-full border-t border-slate-200/80 pt-6 mt-4">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">25+</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-0.5">Years Legacy</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">&lt; 0.001</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-0.5">mm Runout</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">1000+</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-0.5">Units Deployed</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Perspective Industrial Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Category Quick-Filter Bar */}
            <div className="w-full flex items-center justify-center gap-1.5 mb-6 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? "bg-[#122f87] text-white shadow-md shadow-blue-900/20 scale-105"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 3D Interactive Stage Canvas */}
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: "1000px" }}
              className="relative w-full max-w-[560px] aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-b from-white via-slate-50/50 to-slate-100/80 rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-8 flex flex-col items-center justify-between shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06)] overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              
              {/* Dynamic 3D Stage Grid Floor Reflection */}
              <div className="absolute inset-x-8 bottom-4 h-28 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-slate-200/20 to-transparent rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-6 w-3/4 h-8 bg-slate-900/10 rounded-full blur-md pointer-events-none" />

              {/* Floating Holographic Technical Spec Badge 1 (Top Left) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-6 z-20 hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm"
              >
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[9px] font-mono font-bold text-slate-800 uppercase tracking-wider">
                  Precision Benchmark &bull; 0.001mm
                </span>
              </motion.div>

              {/* Floating Holographic Technical Spec Badge 2 (Top Right) */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-sm">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
                  {activeIndex + 1} / {activeProducts.length}
                </span>
              </div>

              {/* 3D Floating Machine Presentation */}
              <motion.div
                style={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  transformStyle: "preserve-3d",
                  transition: isHovered ? "none" : "transform 0.5s ease-out",
                }}
                className="relative z-10 w-full h-full flex items-center justify-center p-4 my-auto"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduct.id}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative flex flex-col items-center justify-center max-w-full max-h-full"
                  >
                    <motion.img
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="max-h-[220px] sm:max-h-[270px] max-w-full object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.12)] filter"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Floating Holographic Technical Spec Badge 3 (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-2 bg-emerald-50/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200/60 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  100% In-House Cleanroom Tested
                </span>
              </motion.div>

              {/* Stage Navigation Arrows */}
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + activeProducts.length) % activeProducts.length)}
                  className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-sm transition-all hover:scale-105 cursor-pointer"
                  title="Previous Machine"
                  aria-label="Previous Machine"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % activeProducts.length)}
                  className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 shadow-sm transition-all hover:scale-105 cursor-pointer"
                  title="Next Machine"
                  aria-label="Next Machine"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Active Machine Live HUD Details Strip */}
            <div className="w-full max-w-[560px] bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 mt-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-200/40">
                    {currentProduct.category}
                  </span>
                  <span className="text-[8px] font-mono font-bold text-slate-400">
                    ID: {currentProduct.id}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight line-clamp-1">
                  {currentProduct.name}
                </h3>
              </div>

              <Link
                href={`/products/${encodeURIComponent(currentProduct.slug || currentProduct.id)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-[#122f87] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <span>View Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
