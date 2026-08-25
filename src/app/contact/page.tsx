'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import { Sparkles, Clock, ShieldCheck } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pt-28 sm:pt-36 pb-24 relative overflow-hidden font-sans">
      
      {/* Subtle Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,47,135,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,47,135,0.018)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Subtle Radial Ambient Flares */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* ========================================================================= */}
        {/* CLEAN, ATTRACTIVE & UNCLUTTERED HEADER                                    */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#122f87]" />
            <span className="text-[10px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
              GET IN TOUCH &bull; BHARAT MACHINE TOOLS
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 uppercase tracking-tight font-display"
          >
            Contact <span className="text-[#122f87]">Us</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-light"
          >
            Have a custom machine inquiry or need a rapid technical quotation? Reach out directly to our engineering desk in Bangalore.
          </motion.p>

          {/* Quick status badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 text-[10px] font-mono font-bold text-slate-600"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bangalore Plant: Active</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <Clock className="w-3 h-3 text-blue-600" />
              <span>Response: &lt; 2 Hours</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>ISO 9001:2015 QA</span>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* CONTACT FORM & DIRECT CHANNELS                                            */}
        {/* ========================================================================= */}
        <ContactForm />

      </div>

    </div>
  )
}
