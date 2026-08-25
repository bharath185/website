'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import { Sparkles, Clock, ShieldCheck } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fafbfc] text-slate-800 pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden font-sans flex flex-col justify-center">
      
      {/* Subtle Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(18,47,135,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,47,135,0.018)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Subtle Radial Ambient Flares */}
      <div className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-6 sm:space-y-8">
        
        {/* ========================================================================= */}
        {/* CLEAN, POLISHED & FIT-SCREEN HEADER                                       */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs"
          >
            <Sparkles className="w-3 h-3 text-[#122f87]" />
            <span className="text-[10px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
              GET IN TOUCH &bull; BHARAT MACHINE TOOLS
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 uppercase tracking-tight font-display"
          >
            Contact <span className="text-[#122f87]">Engineering</span> Team
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light"
          >
            Have a custom machine inquiry or need a rapid technical quotation? Reach out directly to our Bangalore desk.
          </motion.p>

        </div>

        {/* ========================================================================= */}
        {/* CONTACT FORM & DIRECT CHANNELS                                            */}
        {/* ========================================================================= */}
        <ContactForm />

      </div>

    </div>
  )
}
