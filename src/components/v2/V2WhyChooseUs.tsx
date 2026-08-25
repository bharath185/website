'use client'

import React, { useState, useEffect } from 'react'
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
  Layers,
  Cpu,
  Activity,
  Factory,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react'
import Link from 'next/link'

interface FeatureItem {
  id: number
  title: string
  subtitle: string
  icon: any
  badge: string
  statValue: string
  statLabel: string
  accentColor: string
  glowColor: string
  details: string[]
}

const LEFT_FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Engineering Expertise & Professional Management",
    subtitle: "Over 25+ years of proprietary machine tool R&D, master scraping craftsmanship, and ISO 9001:2015 institutional leadership.",
    icon: DraftingCompass,
    badge: "PROPRIETARY R&D",
    statValue: "25+ YRS",
    statLabel: "Machine Engineering",
    accentColor: "#122f87",
    glowColor: "rgba(18, 47, 135, 0.2)",
    details: [
      "Dedicated CAD/CAM engineering team",
      "Dynamic FEA stress & harmonic analysis",
      "ISO 9001:2015 certified workflow"
    ]
  },
  {
    id: 2,
    title: "One-Stop Solution for All Kinds Of Machinery",
    subtitle: "Integrated manufacturing of motorized spindles, CNC rotary tables, hydrostatic bearings, ball screws, defense actuators & rebuilding.",
    icon: Puzzle,
    badge: "FULL-LINE OEM",
    statValue: "100+ SKUS",
    statLabel: "Turnkey Assemblies",
    accentColor: "#dc2626",
    glowColor: "rgba(220, 38, 38, 0.2)",
    details: [
      "Custom high-frequency motorized spindles",
      "4th & 5th axis CNC tilting rotary tables",
      "Heavy defense outriggers & linear actuators"
    ]
  },
  {
    id: 3,
    title: "Best Quality Products with Extra Features",
    subtitle: "Defense-grade metallurgy, thermal stabilization, runouts < 0.001 mm, and 100% dynamic load testing before dispatch.",
    icon: Award,
    badge: "SUB-MICRON QUALITY",
    statValue: "< 0.001mm",
    statLabel: "Radial & Axial Runout",
    accentColor: "#122f87",
    glowColor: "rgba(18, 47, 135, 0.2)",
    details: [
      "Sub-micron laser interferometry verification",
      "ISO G0.4 dynamic balancing up to 45,000 RPM",
      "Ultrasonic flaw testing & metallurgy QA"
    ]
  }
]

const RIGHT_FEATURES: FeatureItem[] = [
  {
    id: 4,
    title: "Reasonable & Competitive Prices",
    subtitle: "Indigenous Make in India manufacturing saving up to 40% over foreign imports without any compromise on precision.",
    icon: Tag,
    badge: "MAKE IN INDIA",
    statValue: "40% SAVINGS",
    statLabel: "Direct OEM Direct Pricing",
    accentColor: "#dc2626",
    glowColor: "rgba(220, 38, 38, 0.2)",
    details: [
      "Zero import duties or long shipping lag",
      "Transparent engineering BOM breakdown",
      "Direct factory pricing with warranty"
    ]
  },
  {
    id: 5,
    title: "Largest Display of Machinery In India",
    subtitle: "Modern Bangalore facilities featuring large CNC turning bays, cylindrical grinding cells up to 5 meters, and live test benches.",
    icon: Building2,
    badge: "MEGA CAPACITY",
    statValue: "5,000mm",
    statLabel: "Grinding Length Capacity",
    accentColor: "#122f87",
    glowColor: "rgba(18, 47, 135, 0.2)",
    details: [
      "Heavy cylindrical grinding: Ø500 x 5000mm",
      "High-precision bore grinding cells",
      "In-house cleanroom assembly & test rigs"
    ]
  },
  {
    id: 6,
    title: "Excellent Service with Good After-Sales Support",
    subtitle: "24/7 round-the-clock technical helpline, rapid on-site engineer deployment, and complete lifecycle emergency reconditioning.",
    icon: Headphones,
    badge: "24x7 SUPPORT",
    statValue: "24x7 SLA",
    statLabel: "Rapid Response Support",
    accentColor: "#dc2626",
    glowColor: "rgba(220, 38, 38, 0.2)",
    details: [
      "Direct engineer-to-engineer phone hotline",
      "On-site emergency dynamic alignment",
      "Complete spindle & guideway rebuilding"
    ]
  }
]

export default function V2WhyChooseUs() {
  const [activeId, setActiveId] = useState<number>(1)
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true)

  // Auto-cycle through the 6 capabilities if user isn't hovering
  useEffect(() => {
    if (!isAutoCycling) return
    const interval = setInterval(() => {
      setActiveId(prev => (prev >= 6 ? 1 : prev + 1))
    }, 4500)
    return () => clearInterval(interval)
  }, [isAutoCycling])

  const allFeatures = [...LEFT_FEATURES, ...RIGHT_FEATURES]
  const currentFeature = allFeatures.find(f => f.id === activeId) || LEFT_FEATURES[0]
  const CurrentIcon = currentFeature.icon

  return (
    <section className="py-24 sm:py-32 bg-[#fafbfc] relative overflow-hidden border-t border-slate-200/80">
      
      {/* Precision Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.018)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Atmospheric Radial Ambient Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16 sm:mb-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#122f87] animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#122f87]">
              WHY BHARAT MACHINE TOOLS
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight font-display leading-[1.12]"
          >
            Why We are Customer’s <span className="text-red-600">Choice</span> <br className="hidden sm:inline" />NOT an Option?
          </motion.h2>

          {/* Signature Red and Navy Accent Underline Bar */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-1.5 mx-auto pt-1 pb-1"
          >
            <span className="w-16 sm:w-20 h-1 bg-red-600 rounded-full" />
            <span className="w-16 sm:w-20 h-1 bg-[#122f87] rounded-full" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 text-sm sm:text-base font-semibold font-sans tracking-wide max-w-2xl mx-auto"
          >
            Unmatched Expertise, Unrivaled Dedication &bull; Delivering Sub-Micron Industrial Machine Tool Solutions
          </motion.p>

        </div>

        {/* ========================================================================= */}
        {/* 3-COLUMN INTERACTIVE INDUSTRIAL STAGE                                     */}
        {/* ========================================================================= */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-center"
          onMouseEnter={() => setIsAutoCycling(false)}
          onMouseLeave={() => setIsAutoCycling(true)}
        >

          {/* ----------------------------------------------------------------------- */}
          {/* LEFT 3 CARDS                                                            */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5 order-2 lg:order-1">
            {LEFT_FEATURES.map((item, idx) => {
              const isSelected = activeId === item.id
              const Icon = item.icon

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`group relative p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-4 lg:flex-row-reverse lg:text-right ${
                    isSelected 
                      ? 'bg-white shadow-xl shadow-blue-900/10 border-2 border-[#122f87] ring-4 ring-blue-500/10 -translate-y-1' 
                      : 'bg-white/80 hover:bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* Content details */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 lg:justify-end">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
                        isSelected 
                          ? 'bg-[#122f87] text-white' 
                          : 'bg-blue-50 text-[#122f87]'
                      }`}>
                        {item.badge}
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
                        ? 'bg-[#122f87] text-white shadow-lg shadow-blue-900/30 scale-110' 
                        : 'bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-[#122f87]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    {/* Animated Outer Orbit Ring */}
                    <div className={`absolute -inset-1.5 rounded-full border-2 transition-opacity duration-300 pointer-events-none ${
                      isSelected ? 'border-red-500 opacity-100 animate-pulse' : 'border-transparent opacity-0'
                    }`} />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CENTER INTERACTIVE ANIMATED ISOMETRIC HUB                                */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 py-2">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[360px] sm:max-w-[400px] flex items-center justify-center"
            >
              
              {/* Spinning Precision Blueprint Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[310px] h-[310px] sm:w-[350px] sm:h-[350px] rounded-full border border-dashed border-blue-200/80 animate-[spin_50s_linear_infinite]" />
                <div className="absolute w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] rounded-full border border-slate-300/60 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] rounded-full bg-blue-500/5 blur-2xl" />
              </div>

              {/* Central Machine Tool Assembly Glass Card */}
              <div className="relative z-20 w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 border-slate-200/90 shadow-2xl shadow-blue-900/10 flex flex-col items-center text-center space-y-4">
                
                {/* Floating Active Machine Assembly Visual */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  
                  {/* Outer glowing pulsing beacon */}
                  <div className="absolute inset-0 bg-blue-600/15 rounded-full animate-ping pointer-events-none" />
                  
                  <div className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#0b1b4f] via-[#122f87] to-blue-600 text-white flex flex-col items-center justify-center shadow-xl shadow-blue-900/30 overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                      className="text-white/90"
                    >
                      <Cog className="w-12 h-12" />
                    </motion.div>
                    <span className="text-[8px] font-mono font-extrabold uppercase tracking-widest text-blue-200 mt-1">
                      BMT HIGH-TECH
                    </span>
                  </div>

                  {/* Micro Live Status Badge */}
                  <div className="absolute -bottom-2 bg-emerald-500 text-white font-mono text-[8px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 z-20 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>ACTIVE RIG</span>
                  </div>
                </div>

                {/* Dynamic Active Feature Showcase */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentFeature.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="w-full space-y-2 pt-1"
                  >
                    <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md inline-block">
                      {currentFeature.badge}
                    </span>
                    
                    <div className="space-y-0.5">
                      <span className="text-xl sm:text-2xl font-black text-[#122f87] font-display block">
                        {currentFeature.statValue}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                        {currentFeature.statLabel}
                      </span>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="pt-2 text-left space-y-1.5 border-t border-slate-100">
                      {currentFeature.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-600 font-light">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Quick RFQ CTA Button */}
                <div className="w-full pt-1">
                  <Link
                    href="/contact"
                    className="w-full py-3 bg-[#122f87] hover:bg-[#0e256b] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-all shadow-md shadow-blue-900/15 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Technical Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </motion.div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT 3 CARDS                                                           */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5 order-3">
            {RIGHT_FEATURES.map((item, idx) => {
              const isSelected = activeId === item.id
              const Icon = item.icon

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`group relative p-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                    isSelected 
                      ? 'bg-white shadow-xl shadow-blue-900/10 border-2 border-red-600 ring-4 ring-red-500/10 -translate-y-1' 
                      : 'bg-white/80 hover:bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300'
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
                    <div className={`absolute -inset-1.5 rounded-full border-2 transition-opacity duration-300 pointer-events-none ${
                      isSelected ? 'border-[#122f87] opacity-100 animate-pulse' : 'border-transparent opacity-0'
                    }`} />
                  </div>

                  {/* Right content details */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors ${
                        isSelected 
                          ? 'bg-red-600 text-white' 
                          : 'bg-red-50 text-red-600'
                      }`}>
                        {item.badge}
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
        {/* BOTTOM PRECISION METRICS STRIP                                            */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-display">25+</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-bold">Years Experience</span>
            <span className="text-[10px] text-slate-400 font-light block">Estd. 1999 Bangalore</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-display">&lt; 0.001mm</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-bold">Sub-Micron Runout</span>
            <span className="text-[10px] text-slate-400 font-light block">Laser Aligned Quality</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-display">5,000mm</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-bold">Grinding Length</span>
            <span className="text-[10px] text-slate-400 font-light block">Heavy Shafts & Spindles</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-display">24x7</span>
            <span className="text-xs text-slate-600 font-mono block uppercase font-bold">Engineering SLA</span>
            <span className="text-[10px] text-slate-400 font-light block">Rapid On-Site Support</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
