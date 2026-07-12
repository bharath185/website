'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScramblerProps {
  value: string
  trigger: boolean
  delay?: number
}

function ScrambleStat({ value, trigger, delay = 0 }: ScramblerProps) {
  const [displayText, setDisplayText] = useState('')
  const chars = '0123456789X$/%+_#!@?&'

  useEffect(() => {
    if (!trigger) return

    let isCancelled = false
    const run = async () => {
      // Small initial delay
      await new Promise((r) => setTimeout(r, delay))
      
      const target = value
      const length = target.length
      let currentIteration = 0
      const maxIterations = length * 3 // iterations per char
      
      const interval = setInterval(() => {
        if (isCancelled) return
        
        let result = ''
        for (let i = 0; i < length; i++) {
          // If we have resolved this position
          if (currentIteration > i * 3) {
            result += target[i]
          } else {
            // Otherwise show random character
            result += chars[Math.floor(Math.random() * chars.length)]
          }
        }
        
        setDisplayText(result)
        currentIteration++
        
        if (currentIteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(target)
        }
      }, 40) // speed

      return () => {
        clearInterval(interval)
      }
    }

    const cleanupPromise = run()
    return () => {
      isCancelled = true
      cleanupPromise.then(cleanup => cleanup && cleanup())
    }
  }, [value, trigger, delay])

  return <span>{displayText || value}</span>
}

export function AboutScramble() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const stats = [
    { value: '99.99%', label: 'Systems Uptime Guarantee', desc: 'AMC standard ensuring high availability platforms.' },
    { value: '2.4M+', label: 'Automated Operations Annually', desc: 'Triage, Syncs, and Invoices handled by AI Agents.' },
    { value: '800+', label: 'Engineering Hours Saved Monthly', desc: 'Eliminating manual administrative data tasks.' },
    { value: '340%', label: 'Average Client Automation ROI', desc: 'Measured in operating cost reduction within 90 days.' },
  ]

  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32 pointer-events-none" id="about" ref={containerRef}>
      
      {/* Background neon orb glow */}
      <div className="absolute top-1/2 left-10 -z-10 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-20">
          
          {/* Left Column: Asymmetric Brand Description */}
          <div className="flex flex-col items-start gap-6 lg:col-span-7 pointer-events-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 backdrop-blur-md">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-purple">The Studio</span>
            </div>
            
            <h2 className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Merging Algorithms <br/>
              <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">With Automation.</span>
            </h2>

            <div className="mt-4 flex flex-col gap-6 font-sans text-base leading-relaxed text-text-muted md:text-lg">
              <p>
                Prigenix is a boutique software engineering studio. We build custom digital systems that help enterprise businesses and high-growth startups replace legacy manual processes with highly secure, automated infrastructure.
              </p>
              <p>
                We do not deal in generic templates. Our designs are engineered from the ground up, linking high-performance Next.js architectures, secure database configurations, and autonomous AI pipelines into a single unified workspace.
              </p>
            </div>

            {/* Simulated Terminal Overlay to add visual premium flair */}
            <div className="mt-8 w-full overflow-hidden rounded-2xl border border-white/5 bg-[#0D0D11] font-mono text-[11px] leading-relaxed text-white/40 shadow-2xl">
              <div className="flex items-center justify-between bg-white/[0.02] px-4 py-2 border-b border-white/5">
                <span className="text-white/60">terminal_session_logger.log</span>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500/50" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
                  <span className="h-2 w-2 rounded-full bg-green-500/50" />
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1 text-[10px] md:text-xs">
                <div><span className="text-accent-cyan">[SYSTEM]</span> Initializing connection to Prigenix Digital Nexus...</div>
                <div><span className="text-accent-cyan">[SYSTEM]</span> Core loading active components: Next.js + Three.js + GSAP.</div>
                <div><span className="text-accent-purple">[PIPELINE]</span> Neural nodes connected successfully: 4/4 service gates open.</div>
                <div><span className="text-[#10B981]">[OK]</span> Uptime diagnostics: 99.99% nominal efficiency. Ready for operation.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Scrambled Statistics Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 pointer-events-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel relative flex flex-col gap-2 rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all duration-300 hover:bg-white/[0.02]"
              >
                <div className="font-heading text-4xl font-bold tracking-tight text-white glow-text-forest md:text-5xl">
                  {/* Scramble triggers when container enters viewport */}
                  <ScrambleStat value={stat.value} trigger={isInView} delay={idx * 150} />
                </div>
                <div className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                  {stat.label}
                </div>
                <div className="mt-1 font-sans text-xs text-text-muted leading-relaxed">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
