'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Bot, Workflow, Code2, Smartphone, Users, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HolographicMenuProps {
  activeNode: number | null
  setActiveNode: (id: number | null) => void
}

interface MenuItem {
  name: string
  nodeId: number | null
  sectionId: string
  icon: any
  glowColor: string
}

export function HolographicMenu({ activeNode, setActiveNode }: HolographicMenuProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const items: MenuItem[] = [
    { name: 'Home', nodeId: 0, sectionId: 'hero', icon: Home, glowColor: 'rgba(255, 255, 255, 0.25)' },
    { name: 'AI Auto', nodeId: 1, sectionId: 'service-ai', icon: Bot, glowColor: 'rgba(13, 91, 58, 0.65)' }, // Forest Green
    { name: 'Business Auto', nodeId: 2, sectionId: 'service-business', icon: Workflow, glowColor: 'rgba(200, 168, 112, 0.6)' }, // Muted Gold
    { name: 'Software', nodeId: 3, sectionId: 'service-software', icon: Code2, glowColor: 'rgba(200, 168, 112, 0.6)' }, // Muted Gold
    { name: 'Mobile AMC', nodeId: 4, sectionId: 'service-amc', icon: Smartphone, glowColor: 'rgba(13, 91, 58, 0.65)' }, // Forest Green
    { name: 'About', nodeId: null, sectionId: 'about', icon: Users, glowColor: 'rgba(134, 179, 170, 0.5)' }, // Sage Green
    { name: 'Cases', nodeId: null, sectionId: 'cases', icon: Briefcase, glowColor: 'rgba(13, 91, 58, 0.5)' }, // Forest Green
  ]

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 15 }}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#060A08]/85 px-4 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] shadow-[#0D5B3A]/5 backdrop-blur-2xl md:gap-3"
      >
        {items.map((item, idx) => {
          const Icon = item.icon
          const isHighlighted = activeNode === item.nodeId && item.nodeId !== null
          const isHovered = hoveredIdx === idx

          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => {
                setHoveredIdx(idx)
                if (item.nodeId !== null) {
                  setActiveNode(item.nodeId)
                }
              }}
              onMouseLeave={() => {
                setHoveredIdx(null)
                setActiveNode(null)
              }}
              onClick={() => handleScrollTo(item.sectionId)}
            >
              {/* Tooltip */}
              <div
                className={cn(
                  "absolute -top-10 left-1/2 -translate-x-1/2 scale-75 rounded-md border border-white/10 bg-[#060908] px-2 py-1 font-mono text-[10px] tracking-wide text-white opacity-0 shadow-lg transition-all duration-200 pointer-events-none whitespace-nowrap",
                  isHovered && "opacity-100 scale-100 -top-12"
                )}
              >
                {item.name}
              </div>

              {/* Glowing Background Bubble on Hover */}
              {isHovered && (
                <motion.div
                  layoutId="hologram-glow"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    boxShadow: `0 0 20px 4px ${item.glowColor}`,
                    background: item.glowColor.replace('0.65', '0.08').replace('0.6', '0.08').replace('0.5', '0.08').replace('0.25', '0.05'),
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}

              {/* Interactive Button */}
              <button
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-text-muted transition-all duration-300 hover:scale-110 md:h-12 md:w-12",
                  isHighlighted && "border-accent-purple/40 bg-accent-purple/20 text-white shadow-[0_0_15px_rgba(13,91,58,0.45)]",
                  isHovered && "border-white/20 text-white"
                )}
                aria-label={item.name}
              >
                <Icon size={18} className="md:h-5 md:w-5" />
              </button>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
