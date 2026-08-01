'use client'

import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  once?: boolean
}

const dirMap = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: -60 },
  right: { x: 60 },
}

export default function ScrollReveal({
  children, className = '', delay = 0, direction = 'up', duration = 0.6, once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-50px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
