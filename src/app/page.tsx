'use client'

import { useState, useEffect } from 'react'
import { NexusCanvas } from '@/components/canvas/NexusCanvas'
import { HolographicMenu } from '@/components/ui/HolographicMenu'
import { Hero } from '@/components/ui/Hero'
import { ServicesBento } from '@/components/ui/ServicesBento'
import { AboutScramble } from '@/components/ui/AboutScramble'
import { CaseStudiesScroll } from '@/components/ui/CaseStudiesScroll'
import { ContactCTA } from '@/components/ui/ContactCTA'
import { Footer } from '@/components/ui/Footer'
import { AIAssistant } from '@/components/interactive/AIAssistant'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeNode, setActiveNode] = useState<number | null>(null)

  // Track page-level scroll progress synchronously for the 3D canvas
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const progress = window.scrollY / docHeight
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-[#0A0A0A]">
      {/* 1. Floating interactive navigation dock */}
      <HolographicMenu 
        activeNode={activeNode} 
        setActiveNode={setActiveNode} 
      />

      {/* 2. Floating AI Assistant Chat Bot */}
      <AIAssistant />

      {/* 3. Foreground scrollable content layers */}
      <div className="relative z-10 w-full pointer-events-none">
        
        {/* Phase 1: Hero section with the absolute Canvas */}
        <div id="hero-wrapper" className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-[#020503] via-[#050B08] to-[#0A120E] pointer-events-auto">
          {/* Background layer: 3D interactive Nexus Canvas limited to Hero only */}
          <NexusCanvas 
            scrollProgress={scrollProgress} 
            activeNode={activeNode} 
            setActiveNode={setActiveNode} 
          />
          <Hero scrollProgress={scrollProgress} />
        </div>

        {/* Phase 2: Services Bento boxes (scrolls on clean dark background) */}
        <ServicesBento activeNode={activeNode} setActiveNode={setActiveNode} />

        {/* Phase 3: High-contrast Scrambled About Stats */}
        <AboutScramble />

        {/* Phase 4: Horizontal Scroll Case Studies Showcase */}
        <CaseStudiesScroll />

        {/* Phase 5: Actionable Consultation Form */}
        <ContactCTA />

        {/* Footer info & System diagnostics check */}
        <Footer />

      </div>
    </main>
  )
}
