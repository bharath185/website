'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, FileText, Layers, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

// Register ScrollTrigger with GSAP on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CaseStudy {
  id: number
  title: string
  client: string
  tag: string
  description: string
  metrics: string
  subMetric: string
  icon: any
  accentRGB: string
  borderClass: string
}

export function CaseStudiesScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const cases: CaseStudy[] = [
    {
      id: 1,
      title: 'Apex Logistics ERP Automation Suite',
      client: 'Apex Logistics Corp',
      tag: 'AI & Business Automation',
      description: 'Refined end-to-end supply chain document processing by constructing custom LLM parsing scripts. Connects physical freight manifest images directly to legacy SAP ERP systems.',
      metrics: '95% Reduction',
      subMetric: 'in manual database data entry errors',
      icon: Layers,
      accentRGB: '13, 91, 58', // Forest Green
      borderClass: 'border-accent-purple/20'
    },
    {
      id: 2,
      title: 'Horizon Capital Trading Engine Interface',
      client: 'Horizon Invest LLC',
      tag: 'Custom Full-Stack Development',
      description: 'Built a real-time portfolio allocation board. Engineered React interfaces with low-latency client-side rendering connecting to Rust microservices via WebSockets.',
      metrics: '80ms Latency',
      subMetric: 'threshold under 20k active websocket connections',
      icon: FileText,
      accentRGB: '200, 168, 112', // Muted Gold
      borderClass: 'border-accent-cyan/20'
    },
    {
      id: 3,
      title: 'CarePoint Labs Telehealth App AMC',
      client: 'CarePoint Healthcare',
      tag: 'Mobile App Support & AMC',
      description: 'Continuous annual maintenance and optimization of iOS and Android applications. Refactored Bluetooth syncing protocols for heartbeat wearable sensors.',
      metrics: '99.98% Uptime',
      subMetric: 'average runtime across 150k monthly active devices',
      icon: Smartphone,
      accentRGB: '13, 91, 58', // Forest Green
      borderClass: 'border-accent-purple/20'
    }
  ]

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const track = trackRef.current
    const container = containerRef.current

    // GSAP context helps with clean initialization and automated unmount reverts
    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth
      const amountToScroll = trackWidth - window.innerWidth

      gsap.to(track, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${trackWidth}`,
          invalidateOnRefresh: true,
        }
      })
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div id="cases" ref={containerRef} className="relative bg-[#070709] overflow-hidden pointer-events-none">
      
      {/* Dynamic Background Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Slide Track Container */}
      <div className="flex h-screen items-center sticky top-0">
        <div ref={trackRef} className="flex gap-8 px-12 md:px-24 whitespace-nowrap">
          
          {/* Header Panel */}
          <div className="flex w-[80vw] max-w-[500px] shrink-0 flex-col justify-center whitespace-normal md:w-[60vw] pointer-events-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-1.5 backdrop-blur-md self-start">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-cyan">Case Studies</span>
            </div>
            <h2 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Proven <br/>
              <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">Nexus Deployments.</span>
            </h2>
            <p className="mt-6 font-sans text-base text-text-muted leading-relaxed">
              Scroll down to horizontally sweep through our recent software and automation systems deliverables.
            </p>
            <div className="mt-8 flex items-center gap-3 font-mono text-xs text-accent-cyan">
              <span>Scroll down to slide</span>
              <ArrowRight size={14} className="animate-bounce-horizontal" />
            </div>
          </div>

          {/* Cards Panels */}
          {cases.map((cs) => {
            const Icon = cs.icon
            return (
              <div 
                key={cs.id}
                className={cn(
                  "case-card flex w-[85vw] max-w-[800px] shrink-0 items-center justify-between rounded-3xl p-8 md:p-12 border whitespace-normal bg-[#0E0E12]/50 backdrop-blur-md select-none pointer-events-auto",
                  cs.borderClass
                )}
              >
                <div className="flex flex-col gap-6 md:gap-8 justify-between h-full w-full">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                        Project 0{cs.id} — {cs.client}
                      </span>
                      <h3 className="mt-1 font-heading text-2xl font-bold text-white md:text-3xl">
                        {cs.title}
                      </h3>
                    </div>
                    <div 
                      className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/5"
                      style={{ color: `rgb(${cs.accentRGB})` }}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Body description */}
                  <div>
                    <span 
                      className="inline-block rounded-full bg-white/5 border border-white/5 px-3 py-1 font-mono text-[10px]"
                      style={{ color: `rgb(${cs.accentRGB})`, borderColor: `rgba(${cs.accentRGB}, 0.2)` }}
                    >
                      {cs.tag}
                    </span>
                    <p className="mt-4 font-sans text-sm md:text-base leading-relaxed text-text-muted">
                      {cs.description}
                    </p>
                  </div>

                  {/* Metrics Banner */}
                  <div 
                    className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl p-6 border border-white/5"
                    style={{ background: `linear-gradient(135deg, rgba(${cs.accentRGB}, 0.05), transparent)` }}
                  >
                    <div 
                      className="font-heading text-3xl font-extrabold tracking-tight shrink-0"
                      style={{ 
                        color: `rgb(${cs.accentRGB})`,
                        textShadow: `0 0 20px rgba(${cs.accentRGB}, 0.5)`
                      }}
                    >
                      {cs.metrics}
                    </div>
                    <div className="font-mono text-xs text-text-muted leading-snug">
                      {cs.subMetric}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}
