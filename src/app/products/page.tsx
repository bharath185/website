"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, RefreshCw, ShoppingCart, Info, ArrowRight, Check } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { products as fallbackProducts } from "@/data/products"
import { Product } from "@/types"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
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
            setProducts(data.products)
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

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

  // Filter and search
  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
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
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

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
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-500 mb-6 tracking-tight font-display"
        >
          World-Class Machining Systems
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Explore BMT's high-precision engineering components. Built with aerospace-grade tolerances, ready for immediate delivery from our warehouse hub in Bangalore.
        </motion.p>
      </section>

      {/* Catalog Grid Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Search and Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 p-4 bg-slate-900/30 border border-white/5 rounded-3xl backdrop-blur-md shadow-2xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block mr-2" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold"
                    : "bg-slate-950/40 text-slate-400 border border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
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

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-blue-500 gap-3">
            <RefreshCw className="w-10 h-10 animate-spin" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Loading Components...</span>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 py-32 border border-dashed border-white/5 rounded-3xl bg-slate-900/10"
          >
            <p className="text-sm font-medium">No precision components match your search criteria.</p>
          </motion.div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((p, idx) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative flex flex-col justify-between backdrop-blur-xl bg-slate-950/40 border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.2)] rounded-3xl overflow-hidden transition-all duration-500"
                >
                  <div>
                    {/* Glowing Accent Border */}
                    <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/20 rounded-3xl transition-all duration-500 pointer-events-none" />

                    {/* Image Area */}
                    <div className="aspect-[4/3] bg-slate-950 overflow-hidden relative">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      {/* Category Label Overlay */}
                      <span className="absolute top-4 left-4 bg-slate-900/90 text-blue-400 font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-md border border-white/5">
                        {p.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight mb-2">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6 font-light">
                        {p.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Actions Block */}
                  <div className="p-6 pt-0 border-t border-white/5 mt-auto flex items-center justify-between bg-slate-950/20">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">List Price</span>
                      <span className="text-sm font-bold text-white">₹{(p.price || 0).toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Details Link */}
                      <Link
                        href={`/products/${p.slug}`}
                        className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-2xl border border-white/5 transition-all"
                        title="View Engineering Details"
                      >
                        <Info className="w-4 h-4" />
                      </Link>

                      {/* Add to Cart button */}
                      <button
                        onClick={() => addItem(p)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                          isItemInCart(p.id)
                            ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10"
                        }`}
                      >
                        {isItemInCart(p.id) ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Enquire
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  )
}
