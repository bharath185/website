"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ShoppingCart, Check } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { Product } from "@/types"

export default function V2Products() {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("Machinery")
  const { items, addItem } = useEnquiry()

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProductsList(data.products)
            if (data.products[0]?.category) {
              setActiveCategory(data.products[0].category)
            }
          }
        }
      } catch (err) {
        console.error('Error fetching V2Products:', err)
      }
    }
    loadProducts()
  }, [])

  const categories = Array.from(new Set([
    "Machinery",
    "Spindles",
    "Bearings",
    "Accessories",
    ...productsList.map((p) => p.category)
  ]))

  // Filter products by selected category
  const filtered = productsList.filter(
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
        
        {/* 2-Column Layout based on provided reference image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Vertical Category List with active blue segment */}
          <div className="md:col-span-3 flex md:flex-col border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left md:text-right pr-6 pl-4 md:pl-0 py-4 text-xs font-extrabold tracking-widest transition-all uppercase shrink-0 relative cursor-pointer ${
                    isActive
                      ? "text-[#122f87]"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="verticalBlueIndicator"
                      className="absolute bottom-0 md:bottom-auto right-0 top-auto md:top-2 md:bottom-2 w-full md:w-[3px] h-[3px] md:h-auto bg-[#122f87] rounded-full"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Column: Products Display Grid matching the reference layout */}
          <div className="md:col-span-9">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <AnimatePresence mode="wait">
                  {filtered.map((p) => {
                    const name = (p.name || '').toLowerCase()
                    let tag = { label: '⭐ PRECISION GRADE', bg: 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white' }
                    if (name.includes('spindle') || name.includes('motorized') || name.includes('45,000') || name.includes('high frequency')) {
                      tag = { label: '✨ NEW ARRIVAL', bg: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' }
                    } else if (name.includes('rotary') || name.includes('tilting') || name.includes('5th axis') || name.includes('table')) {
                      tag = { label: '🔥 FEATURED PRODUCT', bg: 'bg-gradient-to-r from-[#122f87] to-blue-600 text-white' }
                    } else if (name.includes('bearing') || name.includes('yrt') || name.includes('crossed') || name.includes('locknut')) {
                      tag = { label: '⚡ TOP SELLER', bg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' }
                    } else if (name.includes('grind') || name.includes('mandrel') || name.includes('actuator')) {
                      tag = { label: '🇮🇳 MAKE IN INDIA', bg: 'bg-gradient-to-r from-slate-900 to-blue-950 text-white' }
                    }

                    return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35 }}
                        className="group bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] border border-slate-300/60 rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 min-h-[270px]"
                      >
                        {/* Top-Right Promotional Sale Tag */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-2.5 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider shadow-xs ${tag.bg}`}>
                            {tag.label}
                          </span>
                        </div>

                        <div>
                          {/* Product Name (title) */}
                          <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight mb-2 max-w-[55%] font-display">
                            {p.name}
                          </h3>
                          
                          {/* Product Subtitle / Short Description */}
                          <p className="text-slate-600 text-[11px] font-normal leading-relaxed max-w-[55%] line-clamp-3 mb-6">
                            {p.shortDescription || p.description}
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
                            className="text-xs font-bold text-slate-800 hover:text-[#122f87] underline decoration-2 underline-offset-4 transition-colors shrink-0"
                          >
                            Read More
                          </Link>

                          {/* Add to Cart button */}
                          {isItemInCart(p.id) ? (
                            <button
                              className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              Added in Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addItem(p)}
                              className="px-4 py-2.5 bg-[#122f87] hover:bg-[#0e256b] text-white rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <ShoppingCart className="w-3.5 h-3.5 text-blue-200" />
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-16 text-center border border-dashed border-slate-200 rounded-3xl bg-slate-50">
                <p className="text-sm font-semibold text-slate-500">No products in this category yet</p>
                <Link
                  href="/products"
                  className="inline-block mt-3 text-xs font-bold text-blue-600 hover:underline"
                >
                  View all products &rarr;
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
