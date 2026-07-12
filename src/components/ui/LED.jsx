import { cn } from '../../lib/utils.js'

export function LED({
  color = 'green',
  pulsing = false,
  label,
  className,
}) {
  const colorClasses = {
    green: 'bg-green-500 shadow-[0_0_10px_2px_rgba(34,197,94,0.6)]',
    red: 'bg-accent shadow-[0_0_10px_2px_rgba(255,71,87,0.6)]',
    yellow: 'bg-yellow-400 shadow-[0_0_10px_2px_rgba(250,204,21,0.6)]',
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'h-2.5 w-2.5 rounded-full',
          colorClasses[color],
          pulsing && 'animate-led-pulse'
        )}
        aria-hidden="true"
      />
      {label && (
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {label}
        </span>
      )}
    </div>
  )
}
