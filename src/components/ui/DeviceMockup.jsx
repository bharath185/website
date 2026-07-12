import { motion } from 'framer-motion'
import { LED } from './LED.jsx'
import {
  Bot,
  Zap,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield,
  Activity,
} from 'lucide-react'

const workflowSteps = [
  { label: 'Invoice scanned', status: 'complete' },
  { label: 'AI extracted data', status: 'complete' },
  { label: 'Validated against ERP', status: 'complete' },
  { label: 'Approved for payment', status: 'active' },
]

const metrics = [
  { label: 'AI Agents', value: '24', icon: Bot, color: 'text-accent' },
  { label: 'Runs / Day', value: '3.2k', icon: Zap, color: 'text-yellow-400' },
  { label: 'Hours Saved', value: '847', icon: Clock, color: 'text-accent' },
  { label: 'Success Rate', value: '99.7%', icon: CheckCircle, color: 'text-green-400' },
]

export function DeviceMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -8 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.9, ease: [0.175, 0.885, 0.32, 1.275] }}
      whileHover={{ rotateY: 3, rotateX: -2 }}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-full max-w-2xl"
    >
      {/* Outer industrial bezel */}
      <div className="relative rounded-[1.5rem] border-4 border-[#2d3436] bg-[#2d3436] p-4 shadow-industrial-floating">
        {/* Screw heads */}
        <div className="absolute top-3 left-3 h-3 w-3 rounded-full bg-[#3d4547] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),inset_-1px_-1px_2px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-[#3d4547] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),inset_-1px_-1px_2px_rgba(0,0,0,0.3)]" />
        <div className="absolute bottom-3 left-3 h-3 w-3 rounded-full bg-[#3d4547] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),inset_-1px_-1px_2px_rgba(0,0,0,0.3)]" />
        <div className="absolute bottom-3 right-3 h-3 w-3 rounded-full bg-[#3d4547] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),inset_-1px_-1px_2px_rgba(0,0,0,0.3)]" />

        {/* Inner screen */}
        <div className="relative overflow-hidden rounded-xl bg-[#15181a] shadow-industrial-recessed">
          {/* Subtle grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 z-10 scanlines opacity-20" />

          {/* Content */}
          <div className="relative z-0 p-5 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <LED color="green" pulsing />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-green-400">
                  AUTOMATION COMMAND CENTER
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-accent" />
                  <span className="font-mono text-[10px] text-gray-500">SECURE</span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">v3.1</span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-lg bg-[#1e2225] p-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"
                  >
                    <Icon size={16} className={`mb-2 ${metric.color}`} strokeWidth={1.5} />
                    <div className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                      {metric.label}
                    </div>
                    <div className={`font-mono text-lg font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Main dashboard area */}
            <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_1fr]">
              {/* Workflow panel */}
              <div className="rounded-lg bg-[#1e2225] p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Active Workflow
                  </span>
                  <Activity size={14} className="text-accent" />
                </div>

                <div className="space-y-3">
                  {workflowSteps.map((step, index) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.15 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          step.status === 'complete'
                            ? 'bg-green-500/20 text-green-400'
                            : step.status === 'active'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-gray-700 text-gray-500'
                        }`}
                      >
                        {step.status === 'complete' ? (
                          <CheckCircle size={12} />
                        ) : step.status === 'active' ? (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="h-2 w-2 rounded-full bg-accent"
                          />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-gray-500" />
                        )}
                      </div>
                      <span
                        className={`font-mono text-xs ${
                          step.status === 'active' ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                      {step.status === 'active' && (
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="ml-auto font-mono text-[9px] text-accent"
                        >
                          IN PROGRESS
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 w-full rounded-full bg-gray-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Chart panel */}
              <div className="rounded-lg bg-[#1e2225] p-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Throughput
                  </span>
                  <TrendingUp size={14} className="text-green-400" />
                </div>

                <div className="flex h-28 items-end gap-2">
                  {[35, 52, 48, 68, 58, 82, 75, 91, 86, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.6,
                        delay: 0.5 + i * 0.08,
                        ease: [0.175, 0.885, 0.32, 1.275],
                      }}
                      className={`flex-1 rounded-t ${
                        i >= 7 ? 'bg-accent' : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-3 flex justify-between font-mono text-[9px] text-gray-500">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>NOW</span>
                </div>
              </div>
            </div>

            {/* Log stream */}
            <div className="mt-4 rounded-lg bg-black/40 p-3 font-mono text-[10px] text-green-400 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">&gt;</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Workflow AP-2847 completed in 1.2s
                </motion.span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">&gt;</span>
                <span className="text-accent">Saved 14 manual minutes</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-gray-500">
                <span>&gt;</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block h-3 w-2 bg-green-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="mt-3 flex items-center justify-between rounded-lg bg-[#1a1d1f] px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-led-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">
              All systems operational
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
                className="h-1 w-6 rounded-full bg-accent/60"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
