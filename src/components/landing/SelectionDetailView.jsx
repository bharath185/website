import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { resolveIcon } from '../../lib/utils.ts'

export function SelectionDetailView({ option, onBack, onInterested }) {
  const Icon = resolveIcon(option?.iconHint)

  return (
    <motion.div
      key="selection-detail"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] }}
      className="flex h-full flex-col overflow-hidden px-4 py-4 md:px-8 md:py-6"
    >
      <motion.button
        type="button"
        onClick={onBack}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.98 }}
        className="mb-3 flex w-fit items-center gap-2 rounded-xl bg-background px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-text-muted shadow-industrial transition-colors hover:text-accent md:mb-4"
      >
        <ArrowLeft size={14} />
        Back
      </motion.button>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl bg-background p-5 shadow-industrial-floating md:p-8">
        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 220 }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-foreground shadow-industrial md:h-16 md:w-16"
          >
            <Icon size={28} className="text-accent" strokeWidth={1.5} />
          </motion.div>
          <div className="min-w-0">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-sans text-xl font-extrabold text-text text-emboss md:text-3xl"
            >
              {option?.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-1 font-mono text-xs uppercase tracking-widest text-text-muted md:text-sm"
            >
              {option?.shortDescription}
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-5 min-h-0 flex-1"
        >
          <p className="line-clamp-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-text-muted md:line-clamp-5 md:text-base">
            {option?.detailedExplanation}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex shrink-0 justify-end"
        >
          <motion.button
            type="button"
            onClick={onInterested}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-sans text-sm font-bold text-white shadow-[0_4px_16px_rgba(255,71,87,0.35)] transition-all hover:brightness-110 md:px-6 md:text-base"
          >
            <CheckCircle size={18} />
            {option?.ctaText || "I'm interested"}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
