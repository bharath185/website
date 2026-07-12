'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Workflow, Code2, Smartphone, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServicesBentoProps {
  activeNode: number | null
  setActiveNode: (id: number | null) => void
}

interface ServiceCard {
  id: number
  sectionId: string
  title: string
  headline: string
  description: string
  features: string[]
  icon: any
  techs: string[]
  glowRGB: string
  themeClass: string
}

export function ServicesBento({ activeNode, setActiveNode }: ServicesBentoProps) {
  const cards: ServiceCard[] = [
    {
      id: 1,
      sectionId: 'service-ai',
      title: 'Cognitive AI Systems',
      headline: 'Autonomous Operations & Agents',
      description: 'Architecting custom LLM integrations, autonomous task agents, and intelligent RAG systems that execute business operations and self-correct over time.',
      features: ['Autonomous Reasoning Agents', 'Self-Optimizing Knowledge Bases', 'Interactive Chat Interface Layers'],
      icon: Bot,
      techs: ['LangChain', 'LlamaIndex', 'OpenAI', 'Anthropic', 'Vector DBs'],
      glowRGB: '13, 91, 58', // Forest Green
      themeClass: 'glass-panel-neon-forest border-[#0D5B3A]/20'
    },
    {
      id: 2,
      sectionId: 'service-business',
      title: 'Workflow Orchestration',
      headline: 'Repetitive Task Elimination',
      description: 'Mapping, connecting, and automating complex operations: invoice ingest pipelines, cross-CRM synchronizations, and smart database triggers.',
      features: ['ERP & Legacy Platform Syncs', 'Real-Time Invoicing Automation', 'Industrial IoT/SCADA Alert Triggers'],
      icon: Workflow,
      techs: ['Node.js', 'Python', 'n8n', 'Make.com', 'APIs'],
      glowRGB: '200, 168, 112', // Muted Gold
      themeClass: 'glass-panel-neon-gold border-[#C8A870]/20'
    },
    {
      id: 3,
      sectionId: 'service-software',
      title: 'Full-Stack Engineering',
      headline: 'High-Performance Web Applications',
      description: 'Building blazing-fast, secure, and fully-typed web products tailored to scale. From state management to responsive, beautiful interfaces. (Development-only; hosting/infrastructure not provided).',
      features: ['Optimized App Routers', 'Scalable GraphQL/REST APIs', 'Real-Time WebSockets Systems'],
      icon: Code2,
      techs: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'AWS / Docker'],
      glowRGB: '200, 168, 112', // Muted Gold
      themeClass: 'glass-panel-neon-gold border-[#C8A870]/20'
    },
    {
      id: 4,
      sectionId: 'service-amc',
      title: 'Mobile Ecosystem AMC',
      headline: 'Proactive App Maintenance',
      description: 'Annual Maintenance Contracts ensuring 99.9% uptime. Constant operating system updates, bug diagnostics, security hardening, and performance tuning.',
      features: ['iOS & Android Version Patches', 'Real-Time Crash Tracking', 'Bi-Annual Performance Audits'],
      icon: Smartphone,
      techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase / Sentry'],
      glowRGB: '13, 91, 58', // Forest Green
      themeClass: 'glass-panel-neon-forest border-[#0D5B3A]/20'
    }
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32 pointer-events-none" id="services">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="mb-16 flex flex-col items-start gap-4 md:mb-24 pointer-events-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-1.5 backdrop-blur-md">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-cyan">Capabilities</span>
          </div>
          <h2 className="max-w-xl font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            Digital Architecture <br/>
            <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">Engineered to Scale.</span>
          </h2>
          <p className="max-w-lg font-mono text-sm leading-relaxed text-text-muted">
            Hover over a capabilities card to light up its corresponding node path in the 3D Digital Nexus. *(Custom software development only; hosting and cloud infrastructure are not provided).*
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:gap-8 pointer-events-auto">
          {cards.map((card, index) => {
            const Icon = card.icon
            const isHovered = activeNode === card.id

            // Apply different column spans to make a beautiful bento layout
            // Card 1: 3 columns, Card 2: 3 columns, Card 3: 3 columns, Card 4: 3 columns (standard)
            // Or asymmetric: Card 1 (colspan 3), Card 2 (colspan 3), Card 3 (colspan 2), Card 4 (colspan 4)
            const colSpan = index === 0 || index === 1 ? 'md:col-span-3' : index === 2 ? 'md:col-span-2' : 'md:col-span-4'

            return (
              <motion.div
                key={card.id}
                id={card.sectionId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setActiveNode(card.id)}
                onMouseLeave={() => setActiveNode(null)}
                onMouseMove={handleMouseMove}
                className={cn(
                  "relative group overflow-hidden rounded-3xl p-8 border transition-all duration-500",
                  card.themeClass,
                  isHovered && "scale-[1.01] -translate-y-1 bg-white/[0.03]",
                  colSpan
                )}
                style={{
                  '--glow-color': card.glowRGB
                } as React.CSSProperties}
              >
                {/* Radial Glow follow mouse overlay */}
                <div 
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(${card.glowRGB}, 0.08), transparent 70%)`
                  }}
                />

                {/* Card Content */}
                <div className="relative z-10 flex h-full flex-col justify-between min-h-[300px]">
                  
                  {/* Top Row: Icon and Title */}
                  <div>
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all duration-500 group-hover:scale-115"
                        style={{
                          boxShadow: isHovered ? `0 0 25px 2px rgba(${card.glowRGB}, 0.2)` : 'none',
                          borderColor: isHovered ? `rgba(${card.glowRGB}, 0.4)` : 'rgba(255,255,255,0.05)'
                        }}
                      >
                        <Icon 
                          size={24} 
                          style={{
                            color: `rgb(${card.glowRGB})`
                          }} 
                        />
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight 
                          size={20}
                          style={{
                            color: `rgb(${card.glowRGB})`
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                        Service 0{card.id}
                      </span>
                      <h3 className="mt-2 font-heading text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70">
                        {card.title}
                      </h3>
                      <p className="mt-1 font-sans text-sm font-semibold tracking-wide" style={{ color: `rgb(${card.glowRGB})` }}>
                        {card.headline}
                      </p>
                      <p className="mt-4 font-sans text-sm leading-relaxed text-text-muted group-hover:text-gray-300">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Key deliverables & Tech Tags */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <ul className="flex flex-col gap-2">
                      {card.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
                          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: `rgb(${card.glowRGB})` }} />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {card.techs.map((tech) => (
                        <span 
                          key={tech}
                          className="rounded-full bg-white/5 border border-white/5 px-2.5 py-0.5 font-mono text-[10px] text-text-muted group-hover:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
