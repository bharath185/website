'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { RefreshCw, ArrowUpRight, Compass, Sparkles } from 'lucide-react'

const HeroSceneContent = dynamic(() => import('./HeroSceneContent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] bg-transparent flex flex-col items-center justify-center text-blue-900 gap-3">
      <RefreshCw className="w-7 h-7 animate-spin text-blue-700" />
      <span className="font-mono text-[9px] uppercase tracking-widest animate-pulse font-bold">
        Initializing 3D Engine...
      </span>
    </div>
  )
})

export default function Hero3DShowcase() {
  return (
    <div className="relative w-full h-full select-none bg-transparent">
      {/* 3D WebGL Canvas (Transparent & Large) */}
      <div className="w-full h-full relative">
        <HeroSceneContent />
      </div>
    </div>
  )
}
