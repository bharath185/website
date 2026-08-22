"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  RefreshCw,
  ChevronLeft, 
  ChevronRight,
  Activity,
  Award,
  Layers,
  Zap,
  Check,
  Star,
  Maximize2
} from "lucide-react"
import { Product } from "@/types"

export default function V2Hero() {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
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
        console.error("Error loading products for hero:", err)
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

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0)
  }, [selectedCategory])

  // Auto rotate products every 5.5 seconds if user is not hovering
  useEffect(() => {
    if (activeProducts.length <= 1 || isHovered) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeProducts.length)
    }, 5500)

    return () => clearInterval(interval)
  }, [activeProducts.length, isHovered])

  const categories = ["ALL", "MACHINERY", "SPINDLES", "GEARBOX", "LOCKNUTS"]

  if (loading || !currentProduct) {
    return (
      <section className="min-h-[85vh] bg-[#f8fafc] relative overflow-hidden flex flex-col justify-center items-center text-blue-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-semibold">
          Loading Precision Experience...
        </span>
      </section>
    )
  }

  // Dynamic engineering highlights for current product
  const getProductHighlights = (p: Product) => {
    const cat = (p.category || "").toUpperCase()
    if (cat.includes("SPINDLE")) {
      return [
        { label: "Max Speed", val: "Up to 24,000 RPM" },
        { label: "Runout", val: "< 0.001 mm TIR" },
        { label: "Bearings", val: "Hybrid Ceramic Angular" }
      ]
    } else if (cat.includes("GEAR")) {
      return [
        { label: "Backlash", val: "< 1 Arc-Min (Zero Backlash)" },
        { label: "Torque", val: "Up to 1,200 Nm" },
        { label: "Efficiency", val: "> 97% Full Load" }
      ]
    } else if (cat.includes("ROTARY") || cat.includes("TABLE") || cat.includes("MACHINE")) {
      return [
        { label: "Repeatability", val: "± 2.0 Arc-Seconds" },
        { label: "Bearings", val: "YRT High-Rigidity Series" },
        { label: "Clamping", val: "850 Nm Hydraulic/Pneumatic" }
      ]
    } else {
      return [
        { label: "Tolerance", val: "ISO 965 4H Precision Ground" },
        { label: "Locking", val: "Radial / Axial Pins" },
        { label: "Material", val: "Alloy Steel 42CrMo4" }
      ]
    }
  }

  const highlights = getProductHighlights(currentProduct)

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#ffffff] text-slate-900 relative overflow-hidden flex flex-col justify-center pt-24 pb-16 lg:py-24 font-sans selection:bg-blue-600/20" style={{ colorScheme: 'light' }}>
      
      {/* Precision Blueprint Grid Overlay (Clean Subtle Light Gray) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />
      
      {/* Soft Ambient Radial Light Flares */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-indigo-500/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-400/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Trust HUD Notification Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest">
              Bangalore Production Hub Active &bull; ISO 9001:2015 Certified
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-blue-900">
              <Activity className="w-3.5 h-3.5 text-blue-600" /> Dynamic Runout: &lt; 0.001 mm
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% In-House Cleanroom QA
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN HERO SPLIT STAGE                                                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[580px]">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Authority Headline, Value Proposition & Actions            */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Established Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-blue-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-widest">
                Est. 1999 &bull; Aerospace &amp; Defense Precision
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 uppercase tracking-tight leading-[1.04] font-display">
                We Can Make <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#122f87] via-[#2563eb] to-[#0284c7]">
                  What You Can Imagine
                </span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mt-4 max-w-xl">
                Bharat Machine Tools (BMT) is India's leading manufacturer of high-precision rotational spindles, zero-backlash planetary gearboxes, and custom CNC multi-axis rotary tables engineered for sub-micron accuracy.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full pt-1">
              <Link
                href="/products"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-900/15 hover:shadow-blue-900/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Full Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20am%20interested%20in%20a%20custom%20machine%20tool%20technical%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-2xl border border-slate-200/90 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>Request Custom RFQ</span>
              </a>
            </div>

            {/* Metric Cards Matrix (Clean White Elevated Cards) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full pt-4">
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">25+</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold block mt-0.5">Years Legacy</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">&lt; 0.001</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold block mt-0.5">mm Runout</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">1000+</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold block mt-0.5">Units Deployed</span>
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Attractive Floating 4K Machine Showcase Stage             */}
          {/* ----------------------------------------------------------------------- */}
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-6 flex flex-col items-center justify-center relative"
          >
            
            {/* Category Quick Filter Chips */}
            <div className="w-full flex items-center justify-center gap-1.5 mb-4 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                    selectedCategory === cat
                      ? "bg-[#122f87] text-white shadow-md shadow-blue-900/20 scale-105"
                      : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Main Showcase Pedestal Card */}
            <div className="w-full bg-white rounded-[2.5rem] border border-slate-200/90 p-6 sm:p-8 shadow-[0_15px_40px_-10px_rgba(15,23,42,0.07)] relative overflow-hidden flex flex-col justify-between">
              
              {/* Studio Stage Backlight Reflection */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-indigo-400/5 to-cyan-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

              {/* Stage Top Bar: Category Pill & Carousel Counter */}
              <div className="flex items-center justify-between gap-2 relative z-20 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-800 font-mono text-[9px] font-bold uppercase tracking-wider">
                    {currentProduct.category}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-700 font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Quality Verified
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 px-1.5">
                    {activeIndex + 1} / {activeProducts.length}
                  </span>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev - 1 + activeProducts.length) % activeProducts.length)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                    title="Previous Product"
                    aria-label="Previous Product"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev + 1) % activeProducts.length)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                    title="Next Product"
                    aria-label="Next Product"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Central Floating Machine Visual */}
              <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px]">
                
                {/* Floating Holographic Spec Tag 1 (Top Left) */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-2 left-0 z-20 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-[9px] font-mono font-bold text-slate-800"
                >
                  <Zap className="w-3 h-3 text-blue-600" />
                  <span>Sub-Micron Calibration</span>
                </motion.div>

                {/* Floating Holographic Spec Tag 2 (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute bottom-2 right-0 z-20 hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-[9px] font-mono font-bold text-slate-800"
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>★ 5.0 Factory Standard</span>
                </motion.div>

                {/* Machine Studio Pedestal Shadow */}
                <div className="absolute bottom-2 w-3/4 h-8 bg-slate-900/10 rounded-full blur-md pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduct.id}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative flex flex-col items-center justify-center w-full h-full"
                  >
                    <motion.img
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="max-h-[220px] sm:max-h-[270px] max-w-full object-contain drop-shadow-[0_15px_30px_rgba(15,23,42,0.12)] filter"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dynamic Engineering Spec Highlights Strip */}
              <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 text-center relative z-20 bg-slate-50/80 rounded-2xl px-2">
                {highlights.map((h, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[8px] font-mono text-slate-400 uppercase font-bold tracking-wider">{h.label}</span>
                    <span className="text-[11px] font-mono font-black text-slate-800 truncate">{h.val}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Active Machine Info & Direct Details Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 relative z-20 mt-3">
                <div className="min-w-0">
                  <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    Product ID: {currentProduct.id}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight truncate">
                    {currentProduct.name}
                  </h3>
                </div>

                <Link
                  href={`/products/${encodeURIComponent(currentProduct.slug || currentProduct.id)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-[#122f87] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Clean Horizontal Thumbnails Strip */}
            <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-3 mt-3">
              {activeProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white border p-1.5 shrink-0 transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center ${
                    activeIndex === idx
                      ? "border-blue-600 ring-2 ring-blue-500/25 shadow-md scale-105"
                      : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400"
                  }`}
                  title={p.name}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
