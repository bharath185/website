"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Check, LayoutGrid, Wrench, Settings, RotateCw, CircleDot, RefreshCw, Image as ImageIcon } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { products as fallbackProducts } from "@/data/products"
import { Product } from "@/types"
import MobileProductsCatalogue from "@/components/v2/MobileProductsCatalogue"
import { useIsMobile } from "@/hooks/useIsMobile"

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

// Sub-component for individual product card with multi-image support
function CatalogueProductCard({
  product,
  isItemInCart,
  onAddToCart,
}: {
  product: Product
  isItemInCart: boolean
  onAddToCart: (p: Product) => void
}) {
  const images = (product.images && Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : (product.image ? [product.image] : [])

  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const currentImg = images[activeImgIndex] || product.image

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="group bg-white border border-slate-200/85 rounded-[2.2rem] p-6 sm:p-8 relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 min-h-[380px] sm:min-h-[300px]"
    >
      {/* Blueprint Grid Hover Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Mobile centered image top showcase (hidden on desktop viewports) */}
      <div className="w-full h-44 flex flex-col items-center justify-center sm:hidden mb-4 relative z-10">
        <div className="w-full h-36 relative flex items-center justify-center">
          <div className="absolute w-24 h-24 bg-blue-500/5 rounded-full blur-xl" />
          <img 
            src={currentImg} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.05)] transition-all duration-300" 
          />
        </div>

        {/* Mobile Mini Dots Selector */}
        {images.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImgIndex(idx)
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeImgIndex === idx ? "w-4 bg-blue-600" : "w-1.5 bg-slate-300"
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-2">
        {/* Category Badge, Tag & Star Ratings */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[8px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-200/40 inline-block">
            {product.category}
          </span>
          {product.tag === 'NEW_ARRIVAL' && (
            <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest bg-emerald-600 px-2 py-0.5 rounded inline-block">
              New Arrival
            </span>
          )}
          {product.tag === 'FEATURED' && (
            <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest bg-[#122f87] px-2 py-0.5 rounded inline-block">
              Featured Product
            </span>
          )}
          {images.length > 1 && (
            <span className="text-[8px] font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1">
              <ImageIcon className="w-2.5 h-2.5 text-blue-600" />
              {images.length} Photos
            </span>
          )}
          {product.reviews && product.reviews.length > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[8px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-250">
              ★ {(product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / product.reviews.length).toFixed(1)} ({product.reviews.length})
            </span>
          )}
        </div>
        
        {/* Product Name (title) */}
        <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight font-display leading-tight group-hover:text-blue-600 transition-colors duration-300 max-w-full sm:max-w-[50%] lg:max-w-[42%]">
          {product.name}
        </h3>
        
        {/* Product Subtitle / Short Description */}
        <p className="text-slate-500 text-[11px] font-light leading-relaxed line-clamp-3 max-w-full sm:max-w-[50%] lg:max-w-[42%]">
          {product.shortDescription}
        </p>
      </div>

      {/* Desktop Absolute Placed Image Area with Multi-Image Controls */}
      <div className="absolute bottom-4 right-4 w-44 h-44 sm:w-48 sm:h-48 lg:w-56 lg:h-56 flex flex-col items-center justify-center hidden sm:flex pointer-events-auto">
        {/* Shadow radial glow behind image */}
        <div className="absolute w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors duration-350 pointer-events-none" />
        
        <div className="w-full h-full flex items-center justify-center p-2 relative">
          <img 
            src={currentImg} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-all duration-500 ease-out" 
          />
        </div>

        {/* Multi-Image Hover Thumbnail Strip on Desktop */}
        {images.length > 1 && (
          <div className="absolute bottom-1 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200/80 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
            {images.map((img, i) => (
              <button
                key={i}
                onMouseEnter={() => setActiveImgIndex(i)}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImgIndex(i)
                }}
                className={`w-4 h-4 rounded-full overflow-hidden border transition-transform ${
                  activeImgIndex === i
                    ? "border-blue-600 ring-2 ring-blue-500/30 scale-110"
                    : "border-slate-300 opacity-60 hover:opacity-100"
                }`}
                title={`View photo ${i + 1}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Items Block (Bottom-Left) */}
      <div className="flex items-center gap-4 relative z-10 mt-6 sm:mt-auto">
        {/* Read More Link */}
        <Link
          href={`/products/${product.slug}`}
          className="text-xs font-bold text-slate-800 hover:text-blue-600 underline decoration-2 underline-offset-4 transition-colors shrink-0"
        >
          View Details &amp; Gallery
        </Link>

        {/* Add to Cart button */}
        {isItemInCart ? (
          <button
            className="px-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Added
          </button>
        ) : (
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-[#122f87] text-white rounded-xl text-[9px] font-extrabold uppercase tracking-wider hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-slate-300" />
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts)
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
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-white border border-slate-200/90 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-2.5">
                    {getCategoryIcon(cat)}
                    <span>{cat === "All" ? "All Components" : cat}</span>
                  </span>

                  {/* Dot indicator */}
                  {isActive && (
                    <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-[#122f87] hidden md:block" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Column: Interactive Search Bar & Products Feed */}
          <div className="md:col-span-9 flex flex-col space-y-6">
            
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components by name, model or specification..."
                className="w-full bg-white border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#122f87] shadow-sm transition-colors"
              />
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider px-1">
              <span>{filtered.length} COMPONENTS AVAILABLE</span>
              <span>IN STOCK BANGALORE</span>
            </div>

            {/* Loading / Empty / Grid States */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-28 text-[#122f87] gap-3">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Loading Catalog...</span>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-slate-500 py-28 border border-dashed border-slate-200 rounded-[2.5rem] bg-white shadow-sm space-y-2"
              >
                <p className="text-sm font-semibold">No precision components matched your search.</p>
                <p className="text-xs text-slate-400">Try clearing filters or search with another keyword.</p>
              </motion.div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <AnimatePresence mode="wait">
                  {filtered.map((p) => (
                    <CatalogueProductCard
                      key={p.id}
                      product={p}
                      isItemInCart={isItemInCart(p.id)}
                      onAddToCart={addItem}
                    />
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
