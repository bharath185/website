"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Info,
  FileText,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Send,
  Phone,
  Star,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Image as ImageIcon
} from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"

import { Product } from "@/types"
import { getClientStoredProducts } from "@/lib/products-client"

interface ProductDetailClientV2Props {
  product?: Product
  slug?: string
}

export default function ProductDetailClientV2({ product: initialProduct, slug }: ProductDetailClientV2Props) {
  const [product, setProduct] = useState<Product | null>(initialProduct || null)
  const [loading, setLoading] = useState(!initialProduct)

  useEffect(() => {
    if (!product && slug) {
      // 1. Check local persistent store
      const localProducts = getClientStoredProducts()
      const found = localProducts.find((p) => p.slug === slug || p.id === slug)
      if (found) {
        setProduct(found)
        setLoading(false)
        return
      }

      // 2. Fetch from API
      fetch(`/api/products/${encodeURIComponent(slug)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.product) {
            setProduct(data.product)
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [product, slug])

  const { items, addItem } = useEnquiry()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 text-blue-900">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-slate-500 text-sm mb-6 max-w-md">
          The requested product could not be located. It may have been moved or updated.
        </p>
        <Link
          href="/products"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20"
        >
          Return to Catalogue
        </Link>
      </div>
    )
  }

  const isItemInCart = items.some((item) => item.product.id === product.id)
  
  // Multi-image list setup
  const productImages: string[] = (product.images && Array.isArray(product.images) && product.images.length > 0)
    ? product.images
    : (product.image ? [product.image] : ['https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg'])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const currentImage = productImages[activeImageIndex] || productImages[0]

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setActiveImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  // Custom quotation form state
  const [qName, setQName] = useState("")
  const [qEmail, setQEmail] = useState("")
  const [qPhone, setQPhone] = useState("")
  const [qMessage, setQMessage] = useState(`Hi, I am interested in purchasing the ${product.name} (ID: ${product.id}). Please send a custom technical quotation.`)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Product Image hover coordinate zoom state
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center center",
    transition: "transform 0.3s ease-out, transform-origin 0.3s ease-out",
  })

  // Dynamic reviews state (from verified customer orders)
  const [reviews, setReviews] = useState<any[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true)
      const res = await fetch(`/api/reviews?productId=${product.id}`)
      if (res.ok) {
        const data = await res.json()
        setReviews(data)
      }
    } catch (err) {
      console.error("Error loading reviews:", err)
    } finally {
      setReviewsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [product.id])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transform: "scale(1.8)",
      transformOrigin: `${x}% ${y}%`,
      transition: "none",
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
      transition: "transform 0.3s ease-out, transform-origin 0.3s ease-out",
    })
  }

  // Dynamic specs generator depending on category
  const getTechnicalSpecs = () => {
    if (product.specifications && Array.isArray(product.specifications) && product.specifications.length > 0) {
      return product.specifications.map((spec, i) => ({
        label: `Specification 0${i + 1}`,
        value: typeof spec === 'string' ? spec : JSON.stringify(spec)
      }))
    }

    const cat = product.category.toLowerCase()
    if (cat.includes("spindle")) {
      return [
        { label: "Max Speed Rating", value: "24,000 RPM (Continuous)" },
        { label: "Tool Interface Nose", value: "BT30 / BT40 Dual Contact" },
        { label: "Radial Runout Tolerance", value: "≤ 0.002 mm" },
        { label: "Lubrication System", value: "Super-precision Kluber NBU15 Grease" },
        { label: "Clamping Method", value: "Automatic Disc Springs" },
      ]
    } else if (cat.includes("bearing")) {
      return [
        { label: "Bearing Class Type", value: "Super Precision Angular Contact" },
        { label: "Steel Composition", value: "Aerospace Grade Gcr15 Alloy" },
        { label: "Accuracy Specification", value: "ISO P4 (Abec 7 Equivalent)" },
        { label: "Axial Load Rating", value: "Heavy Load Duty Class" },
        { label: "Contact Angle Class", value: "25 Degrees (High Stiffness)" },
      ]
    } else if (cat.includes("screw") || cat.includes("ball")) {
      return [
        { label: "Nominal Screw Diameter", value: "32 mm" },
        { label: "Threaded Pitch Lead", value: "10 mm" },
        { label: "Backlash Rating", value: "Zero Backlash (Gothic Arch Preload)" },
        { label: "JIS Accuracy Class", value: "C3 Ground Class (Precision)" },
        { label: "Nut Profile Style", value: "Flanged Double Nut System" },
      ]
    } else {
      return [
        { label: "Material Composition", value: "Hardened Carbon Steel Alloy" },
        { label: "Accuracy Specification", value: "Sub-micron level tolerances" },
        { label: "Surface Treatment", value: "Anti-rust Black Oxide Coating" },
        { label: "Mounting Collar Type", value: "Integrated lock flange" },
        { label: "Warranty SLA", value: "12 Months Comprehensive BMT Warranty" },
      ]
    }
  }

  const getKeyFeatures = () => {
    if (product.features && product.features.length > 0) {
      return product.features
    }
    const cat = product.category.toLowerCase()
    if (cat.includes("spindle")) {
      return [
        "Dynamically balanced to ISO 1940 Grade G0.4 standards",
        "Air-purge labyrinth sealing against cutting coolant ingress",
        "Sub-micron axial and radial runout consistency",
        "Supplied with full factory run-in and vibration spectrum report",
      ]
    } else if (cat.includes("bearing")) {
      return [
        "ISO P4/P2 super-precision matched duplex/quadruplex pairs",
        "Extreme rigidity under heavy axial thrust loads",
        "Specialized ceramic silicon nitride ball options available",
        "Extended fatigue life and minimal thermal expansion",
      ]
    } else {
      return [
        "Optimized lubrication ports for continuous uptime",
        "High static and dynamic load handling capacities",
        "Induction hardened rails and contact channels",
        "Strict quality assurance checklists prior to dispatch",
      ]
    }
  }

  const handleQuotationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!qName || !qEmail || !qPhone) return

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: qName,
          email: qEmail,
          phone: qPhone,
          notes: `[Direct Quote Request] ${qMessage}`,
          items: [{ productId: product.id, quantity: 1 }],
        }),
      })

      if (res.ok) {
        setFormSubmitted(true)
      }
    } catch (err) {
      console.error("Enquiry failed to submit:", err)
    }
  }

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : "4.9"

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-3.5 h-3.5 ${
          star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20 sm:pt-28 pb-20 relative overflow-hidden font-sans">
      
      {/* Background glow styling */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalogue
        </Link>

        {/* Dynamic Detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Multi-Image Showcase & Key Features */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Main Image Container */}
            <div className="flex flex-col gap-3">
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsLightboxOpen(true)}
                className="aspect-[4/3] w-full bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-sm relative flex items-center justify-center p-8 cursor-zoom-in group select-none"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:20px_20px] opacity-100 pointer-events-none" />
                <div className="absolute w-48 h-48 bg-blue-500/5 rounded-full blur-[60px]" />
                
                {/* Badges & Counter on Image */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-blue-300" />
                    {activeImageIndex + 1} / {productImages.length}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <span className="bg-slate-900/5 backdrop-blur-[2px] text-slate-500 font-mono text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-md border border-slate-200/40 select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-0 hidden sm:inline-block">
                    HOVER TO ZOOM
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsLightboxOpen(true)
                    }}
                    className="p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200/60 transition-all hover:scale-105"
                    title="View fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {/* Active Image */}
                <img
                  src={currentImage}
                  alt={`${product.name} angle ${activeImageIndex + 1}`}
                  style={zoomStyle}
                  className="max-w-full max-h-full object-contain relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-transform"
                />

                {/* Left/Right Arrow Navigation Overlays */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      title="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      title="Next photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Navigation Strip */}
              {productImages.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-white border p-1.5 shrink-0 transition-all duration-200 ${
                        activeImageIndex === i
                          ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md scale-105"
                          : "border-slate-200/80 opacity-70 hover:opacity-100 hover:border-slate-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Key Features Block */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] p-6 sm:p-8 shadow-sm">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" /> Key Features &amp; Benefits
              </h3>
              <div className="space-y-3">
                {getKeyFeatures().map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 px-4 rounded-xl border border-slate-200/85 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-slate-350 transition-colors">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium text-[11px] uppercase tracking-wide leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Details & Technical Data */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[8px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-200/40 inline-block">
                {product.category}
              </span>
              {product.tag === 'NEW_ARRIVAL' && (
                <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest bg-emerald-600 px-2 py-0.5 rounded inline-block shadow-sm">
                  New Arrival
                </span>
              )}
              {product.tag === 'FEATURED' && (
                <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest bg-[#122f87] px-2 py-0.5 rounded inline-block shadow-sm">
                  Featured Product
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight font-display uppercase leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 text-[9px] font-bold uppercase tracking-wider font-mono">
                In Stock Bangalore
              </span>

              {/* Top rating score summary */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-bold uppercase tracking-wider font-mono">
                  <span className="font-black text-amber-900">★ {avgRating}</span>
                  <span>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                </div>
              )}
            </div>

            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Technical Specifications Table */}
            <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 sm:p-8 mb-8 shadow-sm">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-600" /> Technical Data &amp; Tolerances
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getTechnicalSpecs().map((spec, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl border border-slate-200/60 bg-slate-50/50 flex flex-col justify-between"
                  >
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">{spec.label}</span>
                    <span className="text-xs font-mono font-bold text-slate-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Quotation & Cart Action Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
              {isItemInCart ? (
                <button
                  className="flex-1 py-4 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-default"
                >
                  <Check className="w-4 h-4" /> Added to Enquiry Cart
                </button>
              ) : (
                <button
                  onClick={() => addItem(product)}
                  className="flex-1 py-4 bg-slate-900 hover:bg-[#122f87] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-slate-300" /> Add to Enquiry Cart
                </button>
              )}

              <a
                href={`https://wa.me/919530208882?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>WhatsApp Quote</span>
              </a>
            </div>

          </div>

        </div>

        {/* Verified Customer Feedback & Quality Rating Section (Clean, Verified Orders Only, No Form) */}
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-10 mb-16 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-8">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40 inline-block mb-2">
                Quality Assurance
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-slate-900">
                Customer Ratings &amp; Verified Feedback
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Ratings are provided exclusively by verified purchasers upon order delivery.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/60 px-5 py-3 rounded-2xl">
              <div className="text-right">
                <span className="text-2xl font-black font-mono text-slate-900">{avgRating}</span>
                <span className="text-[10px] text-slate-400 block font-mono">out of 5.0</span>
              </div>
              <div className="flex gap-1">
                {renderStars(Math.round(Number(avgRating)))}
              </div>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{rev.name}</span>
                      <span className="text-[9px] font-mono text-emerald-600 font-bold uppercase">Verified Buyer</span>
                    </div>
                    <div className="flex gap-0.5">
                      {renderStars(rev.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">100% Quality Tested</h4>
                <p className="text-[11px] text-slate-500 mt-1">Inspected for sub-micron tolerances before dispatch.</p>
              </div>
              <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">Verified Order Tracking</h4>
                <p className="text-[11px] text-slate-500 mt-1">Real clients rate parts after verified receipt.</p>
              </div>
              <div className="p-5 bg-slate-50/60 border border-slate-100 rounded-2xl">
                <Star className="w-6 h-6 text-amber-500 mx-auto mb-2 fill-amber-400" />
                <h4 className="text-xs font-bold text-slate-900 uppercase">5.0 Star Factory Standard</h4>
                <p className="text-[11px] text-slate-500 mt-1">Built to ISO precision standards in Bangalore.</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
          >
            <img
              src={currentImage}
              alt={product.name}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />

            <div className="mt-4 flex items-center justify-between w-full text-white px-4">
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                {product.name} &bull; Image {activeImageIndex + 1} of {productImages.length}
              </span>

              {productImages.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevImage}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
