'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Activity, 
  Phone, 
  Mail, 
  Clock, 
  Zap,
  Cpu,
  Layers,
  Building2
} from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pt-28 sm:pt-36 pb-24 relative overflow-hidden font-sans">
      
      {/* Precision Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,47,135,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,47,135,0.018)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Ambient Lighting Flares */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* TRENDY HERO SECTION & TELEMETRY STATUS BAR                                */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#122f87] animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
              SUPPORT &amp; RAPID QUOTATION DESK &bull; ESTD. 1999
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tight font-display leading-[1.1]"
          >
            Let&apos;s Build Sub-Micron <br />
            <span className="text-[#122f87]">Precision</span> Together
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light"
          >
            Connect directly with our chief machine tool engineers in Bangalore. Request custom spindle designs, CNC rotary tables, defense actuators, or on-site reconditioning support.
          </motion.p>

          {/* Live Industrial Telemetry Pill Strip */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 text-[11px] font-mono font-bold text-slate-700"
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bangalore Plant: ACTIVE</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>RFQ Response: &lt; 2 Hours</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>ISO 9001:2015 Registered</span>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE FORM & CONTACT DETAILS                                        */}
        {/* ========================================================================= */}
        <ContactForm />

      </div>

    </div>
  )
}
