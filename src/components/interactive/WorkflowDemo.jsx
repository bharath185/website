import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../ui/Card.jsx'
import { FileText, Bot, CheckCircle, Database, Mail } from 'lucide-react'

const steps = [
  { id: 1, icon: FileText, label: 'Invoice Received', color: 'text-accent' },
  { id: 2, icon: Bot, label: 'AI Extracts Data', color: 'text-accent' },
  { id: 3, icon: Database, label: 'Sync to ERP', color: 'text-accent' },
  { id: 4, icon: Mail, label: 'Notify Team', color: 'text-accent' },
  { id: 5, icon: CheckCircle, label: 'Done', color: 'text-green-500' },
]

export function WorkflowDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsRunning(false)
          return 0
        }
        return prev + 1
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [isRunning])

  const runDemo = () => {
    setActiveStep(0)
    setIsRunning(true)
  }

  return (
    <Card elevated className="p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-sans text-xl font-bold text-text text-emboss">
            Live Workflow Demo
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-text-muted">
            ACCOUNTS PAYABLE AUTOMATION
          </p>
        </div>
        <button
          type="button"
          onClick={runDemo}
          disabled={isRunning}
          className="rounded-lg bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_4px_8px_rgba(166,50,60,0.4)] transition-all hover:brightness-110 active:translate-y-0.5 disabled:opacity-50"
        >
          {isRunning ? 'Running...' : 'Run Demo'}
        </button>
      </div>

      <div className="relative">
        {/* Progress pipe */}
        <div className="absolute top-7 left-0 right-0 hidden h-2 rounded-full bg-muted shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] md:block" />
        <motion.div
          className="absolute top-7 left-0 hidden h-2 rounded-full bg-accent md:block"
          initial={{ width: '0%' }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index <= activeStep
            const isCurrent = index === activeStep && isRunning

            return (
              <motion.div
                key={step.id}
                className="flex flex-col items-center text-center"
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.6, repeat: isCurrent ? Infinity : 0 }}
              >
                <motion.div
                  className={`flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-industrial ${
                    isActive ? 'ring-2 ring-accent ring-offset-2' : ''
                  }`}
                  animate={
                    isActive
                      ? { boxShadow: '0 0 20px 4px rgba(255,71,87,0.3)' }
                      : {}
                  }
                >
                  <Icon
                    size={24}
                    className={`${isActive ? step.color : 'text-text-muted'} transition-colors`}
                    strokeWidth={1.5}
                  />
                </motion.div>
                <span
                  className={`mt-3 font-mono text-[10px] font-bold uppercase tracking-widest ${
                    isActive ? 'text-text' : 'text-text-muted'
                  }`}
                >
                  {step.label}
                </span>

                <AnimatePresence>
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-accent animate-led-pulse"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-[#2d3436] p-4 font-mono text-xs text-green-400 shadow-industrial-recessed">
        <span className="text-gray-500">&gt;</span>{' '}
        <AnimatePresence mode="wait">
          <motion.span
            key={activeStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activeStep === 0 && !isRunning
              ? 'System ready. Press RUN DEMO to start.'
              : steps[activeStep]?.label || 'Workflow complete.'}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1 inline-block h-3 w-2 animate-blink bg-green-400" />
      </div>
    </Card>
  )
}
