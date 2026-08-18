"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingCart, Check, Info, FileText, Settings, ShieldCheck, Mail, Send, Phone, Star, MessageSquare } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"

import { Product } from "@/types"

interface ProductDetailClientV2Props {
  product: Product
}

export default function ProductDetailClientV2({ product }: ProductDetailClientV2Props) {
  const { items, addItem } = useEnquiry()
  const isItemInCart = items.some((item) => item.product.id === product.id)
  
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

  // Dynamic reviews state
  const [reviews, setReviews] = useState<any[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  
  // Review submission state
  const [revName, setRevName] = useState("")
  const [revEmail, setRevEmail] = useState("")
  const [revRating, setRevRating] = useState(5)
  const [revHoverRating, setRevHoverRating] = useState(0)
  const [revComment, setRevComment] = useState("")
  const [revSubmitting, setRevSubmitting] = useState(false)
  const [revError, setRevError] = useState("")
  const [revSuccess, setRevSuccess] = useState("")

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
    const cat = product.category.toLowerCase()
    if (cat.includes("spindle")) {
      return [
        "Aerospace grade balanced core rotor components",
        "Dual steel shield bearing protection against grinding coolants",
        "Extremely low thermal expansion runout deviation",
        "Direct belt pulley drive compatibility features",
      ]
    } else if (cat.includes("bearing")) {
      return [
        "Ceramic silicon nitride balls for elevated speeds (optional)",
        "Premium polyamide outer retainer cages minimizing heat",
        "Pre-matched pairs in back-to-back configurations",
        "Direct replacement fits for major MNC machinery brands",
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!revName || !revEmail || !revComment) {
      setRevError("Please fill out all fields.")
      return
    }

    setRevSubmitting(true)
    setRevError("")
    setRevSuccess("")

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: revName,
          email: revEmail,
          rating: revRating,
          comment: revComment
        })
      })

      const data = await res.json()
      if (res.ok) {
        setRevSuccess("Review submitted successfully! It will appear publicly once approved by moderation.")
        setRevName("")
        setRevEmail("")
        setRevComment("")
        setRevRating(5)
      } else {
        setRevError(data.error || "Failed to submit review.")
      }
    } catch (err) {
      setRevError("Network error occurred. Please try again.")
    } finally {
      setRevSubmitting(false)
    }
  }

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : "0.0"

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3 h-3 ${
              s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 pt-28 pb-20 relative overflow-hidden">
      {/* Background gradients */}
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
          {/* Left Column: Image Showcase & Key Features */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="aspect-[4/3] w-full bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-sm relative flex items-center justify-center p-8 cursor-zoom-in group"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:20px_20px] opacity-100 pointer-events-none" />
              <div className="absolute w-48 h-48 bg-blue-500/5 rounded-full blur-[60px]" />
              
              <span className="absolute top-4 right-4 bg-slate-900/5 backdrop-blur-[2px] text-slate-500 font-mono text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-md border border-slate-200/40 select-none pointer-events-none z-20 transition-opacity duration-300 group-hover:opacity-0">
                HOVER TO ZOOM
              </span>
              
              <img
                src={product.image}
                alt={product.name}
                style={zoomStyle}
                className="max-w-full max-h-full object-contain relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
              />
            </div>

            {/* Key Features Block */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] p-6 sm:p-8 shadow-sm">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" /> Key Features & Benefits
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
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {avgRating}★ ({reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'})
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => addItem(product)}
                className={`px-8 py-4 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] ${
                  isItemInCart
                    ? "bg-blue-50 border border-blue-200 text-blue-600"
                    : "bg-slate-900 hover:bg-blue-600 text-white shadow-md shadow-slate-900/10"
                }`}
              >
                {isItemInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Added to Enquiry Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Enquiry Cart
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/919530208882?text=Hello%20BMT%20Sales%20Team,%20I%20am%20interested%20in%2520${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:scale-[1.03] active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp Sales
              </a>
            </div>

            {/* Full Product Description Block */}
            <div className="border-t border-slate-100 pt-8 mt-4 text-xs font-light text-slate-600 leading-relaxed max-w-2xl space-y-4">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">Product Description</h3>
              <p className="whitespace-pre-line leading-loose text-slate-600">{product.description}</p>
            </div>

            {/* Technical Specifications Grid Block */}
            <div className="border-t border-slate-100 pt-8 mt-8 text-xs font-light text-slate-600 leading-relaxed max-w-2xl">
              <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {getTechnicalSpecs().map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 hover:border-slate-350 transition-all duration-200 shadow-sm"
                  >
                    <span className="text-slate-500 font-bold text-[9px] uppercase tracking-wider mb-1">{spec.label}</span>
                    <span className="text-slate-800 font-mono font-bold text-xs tracking-tight">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-4 mt-8 leading-relaxed">
                * BMT offers custom taper, runout checks, and dynamic mounting services for this unit in Bangalore. Contact engineering support for dimensions layout.
              </p>
            </div>

          </div>
        </div>

        {/* Dynamic Reviews and Ratings Pad Section */}
        {reviews.length > 0 && (
          <div className="border-t border-slate-150 pt-12 mt-12 max-w-6xl mx-auto space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Graphical Rating Pad Card */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-4.5 h-4.5 text-slate-700" />
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Ratings Breakdown</h3>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Score block */}
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <span className="text-5xl font-black text-slate-900 tracking-tight leading-none font-display">
                      {avgRating}
                    </span>
                    <div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= Math.round(parseFloat(avgRating)) ? "fill-amber-400 text-amber-400" : "text-slate-250"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        {reviews.length} verified {reviews.length === 1 ? 'review' : 'reviews'}
                      </span>
                    </div>
                  </div>

                  {/* Progress bars list */}
                  <div className="space-y-1.5">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = reviews.filter((r) => r.rating === stars).length
                      const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
                      
                      return (
                        <div key={stars} className="flex items-center gap-3 text-[11px] text-slate-700">
                          <span className="w-2 text-right font-bold font-mono">{stars}</span>
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#122f87] rounded-full transition-all duration-500" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-8 text-right font-mono font-bold text-slate-400 text-[9px]">
                            {percentage}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Scrollable Testimonials list */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block pl-1">Testimonials Feedback</h4>
                
                <div className="max-h-[290px] overflow-y-auto pr-2 space-y-3 scrollbar-thin">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] space-y-2 hover:border-slate-350 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-extrabold text-slate-900 text-[11px] block">{rev.name}</span>
                          <span className="text-[8.5px] text-slate-400 font-mono block">
                            {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-250"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-650 text-[10.5px] font-light leading-relaxed whitespace-pre-wrap">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  )
}
