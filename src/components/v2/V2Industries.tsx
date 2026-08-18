"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, ShieldAlert, Cpu, Settings, CheckCircle2, Info } from "lucide-react"

type SectorId = "aerospace" | "defense" | "robotics" | "machinetools"

export default function V2Industries() {
  const [activeSector, setActiveSector] = useState<SectorId>("aerospace")
  const [telemetry, setTelemetry] = useState({ val1: "", val2: "" })

  const sectors = [
    {
      id: "aerospace" as SectorId,
      title: "Aerospace Engineering",
      icon: Plane,
      image: "/images/industries/aerospace.jpg",
      desc: "Supplying sub-micron tolerance spindles and YRT axial-radial roller bearings to withstand heavy thrust forces during titanium wing spar and turbine blade milling.",
      spec: "Radial Runout: ≤ 0.002mm",
      apps: [
        "Turbofan engine mount machining",
        "Aircraft wing spar high-speed milling",
        "Aerospace composite tooling fixtures"
      ],
      telemetry: { label1: "SPINDLE ROTATION", val1: "42,000 RPM", label2: "VIB LEVEL", val2: "0.04 MM/S" },
      hotspots: [
        { top: "35%", left: "48%", label: "Spindle core assembly machining titanium spars." },
        { top: "58%", left: "32%", label: "YRT bearing race supporting heavy radial forces." }
      ]
    },
    {
      id: "defense" as SectorId,
      title: "Defense & Space Systems",
      icon: ShieldAlert,
      image: "/images/industries/defense.jpg",
      desc: "Engineering heavy-duty telescopic leveling outriggers, pneumatic mast arrays, and high-stabilization hydraulic actuators for mobile defense radar arrays.",
      spec: "Hydraulic Stroke: 400mm",
      apps: [
        "Mobile communication telescoping masts",
        "Launcher vehicle level-stabilizers",
        "Satellite array pitch positioners"
      ],
      telemetry: { label1: "LOCK PRESSURE", val1: "180 BAR", label2: "OUTRIGGER EXT", val2: "100%" },
      hotspots: [
        { top: "42%", left: "38%", label: "Hydraulic outrigger stabilization cylinder." },
        { top: "55%", left: "68%", label: "Pitch actuator adjusting array coordinates." }
      ]
    },
    {
      id: "robotics" as SectorId,
      title: "Industrial Automation",
      icon: Cpu,
      image: "/images/industries/automation.jpg",
      desc: "Providing JIS Class C3 precision ground linear guides and zero-backlash planetary speed reducers for multi-axis pick-and-place lines and robotic weld joints.",
      spec: "Travel Flatness: ≤ 0.003mm",
      apps: [
        "Robotic arm positioning actuators",
        "Automotive welding line linear guides",
        "Automated assembly feed fixtures"
      ],
      telemetry: { label1: "CARRIAGE VELOCITY", val1: "2.8 M/S", label2: "CYCLES COMPLETED", val2: "14,820" },
      hotspots: [
        { top: "38%", left: "46%", label: "JIS C3 ground linear guide track profile." },
        { top: "52%", left: "58%", label: "Carriage slider block with recirculating tracks." }
      ]
    },
    {
      id: "machinetools" as SectorId,
      title: "CNC Machine Tools",
      icon: Settings,
      image: "/images/industries/cnc_machining.jpg",
      desc: "Manufacturing custom high-rigidity spindles, tailstocks, and 4th/5th axis rotary tables. We also offer dynamic slideway scraping and spindle refurbishing.",
      spec: "Balancing Standard: ISO G0.4",
      apps: [
        "4th & 5th axis CNC rotary tables",
        "High-torque lathe spindle heads",
        "Slideway scraping & retrofitting"
      ],
      telemetry: { label1: "TABLE INDEX", val1: "360.000°", label2: "LOCK PRESSURE", val2: "60 BAR" },
      hotspots: [
        { top: "32%", left: "52%", label: "4th axis table platter with ground T-slots." },
        { top: "62%", left: "64%", label: "Dynamic balance calibration collar standard." }
      ]
    }
  ]

  const activeData = sectors.find((s) => s.id === activeSector) || sectors[0]

  // Telemetry fluctuation simulation
  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count++
      if (activeSector === "aerospace") {
        const rpm = 42000 + Math.floor(Math.sin(count * 0.5) * 45)
        const vib = (0.04 + Math.sin(count * 0.3) * 0.003).toFixed(4)
        setTelemetry({ val1: `${rpm.toLocaleString()} RPM`, val2: `${vib} MM/S` })
      } else if (activeSector === "defense") {
        const pressure = 180 + Math.floor(Math.sin(count * 0.4) * 3)
        const ext = "100%"
        setTelemetry({ val1: `${pressure} BAR`, val2: ext })
      } else if (activeSector === "robotics") {
        const velocity = Math.abs(Math.sin(count * 0.1) * 2.8).toFixed(2)
        const cycles = 14820 + Math.floor(count * 0.1)
        setTelemetry({ val1: `${velocity} M/S`, val2: `${cycles}` })
      } else if (activeSector === "machinetools") {
        const index = ((count * 1.5) % 360).toFixed(3)
        const press = 60 + Math.floor(Math.sin(count * 0.4) * 2)
        setTelemetry({ val1: `${index}°`, val2: `${press} BAR` })
      }
    }, 200)
    return () => clearInterval(interval)
  }, [activeSector])

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200/40 px-3 py-1 rounded-md uppercase tracking-widest">
            Key Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-3 tracking-tight font-display">
            Industries We Serve
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
            Select a division to inspect BMT&apos;s custom engineering integrations. Hover over the pulsing hotspot indicators to view component specifications.
          </p>
        </div>

        {/* 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* Left Column: Categories and Description */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category Selector Tabs */}
            <div className="flex flex-col border border-slate-200/80 rounded-[2rem] p-2 bg-slate-50 gap-1">
              {sectors.map((sec) => {
                const Icon = sec.icon
                const isActive = activeSector === sec.id
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSector(sec.id)}
                    className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                      isActive 
                        ? "bg-white text-[#122f87] shadow-sm" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    {sec.title}
                  </button>
                )
              })}
            </div>

            {/* Description card */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-[2.2rem] p-6 sm:p-8 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSector}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase bg-blue-50 border border-blue-200/40 px-2.5 py-1 rounded">
                    {activeData.spec}
                  </span>
                  <p className="text-slate-600 text-xs leading-relaxed font-light">
                    {activeData.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Apps List */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  Typical Applications:
                </span>
                <ul className="space-y-2.5">
                  {activeData.apps.map((app, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Viewport Frame */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Viewport Header */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-slate-900 font-bold uppercase tracking-wider text-xs">
                  HD CAD Engineering Render
                </span>
              </div>
            </div>

            {/* Viewport Frame */}
            <div 
              className="w-full h-[220px] sm:h-[300px] bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden mb-4 flex items-center justify-center shadow-inner"
            >
              {/* Visual camera crosshairs */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-slate-300 pointer-events-none z-10" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-slate-300 pointer-events-none z-10" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-slate-300 pointer-events-none z-10" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-slate-300 pointer-events-none z-10" />
              
              <div className="w-full h-full relative">
                <img 
                  src={activeData.image} 
                  alt={activeData.title}
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Hotspot pins */}
                {activeData.hotspots.map((pin, idx) => (
                  <div 
                    key={idx}
                    style={{ top: pin.top, left: pin.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                  >
                    <span className="relative flex h-5.5 w-5.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-5.5 w-5.5 bg-blue-600 border-2 border-white items-center justify-center text-[9px] font-bold text-white shadow-md">
                        i
                      </span>
                    </span>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 text-[9px] font-mono w-[180px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl z-30 leading-normal">
                      {pin.label}
                    </div>
                  </div>
                ))}

                {/* Laser scanning beam sweep */}
                <motion.div 
                  animate={{ y: [-100, 100, -100] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-6 right-6 h-[1.5px] bg-blue-500/60 shadow-[0_0_12px_rgba(37,99,235,0.4)] z-10 pointer-events-none"
                />
              </div>
            </div>

            {/* Sensor Telemetry */}
            <div className="grid grid-cols-2 gap-4 relative z-20">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm">
                <span className="text-[8px] font-mono text-slate-500 block uppercase tracking-wider mb-0.5">
                  {activeData.telemetry.label1}
                </span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {telemetry.val1 || activeData.telemetry.val1}
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm">
                <span className="text-[8px] font-mono text-slate-500 block uppercase tracking-wider mb-0.5">
                  {activeData.telemetry.label2}
                </span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {telemetry.val2 || activeData.telemetry.val2}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
