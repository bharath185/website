import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Workflow,
  Factory,
  Code2,
  Rocket,
  TrendingUp,
  Zap,
  Database,
  Shield,
  CheckCircle,
  Layers,
} from 'lucide-react'
import { DynamicAIVisual } from './DynamicAIVisual.jsx'
import { SelectionVisual } from './SelectionVisual.jsx'
import { SelectionDetailView } from './SelectionDetailView.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] },
  },
}

function WelcomeVisual() {
  return (
    <motion.div
      key="welcome"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full flex-col items-center justify-center"
    >
      <motion.div
        variants={itemVariants}
        animate={{
          rotate: [0, 8, -8, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-background shadow-industrial-floating md:h-36 md:w-36"
      >
        <div className="absolute inset-0 rounded-3xl bg-accent/5 animate-border-glow" />
        <img src="/logo.svg" alt="Prigenix" className="relative h-20 w-20 md:h-24 md:w-24" />
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="text-center font-sans text-3xl font-extrabold text-text text-emboss md:text-5xl"
      >
        PRIGENIX
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className="mt-6 flex gap-3"
      >
        {['Automate', 'Build', 'Scale'].map((word, i) => (
          <motion.span
            key={word}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            className="rounded-xl bg-background px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-accent shadow-industrial md:text-xs"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

function WhatIsVisual() {
  const cards = [
    { icon: Bot, title: 'AI Agents', desc: 'Smart decision makers', color: 'from-red-500 to-pink-500' },
    { icon: Workflow, title: 'Workflows', desc: 'Repeatable pipelines', color: 'from-blue-500 to-cyan-500' },
    { icon: Factory, title: 'Industrial IoT', desc: 'Factory intelligence', color: 'from-green-500 to-emerald-500' },
    { icon: Code2, title: 'Custom Software', desc: 'Tailored products', color: 'from-purple-500 to-violet-500' },
  ]

  return (
    <motion.div
      key="what-is"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full items-center justify-center px-4"
    >
      <div className="grid w-full max-w-lg grid-cols-2 gap-4 md:gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ scale: 1.04, y: -5, rotate: index % 2 === 0 ? -1 : 1 }}
              className="group relative overflow-hidden rounded-2xl bg-background p-5 shadow-industrial md:p-6"
            >
              <div className={`absolute top-0 right-0 h-20 w-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-xl transition-opacity group-hover:opacity-20`} />
              <Icon size={32} className="mb-3 text-accent" strokeWidth={1.5} />
              <span className="block font-sans text-base font-bold text-text text-emboss md:text-lg">
                {card.title}
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-text-muted md:text-xs">
                {card.desc}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function AutomateVisual() {
  const steps = [
    { label: 'Capture', icon: Database, desc: 'Email / Form / File' },
    { label: 'Process', icon: Bot, desc: 'AI extracts & decides' },
    { label: 'Validate', icon: Shield, desc: 'Rules & compliance' },
    { label: 'Execute', icon: CheckCircle, desc: 'Sync & notify' },
  ]

  return (
    <motion.div
      key="automate"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full flex-col items-center justify-center px-6"
    >
      <div className="relative w-full max-w-xl">
        <div className="absolute top-10 left-0 right-0 hidden h-2 rounded-full bg-muted shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] md:block" />
        <motion.div
          className="absolute top-10 left-0 hidden h-2 rounded-full bg-gradient-to-r from-accent to-orange-400 md:block"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.label}
                variants={itemVariants}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(255,71,87,0)',
                      '0 0 0 15px rgba(255,71,87,0.12)',
                      '0 0 0 0 rgba(255,71,87,0)',
                    ],
                  }}
                  transition={{ duration: 2, delay: index * 0.4, repeat: Infinity }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-industrial-floating md:h-20 md:w-20"
                >
                  <Icon size={28} className="text-accent" strokeWidth={1.5} />
                </motion.div>
                <span className="mt-3 text-center font-sans text-sm font-bold text-text text-emboss">
                  {step.label}
                </span>
                <span className="mt-1 text-center font-mono text-[9px] uppercase tracking-widest text-text-muted md:text-[10px]">
                  {step.desc}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-10 rounded-2xl bg-background px-6 py-3 shadow-industrial"
      >
        <span className="font-mono text-sm text-text-muted">
          Example: Invoice → AI Extract → ERP Sync → Slack Notify
        </span>
      </motion.div>
    </motion.div>
  )
}

function StackVisual() {
  const orbitItems = [
    { name: 'React', angle: 0, color: 'text-blue-400' },
    { name: 'Node', angle: 51, color: 'text-green-400' },
    { name: 'Python', angle: 103, color: 'text-yellow-400' },
    { name: 'AWS', angle: 154, color: 'text-orange-400' },
    { name: 'Docker', angle: 206, color: 'text-blue-500' },
    { name: 'K8s', angle: 257, color: 'text-cyan-400' },
    { name: 'AI', angle: 309, color: 'text-accent' },
  ]

  return (
    <motion.div
      key="stack"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full flex-col items-center justify-center"
    >
      <div className="relative h-56 w-56 md:h-72 md:w-72">
        <div className="absolute inset-0 rounded-full border border-dashed border-border-dark/20" />
        <div className="absolute inset-[15%] rounded-full border border-dashed border-border-dark/10" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[25%] flex items-center justify-center rounded-full bg-background shadow-industrial-floating"
        >
          <Code2 size={36} className="text-accent" strokeWidth={1.5} />
        </motion.div>

        {orbitItems.map((item) => {
          const radius = 44
          const rad = (item.angle * Math.PI) / 180
          const x = 50 + radius * Math.cos(rad)
          const y = 50 + radius * Math.sin(rad)
          return (
            <motion.div
              key={item.name}
              variants={itemVariants}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-background shadow-industrial md:h-14 md:w-14"
              >
                <span className={`font-mono text-[8px] font-bold md:text-[10px] ${item.color}`}>
                  {item.name}
                </span>
              </motion.div>
            </motion.div>
          )
        })}

        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
          {orbitItems.map((item) => {
            const radius = 44
            const rad = (item.angle * Math.PI) / 180
            const x2 = 50 + radius * Math.cos(rad)
            const y2 = 50 + radius * Math.sin(rad)
            return (
              <line
                key={item.name}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(163,177,198,0.25)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            )
          })}
        </svg>
      </div>
    </motion.div>
  )
}

function ProcessVisual() {
  const steps = [
    { icon: TrendingUp, label: 'Discover', desc: 'Audit & map' },
    { icon: Layers, label: 'Design', desc: 'Architecture' },
    { icon: Code2, label: 'Build', desc: '2-week sprints' },
    { icon: Rocket, label: 'Deploy', desc: 'Go live' },
    { icon: Zap, label: 'Optimize', desc: 'Tune & scale' },
  ]

  return (
    <motion.div
      key="process"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full flex-col items-center justify-center px-4"
    >
      <div className="grid w-full max-w-2xl grid-cols-5 gap-2 md:gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.label}
              variants={itemVariants}
              className="relative flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-industrial-floating md:h-16 md:w-16"
              >
                <Icon size={22} className="text-accent" strokeWidth={1.5} />
              </motion.div>
              <span className="mt-2 text-center font-sans text-xs font-bold text-text text-emboss md:text-sm">
                {step.label}
              </span>
              <span className="text-center font-mono text-[8px] uppercase tracking-wider text-text-muted md:text-[10px]">
                {step.desc}
              </span>
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.25 }}
                  className="absolute top-6 left-1/2 h-1 w-full origin-left bg-gradient-to-r from-accent to-orange-400 md:top-8"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function IndustrialVisual() {
  const sensors = [
    { label: 'Temperature', value: '72°C', status: 'normal' },
    { label: 'Pressure', value: '4.2 bar', status: 'normal' },
    { label: 'Vibration', value: '0.3g', status: 'warning' },
  ]

  return (
    <motion.div
      key="industrial"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full flex-col items-center justify-center px-6"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-white/5 bg-foreground p-4 shadow-industrial-floating md:p-5">
        <div className="scanlines pointer-events-none absolute inset-0 opacity-20" />
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Live Floor Data</span>
          <div className="flex h-2 w-2 animate-led-pulse rounded-full bg-green-500" />
        </div>
        <div className="flex h-32 items-end justify-around md:h-40">
          {[35, 58, 45, 75, 62, 88, 71, 95, 82, 91].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
              className={`w-6 rounded-t md:w-8 ${i >= 7 ? 'bg-accent' : 'bg-green-500'}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid w-full max-w-lg grid-cols-3 gap-3">
        {sensors.map((sensor) => (
          <motion.div
            key={sensor.label}
            variants={itemVariants}
            className="rounded-xl bg-background p-3 shadow-industrial text-center md:p-4"
          >
            <div className="font-mono text-[9px] uppercase tracking-widest text-text-muted md:text-[10px]">
              {sensor.label}
            </div>
            <div className="font-mono text-lg font-bold text-text md:text-xl">{sensor.value}</div>
            <div
              className={`mx-auto mt-2 h-2 w-2 rounded-full ${
                sensor.status === 'warning' ? 'bg-yellow-400' : 'bg-green-500 animate-led-pulse'
              }`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ResultsVisual() {
  const metrics = [
    { label: 'Tasks Automated', value: '2.4M', suffix: '+' },
    { label: 'Hours Saved / Mo', value: '847', suffix: 'h' },
    { label: 'Avg ROI', value: '340', suffix: '%' },
  ]

  return (
    <motion.div
      key="results"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex h-full flex-col items-center justify-center px-4"
    >
      <div className="grid w-full max-w-2xl gap-4 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -6 }}
            className="relative overflow-hidden rounded-2xl bg-background p-6 text-center shadow-industrial-floating md:p-8"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
              index === 0 ? 'from-accent to-orange-400' : index === 1 ? 'from-green-500 to-emerald-400' : 'from-blue-500 to-cyan-400'
            }`} />
            <div className="font-mono text-3xl font-bold text-accent md:text-4xl">
              {metric.value}{metric.suffix}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-text-muted md:text-xs">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-6 flex items-center gap-3 rounded-2xl bg-background px-6 py-3 shadow-industrial"
      >
        <div className="h-3 w-3 animate-led-pulse rounded-full bg-green-500" />
        <span className="font-mono text-sm text-text md:text-base">99.7% uptime across production deployments</span>
      </motion.div>
    </motion.div>
  )
}

function AIResponseVisual({ response, question, selectionData, selectedOptionId, detailOpen, onSelectOption, onInterested }) {
  if (selectionData?.type === 'selection' && Array.isArray(selectionData.options)) {
    const selectedOption = selectionData.options.find((o) => o.id === selectedOptionId)

    if (detailOpen && selectedOption) {
      return (
        <SelectionDetailView
          option={selectedOption}
          onBack={onSelectOption ? () => onSelectOption(null) : undefined}
          onInterested={() => onInterested?.(selectedOption)}
        />
      )
    }

    return (
      <SelectionVisual
        options={selectionData.options}
        question={question}
        onSelect={onSelectOption}
      />
    )
  }

  return <DynamicAIVisual response={response} question={question} />
}

const visuals = {
  welcome: WelcomeVisual,
  'what-is': WhatIsVisual,
  automate: AutomateVisual,
  stack: StackVisual,
  process: ProcessVisual,
  industrial: IndustrialVisual,
  results: ResultsVisual,
}

export function VisualStage({
  topic,
  aiResponse,
  aiQuestion,
  selectionData,
  selectedOptionId,
  detailOpen,
  onSelectOption,
  onInterested,
}) {
  if (topic === 'ai-response' && aiResponse) {
    const visualKey = selectionData?.type === 'selection'
      ? `selection-${detailOpen ? selectedOptionId || 'detail' : 'list'}`
      : aiResponse

    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden p-2 md:p-4">
        <AnimatePresence mode="wait">
          <AIResponseVisual
            key={visualKey}
            response={aiResponse}
            question={aiQuestion}
            selectionData={selectionData}
            selectedOptionId={selectedOptionId}
            detailOpen={detailOpen}
            onSelectOption={onSelectOption}
            onInterested={onInterested}
          />
        </AnimatePresence>
      </div>
    )
  }

  const Visual = visuals[topic] || WelcomeVisual

  return (
    <div className="flex h-full w-full items-center justify-center p-2 md:p-4">
      <AnimatePresence mode="wait">
        <Visual key={topic} />
      </AnimatePresence>
    </div>
  )
}
