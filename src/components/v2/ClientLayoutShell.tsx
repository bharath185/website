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

  const isAdmin = pathname.startsWith('/admin')

  // Mobile App Layout viewtree (only after mounted and client confirmed mobile)
  if (mounted && isMobile && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/30 antialiased">
        <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200/80 py-3 px-4 flex items-center justify-center shadow-sm shrink-0">
          <img src="/logo.png" alt="BMT Logo" className="h-10 w-auto object-contain" />
        </header>
        
        <main className="flex-1 w-full pt-16 pb-[76px] overflow-x-hidden">
          {children}
        </main>
        
        <MobileTabBar />
      </div>
    )
  }

  // Admin Dashboard Layout
  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/30 antialiased">
        <main className="flex-1 relative z-10 w-full">{children}</main>
      </div>
    )
  }

  // Default Full Website Layout (Always rendered in SSR and Desktop)
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 antialiased">
      <V2Header />
      <main className="flex-1 relative z-10 w-full">{children}</main>
      <V2Footer />
    </div>
  )
}
