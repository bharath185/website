"use client"

import React, { useState, useEffect } from "react"
import V2Header from "@/components/v2/V2Header"
import V2Footer from "@/components/v2/V2Footer"
import MobileTabBar from "@/components/v2/MobileTabBar"
import { useIsMobile } from "@/hooks/useIsMobile"
import { usePathname } from "next/navigation"
import { Wrench } from "lucide-react"

export default function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // SSR Safe fallback to prevent hydration shift
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#030712]">
        <div className="flex-1 w-full">{children}</div>
      </div>
    )
  }

  // GLOBAL MAINTENANCE MODE TOGGLE
  const isMaintenanceMode = false
  const isAdmin = pathname.startsWith('/admin')

  if (isMaintenanceMode && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712] text-slate-100 px-6 py-12 font-sans selection:bg-blue-600/30 antialiased">
        <div className="max-w-md w-full text-center space-y-8 p-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
          {/* Animated background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative space-y-6">
            {/* Maintenance Icon with pulsing ring */}
            <div className="mx-auto w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center animate-pulse">
              <Wrench className="w-8 h-8 rotate-12" />
            </div>
            
            <div className="space-y-2.5">
              <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
                System Optimizations
              </span>
              <h1 className="text-xl font-black text-white uppercase tracking-wider mt-3">Under Maintenance</h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto font-light">
                Bharat Machine Tools is currently undergoing scheduled platform upgrades to improve your browsing experience. We will be back online shortly.
              </p>
            </div>

            <div className="border-t border-slate-800/80 pt-5 text-[10px] font-mono text-slate-500">
              <p>For urgent business inquiries, please reach out to:</p>
              <a href="mailto:info@bharatmachinetools.com" className="text-blue-400 hover:text-blue-300 font-bold mt-1.5 block transition-colors">
                info@bharatmachinetools.com
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mobile App Layout viewtree
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/30 antialiased">
        {/* Mobile App-like Header */}
        {!isAdmin && (
          <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200/80 py-3 px-4 flex items-center justify-center shadow-sm shrink-0">
            <img src="/logo.png" alt="BMT Logo" className="h-10 w-auto object-contain" />
          </header>
        )}
        
        {/* Mobile Main Body */}
        <main className={`flex-1 w-full ${isAdmin ? "pt-0 pb-0" : "pt-16 pb-[76px]"} overflow-x-hidden`}>
          {children}
        </main>
        
        {/* Mobile Sticky Tab Bar */}
        {!isAdmin && <MobileTabBar />}
      </div>
    )
  }

  // Desktop Website Layout viewtree
  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/30 antialiased">
        <main className="flex-1 relative z-10 w-full">{children}</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 antialiased">
      <V2Header />
      <main className="flex-1 relative z-10 w-full">{children}</main>
      <V2Footer />
    </div>
  )
}
