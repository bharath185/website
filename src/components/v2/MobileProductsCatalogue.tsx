"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Check, LayoutGrid, Wrench, Settings, RotateCw, CircleDot, Info, Plus } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { Product } from "@/types"

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "all":
      return <LayoutGrid className="w-3 h-3 shrink-0" />
    case "machinery":
      return <Wrench className="w-3 h-3 shrink-0" />
    case "accessories":
      return <Settings className="w-3 h-3 shrink-0" />
    case "spindles":
      return <RotateCw className="w-3 h-3 shrink-0" />
    case "bearings":
      return <CircleDot className="w-3 h-3 shrink-0" />
    default:
      return <Settings className="w-3 h-3 shrink-0" />
  }
}

interface MobileCatalogueProps {
  productsList: Product[]
  categories: string[]
  loading: boolean
}

export default function MobileProductsCatalogue({ productsList, categories, loading }: MobileCatalogueProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { items, addItem } = useEnquiry()

  const isItemInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId)
  }

  // Filter and search
  const filtered = productsList.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-slate-50 min-h-screen px-4 pb-24">
      {/* Search Input Bar (Sticky feel below top bar) */}
      <div className="py-3 sticky top-[48px] z-20 bg-slate-50">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalogue..."
            className="w-full bg-white border border-slate-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#122f87] shadow-sm"
          />
        </div>
      </div>

      {/* Horizontal Pill Slider */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 border-b border-slate-200/50">
        {categories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase()
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-1.5 border cursor-pointer ${
                isActive
                  ? "bg-[#122f87] border-[#122f87] text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat === "All" ? "ALL" : cat}</span>
            </button>
          )
        })}
      </div>

      {/* Product count */}
      <div className="flex items-center justify-between py-3">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          {filtered.length} COMPONENTS FOUND
        </span>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#122f87] gap-2">
          <div className="w-6 h-6 border-2 border-t-[#122f87] border-slate-200 rounded-full animate-spin" />
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Loading...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-16 border border-dashed border-slate-200 rounded-3xl bg-white shadow-sm">
          <p className="text-[11px] font-medium">No components match your query.</p>
        </div>
      ) : (
        /* Mobile Shopping 2-Column Grid */
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {filtered.map((p) => {
              const inCart = isItemInCart(p.id)
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200/60 rounded-[1.8rem] p-3 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.01)] relative overflow-hidden"
                >
                  {/* Category Tag */}
                  <span className="absolute top-2 left-2 z-10 text-[6px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/30">
                    {p.category}
                  </span>

                  {p.tag === 'NEW_ARRIVAL' && (
                    <span className="absolute top-[26px] left-2 z-10 text-[6px] font-mono font-black text-white uppercase tracking-widest bg-emerald-600 px-1.5 py-0.5 rounded shadow-sm">
                      New Arrival
                    </span>
                  )}
                  {p.tag === 'FEATURED' && (
                    <span className="absolute top-[26px] left-2 z-10 text-[6px] font-mono font-black text-white uppercase tracking-widest bg-[#122f87] px-1.5 py-0.5 rounded shadow-sm">
                      Featured
                    </span>
                  )}

                  {/* Info Link */}
                  <Link
                    href={`/products/${p.slug}`}
                    className="absolute top-2 right-2 z-10 p-1 bg-slate-50 border border-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </Link>

                  {/* Centered Image Frame */}
                  <div className="w-full aspect-square bg-slate-50/50 rounded-2xl flex items-center justify-center p-2 mb-2 pointer-events-none relative">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="max-w-[85%] max-h-[85%] object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.04)]" 
                    />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-0.5 flex flex-col">
                    {p.reviews && p.reviews.length > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-[7px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-250 w-fit mb-1">
                        ★ {(p.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / p.reviews.length).toFixed(1)} ({p.reviews.length})
                      </span>
                    )}
                    <h3 className="font-extrabold text-[11px] text-slate-900 leading-tight truncate uppercase tracking-tight">
                      {p.name}
                    </h3>
                    <p className="text-[9px] text-slate-400 font-light line-clamp-2 leading-tight">
                      {p.shortDescription}
                    </p>
                  </div>

                  {/* Add / Action Row */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                    <span className="text-[8px] font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/40">
                      RFQ
                    </span>

                    {inCart ? (
                      <button
                        className="w-7 h-7 bg-blue-50 border border-blue-150 text-blue-600 rounded-full flex items-center justify-center"
                        aria-label="Added to inquiry"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => addItem(p)}
                        className="w-7 h-7 bg-slate-900 hover:bg-[#122f87] text-white rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-sm"
                        aria-label="Add to cart"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
