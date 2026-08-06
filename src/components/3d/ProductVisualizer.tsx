'use client'

import dynamic from 'next/dynamic'
import { RefreshCw } from 'lucide-react'
import { Product } from '@/types'

const VisualizerContent = dynamic(() => import('./VisualizerContent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] bg-slate-950 flex flex-col items-center justify-center text-blue-400 gap-3 rounded-2xl border border-slate-800">
      <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      <span className="font-mono text-xs uppercase tracking-widest animate-pulse">Initializing WebGL Engine...</span>
    </div>
  )
})

export default function ProductVisualizer({ product }: { product: Product }) {
  return (
    <div className="w-full h-full min-h-[450px] relative">
      <VisualizerContent product={product} />
    </div>
  )
}
