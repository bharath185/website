import { motion } from 'framer-motion'
import { Sparkles, ChevronRight } from 'lucide-react'
import { resolveIcon } from '../../lib/utils.ts'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] },
  },
}

export function SelectionVisual({ options, question, onSelect }) {
  const safeOptions = Array.isArray(options) ? options : []

  return (
    <motion.div
      key="selection-list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full flex-col overflow-hidden px-4 py-4 md:px-6 md:py-5"
    >
      <motion.div
        variants={itemVariants}
        className="mb-3 flex items-center gap-3 rounded-2xl bg-background p-3 shadow-industrial-floating"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground shadow-industrial">
          <Sparkles size={22} className="text-accent" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <span className="block font-sans text-sm font-bold text-text text-emboss md:text-base">
            Choose a capability
          </span>
          <span className="block truncate font-mono text-[9px] uppercase tracking-widest text-text-muted">
            {question?.slice(0, 55) || 'Explore what Prigenix can build for you'}
          </span>
        </div>
      </motion.div>

      <div className="grid flex-1 grid-cols-2 gap-2 md:gap-3">
        {safeOptions.map((option, index) => {
          const Icon = resolveIcon(option.iconHint)

          return (
            <motion.button
              key={option.id || index}
              type="button"
              variants={itemVariants}
              onClick={() => onSelect?.(option.id)}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-start overflow-hidden rounded-2xl bg-background p-3 text-left shadow-industrial transition-all hover:ring-2 hover:ring-accent/40 md:p-4"
            >
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-accent/20 to-pink-500/20 opacity-40 blur-2xl transition-opacity group-hover:opacity-60 md:h-20 md:w-20" />
              <div className="relative flex w-full items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground shadow-industrial">
                  <Icon size={22} className="text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground shadow-industrial">
                  <ChevronRight
                    size={14}
                    className="text-text-muted transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </div>
              <span className="relative mt-3 font-sans text-sm font-bold text-text text-emboss md:text-base">
                {option.title}
              </span>
              <span className="relative mt-1 line-clamp-2 font-mono text-[10px] leading-relaxed text-text-muted md:text-xs">
                {option.shortDescription}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
