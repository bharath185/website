'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowDown, ArrowRight } from 'lucide-react'

interface HeroProps {
  scrollProgress: number
}

export function Hero({ scrollProgress }: HeroProps) {
  const handleScrollToServices = () => {
    const el = document.getElementById('services')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero" 
      className="relative flex h-screen w-full flex-col justify-between px-6 py-10 md:px-12 md:py-16 overflow-hidden select-none pointer-events-none"
    >
      {/* Subtle tech background grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />

      {/* Top Navbar Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex w-full items-center justify-between z-20 pointer-events-auto"
      >
        <div className="flex items-center pointer-events-auto">
          <img 
            src="/logo.png" 
            alt="Prigenix Logo" 
            className="h-11 w-auto object-contain md:h-14 lg:h-16" 
          />
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('contact')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
          className="glass-panel flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 pointer-events-auto"
          style={{ pointerEvents: 'auto' }}
        >
          Contact Studio <ArrowRight size={12} />
        </button>
      </motion.header>

      {/* Main Hero Headline */}
      <div className="my-auto max-w-4xl flex flex-col items-start gap-6 z-10 pt-16 pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-accent-purple" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-purple md:text-[10px]">
            The Digital Nexus Experience
          </span>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl font-extrabold leading-[1.08] text-white md:text-7xl lg:text-8xl tracking-tight"
        >
          Architecting <br/>
          <span className="bg-gradient-to-r from-accent-purple via-accent-sage to-accent-cyan bg-clip-text text-transparent">Digital Systems.</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl font-mono text-xs leading-relaxed text-text-muted md:text-sm lg:text-base"
        >
          Engineering custom enterprise codebases, high-availability mobile AMC frameworks, automated backend pipelines, and intelligent autonomous AI agents.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <button 
            onClick={handleScrollToServices}
            className="rounded-full bg-accent-purple px-6 py-3 font-sans text-xs font-bold text-white transition-all hover:bg-[#0A4B30] hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(13,91,58,0.3)]"
          >
            Enter the Nexus
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('about')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="glass-panel rounded-full px-6 py-3 font-sans text-xs font-bold text-white transition-all hover:bg-white/5 hover:scale-105 active:scale-95"
          >
            Our Mission
          </button>
        </motion.div>
      </div>

      {/* Bottom Status bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex w-full items-end justify-between border-t border-white/5 pt-6 z-10 pointer-events-auto"
      >
        <div className="flex flex-col gap-1 font-mono text-[10px] text-text-muted">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span>NEXUS LEVEL: 01_HERO</span>
          </div>
          <span>GEOMETRIC STATE: {scrollProgress < 0.1 ? 'CHAOS_ENTROPY' : 'SYSTEM_ALIGN'}</span>
        </div>

        <button 
          onClick={handleScrollToServices}
          className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-text-muted hover:text-white transition-colors duration-300"
        >
          <span>Scroll down to order</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  )
}
