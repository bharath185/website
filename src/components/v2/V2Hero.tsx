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
  Sliders,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  FileCode2,
  Crosshair,
  Zap,
  Layers,
  Settings
} from "lucide-react"
import { Product } from "@/types"

export default function V2Hero() {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"STUDIO" | "BLUEPRINT">("STUDIO")

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
        console.error("Error loading products for blueprint hero:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const currentProduct = (productsList.length > 0 && productsList[activeIndex]) ? productsList[activeIndex] : null

  // Auto rotate every 6.5 seconds
  useEffect(() => {
    if (productsList.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productsList.length)
    }, 6500)

    return () => clearInterval(interval)
  }, [productsList.length])

  if (loading || !currentProduct) {
    return (
      <section className="min-h-[85vh] bg-[#0b1120] relative overflow-hidden flex flex-col justify-center items-center text-blue-400 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Loading CAD Blueprint Stage...
        </span>
      </section>
    )
  }

  // Dynamic engineering technical matrix based on active product category
  const getProductSpecs = (p: Product) => {
    const cat = (p.category || "").toUpperCase()
    if (cat.includes("SPINDLE")) {
      return [
        { label: "Spindle Max Speed", value: "12,000 - 24,000 RPM", highlight: true },
        { label: "Dynamic Runout", value: "< 0.001 mm (Sub-Micron)", highlight: true },
        { label: "Bearing Type", value: "Hybrid Ceramic Angular Contact" },
        { label: "Balancing Standard", value: "ISO 1940-1 Grade G 0.4" },
        { label: "Lubrication", value: "Micro-Air-Oil / Sealed Grease" },
        { label: "Mounting Orientation", value: "Universal Vertical / Horizontal" },
      ]
    } else if (cat.includes("GEAR")) {
      return [
        { label: "Backlash Precision", value: "< 1 Arc-Min (Zero-Backlash)", highlight: true },
        { label: "Nominal Output Torque", value: "Up to 1,200 Nm", highlight: true },
        { label: "Transmission Ratio", value: "3:1 to 100:1 Multi-Stage" },
        { label: "Efficiency Rating", value: "> 97% Full Load" },
        { label: "Gear Hardening", value: "Carbonitrided Alloy 60 HRC" },
        { label: "Protection Index", value: "IP65 Sealed Industrial" },
      ]
    } else if (cat.includes("ROTARY") || cat.includes("TABLE") || cat.includes("MACHINE")) {
      return [
        { label: "Positional Repeatability", value: "± 2.0 Arc-Seconds", highlight: true },
        { label: "Table Diameter", value: "Ø 160 mm - Ø 630 mm", highlight: true },
        { label: "Clamping Torque", value: "Pneumatic / Hydraulic 850 Nm" },
        { label: "Axial-Radial Bearings", value: "YRT High-Rigidity Series" },
        { label: "Drive Mechanism", value: "Dual Lead Worm / Direct Torque" },
        { label: "CNC Controller Compatibility", value: "Fanuc / Siemens / Heidenhain" },
      ]
    } else {
      return [
        { label: "Thread Tolerance", value: "ISO 965 4H Precision Ground", highlight: true },
        { label: "Locking Mechanism", value: "Radial / Axial Locking Pins", highlight: true },
        { label: "Perpendicularity Runout", value: "< 0.002 mm TIR" },
        { label: "Material Grade", value: "Alloy Steel 42CrMo4 Hardened" },
        { label: "Surface Finish", value: "Black Oxide / Manganese Phosphate" },
        { label: "Preload Retention", value: "100% Anti-Vibration Tested" },
      ]
    }
  }

  const activeSpecs = getProductSpecs(currentProduct)

  return (
    <section className="min-h-screen bg-[#090d16] text-white relative overflow-hidden flex flex-col justify-center pt-24 pb-16 lg:py-24 font-sans selection:bg-blue-600/40">
      
      {/* Blueprint Grid Lines & Holographic Laser Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.15),transparent_70%)] pointer-events-none" />
      
      {/* Glowing Ambient Core */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Engineering Telemetry HUD Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-blue-950/80">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-widest">
              BMT Bangalore Precision Lab &bull; Dynamic Telemetry Active
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-blue-300">
              <Crosshair className="w-3.5 h-3.5 text-blue-400" /> Runout: &lt; 0.0008 mm
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ISO 9001:2015 QA
            </span>
          </div>
        </div>

        {/* Split Screen Stage: Left Specs Matrix + Right Dynamic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[580px]">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Blueprint Data Matrix, Value Proposition & Actions          */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            
            {/* Category & Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-400/30 text-blue-400 font-mono text-[9px] font-bold uppercase tracking-widest">
                {currentProduct.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                100% Tested
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tight leading-[1.08] font-display text-white mb-2">
                We Can Make <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
                  What You Can Imagine
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                Bharat Machine Tools (BMT) engineers sub-micron spindle systems, zero-backlash planetary gearboxes, and CNC rotary solutions for aerospace, defense, and high-precision tooling OEMs.
              </p>
            </div>

            {/* Dynamic Technical Specs Matrix Table */}
            <div className="w-full bg-slate-900/80 border border-blue-900/40 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between border-b border-blue-900/30 pb-2.5 mb-3">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-blue-400" /> Engineering Parameters &bull; {currentProduct.name}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">
                  ID: {currentProduct.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeSpecs.map((spec, i) => (
                  <div 
                    key={i} 
                    className={`p-2.5 rounded-xl border transition-all ${
                      spec.highlight 
                        ? "bg-blue-950/40 border-blue-500/30 text-white" 
                        : "bg-slate-950/50 border-slate-800/80 text-slate-300"
                    }`}
                  >
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                      {spec.label}
                    </span>
                    <span className={`text-xs font-mono font-bold block ${spec.highlight ? "text-cyan-300" : "text-slate-200"}`}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full pt-1">
              <a
                href={`https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20am%20requesting%20a%20technical%20CAD%20quotation%20for%20the%20${encodeURIComponent(currentProduct.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Request CAD &amp; RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href={`/products/${encodeURIComponent(currentProduct.slug || currentProduct.id)}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl border border-blue-900/40 transition-all hover:-translate-y-0.5"
              >
                <span>Full Technical Spec</span>
              </Link>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 4K Unclipped Machine Stage with Blueprint Toggle           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* View Mode Toggle & Counter */}
            <div className="w-full flex items-center justify-between gap-2 mb-4 px-2">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-blue-900/40 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("STUDIO")}
                  className={`px-3 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === "STUDIO"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Studio Render
                </button>
                <button
                  onClick={() => setViewMode("BLUEPRINT")}
                  className={`px-3 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === "BLUEPRINT"
                      ? "bg-cyan-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Blueprint Laser
                </button>
              </div>

              {/* Navigation Counter & Controls */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-blue-400 px-2">
                  {activeIndex + 1} / {productsList.length}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveIndex((prev) => (prev - 1 + productsList.length) % productsList.length)}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-blue-900/40 transition-colors cursor-pointer"
                    title="Previous Model"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev + 1) % productsList.length)}
                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-blue-900/40 transition-colors cursor-pointer"
                    title="Next Model"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stage Canvas */}
            <div className={`relative w-full aspect-[4/3] rounded-[2.5rem] p-6 sm:p-8 flex items-center justify-center overflow-hidden border transition-all duration-500 shadow-2xl ${
              viewMode === "BLUEPRINT" 
                ? "bg-[#060b14] border-cyan-500/40 shadow-cyan-950/40" 
                : "bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c1424] border-blue-900/40 shadow-blue-950/30"
            }`}>
              
              {/* Studio / Laser Radial Glow */}
              <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                viewMode === "BLUEPRINT"
                  ? "bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_60%)]"
                  : "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]"
              }`} />

              {/* Crosshair Laser Overlay (when in Blueprint mode) */}
              {viewMode === "BLUEPRINT" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-px bg-cyan-500/20" />
                  <div className="h-full w-px bg-cyan-500/20 absolute" />
                  <div className="w-48 h-48 border border-dashed border-cyan-500/30 rounded-full animate-spin-slow absolute" />
                  <span className="absolute top-4 left-4 text-[8px] font-mono text-cyan-400/70 uppercase">
                    [ CAD ALIGNMENT: 0.0008mm ]
                  </span>
                </div>
              )}

              {/* Pedestal Shadow */}
              <div className="absolute bottom-6 w-3/4 h-8 bg-black/60 rounded-full blur-xl pointer-events-none" />

              {/* Product Visual */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                >
                  <motion.img
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className={`max-h-[240px] sm:max-h-[280px] max-w-full object-contain filter transition-all duration-300 ${
                      viewMode === "BLUEPRINT" 
                        ? "drop-shadow-[0_0_25px_rgba(6,182,212,0.4)] hue-rotate-15" 
                        : "drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                    }`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom 5-Thumbnail Strip */}
            <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-3 mt-2">
              {productsList.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-slate-900 border p-1.5 shrink-0 transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center ${
                    activeIndex === idx
                      ? "border-blue-500 ring-2 ring-blue-500/30 scale-105 shadow-md shadow-blue-500/20"
                      : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700"
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
