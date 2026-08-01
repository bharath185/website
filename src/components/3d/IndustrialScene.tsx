'use client'

import dynamic from 'next/dynamic'

const SceneContent = dynamic(() => import('./SceneContent'), { ssr: false })

export default function IndustrialScene() {
  return (
    <div className="absolute inset-0 z-0">
      <SceneContent />
    </div>
  )
}
