import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card.jsx'

const codeLines = [
  { text: "import { Agent } from '@prigenix/core';", color: 'text-purple-400' },
  { text: "", color: '' },
  { text: "const invoiceAgent = new Agent({", color: 'text-blue-400' },
  { text: "  name: 'invoice-processor',", color: 'text-accent' },
  { text: "  trigger: 'email.received',", color: 'text-green-400' },
  { text: "  actions: ['extract', 'validate', 'sync'],", color: 'text-green-400' },
  { text: "});", color: 'text-blue-400' },
  { text: "", color: '' },
  { text: "invoiceAgent.on('complete', (result) => {", color: 'text-yellow-400' },
  { text: "  analytics.track('hours_saved', result.duration);", color: 'text-accent' },
  { text: "});", color: 'text-yellow-400' },
]

export function CodeEditor() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (visibleLines >= codeLines.length) {
      setIsComplete(true)
      return
    }

    const line = codeLines[visibleLines].text
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setCurrentChar((c) => c + 1)
      }, 30)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines((l) => l + 1)
        setCurrentChar(0)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [visibleLines, currentChar])

  const restart = () => {
    setVisibleLines(0)
    setCurrentChar(0)
    setIsComplete(false)
  }

  return (
    <Card elevated className="overflow-hidden">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b border-border-shadow bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-3 font-mono text-xs text-text-muted">agent.ts</span>
        </div>
        <button
          type="button"
          onClick={restart}
          className="rounded-md bg-background px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted shadow-industrial transition-all hover:text-accent active:shadow-industrial-pressed"
        >
          Replay
        </button>
      </div>

      {/* Editor body */}
      <div className="bg-[#1e2225] p-4 font-mono text-xs leading-6 md:text-sm md:leading-7">
        {codeLines.map((line, lineIndex) => {
          const isVisible = lineIndex < visibleLines
          const isCurrent = lineIndex === visibleLines
          const displayText =
            isVisible ? line.text : isCurrent ? line.text.slice(0, currentChar) : ''

          return (
            <div key={lineIndex} className="flex">
              <span className="mr-4 w-6 text-right text-gray-600 select-none">
                {lineIndex + 1}
              </span>
              <span className={`${line.color} min-h-[1.5em]`}>
                {displayText}
                {isCurrent && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block h-4 w-2 bg-accent align-middle"
                  />
                )}
              </span>
            </div>
          )
        })}

        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex items-center gap-2 text-green-400"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-led-pulse" />
            <span>Agent deployed successfully</span>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
