import { motion } from 'framer-motion'

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className,
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275],
      }}
      className={`max-w-3xl mb-16 ${alignClass} ${className}`}
    >
      {label && (
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {label}
        </span>
      )}
      <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-text text-emboss md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-sans text-base leading-relaxed text-text-muted">
          {description}
        </p>
      )}
    </motion.div>
  )
}
