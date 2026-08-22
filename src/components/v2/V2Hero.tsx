"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { Product } from "@/types"

export default function V2Hero() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  // Auto cycle every 5 seconds
  useEffect(() => {
    if (products.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [products.length])

  const currentProduct = products[currentIndex] || products[0] || null

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  if (loading || !currentProduct) {
    return (
      <section className="min-h-[80vh] bg-white flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </section>
    )
  }

  return (
    <section className="bg-white text-slate-900 pt-28 pb-16 lg:py-32 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Simple, Clear Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Est. 1999 &bull; Bangalore, India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 uppercase leading-none font-display">
              We Can Make <br />
              <span className="text-blue-600">What You Can Imagine</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Bharat Machine Tools manufactures high-precision machine tool spindles, zero-backlash planetary gearboxes, and CNC rotary tables engineered for sub-micron precision.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20would%20like%20to%20request%20a%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Get Quotation
              </a>
            </div>

            {/* Simple Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 max-w-md">
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

          {/* Right: Clean, Large Product Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="w-full bg-slate-50 rounded-3xl border border-slate-200/70 p-6 sm:p-10 relative flex flex-col items-center justify-between min-h-[380px] sm:min-h-[440px]">
              
              {/* Top info & Counter */}
              <div className="w-full flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-md bg-white border border-slate-200 font-mono font-bold text-blue-600 uppercase text-[10px]">
                  {currentProduct.category}
                </span>
                <span className="text-slate-400 font-mono text-xs font-semibold">
                  {currentIndex + 1} / {products.length}
                </span>
              </div>

              {/* Product Image */}
              <div className="my-auto py-6 flex items-center justify-center w-full h-[220px] sm:h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentProduct.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </AnimatePresence>
              </div>

              {/* Bottom Product Name & Link */}
              <div className="w-full flex items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base uppercase truncate">
                    {currentProduct.name}
                  </h3>
                </div>
                <Link
                  href={`/products/${encodeURIComponent(currentProduct.slug || currentProduct.id)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider shrink-0"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Left/Right Arrow Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md border border-slate-200 transition-all hover:scale-105 cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md border border-slate-200 transition-all hover:scale-105 cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5 mt-4">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? "w-6 bg-blue-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
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
