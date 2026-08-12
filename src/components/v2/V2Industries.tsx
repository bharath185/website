"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cpu, ShieldCheck, Crosshair, RefreshCw, BarChart4, Activity, Zap } from "lucide-react"

export default function V2Industries() {
  const [rpm, setRpm] = useState(24000)
  const [runout, setRunout] = useState(0.0018)
  const [vibration, setVibration] = useState(0.72)
  const [temperature, setTemperature] = useState(18.5)
  const [status, setStatus] = useState("PASS")
  const [activeTab, setActiveTab] = useState<"aero" | "auto" | "robotics" | "medical">("aero")

  // Simulate real-time sensor updates for BMT inspection cockpit
  useEffect(() => {
    const interval = setInterval(() => {
      setRpm(() => Math.floor(23950 + Math.random() * 100))
      setRunout(() => parseFloat((0.0016 + Math.random() * 0.0004).toFixed(4)))
      setVibration(() => parseFloat((0.68 + Math.random() * 0.08).toFixed(2)))
      setTemperature(() => parseFloat((18.2 + Math.random() * 0.6).toFixed(1)))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const industries = [
    {
      id: "aero",
      title: "Aerospace & Defence",
      desc: "Sub-micron spindles and heavy-duty tool attachments engineered to machine titanium turbine components and aerospace brackets under G0.4 dynamic balance ratings.",
      stats: "Runout ≤ 0.002mm • ISO G0.4",
      accent: "from-blue-600 to-cyan-500"
    },
    {
      id: "auto",
      title: "Automotive Plants",
      desc: "High-stiffness double-row cylindrical roller bearings and high-speed motor spindles deployed in major Indian engine block lines for continuous lathe cycles.",
      stats: "24/7 Duty Cycle • Zero Down-time",
      accent: "from-cyan-500 to-teal-400"
    },
    {
      id: "robotics",
      title: "Advanced Robotics",
      desc: "Zero-backlash precision ground ball screws (Class C3) delivering exact positioning controls for robotic arm welds and multi-axis pick-and-place lines.",
      stats: "JIS C3 Ground • Zero Backlash",
      accent: "from-indigo-600 to-blue-500"
    },
    {
      id: "medical",
      title: "Medical Scanner Equipment",
      desc: "Ultra-quiet hydrostatic rotational spindles designed specifically to handle large radial masses in CT and MRI scanners with negligible thermal emissions.",
      stats: "Decibel ≤ 38dB • Low Thermal Runout",
      accent: "from-purple-600 to-indigo-500"
    }
  ]

  const activeIndustry = industries.find((ind) => ind.id === activeTab) || industries[0]

  return (
    <section className="py-24 bg-[#030712] relative border-t border-white/5 overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -right-20 top-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20">
            INDUSTRY 4.0 INTEGRATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-4 mb-4 font-display">
            Precision Applications & QA
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs leading-relaxed font-light">
            Emulating zero-defect quality systems. How BMT precision mechanics power heavy industries, validated by our dynamic real-time inspection cockpit.
          </p>
        </div>

        {/* Modular Grid Layout (Left: Industries Segment, Right: SwitchOn Inspired QA Simulator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Industry Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {industries.map((ind) => {
              const isActive = activeTab === ind.id
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id as any)}
                  className={`w-full text-left p-6 rounded-3xl border transition-all duration-350 relative overflow-hidden backdrop-blur-md ${
                    isActive
                      ? "bg-slate-900/60 border-blue-500/30 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]"
                      : "bg-slate-950/20 border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Active glowing accent strip */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-blue-500" />
                  )}
                  <h3 className={`text-base font-bold transition-colors ${isActive ? "text-blue-400" : "text-white"}`}>
                    {ind.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed mt-2 line-clamp-2">
                    {ind.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[9px] font-mono text-cyan-400/90 font-semibold bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                      {ind.stats}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: SwitchOn-Inspired Interactive Visual Quality Cockpit */}
          <div className="lg:col-span-7">
            <div className="relative backdrop-blur-xl bg-slate-950/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
              
              {/* Header Telemetry */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 text-slate-400 font-mono text-[9px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-white font-bold">QA COCKPIT SYSTEM ACTIVE</span>
                </div>
                <span>SKU: SPINDLE_BT30_QA</span>
              </div>

              {/* Central Visual Inspection Frame (SwitchOn inspired visual camera inspection grid) */}
              <div className="aspect-[16/10] bg-slate-900/60 border border-white/5 rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center">
                {/* Visual camera crosshair overlays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.85)_80%)] z-10 pointer-events-none" />
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-500/60 pointer-events-none" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-500/60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-500/60 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-500/60 pointer-events-none" />
                
                {/* Blueprint grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* Inspect Rotating mechanical drawing */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-double border-blue-500/20 animate-[spin_5s_linear_infinite_reverse]" />
                  <div className="absolute inset-8 rounded-full border border-cyan-500/10 flex items-center justify-center">
                    <Cpu className="w-12 h-12 text-cyan-400/80 animate-[spin_15s_linear_infinite]" />
                  </div>
                  
                  {/* Dynamic Bounding Box inspection overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-500/80 rounded-2xl flex items-end justify-start p-1.5 pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <span className="text-[7px] font-mono text-emerald-400 bg-slate-950/90 px-1 py-0.5 rounded border border-emerald-500/30">
                      TAPER_DEFLECTION: {runout}mm
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-white/5 rounded-xl px-4 py-1.5 text-white text-[9px] font-mono flex items-center gap-2 z-20 shadow-md">
                  <span className="text-slate-500">DYNAMIC LOAD STATE:</span>
                  <span className="text-emerald-400 font-bold">STABLE (100% NOMINAL)</span>
                </div>
              </div>

              {/* Dynamic Sensor Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Param 1 */}
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-500">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider font-mono">Rotation Speed</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">{rpm.toLocaleString()}</div>
                  <span className="text-[8px] text-cyan-400 font-semibold font-mono">RPM</span>
                </div>

                {/* Param 2 */}
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-500">
                    <Crosshair className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider font-mono">Radial Runout</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">{runout}</div>
                  <span className="text-[8px] text-emerald-400 font-semibold font-mono">MM</span>
                </div>

                {/* Param 3 */}
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-500">
                    <Activity className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider font-mono">Vibration amp</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">{vibration}</div>
                  <span className="text-[8px] text-emerald-400 font-semibold font-mono">MM/S</span>
                </div>

                {/* Param 4 */}
                <div className="p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-1.5 mb-1.5 text-slate-500">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider font-mono">Temp Shift</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">+{temperature}°C</div>
                  <span className="text-[8px] text-cyan-400 font-semibold font-mono">NOMINAL</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
