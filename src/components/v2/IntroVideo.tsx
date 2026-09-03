"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SkipForward } from "lucide-react"

export default function IntroVideo() {
  const [visible, setVisible] = useState(true)

  // Session storage check to only show preloader once per session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("seen_intro")
    if (hasSeenIntro) {
      setVisible(false)
    }
  }, [])

  const handleSkip = () => {
    sessionStorage.setItem("seen_intro", "true")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black overflow-hidden selection:bg-blue-600/30 text-slate-100 font-sans"
        >
          {/* Fullscreen Video Player */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <video
              src="/explainer_logo_keep_same_what.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleSkip}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            {/* Dark Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Interactive UI Overlays */}
          <div className="absolute inset-0 flex flex-col justify-between items-center p-8 sm:p-12 z-10 pointer-events-none">
            
            {/* Top Branding Section */}
            <div className="w-full flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3.5 bg-black/30 border border-white/5 backdrop-blur-md px-4.5 py-2.5 rounded-2xl shadow-xl shadow-black/10">
                <img src="/logo.png" alt="BMT Logo" className="h-8 w-auto object-contain bg-white px-2 py-0.5 rounded-xl" />
                <div className="h-5 w-px bg-slate-800"></div>
                <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-blue-400">Precision Twin</span>
              </div>
              <button 
                onClick={handleSkip}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Skip Intro
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Call to Action Section */}
            <div className="pointer-events-auto flex flex-col items-center gap-4">
              <button 
                onClick={handleSkip}
                className="group px-8 py-4.5 bg-white hover:bg-blue-600 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-350 flex items-center gap-2.5 shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                Enter Portal
                <SkipForward className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
