import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card.jsx'

export function ROICalculator() {
  const [hoursSaved, setHoursSaved] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(75)
  const [tasksAutomated, setTasksAutomated] = useState(15)

  const monthlySavings = hoursSaved * hourlyRate
  const yearlySavings = monthlySavings * 12
  const efficiencyGain = Math.min(tasksAutomated * 8, 95)

  const [animatedSavings, setAnimatedSavings] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedSavings(yearlySavings), 50)
    return () => clearTimeout(timeout)
  }, [yearlySavings])

  return (
    <Card elevated className="p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-sans text-xl font-bold text-text text-emboss">
            Automation ROI Calculator
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-text-muted">
            ESTIMATE YOUR ANNUAL SAVINGS
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,71,87,0.4)]">
          <span className="font-mono text-sm font-bold text-white">$</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-widest text-text-muted">
            <span>Hours saved / week</span>
            <span className="text-accent">{hoursSaved}h</span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            value={hoursSaved}
            onChange={(e) => setHoursSaved(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>

        <div>
          <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-widest text-text-muted">
            <span>Average hourly cost</span>
            <span className="text-accent">${hourlyRate}</span>
          </div>
          <input
            type="range"
            min="25"
            max="250"
            step="5"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>

        <div>
          <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-widest text-text-muted">
            <span>Repetitive tasks / day</span>
            <span className="text-accent">{tasksAutomated}</span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            value={tasksAutomated}
            onChange={(e) => setTasksAutomated(Number(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <motion.div
          key={animatedSavings}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="rounded-xl bg-[#2d3436] p-4 text-center shadow-industrial-recessed"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Yearly Savings
          </div>
          <motion.div
            className="font-mono text-3xl font-bold text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ${animatedSavings.toLocaleString()}
          </motion.div>
        </motion.div>

        <motion.div
          className="rounded-xl bg-[#2d3436] p-4 text-center shadow-industrial-recessed"
          whileHover={{ scale: 1.02 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Efficiency Gain
          </div>
          <div className="font-mono text-3xl font-bold text-green-400">
            {efficiencyGain}%
          </div>
        </motion.div>
      </div>
    </Card>
  )
}
