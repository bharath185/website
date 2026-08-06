"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Wrench, ArrowRight, Shield, Cog, Sparkles, CheckCircle2 } from "lucide-react"
import Hero3DShowcase from "@/components/3d/Hero3DShowcase"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8fafc] bg-industrial-grid pt-16">
      {/* Ambient Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Desktop absolute full-height background canvas (hidden on mobile) */}
      <div className="hidden lg:block absolute top-0 right-0 w-[50%] h-full z-10 pointer-events-auto">
        <Hero3DShowcase />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32 pointer-events-none">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 pointer-events-auto">
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

          {/* 3D Showcase Column Placeholder */}
          <div className="lg:col-span-6 relative z-20 pointer-events-none">
            {/* Mobile: Stacked 3D Showcase (hidden on desktop) */}
            <div className="block lg:hidden w-full h-[450px] relative mt-6 pointer-events-auto">
              <Hero3DShowcase />
            </div>
            {/* Desktop: Empty placeholder to preserve 50/50 column layout spacing */}
            <div className="hidden lg:block w-full h-[620px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
