"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Info, RefreshCw, Check } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { products as fallbackProducts } from "@/data/products"
import { Product } from "@/types"

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { items, addItem } = useEnquiry()

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
        console.error("Error loading products API:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = ["All", ...Array.from(new Set(productsList.map((p) => p.category)))]

  // Filter and search
  const filtered = productsList.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const isItemInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId)
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-28 pb-20 relative">
      {/* Immersive Glowing Backdrop Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-widest mb-4 font-mono"
        >
          PRECISION ENGINEERED CATALOGUE
        </motion.span>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-500 mb-6 tracking-tight font-display">
          World-Class Machining Systems
        </h1>
        
        <p className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-light">
          Explore BMT's high-precision engineering components. Built with aerospace-grade tolerances, ready for immediate delivery from our warehouse hub in Bangalore.
        </p>
      </section>

      {/* Catalog Grid Area with 2-Column layout matching reference image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Vertical Category List with active green segment */}
          <div className="md:col-span-3 flex md:flex-col border-b md:border-b-0 md:border-r border-slate-800/60 pb-4 md:pb-0 gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left md:text-right pr-6 pl-4 md:pl-0 py-4 text-xs font-extrabold tracking-widest transition-all uppercase shrink-0 relative ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-500 hover:text-slate-350"
                  }`}
                >
                  {cat === "All" ? "ALL PRODUCTS" : cat}
                  {isActive && (
                    <motion.div
                      layoutId="verticalGreenIndicatorCatalog"
                      className="absolute bottom-0 md:bottom-auto right-0 top-auto md:top-2 md:bottom-2 w-full md:w-[3px] h-[3px] md:h-auto bg-emerald-400 rounded-full"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Column: Search Bar + Products Display Grid matching the reference layout */}
          <div className="md:col-span-9">
            
            {/* Search row above grid */}
            <div className="flex justify-end mb-8">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search components..."
                  className="w-full bg-slate-950/60 border border-white/5 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-blue-500 gap-3">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Loading Components...</span>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-slate-550 py-24 border border-dashed border-white/5 rounded-3xl bg-slate-900/10"
              >
                <p className="text-xs font-medium">No precision components match your search criteria.</p>
              </motion.div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <AnimatePresence mode="wait">
                  {filtered.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="group bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] border border-slate-300/40 rounded-3xl p-6 sm:p-8 relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 min-h-[245px]"
                    >
                      <div>
                        {/* Product Name (title) */}
                        <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight mb-2 max-w-[70%]">
                          {p.name}
                        </h3>
                        
                        {/* Product Subtitle / Short Description */}
                        <p className="text-slate-650 text-[11px] font-normal leading-relaxed max-w-[62%] line-clamp-3 mb-6">
                          {p.shortDescription}
                        </p>
                      </div>

                      {/* Floating Product Image (Bottom-Right cutout style) */}
                      <div className="absolute bottom-4 right-4 w-28 h-28 flex items-center justify-center pointer-events-none">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="max-w-full max-h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>

                      {/* Action Items Block (Bottom-Left) */}
                      <div className="flex items-center gap-4 relative z-10">
                        {/* Read More Link (Underlined) */}
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-xs font-bold text-slate-800 hover:text-emerald-500 underline decoration-2 underline-offset-4 transition-colors shrink-0"
                        >
                          Read More
                        </Link>

                        {/* Add to Cart button */}
                        {isItemInCart(p.id) ? (
                          <button
                            className="px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1.5"
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
            )}
          </div>

        </div>
      </section>
    </div>
  )
}
