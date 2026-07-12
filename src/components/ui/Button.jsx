import { motion } from 'framer-motion'
import { cn } from '../../lib/utils.js'

const variants = {
  primary:
    'bg-accent text-accent-foreground shadow-[4px_4px_8px_rgba(166,50,60,0.4),-4px_-4px_8px_rgba(255,100,110,0.4)] hover:brightness-110',
  secondary:
    'bg-background text-text shadow-industrial hover:text-accent',
  ghost:
    'bg-transparent text-text-muted hover:bg-muted hover:shadow-industrial-recessed',
}

export function Button({
  variant = 'primary',
  size = 'default',
  className,
  children,
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    default: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
  }[size]

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96, y: 2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'btn-industrial inline-flex items-center justify-center gap-2 rounded-lg',
        'font-sans font-bold uppercase tracking-[0.05em]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
