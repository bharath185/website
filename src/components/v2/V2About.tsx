"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, HardDrive, Award, Crosshair, ChevronRight } from "lucide-react"

type TabName = "profile" | "infra" | "quality"

export default function V2About() {
  const [activeTab, setActiveTab] = useState<TabName>("profile")

  const tabsConfig = [
    { id: "profile", label: "Corporate Profile", icon: Award },
    { id: "infra", label: "Infrastructure & Machinery", icon: HardDrive },
    { id: "quality", label: "Quality Control Standards", icon: ShieldCheck },
  ]

  return (
    <section className="py-24 bg-[#030712] relative border-t border-white/5">
      {/* Abstract radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 px-3 py-1 rounded-md border border-cyan-450/20">
            TECHNICAL PROFILE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-4 mb-4 font-display">
            Precision Machining Infrastructure
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs leading-relaxed font-light">
            We operate state-of-the-art manufacturing cells in Bangalore to supply sub-micron level tolerances to high-speed aerospace and automation facilities.
          </p>
        </div>

        {/* Tabs Control Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 border-b border-white/5 pb-6">
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
                    : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-white hover:border-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content Display */}
        <div className="backdrop-blur-xl bg-slate-950/30 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl min-h-[350px] flex items-center">
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
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase font-mono text-blue-400">
                    BMT Corporate Overview
                  </h3>
                  <p className="text-slate-350 text-xs leading-relaxed font-light mb-6">
                    Established in Bangalore, Bharat Machine Tools has grown into a premier supplier of precision parts. We cater to high-speed CNC machinery builders, aerospace contractors, and machine tools maintenance shops globally.
                  </p>
                  <div className="flex flex-col gap-3 text-xs text-slate-400 font-light">
                    <div className="flex items-center gap-2.5">
                      <Crosshair className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Specialized in customized SPM High-Speed Spindles (up to 45,000 RPM)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Crosshair className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Dedicated R&D laboratory analyzing bearing stiffness & thermal load runouts</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 hover:border-blue-500/10 transition-colors">
                    <span className="text-2xl font-bold text-white font-display block mb-1">1999</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Year Founded</span>
                    <p className="text-[10px] text-slate-400 mt-2 font-light">Over two decades of precision industrial design.</p>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 hover:border-cyan-500/10 transition-colors">
                    <span className="text-2xl font-bold text-white font-display block mb-1">15+ Countries</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Export Network</span>
                    <p className="text-[10px] text-slate-400 mt-2 font-light">Delivering engineering excellence to global hubs.</p>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 hover:border-indigo-500/10 transition-colors">
                    <span className="text-2xl font-bold text-white font-display block mb-1">50+ OEM clients</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Active Contracts</span>
                    <p className="text-[10px] text-slate-400 mt-2 font-light">Trusted partner for machinery builders across India.</p>
                  </div>
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 hover:border-blue-500/10 transition-colors">
                    <span className="text-2xl font-bold text-white font-display block mb-1">24/7 Support</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block">Engineering SLA</span>
                    <p className="text-[10px] text-slate-400 mt-2 font-light">Senior technical support direct from Bangalore cells.</p>
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
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase font-mono text-cyan-400">
                    Bangalore Manufacturing Cell
                  </h3>
                  <p className="text-slate-350 text-xs leading-relaxed font-light mb-6">
                    Our manufacturing facility is equipped with automated grinding machines and test chambers capable of generating spindle assemblies with sub-micron geometrical runout tolerances.
                  </p>
                  <div className="flex flex-col gap-3.5 text-xs text-slate-400 font-light">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span>Precision Cylindrical Grinding Cells (STUDER automated grinders)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span>Class 10,000 Cleanroom Assembly Cell for super-precision bearings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span>Dynamic Balancing Equipment (Schenck balancing machine up to G0.4)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Precision Testing Gear</h4>
                    <div className="grid grid-cols-1 gap-2.5 text-slate-400 text-xs font-light">
                      <div className="flex items-center justify-between p-2 bg-slate-950/40 rounded-xl border border-white/5">
                        <span>Coordinate Measuring Machine (CMM)</span>
                        <span className="font-mono text-cyan-400 font-semibold">Tolerances to 0.5µm</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/40 rounded-xl border border-white/5">
                        <span>Spindle Test Run Benches</span>
                        <span className="font-mono text-cyan-400 font-semibold">Continuous 48h load check</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/40 rounded-xl border border-white/5">
                        <span>Laser Interferometer Alignments</span>
                        <span className="font-mono text-cyan-400 font-semibold">Deviation testing</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono mt-4 text-right block uppercase">
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
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase font-mono text-indigo-400">
                    ISO Quality Management
                  </h3>
                  <p className="text-slate-350 text-xs leading-relaxed font-light mb-6">
                    Quality is our signature. Every spindle, bearing, and accessory undergoes rigorous physical inspections and dynamic vibration testing at full target RPM before dispatch.
                  </p>
                  <div className="flex flex-col gap-3 text-xs text-slate-400 font-light">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Certified ISO 9001:2015 Precision Engineering standards</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Dynamic Balancing to ISO 1940 standard (Class G0.4 or G1.0)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Traceable inspection certificates shipped with every item</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 bg-slate-900/20 border border-white/5 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Geometrical Runout Guarantee</h4>
                    <ul className="space-y-2 text-xs text-slate-450 font-light">
                      <li className="flex justify-between border-b border-white/5 pb-2">
                        <span>Spindle Nose Runout:</span>
                        <strong className="text-emerald-400 font-mono">≤ 0.002 mm</strong>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-2">
                        <span>Taper bore eccentricity:</span>
                        <strong className="text-emerald-400 font-mono">≤ 0.003 mm</strong>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-2">
                        <span>Dynamic Vibration Amplitude:</span>
                        <strong className="text-emerald-400 font-mono">≤ 0.8 mm/s</strong>
                      </li>
                    </ul>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-4 leading-relaxed font-light block italic">
                    "Zero defect manufacturing ensures maximum spindle lifetime and cutter tool durability."
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
