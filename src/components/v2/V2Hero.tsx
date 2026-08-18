"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { products as fallbackProducts } from "@/data/products"
import { Product } from "@/types"

export default function V2Hero() {
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(270)

  const [radius, setRadius] = useState(270)

  // Dynamically scale radius based on screen size to prevent hydration mismatch
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(130)
      } else if (window.innerWidth < 1024) {
        setRadius(200)
      } else {
        setRadius(270)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fetch real products from the API to get user's uploaded images
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
        console.error("Error loading products for large right-aligned hero wheel:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const totalProducts = productsList.length

  const selectProduct = (idx: number) => {
    setActiveIndex(idx)
    // Rotate the wheel so the active item is positioned at the top (270 degrees)
    const anglePerItem = 360 / totalProducts
    const targetAngle = idx * anglePerItem
    setRotationOffset(270 - targetAngle)
  }

  // Auto cycle every 4.5 seconds
  useEffect(() => {
    if (totalProducts <= 1) return

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalProducts
      selectProduct(nextIndex)
    }, 4500)

    return () => clearInterval(interval)
  }, [activeIndex, totalProducts])

  const activeProduct = productsList[activeIndex]

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col justify-center items-center text-blue-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          Loading Robotic Console...
        </span>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col justify-center pt-24 pb-16">
      
      {/* Background Tooling Grid overlay (Light mode gray) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Dynamic Backlight Spotlight Glows */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[750px] h-[600px] lg:h-[750px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[600px]">
          
          {/* Left Column: Corporate About Details */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40 mb-6">
              Est. 1999 • Bangalore Hub
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 uppercase tracking-tight leading-none mb-6 font-display">
              We Can Make <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">
                What You Can Imagine
              </span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-8 max-w-lg">
              Bharat Machine Tools (BMT) is India's premier manufacturer of high-precision mechanical assemblies. We supply aerospace-grade spindles, zero-backlash ball screws, and axial-radial YRT bearings built for high-stiffness industrial operations.
            </p>
            
            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-sm border-t border-slate-200 pt-8">
              <div>
                <span className="text-xl font-bold text-slate-900 block font-display">25+ Years</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-1">Engineering Legacy</span>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900 block font-display">Zero Defect</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-1">Quality Assurance</span>
              </div>
            </div>
          </div>
          {/* Right Column: Circular Products Carousel Wheel */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center">
            
            <div className="relative w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] lg:w-[680px] lg:h-[680px] flex items-center justify-center">
              
              {/* Dynamic dotted guide line passing through the centers of node bubbles */}
              <div
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                }}
                className="absolute rounded-full border border-dashed border-slate-200 pointer-events-none"
              />
              
              {/* Concentric inner track ring */}
              <div
                style={{
                  width: `${radius * 2 - 80}px`,
                  height: `${radius * 2 - 80}px`,
                }}
                className="absolute rounded-full border border-dotted border-slate-200/50 pointer-events-none"
              />
              
              {/* Rotating outer ring of product thumbnails */}
              <motion.div
                animate={{ rotate: rotationOffset }}
                transition={{ type: "spring", stiffness: 60, damping: 16 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
              >
                {productsList.map((p, idx) => {
                  const anglePerItem = 360 / totalProducts
                  const angle = idx * anglePerItem
                  const isSelected = activeIndex === idx

                  return (
                    <button
                      key={p.id}
                      onClick={() => selectProduct(idx)}
                      style={{
                        position: "absolute",
                        transform: `rotate(${angle}deg) translate(${radius}px)`,
                      }}
                      className="group focus:outline-none z-20"
                    >
                      {/* Node bubble with product thumbnail (Light Theme - Sized Up) */}
                      <motion.div
                        animate={{
                          scale: isSelected ? 1.55 : 1,
                          rotate: -rotationOffset - angle,
                          borderColor: isSelected ? "#122f87" : "rgba(15,23,42,0.08)",
                          backgroundColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.9)",
                          boxShadow: isSelected ? "0 0 25px rgba(18,47,135,0.25)" : "0 4px 10px rgba(0,0,0,0.03)"
                        }}
                        transition={{ type: "spring", stiffness: 60, damping: 16 }}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center transition-all overflow-hidden relative"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-8 h-8 sm:w-11 sm:h-11 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        {isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-600 animate-ping" />
                        )}
                      </motion.div>
                    </button>
                  )
                })}
              </motion.div>

              {/* Central Hub displaying Image, Category, Title, and Description inside (Sized Up) */}
              <div className="absolute w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] rounded-full bg-white border border-slate-200 z-30 flex flex-col items-center justify-center p-6 sm:p-10 text-center shadow-lg relative overflow-hidden">
                
                {/* Spinning gauge element */}
                <div className="absolute inset-3 rounded-full border border-dashed border-blue-500/20 animate-[spin_50s_linear_infinite] pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center w-full h-full relative z-10"
                  >
                    {/* Product Image */}
                    <motion.img
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-28 h-28 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)] mb-2 lg:mb-4"
                    />
                    
                    {/* Category, Title, Description (Hidden on mobile/tablet for clarity) */}
                    <div className="hidden lg:flex flex-col items-center justify-center text-center">
                      {/* Category Badge */}
                      <span className="text-[5.5px] sm:text-[7.5px] lg:text-[9px] font-mono text-blue-600 font-extrabold uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20 mb-2">
                        {activeProduct.category}
                      </span>
                      
                      {/* Product Name (Heading) */}
                      <h3 className="text-slate-900 font-extrabold text-[10px] sm:text-xs lg:text-sm uppercase tracking-tight max-w-[160px] sm:max-w-[240px] lg:max-w-[310px] line-clamp-1 mb-2">
                        {activeProduct.name}
                      </h3>

                      {/* Product Description */}
                      <p className="text-slate-600 text-[8px] sm:text-[9.5px] lg:text-[11px] font-normal leading-relaxed max-w-[150px] sm:max-w-[220px] lg:max-w-[280px] line-clamp-3">
                        {activeProduct.shortDescription || activeProduct.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Mobile/Tablet Product Details Card */}
            <div className="mt-8 w-full max-w-md mx-auto bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm block lg:hidden text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[9px] font-mono text-blue-600 font-bold uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                    {activeProduct.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mt-3 mb-2">
                    {activeProduct.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {activeProduct.shortDescription || activeProduct.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Touch Navigation Controls for Mobile */}
            <div className="flex items-center justify-center gap-4 mt-6 lg:hidden">
              <button
                onClick={() => selectProduct((activeIndex - 1 + totalProducts) % totalProducts)}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-950 transition shadow-sm"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-slate-500">
                {activeIndex + 1} / {totalProducts}
              </span>
              <button
                onClick={() => selectProduct((activeIndex + 1) % totalProducts)}
                className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-950 transition shadow-sm"
                aria-label="Next product"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
