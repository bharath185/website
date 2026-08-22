"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { 
  Plus, 
  Trash2, 
  Upload, 
  Link as LinkIcon, 
  RefreshCw, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle,
  Maximize2,
  X
} from "lucide-react"

interface GalleryImageItem {
  id: string
  url: string
  createdAt: string
}

export default function AdminGalleryPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [images, setImages] = useState<GalleryImageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [customImageUrl, setCustomImageUrl] = useState("")
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const fetchGalleryImages = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/gallery", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        if (data.images) {
          setImages(data.images)
        }
      }
    } catch (err: any) {
      console.error("Failed to load gallery images:", err)
      setError("Failed to connect to gallery database.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  // Handle local file uploads (converts to base64 Data URLs)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} is not a supported image file.`)
        return
      }
      const reader = new FileReader()
      reader.onload = (loadEvt) => {
        const base64Url = loadEvt.target?.result as string
        if (base64Url) {
          setPreviewImages((prev) => [...prev, base64Url])
        }
      }
      reader.readAsDataURL(file)
    })

    e.target.value = ""
  }

  // Handle adding custom Image URL
  const handleAddUrl = () => {
    const trimmed = customImageUrl.trim()
    if (!trimmed) return
    if (!previewImages.includes(trimmed)) {
      setPreviewImages((prev) => [...prev, trimmed])
      setCustomImageUrl("")
    }
  }

  // Remove preview image before submitting
  const handleRemovePreview = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Submit new images to database
  const handleSubmitImages = async (e: React.FormEvent) => {
    e.preventDefault()
    if (previewImages.length === 0) {
      setError("Please upload or add at least one image.")
      return
    }

    setSubmitting(true)
    setError("")
    setSuccessMsg("")

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: previewImages })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSuccessMsg(`Successfully uploaded ${data.images.length} image(s) to the live gallery!`)
        setPreviewImages([])
        setTimeout(() => {
          setIsUploadOpen(false)
          setSuccessMsg("")
          fetchGalleryImages()
        }, 1000)
      } else {
        setError(data.error || "Failed to save gallery images.")
      }
    } catch (err: any) {
      setError(err?.message || "Network error while saving gallery images.")
    } finally {
      setSubmitting(false)
    }
  }

  // Delete image from database
  const handleDeleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this photo from the gallery?")) return

    try {
      const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id))
      } else {
        alert("Failed to delete image from database.")
      }
    } catch (err: any) {
      alert(err?.message || "Network error deleting image.")
    }
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Gallery Image Manager</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Only photos uploaded here will be displayed on the public gallery page.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchGalleryImages}
            className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-colors border border-slate-200 shadow-sm cursor-pointer"
            title="Refresh gallery"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsUploadOpen(true)
              setError("")
              setSuccessMsg("")
              setPreviewImages([])
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Photos
          </button>
        </div>
      </div>

      {/* Stats counter strip */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 block">Total Live Gallery Photos</span>
            <span className="text-xs text-slate-500 font-mono">{images.length} photos active</span>
          </div>
        </div>
      </div>

      {/* Gallery Photos Grid */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-200">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Loading Gallery Photos...
          </span>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 uppercase">No Gallery Photos Uploaded Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click &quot;Add Photos&quot; above to upload your machine and facility photos. Only images uploaded here will appear on the public gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex items-center justify-center p-2"
            >
              <img
                src={img.url}
                alt={`Gallery Photo ${idx + 1}`}
                className="max-h-full max-w-full object-contain cursor-pointer"
                onClick={() => setZoomImage(img.url)}
              />

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  onClick={() => setZoomImage(img.url)}
                  className="p-2 bg-white/90 hover:bg-white text-slate-800 rounded-xl shadow-md transition-transform hover:scale-110 cursor-pointer"
                  title="Zoom"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-transform hover:scale-110 cursor-pointer"
                  title="Delete from Gallery"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Photo Index Badge */}
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white font-mono text-[9px] font-bold">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* UPLOAD IMAGES MODAL                                                       */}
      {/* ========================================================================= */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">
                  Upload Gallery Photos
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload photo files or paste public image URLs to add them to the live gallery.
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Upload Area */}
            <div className="space-y-4">
              {/* Drag and Drop File Input */}
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50 transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mx-auto mb-2 transition-colors" />
                <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                  Click or Drag &amp; Drop Image Files Here
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Supports PNG, JPG, JPEG, WEBP files
                </span>
              </div>

              {/* Paste URL Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Or paste image URL (e.g. https://...)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddUrl}
                  disabled={!customImageUrl.trim()}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  Add URL
                </button>
              </div>

              {/* Selected Images Preview List */}
              {previewImages.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Photos to Upload ({previewImages.length}):</span>
                    <button
                      type="button"
                      onClick={() => setPreviewImages([])}
                      className="text-red-600 hover:text-red-800 text-[11px] uppercase tracking-wider"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1">
                    {previewImages.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-xl bg-slate-100 border border-slate-200 overflow-hidden p-1 group flex items-center justify-center">
                        <img src={src} alt="Preview" className="max-h-full max-w-full object-contain" />
                        <button
                          type="button"
                          onClick={() => handleRemovePreview(i)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md shadow-xs opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitImages}
                disabled={submitting || previewImages.length === 0}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving to Gallery...</span>
                  </>
                ) : (
                  <span>Publish to Gallery ({previewImages.length})</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Fullscreen Lightbox Modal */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setZoomImage(null)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomImage}
            alt="Zoomed Gallery Image"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

    </div>
  )
}
