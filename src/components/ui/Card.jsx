import { cn } from '../../lib/utils.js'

export function Card({
  elevated = false,
  showScrews = true,
  showVents = false,
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-background p-6 transition-all duration-300',
        elevated ? 'shadow-industrial-floating' : 'shadow-industrial',
        'hover:-translate-y-1 hover:shadow-industrial-floating',
        className
      )}
      {...props}
    >
      {showScrews && (
        <>
          <span className="screw-head top-3 left-3" aria-hidden="true" />
          <span className="screw-head top-3 right-3" aria-hidden="true" />
          <span className="screw-head bottom-3 left-3" aria-hidden="true" />
          <span className="screw-head bottom-3 right-3" aria-hidden="true" />
        </>
      )}

      {showVents && (
        <div className="absolute top-3 right-10 flex gap-1" aria-hidden="true">
          <span className="h-6 w-1 rounded-full bg-muted shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]" />
          <span className="h-6 w-1 rounded-full bg-muted shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]" />
          <span className="h-6 w-1 rounded-full bg-muted shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]" />
        </div>
      )}

      <div className={cn(showScrews && 'relative z-10')}>{children}</div>
    </div>
  )
}
