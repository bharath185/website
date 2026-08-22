"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, RefreshCw, ImageIcon } from "lucide-react"

interface GalleryItem {
  id: string
  url: string
  createdAt: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          if (data.images) {
            setImages(data.images)
          }
        }
      } catch (err) {
        console.error("Error fetching gallery images:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % images.length)
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, images.length])

  // Dynamic natural aspect ratio pattern for seamless masonry without any gaps
  const getAspectRatioClass = (index: number) => {
    const pattern = index % 5
    switch (pattern) {
      case 0:
        return "aspect-[16/10]" // Wide landscape
      case 1:
        return "aspect-[4/3]" // Classic landscape
      case 2:
        return "aspect-[16/11]" // Cinematic
      case 3:
        return "aspect-[3/2]" // Studio proportion
      case 4:
        return "aspect-[16/9]" // Widescreen
      default:
        return "aspect-[16/10]"
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-28 pb-20 font-sans" style={{ colorScheme: 'light' }}>
      
      {/* Background Subtle Tooling Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Loading Spinner */}
        {loading ? (
          <div className="py-32 text-center flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Loading Visual Gallery...
            </span>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-28 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm max-w-lg mx-auto">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">No Gallery Images Uploaded</h3>
            <p className="text-xs text-slate-500 mt-1">
              Images uploaded from the Admin Gallery panel will appear here.
            </p>
          </div>
        ) : (
          /* Seamless Gapless Multi-Column Masonry Grid */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {images.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                onClick={() => setLightboxIndex(idx)}
                className={`break-inside-avoid relative w-full ${getAspectRatioClass(
                  idx
                )} rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-slate-900 group border border-slate-200/80`}
              >
                <img
                  src={item.url}
                  alt={`Gallery ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                
                {/* Gentle ambient lighting flare on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && images[lightboxIndex] && (
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
                title="Close Lightbox (Esc)"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length)
                }}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
                title="Previous Image (←)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev! + 1) % images.length)
                }}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
                title="Next Image (→)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Display */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[85vh] flex items-center justify-center"
              >
                <img
                  src={images[lightboxIndex].url}
                  alt={`Gallery Image ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                />
              </div>

              {/* Counter Indicator at bottom */}
              <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 font-mono text-xs font-bold tracking-wider">
                  {lightboxIndex + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
