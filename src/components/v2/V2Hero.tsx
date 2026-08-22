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
  Compass,
  Layers,
  Zap,
  Activity,
  Award,
  ChevronRight
} from "lucide-react"
import { Product } from "@/types"

export default function V2Hero() {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProductId, setSelectedProductId] = useState<string>("")

  // Fetch real products from the database
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data = await res.json()
          if (data.products && data.products.length > 0) {
            setProductsList(data.products)
            setSelectedProductId(data.products[0].id)
          }
        }
      } catch (err) {
        console.error("Error loading products for bento hero:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const currentProduct = productsList.find(p => p.id === selectedProductId) || productsList[0] || null

  // Auto rotate featured product every 6 seconds
  useEffect(() => {
    if (productsList.length <= 1) return

    const interval = setInterval(() => {
      setSelectedProductId((prevId) => {
        const currentIndex = productsList.findIndex(p => p.id === prevId)
        const nextIndex = (currentIndex + 1) % productsList.length
        return productsList[nextIndex].id
      })
    }, 6000)

    return () => clearInterval(interval)
  }, [productsList])

  if (loading || !currentProduct) {
    return (
      <section className="min-h-[85vh] bg-slate-50 relative overflow-hidden flex flex-col justify-center items-center text-blue-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          Loading Industrial Bento Hub...
        </span>
      </section>
    )
  }

  // Pick top 3 categories/items for micro-cards
  const spindlesItem = productsList.find(p => p.category?.toLowerCase().includes("spindle")) || productsList[1] || productsList[0]
  const gearItem = productsList.find(p => p.category?.toLowerCase().includes("gear")) || productsList[2] || productsList[0]
  const fixtureItem = productsList.find(p => p.category?.toLowerCase().includes("fixture") || p.category?.toLowerCase().includes("tool") || p.category?.toLowerCase().includes("locknut")) || productsList[3] || productsList[0]

  return (
    <section className="min-h-screen bg-[#f8fafc] relative overflow-hidden flex flex-col justify-center pt-24 pb-16 lg:py-24">
      
      {/* Precision Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Dynamic Ambient Spotlights */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#122f87]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Operational Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest">
              Bangalore Production Hub &bull; Sub-Micron Precision Active
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-blue-900">
              <Award className="w-3.5 h-3.5 text-blue-600" /> ISO 9001:2015 QA Certified
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% In-House Cleanrooms
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BENTO GRID HERO CONTAINER                                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ----------------------------------------------------------------------- */}
          {/* BENTO CARD 1: Brand Authority, Headline & CTAs (Span 7 cols)            */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group">
            
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200/60 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-widest">
                  Est. 1999 &bull; Bangalore Engineering Hub
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 uppercase tracking-tight leading-[1.05] font-display mb-6">
                We Can Make <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#122f87] via-blue-600 to-indigo-600">
                  What You Can Imagine
                </span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal max-w-xl mb-8">
                Bharat Machine Tools (BMT) is India's premier manufacturer of high-precision spindle systems, zero-backlash planetary gearboxes, and custom CNC multi-axis rotary tables built for high-stiffness aerospace and defense applications.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-100">
              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full">
                <Link
                  href="/products"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-blue-900/15 hover:shadow-blue-900/25 hover:-translate-y-0.5 cursor-pointer"
                >
                  Explore Full Catalog <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20am%20looking%20for%20a%20custom%20machine%20tool%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-2xl border border-slate-200 transition-all hover:-translate-y-0.5"
                >
                  Request Custom RFQ
                </a>
              </div>

              {/* Verified Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">25+</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-semibold block mt-0.5">Years Legacy</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">&lt; 0.001</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-semibold block mt-0.5">mm Runout</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block font-display tracking-tight">1000+</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-semibold block mt-0.5">Units Deployed</span>
                </div>
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* BENTO CARD 2: Live Featured Flagship Machine Spotlight (Span 5 cols)    */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-[2.5rem] p-7 sm:p-9 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            
            {/* Background High-Tech Grid & Lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header: Machine Tag & Model Switcher */}
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                  {currentProduct.category}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider">
                  ★ 5.0 Factory QA
                </span>
              </div>

              {/* Mini Selector Dots */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-xl">
                {productsList.slice(0, 5).map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      p.id === currentProduct.id ? "w-5 bg-blue-400" : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    title={p.name}
                  />
                ))}
              </div>
            </div>

            {/* Central Product Visual (Unclipped 4K Display) */}
            <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center min-h-[240px]">
              
              {/* Studio Pedestal Glow */}
              <div className="absolute inset-x-10 bottom-2 h-20 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative flex flex-col items-center justify-center w-full"
                >
                  <motion.img
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="max-h-[190px] sm:max-h-[220px] max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Machine Info & Action */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                  Flagship Model &bull; In Stock
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-tight truncate">
                  {currentProduct.name}
                </h3>
              </div>

              <Link
                href={`/products/${encodeURIComponent(currentProduct.slug || currentProduct.id)}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/30 shrink-0 cursor-pointer"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* BENTO ROW 2: Capability Cards (Spindles, Gears, Fixtures, Benchmark)    */}
          {/* ----------------------------------------------------------------------- */}
          
          {/* Micro Card 1: High-Speed Spindles */}
          <Link
            href={`/products/${encodeURIComponent(spindlesItem.slug || spindlesItem.id)}`}
            className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[8px] font-mono font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200/40">
                  Direct Drive
                </span>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight mt-1.5 group-hover:text-blue-600 transition-colors">
                  Precision Spindles
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div className="h-24 w-full bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100 my-2 overflow-hidden">
              <img
                src={spindlesItem.image}
                alt={spindlesItem.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <span className="text-[10px] text-slate-500 font-mono font-medium block truncate">
              Up to 24,000 RPM &bull; &lt; 0.001mm Runout
            </span>
          </Link>

          {/* Micro Card 2: Planetary Gearbox */}
          <Link
            href={`/products/${encodeURIComponent(gearItem.slug || gearItem.id)}`}
            className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[8px] font-mono font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/40">
                  Zero Backlash
                </span>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight mt-1.5 group-hover:text-blue-600 transition-colors">
                  Planetary Gearbox
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div className="h-24 w-full bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100 my-2 overflow-hidden">
              <img
                src={gearItem.image}
                alt={gearItem.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <span className="text-[10px] text-slate-500 font-mono font-medium block truncate">
              High Torque &bull; Compact Space Efficiency
            </span>
          </Link>

          {/* Micro Card 3: Special Tooling & Fixtures */}
          <Link
            href={`/products/${encodeURIComponent(fixtureItem.slug || fixtureItem.id)}`}
            className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[8px] font-mono font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-200/40">
                  Custom Build
                </span>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight mt-1.5 group-hover:text-blue-600 transition-colors">
                  Special Fixtures
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>

            <div className="h-24 w-full bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-100 my-2 overflow-hidden">
              <img
                src={fixtureItem.image}
                alt={fixtureItem.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <span className="text-[10px] text-slate-500 font-mono font-medium block truncate">
              Bend Checking &bull; Precision Jigs
            </span>
          </Link>

          {/* Micro Card 4: Precision Tolerance Guarantee Card */}
          <div className="lg:col-span-3 bg-gradient-to-br from-blue-50/70 via-white to-slate-50 rounded-3xl border border-blue-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[8px] font-mono font-black text-blue-700 uppercase tracking-wider block">
                  Tolerance Standard
                </span>
                <span className="text-xs font-black text-slate-900 uppercase">
                  Sub-Micron Calibration
                </span>
              </div>
            </div>

            <div className="space-y-1.5 my-3 py-2 border-y border-blue-100/80 text-[11px] font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Spindle Dynamic Runout:</span>
                <span className="font-bold text-slate-900">&lt; 0.001 mm</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Balance Grade:</span>
                <span className="font-bold text-emerald-700">ISO G 0.4</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Cleanroom Assembly:</span>
                <span className="font-bold text-blue-700">Class 10,000</span>
              </div>
            </div>

            <Link
              href="/products"
              className="text-[10px] font-mono font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center justify-between group"
            >
              <span>View All 8+ Machine Tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>

    </section>
  )
}
