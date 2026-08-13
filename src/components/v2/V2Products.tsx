"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ShoppingCart, Check } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { products } from "@/data/products"
import { Product } from "@/types"

export default function V2Products() {
  const [activeCategory, setActiveCategory] = useState<string>("Spindle")
  const { items, addItem } = useEnquiry()

  const categories = ["Spindle", "Bearings", "Ball Screws", "Accessories"]

  // Filter products by selected category
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
  )

  const isItemInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId)
  }

  return (
    <section className="py-24 bg-white relative border-t border-slate-200 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold text-red-650 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md border border-red-200/40">
              FEATURED CATALOGUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-2 font-display">
              Precision Engineering Components
            </h2>
            <p className="text-slate-650 text-xs font-light leading-relaxed">
              Discover high-stiffness spindles, zero-backlash ball screws, and custom machine tool accessories manufactured to sub-micron standards.
            </p>
          </div>

          <Link
            href="/products"
            className="group mt-6 md:mt-0 flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-500 uppercase tracking-widest transition-colors shrink-0"
          >
            Explore Catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-Column Layout based on provided reference image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Vertical Category List with active red segment */}
          <div className="md:col-span-3 flex md:flex-col border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left md:text-right pr-6 pl-4 md:pl-0 py-4 text-xs font-extrabold tracking-widest transition-all uppercase shrink-0 relative ${
                    isActive
                      ? "text-red-500"
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="verticalRedIndicator"
                      className="absolute bottom-0 md:bottom-auto right-0 top-auto md:top-2 md:bottom-2 w-full md:w-[3px] h-[3px] md:h-auto bg-red-500 rounded-full"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Column: Products Display Grid matching the reference layout */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <AnimatePresence mode="wait">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="group bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] border border-slate-300/40 rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 min-h-[260px]"
                  >
                    <div>
                      {/* Product Name (title) */}
                      <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight mb-2 max-w-[55%]">
                        {p.name}
                      </h3>
                      
                      {/* Product Subtitle / Short Description */}
                      <p className="text-slate-600 text-[11px] font-normal leading-relaxed max-w-[55%] line-clamp-3 mb-6">
                        {p.shortDescription}
                      </p>
                    </div>

                    {/* Floating Product Image (Bottom-Right cutout style) */}
                    <div className="absolute bottom-4 right-4 w-36 h-36 flex items-center justify-center pointer-events-none">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="max-w-full max-h-full object-contain drop-shadow-sm group-hover:scale-115 transition-transform duration-500 ease-out" 
                      />
                    </div>

                    {/* Action Items Block (Bottom-Left) */}
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Read More Link (Underlined) */}
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-xs font-bold text-slate-800 hover:text-red-500 underline decoration-2 underline-offset-4 transition-colors shrink-0"
                      >
                        Read More
                      </Link>

                      {/* Add to Cart button */}
                      {isItemInCart(p.id) ? (
                        <button
                          className="px-4 py-2.5 bg-red-500/10 border border-red-500/30 text-red-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Added
                        </button>
                      ) : (
                        <button
                          onClick={() => addItem(p)}
                          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-slate-300" />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
