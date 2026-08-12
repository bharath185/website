"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingCart, Check, Info, FileText, Settings, ShieldCheck, Mail, Send, Phone } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"

import { Product } from "@/types"

interface ProductDetailClientV2Props {
  product: Product
}

type TabType = "desc" | "specs" | "features" | "quote"

export default function ProductDetailClientV2({ product }: ProductDetailClientV2Props) {
  const [activeTab, setActiveTab] = useState<TabType>("desc")
  const { items, addItem } = useEnquiry()
  
  // Custom quotation form state
  const [qName, setQName] = useState("")
  const [qEmail, setQEmail] = useState("")
  const [qPhone, setQPhone] = useState("")
  const [qMessage, setQMessage] = useState(`Hi, I am interested in purchasing the ${product.name} (ID: ${product.id}). Please send a custom technical quotation.`)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const isItemInCart = items.some((item) => item.product.id === product.id)

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
      // Send dynamic enquiry message to backend
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

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-28 pb-20 relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/v2/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalogue
        </Link>

        {/* Dynamic Detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="aspect-[4/3] w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-slate-900/90 text-blue-400 font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-md border border-white/5">
                {product.category.toUpperCase()}
              </span>
            </div>
            
            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-[10px] text-slate-400 font-medium leading-tight">ISO 9001:2015 Approved</span>
              </div>
              <div className="p-4 bg-slate-900/30 border border-white/5 rounded-2xl flex items-center gap-3">
                <Settings className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-[10px] text-slate-400 font-medium leading-tight">100% Tested Spindle Core</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title / Price / Tabbed details */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2">PRECISION PART PROFILE</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight font-display uppercase">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-black text-white">₹{(product.price || 0).toLocaleString("en-IN")}</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase tracking-wider font-mono">
                In Stock Bangalore
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-8 font-light">
              {product.shortDescription}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-white/5">
              <button
                onClick={() => addItem(product)}
                className={`px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  isItemInCart
                    ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/15"
                }`}
              >
                {isItemInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Enquiry Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Enquiry Cart
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/919530208882?text=Hello%20BMT%20Sales%20Team,%20I%20am%20interested%20in%2520${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Sales
              </a>
            </div>

            {/* Tabs Selector row */}
            <div className="flex border-b border-white/5 mb-6 gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: "desc", label: "Description" },
                { id: "specs", label: "Specs" },
                { id: "features", label: "Key Features" },
                { id: "quote", label: "Request Quote" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab contents window */}
            <div className="min-h-[250px] text-xs font-light text-slate-350 leading-relaxed">
              <AnimatePresence mode="wait">
                {activeTab === "desc" && (
                  <motion.div
                    key="desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="mb-4">{product.description}</p>
                    <p className="text-[11px] text-slate-500">
                      * BMT offers custom taper and mounting modification services for this item. Contact engineering support for dimensions blueprint.
                    </p>
                  </motion.div>
                )}

                {activeTab === "specs" && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 gap-2.5 max-w-md"
                  >
                    {getTechnicalSpecs().map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between items-center py-2.5 border-b border-white/5"
                      >
                        <span className="text-slate-450">{spec.label}</span>
                        <strong className="text-white font-mono">{spec.value}</strong>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {getKeyFeatures().map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "quote" && (
                  <motion.div
                    key="quote"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {formSubmitted ? (
                      <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-blue-400 animate-bounce" />
                        <h4 className="font-bold text-white uppercase text-xs">Quotation Request Received</h4>
                        <p className="text-[10px] text-slate-400 max-w-xs">
                          Our Senior Spindles Engineer in Bangalore will contact you shortly with direct price quote and delivery terms.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleQuotationSubmit} className="space-y-3 max-w-md">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={qName}
                            onChange={(e) => setQName(e.target.value)}
                            className="w-full bg-slate-950/60 border border-white/5 focus:border-blue-500 rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-500"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Phone Number"
                            value={qPhone}
                            onChange={(e) => setQPhone(e.target.value)}
                            className="w-full bg-slate-950/60 border border-white/5 focus:border-blue-500 rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-500"
                          />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={qEmail}
                          onChange={(e) => setQEmail(e.target.value)}
                          className="w-full bg-slate-950/60 border border-white/5 focus:border-blue-500 rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-500"
                        />
                        <textarea
                          rows={3}
                          value={qMessage}
                          onChange={(e) => setQMessage(e.target.value)}
                          className="w-full bg-slate-950/60 border border-white/5 focus:border-blue-500 rounded-xl px-3 py-2 text-xs focus:outline-none placeholder-slate-500"
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Send Quote Request
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
