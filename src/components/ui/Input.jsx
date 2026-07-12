import { cn } from '../../lib/utils.js'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full rounded-lg bg-background font-mono text-sm text-text',
        'shadow-industrial-recessed',
        'placeholder:text-text-muted/50',
        'focus-visible:outline-none focus-visible:shadow-[var(--shadow-recessed),0_0_0_2px_var(--accent)]',
        'min-h-14 px-6 py-4',
        className
      )}
      {...props}
    />
  )
}
