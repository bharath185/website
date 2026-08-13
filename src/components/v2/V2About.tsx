"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, HardDrive, Award, Crosshair } from "lucide-react"

type TabName = "profile" | "infra" | "quality"

export default function V2About() {
  const [activeTab, setActiveTab] = useState<TabName>("profile")

  const tabsConfig = [
    { id: "profile", label: "Corporate Profile", icon: Award },
    { id: "infra", label: "Infrastructure & Machinery", icon: HardDrive },
    { id: "quality", label: "Quality Control Standards", icon: ShieldCheck },
  ]

  return (
    <section className="py-24 bg-white relative border-t border-slate-200">
      
      {/* Light background subtle blue radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-red-650 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md border border-red-200/40">
            TECHNICAL PROFILE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-4 font-display">
            Precision Machining Infrastructure
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-xs leading-relaxed font-light">
            We operate state-of-the-art manufacturing cells in Bangalore to supply sub-micron level tolerances to high-speed aerospace and automation facilities.
          </p>
        </div>

        {/* Tabs Control Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 border-b border-slate-200 pb-6">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabName)}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border ${
                  isActive
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content Display (Light Glassmorphic Panel) */}
        <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm min-h-[350px] flex items-center">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full"
              >
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-blue-600 mb-4 tracking-tight uppercase font-mono">
                    BMT Corporate Overview
                  </h3>
                  <p className="text-slate-650 text-xs leading-relaxed font-light mb-6">
                    Established in Bangalore, Bharat Machine Tools has grown into a premier supplier of precision parts. We cater to high-speed CNC machinery builders, aerospace contractors, and machine tools maintenance shops globally.
                  </p>
                  <div className="flex flex-col gap-3 text-xs text-slate-600 font-light">
                    <div className="flex items-center gap-2.5">
                      <Crosshair className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Specialized in customized SPM High-Speed Spindles (up to 45,000 RPM)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Crosshair className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Dedicated R&D laboratory analyzing bearing stiffness & thermal load runouts</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-red-500/20 transition-colors shadow-sm">
                    <span className="text-2xl font-bold text-slate-900 font-display block mb-1">1999</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Year Founded</span>
                    <p className="text-[10px] text-slate-600 mt-2 font-light">Over two decades of precision industrial design.</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-red-500/20 transition-colors shadow-sm">
                    <span className="text-2xl font-bold text-slate-900 font-display block mb-1">15+ Countries</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Export Network</span>
                    <p className="text-[10px] text-slate-600 mt-2 font-light">Delivering engineering excellence to global hubs.</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-red-500/20 transition-colors shadow-sm">
                    <span className="text-2xl font-bold text-slate-900 font-display block mb-1">50+ OEM clients</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Active Contracts</span>
                    <p className="text-[10px] text-slate-600 mt-2 font-light">Trusted partner for machinery builders across India.</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-red-500/20 transition-colors shadow-sm">
                    <span className="text-2xl font-bold text-slate-900 font-display block mb-1">24/7 Support</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Engineering SLA</span>
                    <p className="text-[10px] text-slate-600 mt-2 font-light">Senior technical support direct from Bangalore cells.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "infra" && (
              <motion.div
                key="infra"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full"
              >
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-blue-600 mb-4 tracking-tight uppercase font-mono">
                    Bangalore Manufacturing Cell
                  </h3>
                  <p className="text-slate-650 text-xs leading-relaxed font-light mb-6">
                    Our manufacturing facility is equipped with automated grinding machines and test chambers capable of generating spindle assemblies with sub-micron geometrical runout tolerances.
                  </p>
                  <div className="flex flex-col gap-3.5 text-xs text-slate-600 font-light">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>Precision Cylindrical Grinding Cells (STUDER automated grinders)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>Class 10,000 Cleanroom Assembly Cell for super-precision bearings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>Dynamic Balancing Equipment (Schenck balancing machine up to G0.4)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 font-mono">Precision Testing Gear</h4>
                    <div className="grid grid-cols-1 gap-2.5 text-slate-600 text-xs font-light">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                        <span>Coordinate Measuring Machine (CMM)</span>
                        <span className="font-mono text-red-600 font-semibold">Tolerances to 0.5µm</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                        <span>Spindle Test Run Benches</span>
                        <span className="font-mono text-red-600 font-semibold">Continuous 48h load check</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                        <span>Laser Interferometer Alignments</span>
                        <span className="font-mono text-red-600 font-semibold">Deviation testing</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-405 font-mono mt-4 text-right block uppercase">
                    All machines are calibrated under ISO standards.
                  </span>
                </div>
              </motion.div>
            )}

            {activeTab === "quality" && (
              <motion.div
                key="quality"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full"
              >
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-blue-600 mb-4 tracking-tight uppercase font-mono">
                    ISO Quality Management
                  </h3>
                  <p className="text-slate-650 text-xs leading-relaxed font-light mb-6">
                    Quality is our signature. Every spindle, bearing, and accessory undergoes rigorous physical inspections and dynamic vibration testing at full target RPM before dispatch.
                  </p>
                  <div className="flex flex-col gap-3 text-xs text-slate-600 font-light">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Certified ISO 9001:2015 Precision Engineering standards</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Dynamic Balancing to ISO 1940 standard (Class G0.4 or G1.0)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Traceable inspection certificates shipped with every item</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm">
                  <div className="p-4 bg-red-50 border border-red-200/50 rounded-2xl flex flex-col items-center text-center max-w-[260px]">
                    <ShieldCheck className="w-8 h-8 text-red-500 mb-3 animate-pulse" />
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1 font-mono">Zero Defect Promise</h4>
                    <p className="text-[9px] text-slate-600 leading-normal font-light">
                      BMT adheres strictly to dynamic defense grade QA checklists to prevent runout failures in high load operations.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
