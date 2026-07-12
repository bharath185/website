import { motion } from 'framer-motion'

const technologies = [
  { name: 'React', angle: 0 },
  { name: 'Node', angle: 60 },
  { name: 'Python', angle: 120 },
  { name: 'AWS', angle: 180 },
  { name: 'Docker', angle: 240 },
  { name: 'AI', angle: 300 },
]

export function TechOrbit() {
  return (
    <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
      {/* Outer rings */}
      <div className="absolute inset-0 rounded-full border border-dashed border-border-dark/30" />
      <div className="absolute inset-8 rounded-full border border-border-dark/20" />

      {/* Center core */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[25%] rounded-full bg-background shadow-industrial-floating"
      >
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
            DEV
          </span>
        </div>
      </motion.div>

      {/* Orbiting tech badges */}
      {technologies.map((tech, index) => {
        const radius = 45 // percent
        const angleRad = (tech.angle * Math.PI) / 180
        const x = 50 + radius * Math.cos(angleRad)
        const y = 50 + radius * Math.sin(angleRad)

        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.15 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-industrial cursor-default md:h-14 md:w-14"
            >
              <span className="font-mono text-[9px] font-bold text-text md:text-[10px]">
                {tech.name}
              </span>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Connection lines from center to orbit */}
      <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
        {technologies.map((tech) => {
          const radius = 45
          const angleRad = (tech.angle * Math.PI) / 180
          const x2 = 50 + radius * Math.cos(angleRad)
          const y2 = 50 + radius * Math.sin(angleRad)
          return (
            <line
              key={tech.name}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="rgba(163,177,198,0.3)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          )
        })}
      </svg>
    </div>
  )
}
