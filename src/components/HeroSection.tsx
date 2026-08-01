"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Wrench, ArrowRight, Shield, Cog, Sparkles, CheckCircle2 } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8fafc] bg-industrial-grid pt-16">
      {/* Ambient Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Animated Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm"
            >
              <Shield className="w-4 h-4 text-red-600 animate-pulse" />
              <span>(WE CAN MAKE WHAT YOU CAN IMAGINE)</span>
            </motion.div>

            {/* Animated Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight"
            >
              BHARAT MACHINE TOOLS{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800">
                BANGALORE
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-base text-slate-600 leading-relaxed max-w-xl"
            >
              India&apos;s trusted manufacturer, supplier, and exporter of high-precision CNC Machines,
              Hydrostatic Spindles, Machine Tools, Gearboxes, and Custom Accessories.
            </motion.p>

            {/* Interactive Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-900/20 text-xs uppercase tracking-wider"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Products &amp; Order
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 bg-white text-slate-800 font-bold rounded-xl hover:border-blue-700 hover:text-blue-900 transition-all shadow-sm text-xs uppercase tracking-wider"
              >
                <Cog className="w-4 h-4 text-blue-700" />
                Get Instant Quote
              </Link>
            </motion.div>

            {/* Animated Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-4 text-xs text-slate-700 font-bold"
            >
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
                <Wrench className="w-4 h-4 text-blue-700" />
                <span>Retrofitting &amp; Reconditioning</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
                <Shield className="w-4 h-4 text-red-600" />
                <span>Precision Quality Control</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Razorpay Secure Online Checkout</span>
              </div>
            </motion.div>
          </div>

          {/* Animated Glass Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl relative"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
                    <Sparkles className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Engineering Excellence</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Bangalore Unit 1 Industrial Hub</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold rounded-md uppercase">
                  Verified Manufacturer
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-2xl font-black text-blue-900 font-mono">100%</span>
                  <span className="block text-[10px] text-slate-600 font-bold uppercase mt-1">Quality Inspection</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-2xl font-black text-red-600 font-mono">Pan-India</span>
                  <span className="block text-[10px] text-slate-600 font-bold uppercase mt-1">Supply &amp; Export</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Need Custom Machine Tools?</p>
                  <p className="text-[11px] text-slate-500 font-medium">Direct Razorpay checkout or Instant Quote</p>
                </div>
                <Link
                  href="/enquiry"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors shadow"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
