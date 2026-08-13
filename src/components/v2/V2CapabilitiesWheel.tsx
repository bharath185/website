"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, Award, Heart, CheckCircle2, Navigation, Settings, Globe, Shield, Star } from "lucide-react"

interface CapabilityItem {
  id: number
  title: string
  desc: string
  image: string
  angle: number
}

export default function V2CapabilitiesWheel() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [rotationOffset, setRotationOffset] = useState<number>(0)

  // Segment items from the static brochure wheel
  const capabilities: CapabilityItem[] = [
    {
      id: 0,
      title: "Spindles",
      desc: "High-speed motorized spindles and tool attachments built with sub-micron radial balance for high-accuracy metal cutting operations.",
      image: "https://bizimages.withfloats.com/tile/6a6c3b333547fd8e003991a2.jpg",
      angle: 0
    },
    {
      id: 1,
      title: "Rotary Tables & Tail Stocks",
      desc: "Multi-axis CNC rotary tables and tailstocks engineered for dynamic positioning and continuous 4th/5th axis machining stability.",
      image: "https://bizimages.withfloats.com/tile/6a699dcbba701899e1dda222.jpg",
      angle: 40
    },
    {
      id: 2,
      title: "Ball Screws & Lead Screws",
      desc: "JIS C3/C5 class precision ground ball screws providing zero-backlash feedback control for automation systems.",
      image: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
      angle: 80
    },
    {
      id: 3,
      title: "YRT Precision Bearings",
      desc: "Axial-radial double row cylindrical roller bearings offering high structural rigidity for turntable assemblies.",
      image: "https://productimages.withfloats.com/tile/66b1c2c54f7781d15f4e71dc.jpg",
      angle: 120
    },
    {
      id: 4,
      title: "Outrigger & Actuators",
      desc: "Heavy-duty hydraulic and mechanical linear actuators designed for stabilized load leveling in defense systems.",
      image: "https://productimages.withfloats.com/tile/66b1c5539464b8011ada885c.jpg",
      angle: 160
    },
    {
      id: 5,
      title: "Mast Systems",
      desc: "Frangible, electro-mechanical, and pneumatic telescopic masts optimized for portable communication arrays.",
      image: "https://bizimages.withfloats.com/tile/6a6708682a70fd3f18329c55.jpg",
      angle: 200
    },
    {
      id: 6,
      title: "Gearbox & Planetary",
      desc: "Zero-backlash planetary speed reducers and worm gearboxes engineered to handle high output torques.",
      image: "https://bizimages.withfloats.com/tile/6a6708682a70fd3f18329c55.jpg",
      angle: 240
    },
    {
      id: 7,
      title: "Machine Refurbishing",
      desc: "Complete rebuild services, structural slideway scraping, and CNC machine spindle tooling retrofits.",
      image: "https://productimages.withfloats.com/tile/66b1c5539464b8011ada885c.jpg",
      angle: 280
    },
    {
      id: 8,
      title: "Worm Shafts & Gears",
      desc: "Duplex and simplex precision worm wheel sets manufactured to DIN 3962 grade quality specifications.",
      image: "https://productimages.withfloats.com/tile/66b1c2c54f7781d15f4e71dc.jpg",
      angle: 320
    }
  ]

  const selectCapability = (idx: number) => {
    setActiveIndex(idx)
    // Rotate the wheel so the clicked item aligns to the top (270 degrees)
    const targetAngle = capabilities[idx].angle
    const currentOffset = 270 - targetAngle
    setRotationOffset(currentOffset)
  }

  // Set initial alignment on load
  useEffect(() => {
    selectCapability(0)
  }, [])

  const activeCapability = capabilities[activeIndex]

  return (
    <section className="py-24 bg-[#030712] relative border-t border-white/5 overflow-hidden">
      {/* Blueprint Grid Lines Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
            DYNAMIC CAPABILITIES PROFILE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-4 mb-2 font-display">
            Interactive Engineering Wheel
          </h2>
          <p className="text-slate-400 text-xs font-light leading-relaxed max-w-xl mx-auto">
            Click on any segment of our engineering wheel to explore BMT’s technical offerings, manufacturing divisions, and quality benchmarks.
          </p>
        </div>

        {/* 3-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Quality Philosophy Badges */}
          <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
            {/* Badge 1 */}
            <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">BMT Philosophy</h4>
                  <p className="text-[14px] font-extrabold text-white mt-1.5 leading-tight">We Believe in Quality</p>
                </div>
              </div>
            </div>

            {/* Typography Statement */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950/60 to-slate-900/35 border border-white/5 backdrop-blur-md">
              <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Motto</span>
              <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 mt-2 mb-3 leading-tight uppercase font-display">
                Quality is not an act, it is a habit.
              </h3>
              <div className="h-[2px] w-12 bg-emerald-400 rounded" />
            </div>

            {/* Badge 2 */}
            <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-md">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
                "Every Job Is A Reflection Of The Person Who Does It"
              </p>
            </div>
          </div>

          {/* Central Column: Animated SVG/CSS Rotating Capabilities Wheel */}
          <div className="lg:col-span-6 flex justify-center items-center py-10 order-1 lg:order-2">
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              
              {/* Outer Circular Track Glow */}
              <div className="absolute inset-0 rounded-full border border-dashed border-slate-800/80 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none shadow-[0_0_50px_rgba(59,130,246,0.02)]" />
              
              {/* Rotating Segment Container */}
              <motion.div
                animate={{ rotate: rotationOffset }}
                transition={{ type: "spring", stiffness: 70, damping: 18 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                {capabilities.map((cap, idx) => {
                  const angleRad = (cap.angle * Math.PI) / 180
                  const radius = 150 // distance from center in px (scales with responsive layout)
                  const isSelected = activeIndex === idx
                  
                  // Calculate absolute position on the wheel ring
                  return (
                    <button
                      key={cap.id}
                      onClick={() => selectCapability(idx)}
                      style={{
                        position: "absolute",
                        transform: `rotate(${cap.angle}deg) translate(${radius}px) rotate(-${cap.angle}deg)`,
                      }}
                      className="group focus:outline-none z-20"
                    >
                      {/* Interactive Segment Node */}
                      <motion.div
                        animate={{
                          scale: isSelected ? 1.25 : 1,
                          borderColor: isSelected ? "#34d399" : "rgba(255,255,255,0.08)",
                          backgroundColor: isSelected ? "#090d16" : "rgba(2,6,23,0.85)"
                        }}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-shadow shadow-md hover:shadow-emerald-500/20 overflow-hidden relative"
                      >
                        {/* Segment Icon Preview */}
                        <img 
                          src={cap.image} 
                          alt={cap.title}
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity" 
                        />
                        {/* Selected Indicator Dot */}
                        {isSelected && (
                          <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        )}
                      </motion.div>
                    </button>
                  )
                })}
              </motion.div>

              {/* Central Glowing Hub Card */}
              <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full bg-slate-950 border border-white/10 z-30 flex flex-col items-center justify-center text-center p-6 shadow-2xl relative">
                
                {/* Glow ring */}
                <div className="absolute inset-2 rounded-full border border-dashed border-blue-500/30 animate-[spin_30s_linear_infinite]" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center h-full w-full"
                  >
                    {/* Centered Image Showcase */}
                    <img 
                      src={activeCapability.image} 
                      alt={activeCapability.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_4px_10px_rgba(59,130,246,0.3)] mb-3" 
                    />
                    
                    {/* Central Text */}
                    <span className="text-[7px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      BMT HUB
                    </span>
                    <h3 className="text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-tight mt-1 max-w-[130px] line-clamp-2">
                      {activeCapability.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Right Column: Make In India Badges & Content Specification */}
          <div className="lg:col-span-3 flex flex-col gap-6 order-3">
            {/* Make in India Banner */}
            <div className="p-6 rounded-2xl bg-slate-950/45 border border-white/5 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-[3px] bg-gradient-to-r from-orange-400 via-white to-green-500" />
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">National Initiative</span>
              <p className="text-[12px] font-extrabold text-white leading-snug mt-2">
                "Stop importing from outside and try <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-slate-100 to-emerald-400">BMT for Make in India</span>."
              </p>
            </div>

            {/* Dynamic Specification Display Panel */}
            <div className="p-6 rounded-2xl bg-slate-900/20 border border-blue-500/15 backdrop-blur-md min-h-[160px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[8px] font-mono text-blue-400 font-bold uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                    DIVISION DETAILS
                  </span>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight mt-3 mb-2">
                    {activeCapability.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                    {activeCapability.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quality Standard badge */}
            <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-md flex items-start gap-4">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Benchmark</h4>
                <p className="text-[11px] text-slate-400 leading-normal mt-1">Zero defect, Zero effect. Quality is Must</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Capabilities Icons Row */}
        <div className="mt-20 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Shield className="w-5 h-5 text-emerald-400 mb-2" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Premium Quality</span>
          </div>
          <div className="flex flex-col items-center">
            <Settings className="w-5 h-5 text-cyan-400 mb-2" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Precision Engineering</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-5 h-5 text-yellow-400 mb-2" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Reliable Performance</span>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="w-5 h-5 text-blue-400 mb-2" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Built For Industry</span>
          </div>
          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <Award className="w-5 h-5 text-orange-400 mb-2 animate-bounce" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Made In India</span>
          </div>
        </div>

      </div>
    </section>
  )
}
