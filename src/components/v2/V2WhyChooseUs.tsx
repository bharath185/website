'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DraftingCompass, 
  Puzzle, 
  Award, 
  Tag, 
  Building2, 
  Headphones, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cog, 
  Gauge, 
  ShieldCheck, 
  Zap, 
  Layers
} from 'lucide-react'
import Link from 'next/link'

interface FeatureItem {
  id: number
  title: string
  subtitle: string
  icon: any
  category: string
  stats: string
  color: string
}

const LEFT_FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Engineering Expertise & Professional Management",
    subtitle: "Over 25+ years of proprietary precision machine tool design, sub-micron spindle engineering, and ISO 9001:2015 leadership.",
    icon: DraftingCompass,
    category: "Proprietary R&D",
    stats: "25+ Years Proven",
    color: "#122f87"
  },
  {
    id: 2,
    title: "One-Stop Solution for All Kinds Of Machinery",
    subtitle: "Integrated manufacturing of motorized spindles, CNC rotary tables, hydrostatic bearings, ball screws, defense actuators & rebuilding.",
    icon: Puzzle,
    category: "Full Line OEM",
    stats: "100+ Systems",
    color: "#dc2626"
  },
  {
    id: 3,
    title: "Best Quality Products with Extra Features",
    subtitle: "Defense-grade metallurgy, thermal stabilization, runouts < 0.001 mm, and 100% dynamic load testing before dispatch.",
    icon: Award,
    category: "Zero Defect",
    stats: "±0.001mm Runout",
    color: "#122f87"
  }
]

const RIGHT_FEATURES: FeatureItem[] = [
  {
    id: 4,
    title: "Reasonable & Competitive Prices",
    subtitle: "Indigenous Make in India manufacturing saving up to 40% over foreign imports without any compromise on precision.",
    icon: Tag,
    category: "Make in India",
    stats: "Up to 40% Savings",
    color: "#dc2626"
  },
  {
    id: 5,
    title: "Largest Display of Machinery In India",
    subtitle: "Modern Bangalore facilities featuring large CNC turning bays, cylindrical grinding cells up to 5 meters, and live test benches.",
    icon: Building2,
    category: "5,000mm Capacity",
    stats: "Massive Display",
    color: "#122f87"
  },
  {
    id: 6,
    title: "Excellent Service with Good After-Sales Support",
    subtitle: "24/7 round-the-clock technical helpline, rapid on-site engineer deployment, and complete lifecycle emergency reconditioning.",
    icon: Headphones,
    category: "24x7 SLA",
    stats: "Direct Factory Support",
    color: "#dc2626"
  }
]

export default function V2WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState<number>(1)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const activeData = [...LEFT_FEATURES, ...RIGHT_FEATURES].find(
    f => f.id === (hoveredFeature || activeFeature)
  ) || LEFT_FEATURES[0]

  return (
    <section className="py-24 sm:py-28 bg-[#f8fafc] relative overflow-hidden border-t border-slate-200/70">
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

      {/* Atmospheric Ambient Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================================= */}
        {/* SECTION HEADER WITH ACCENT TITLE                                          */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/80 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-700">
              WHY CHOOSE BHARAT MACHINE TOOLS
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight font-display leading-[1.15]"
          >
            Why We are Customer’s <span className="text-red-600">Choice</span> <br className="hidden sm:inline" />NOT an Option?
          </motion.h2>

          {/* Signature Red and Black Accent Bar */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-1 mx-auto pt-1 pb-1"
          >
            <span className="w-16 h-1 bg-red-600 rounded-full" />
            <span className="w-16 h-1 bg-slate-900 rounded-full" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 text-sm sm:text-base font-medium font-sans tracking-wide"
          >
            Unmatched Expertise, Unrivaled Dedication
          </motion.p>

        </div>

        {/* ========================================================================= */}
        {/* 3-COLUMN INDUSTRIAL LAYOUT (Left Cards - Center Isometric Hub - Right Cards) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ----------------------------------------------------------------------- */}
          {/* LEFT 3 CARDS                                                            */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-7 order-2 lg:order-1">
            {LEFT_FEATURES.map((item, idx) => {
              const isSelected = (hoveredFeature || activeFeature) === item.id
              const Icon = item.icon

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onMouseEnter={() => {
                    setHoveredFeature(item.id)
                    setActiveFeature(item.id)
                  }}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`group relative p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-4 lg:flex-row-reverse lg:text-right ${
                    isSelected 
                      ? 'bg-white shadow-xl border-2 border-red-500/80 -translate-y-1' 
                      : 'bg-white/70 hover:bg-white border border-slate-200/80 shadow-2xs hover:shadow-md'
                  }`}
                >
                  {/* Left content description */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 lg:justify-end">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed hidden sm:block">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Icon Circular Badge with Dual Pulse Ring */}
                  <div className="relative shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-110' 
                        : 'bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Animated Outer Orbit Ring */}
                    <div className={`absolute -inset-1 rounded-full border-2 transition-opacity duration-300 pointer-events-none ${
                      isSelected ? 'border-red-500/80 opacity-100 animate-pulse' : 'border-transparent opacity-0'
                    }`} />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER INTERACTIVE ANIMATED ISOMETRIC HUB                                */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 py-4">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square flex items-center justify-center"
            >
              
              {/* Spinning Industrial Gear Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-slate-300/80 animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] rounded-full border border-blue-200/50 animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-full bg-blue-50/50 blur-xl" />
              </div>

              {/* Central Machine Tool Assembly Illustration Card */}
              <div className="relative z-20 w-[240px] sm:w-[270px] bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-2xl shadow-blue-900/10 flex flex-col items-center text-center space-y-4">
                
                {/* Floating animated machine headstock illustration */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  
                  {/* Outer glowing beacon */}
                  <div className="absolute inset-0 bg-blue-600/10 rounded-full animate-ping pointer-events-none" />
                  
                  <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#122f87] to-blue-600 text-white flex flex-col items-center justify-center shadow-lg shadow-blue-900/30">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    >
                      <Cog className="w-10 h-10 text-white/90" />
                    </motion.div>
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest text-blue-200 mt-1">
                      BMT PRECISION
                    </span>
                  </div>

                  {/* Micro badge: Status */}
                  <div className="absolute -bottom-2 bg-emerald-500 text-white font-mono text-[8px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>ZERO-DEFECT</span>
                  </div>
                </div>

                {/* Active Highlighted Capability Display */}
                <div className="w-full space-y-1.5 pt-1">
                  <span className="text-[9px] font-mono font-bold text-red-600 uppercase tracking-widest block">
                    {activeData.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-mono uppercase tracking-tight">
                    {activeData.stats}
                  </h4>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>ISO 9001:2015 Certified</span>
                  </div>
                </div>

                {/* Quick RFQ CTA Button */}
                <Link
                  href="/contact"
                  className="w-full py-2.5 bg-[#122f87] hover:bg-[#1a3fa8] text-white rounded-xl text-[11px] font-bold uppercase tracking-wider font-mono transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Request RFQ</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

              </div>

            </motion.div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT 3 CARDS                                                           */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-7 order-3">
            {RIGHT_FEATURES.map((item, idx) => {
              const isSelected = (hoveredFeature || activeFeature) === item.id
              const Icon = item.icon

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onMouseEnter={() => {
                    setHoveredFeature(item.id)
                    setActiveFeature(item.id)
                  }}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`group relative p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                    isSelected 
                      ? 'bg-white shadow-xl border-2 border-red-500/80 -translate-y-1' 
                      : 'bg-white/70 hover:bg-white border border-slate-200/80 shadow-2xs hover:shadow-md'
                  }`}
                >
                  {/* Icon Circular Badge with Dual Pulse Ring */}
                  <div className="relative shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-110' 
                        : 'bg-slate-100 text-slate-700 group-hover:bg-red-50 group-hover:text-red-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Animated Outer Orbit Ring */}
                    <div className={`absolute -inset-1 rounded-full border-2 transition-opacity duration-300 pointer-events-none ${
                      isSelected ? 'border-red-500/80 opacity-100 animate-pulse' : 'border-transparent opacity-0'
                    }`} />
                  </div>

                  {/* Right content description */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed hidden sm:block">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM METRIC STRIP (Speed, Precision, Trust, Support)                    */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-display">25+</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-semibold">Years Experience</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-display">&lt; 0.001mm</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-semibold">Sub-Micron Runout</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-display">5,000mm</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-semibold">Grinding Length</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-display">24x7</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-semibold">Engineering SLA</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
