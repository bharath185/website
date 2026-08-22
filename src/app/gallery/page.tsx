"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ImageIcon, 
  ShieldCheck, 
  Cpu, 
  Camera, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  Layers,
  Filter
} from "lucide-react"
import { Product } from "@/types"
import { galleryImages } from "@/data/gallery"

interface GalleryItem {
  id: string
  title: string
  category: string
  src: string
  productSlug?: string
  productId?: string
  description?: string
  isFacility?: boolean
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Facility and Workshop Photos
  const facilityItems: GalleryItem[] = [
    {
      id: "fac-1",
      title: "Bangalore Unit 1 Precision Manufacturing Facility",
      category: "FACILITY",
      src: "https://fpimages.withfloats.com/actual/689b2aaf4e1a717b10cdac53.jpg",
      description: "State-of-the-art CNC machine tool manufacturing and retrofitting facility in Bangalore.",
      isFacility: true
    },
    {
      id: "fac-2",
      title: "Advanced CNC Tooling & Multi-Axis Machining Floor",
      category: "FACILITY",
      src: "https://fpimages.withfloats.com/actual/689b2a7f68536c1523251664.jpg",
      description: "Heavy-duty CNC grinding, milling, and calibration floor with sub-micron tolerances.",
      isFacility: true
    },
    {
      id: "fac-3",
      title: "Sub-Micron Laser Interferometer Calibration Bench",
      category: "FACILITY",
      src: "https://fpimages.withfloats.com/actual/689b2a7ca0534d0427d7b062.jpg",
      description: "ISO 9001:2015 certified temperature-controlled cleanrooms for spindle balancing.",
      isFacility: true
    },
    {
      id: "fac-4",
      title: "Industrial Machine Tool Assemblies & Stock Inventory",
      category: "FACILITY",
      src: "https://fpimages.withfloats.com/actual/689b2a7ae41135d55e7beaf0.jpg",
      description: "Finished inventory and rapid dispatch staging for planetary gearboxes and spindles.",
      isFacility: true
    }
  ]

  useEffect(() => {
    async function loadAllGalleryItems() {
      try {
        const res = await fetch("/api/products")
        let productGalleryItems: GalleryItem[] = []

        if (res.ok) {
          const data = await res.json()
          if (data.products && data.products.length > 0) {
            data.products.forEach((p: Product) => {
              // 1. Primary Product Image
              if (p.image) {
                productGalleryItems.push({
                  id: `prod-${p.id}-primary`,
                  title: p.name,
                  category: p.category ? p.category.toUpperCase() : "MACHINERY",
                  src: p.image,
                  productSlug: p.slug || p.id,
                  productId: p.id,
                  description: p.shortDescription || p.description
                })
              }

              // 2. All Secondary Angles & Gallery Photos
              if (p.images && Array.isArray(p.images)) {
                p.images.forEach((imgUrl, imgIdx) => {
                  if (imgUrl !== p.image) {
                    productGalleryItems.push({
                      id: `prod-${p.id}-angle-${imgIdx}`,
                      title: `${p.name} (Technical Angle ${imgIdx + 1})`,
                      category: p.category ? p.category.toUpperCase() : "MACHINERY",
                      src: imgUrl,
                      productSlug: p.slug || p.id,
                      productId: p.id,
                      description: `Multi-angle technical view of ${p.name}`
                    })
                  }
                })
              }
            })
          }
        }

        // Combine products + facility photos
        setItems([...productGalleryItems, ...facilityItems])
      } catch (err) {
        console.error("Error loading gallery photos:", err)
        setItems(facilityItems)
      } finally {
        setLoading(false)
      }
    }

    loadAllGalleryItems()
  }, [])

  // Derive unique categories
  const categories = ["ALL", ...Array.from(new Set(items.map(i => i.category)))]

  // Filter items
  const filteredItems = selectedCategory === "ALL" 
    ? items 
    : items.filter(i => i.category.toUpperCase() === selectedCategory.toUpperCase())

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % filteredItems.length)
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, filteredItems.length])

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-28 pb-20 font-sans selection:bg-blue-600/20" style={{ colorScheme: 'light' }}>
      
      {/* Background Tooling Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Ambient Lighting Flares */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header HUD */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-widest">
              Visual Archives &bull; Bangalore Facility
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight font-display">
            Precision Machine &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#122f87] via-[#2563eb] to-[#0284c7]">
              Facility Gallery
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Explore our comprehensive gallery of high-precision CNC machine tools, aerospace rotational spindles, zero-backlash gearboxes, and cleanroom manufacturing operations in Bangalore.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2 text-xs font-mono font-bold text-slate-500 uppercase">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> ISO 9001:2015 QA
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-600" /> Sub-Micron Precision
            </span>
            <span>&bull;</span>
            <span className="text-blue-700">
              {items.length} High-Res Photos
            </span>
          </div>
        </div>

        {/* Category Filter Tab Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#122f87] text-white shadow-md shadow-blue-900/20 scale-105"
                  : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              Loading High-Definition Media Archive...
            </span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 uppercase">No Media Found</h3>
            <p className="text-xs text-slate-500 mt-1">Select another category to view high-resolution photography.</p>
          </div>
        ) : (
          /* Responsive Image Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setLightboxIndex(idx)}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              >
                {/* Image Canvas Container */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6 overflow-hidden">
                  
                  {/* Category Tag on Image */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 font-mono font-extrabold text-[9px] text-blue-700 uppercase tracking-wider shadow-2xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Zoom Overlay Icon */}
                  <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white shadow-sm hover:scale-110 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* High-Resolution Product Image */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-sm"
                  />
                </div>

                {/* Card Content Footer */}
                <div className="p-5 border-t border-slate-100 bg-white flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[11px] text-slate-500 font-light line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                      {item.isFacility ? "Facility Tour" : "Machine Spec"}
                    </span>

                    {item.productSlug ? (
                      <Link
                        href={`/products/${encodeURIComponent(item.productSlug)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider"
                      >
                        <span>View Specs</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <span>Bangalore HQ</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredItems[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
                title="Close Gallery Lightbox (Esc)"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Content Card */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-between"
              >
                {/* Main Large Display Image */}
                <div className="relative w-full h-[65vh] flex items-center justify-center p-4">
                  <img
                    src={filteredItems[lightboxIndex].src}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Bottom Navigation HUD Bar */}
                <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white mt-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold uppercase">
                        {filteredItems[lightboxIndex].category}
                      </span>
                      <span className="text-slate-400 font-mono text-xs">
                        Photo {lightboxIndex + 1} of {filteredItems.length}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold uppercase tracking-tight">
                      {filteredItems[lightboxIndex].title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Previous/Next Controls */}
                    <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
                      <button
                        onClick={() => setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length)}
                        className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Previous Image (←)"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setLightboxIndex((prev) => (prev! + 1) % filteredItems.length)}
                        className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Next Image (→)"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {filteredItems[lightboxIndex].productSlug && (
                      <Link
                        href={`/products/${encodeURIComponent(filteredItems[lightboxIndex].productSlug!)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        <span>View Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
