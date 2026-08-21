"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Check, LayoutGrid, Wrench, Settings, RotateCw, CircleDot, RefreshCw } from "lucide-react"
import { Product } from "@/types"
import MobileProductsCatalogue from "@/components/v2/MobileProductsCatalogue"
import { useIsMobile } from "@/hooks/useIsMobile"

import { getClientStoredProducts, getClientDeletedIds, saveClientStoredProducts } from "@/lib/products-client"

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "all":
      return <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
    case "machinery":
      return <Wrench className="w-3.5 h-3.5 shrink-0" />
    case "accessories":
      return <Settings className="w-3.5 h-3.5 shrink-0" />
    case "spindles":
      return <RotateCw className="w-3.5 h-3.5 shrink-0" />
    case "bearings":
      return <CircleDot className="w-3.5 h-3.5 shrink-0" />
    default:
      return <Settings className="w-3.5 h-3.5 shrink-0" />
  }
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { items, addItem } = useEnquiry()
  const isMobile = useIsMobile()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data = await res.json()
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProductsList(data.products)
            saveClientStoredProducts(data.products)
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

  if (isMobile) {
    return (
      <MobileProductsCatalogue 
        productsList={productsList} 
        categories={categories} 
        loading={loading} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20 sm:pt-28 pb-20 relative overflow-hidden">
      {/* Immersive Glowing Backdrop Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Block Section */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 pb-10 relative z-10">
        <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200/45 px-3 py-1 rounded-md uppercase tracking-widest inline-block shadow-inner">
          Bharat Machine Tools
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight mt-4 mb-2 font-display">
          Precision Catalogue
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
          Explore our line of high-stiffness spindles, zero-backlash ball screws, and axial-radial YRT bearings built to sub-micron tolerances.
        </p>
      </div>

      {/* Catalog Grid Area with 2-Column layout */}
      <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Category List (Pill slider on mobile, vertical list on desktop) */}
          <div className="md:col-span-3 flex md:flex-col border-b md:border-b-0 md:border-r border-slate-200/80 pb-4 md:pb-0 gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase()
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-3 text-xs font-bold tracking-wider uppercase shrink-0 relative flex items-center justify-start gap-3 rounded-xl transition-all duration-200 cursor-pointer min-w-[120px] md:min-w-0 ${
                    isActive
                      ? "text-[#122f87] font-extrabold"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {/* Sliding Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-blue-50/60 border-l-2 md:border-l-2 border-t-2 md:border-t-0 border-[#122f87] rounded-xl pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {getCategoryIcon(cat)}
                    <span>{cat === "All" ? "ALL PRODUCTS" : cat}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right Column: Search Bar + Products Display Grid */}
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
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#122f87] focus:ring-4 focus:ring-blue-900/5 transition-all"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#122f87] gap-3">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Loading Components...</span>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-slate-500 py-24 border border-dashed border-slate-200 rounded-3xl bg-white"
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
                      className="group bg-white border border-slate-200/85 rounded-[2.2rem] p-6 sm:p-8 relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 min-h-[360px] sm:min-h-[290px]"
                    >
                      {/* Blueprint Grid Hover Overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      {/* Mobile centered image top showcase (hidden on desktop viewports) */}
                      <div className="w-full h-40 flex items-center justify-center sm:hidden mb-4 relative z-10 pointer-events-none">
                        <div className="absolute w-24 h-24 bg-blue-500/5 rounded-full blur-xl" />
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="max-w-full max-h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.05)]" 
                        />
                      </div>

                      <div className="relative z-10 space-y-2">
                        {/* Category Badge & Star Ratings */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[8px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-200/40 inline-block">
                            {p.category}
                          </span>
                          {p.tag === 'NEW_ARRIVAL' && (
                            <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest bg-emerald-600 px-2 py-0.5 rounded inline-block">
                              New Arrival
                            </span>
                          )}
                          {p.tag === 'FEATURED' && (
                            <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest bg-[#122f87] px-2 py-0.5 rounded inline-block">
                              Featured Product
                            </span>
                          )}
                          {p.reviews && p.reviews.length > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-[8px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-250">
                              ★ {(p.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / p.reviews.length).toFixed(1)} ({p.reviews.length})
                            </span>
                          )}
                        </div>
                        
                        {/* Product Name (title) */}
                        <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight font-display leading-tight group-hover:text-blue-600 transition-colors duration-300 max-w-full sm:max-w-[50%] lg:max-w-[42%]">
                          {p.name}
                        </h3>
                        
                        {/* Product Subtitle / Short Description */}
                        <p className="text-slate-500 text-[11px] font-light leading-relaxed line-clamp-4 max-w-full sm:max-w-[50%] lg:max-w-[42%]">
                          {p.shortDescription}
                        </p>
                      </div>

                      {/* Desktop Absolute Placed Image (hidden on mobile layout) */}
                      <div className="absolute bottom-4 right-4 w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 flex items-center justify-center pointer-events-none hidden sm:flex">
                        {/* Shadow radial glow behind image */}
                        <div className="absolute w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors duration-350" />
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="max-w-full max-h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.06)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out" 
                        />
                      </div>

                      {/* Action Items Block (Bottom-Left) */}
                      <div className="flex items-center gap-4 relative z-10 mt-6 sm:mt-auto">
                        {/* Read More Link (Underlined) */}
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-xs font-bold text-slate-800 hover:text-blue-600 underline decoration-2 underline-offset-4 transition-colors shrink-0"
                        >
                          Read More
                        </Link>

                        {/* Add to Cart button */}
                        {isItemInCart(p.id) ? (
                          <button
                            className="px-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </button>
                        ) : (
                          <button
                            onClick={() => addItem(p)}
                            className="px-4 py-2.5 bg-slate-900 hover:bg-[#122f87] text-white rounded-xl text-[9px] font-extrabold uppercase tracking-wider hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
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
