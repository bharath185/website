'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, ArrowRight } from 'lucide-react'

export function ContactCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', service: 'ai' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    
    setIsSubmitting(true)
    // Simulate API request delay
    await new Promise((r) => setTimeout(r, 1200))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section className="relative px-6 py-20 md:px-12 md:py-32 pointer-events-none" id="contact">
      {/* Glow background orb */}
      <div className="absolute bottom-10 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-16 border border-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.6)] pointer-events-auto">
          
          {/* Neon side border trim */}
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-accent-purple to-accent-cyan" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-1.5 backdrop-blur-md">
                    <Mail size={12} className="text-accent-cyan" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-cyan">Connect</span>
                  </div>
                  
                  <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                    Begin Your <br/>
                    <span className="bg-gradient-to-r from-accent-purple to-accent-cyan bg-clip-text text-transparent">Digital Transformation.</span>
                  </h2>
                  <p className="mt-4 font-sans text-sm text-text-muted">
                    Submit your details and project goals below. Our product engineers will review your request and schedule a technical briefing within 24 hours.
                  </p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jordan Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-accent-purple/50 focus:bg-white/[0.08]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Corporate Email</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. j.miller@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-accent-purple/50 focus:bg-white/[0.08]"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Selected Nexus Division</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="rounded-xl border border-white/5 bg-[#0D0D11] px-4 py-3 font-sans text-sm text-white outline-none transition-colors focus:border-accent-purple/50 focus:bg-white/[0.08] cursor-pointer"
                    >
                      <option value="ai">Cognitive AI Systems (Division 01)</option>
                      <option value="business">Workflow Orchestration (Division 02)</option>
                      <option value="software">Full-Stack Development (Division 03)</option>
                      <option value="amc">Mobile Ecosystem AMC (Division 04)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Project Blueprint Brief</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your requirements, current tech stack, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-accent-purple/50 focus:bg-white/[0.08] resize-none"
                    />
                  </div>

                  <div className="mt-4 sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan px-8 py-3.5 font-sans text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting Stream...' : 'Transmit Consultation Request'}
                      <Send size={12} className="animate-pulse" />
                    </button>
                  </div>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-cyan/15 border border-accent-cyan text-accent-cyan">
                  <CheckCircle2 size={32} />
                </div>
                
                <h3 className="mt-8 font-heading text-3xl font-bold text-white">
                  Transmission Secure.
                </h3>
                <p className="mt-4 max-w-md font-sans text-sm text-text-muted leading-relaxed">
                  Greetings, <span className="text-white font-semibold">{formData.name}</span>. Your data packet was received and indexed. A systems engineer will contact you shortly at <span className="text-white font-semibold">{formData.email}</span>.
                </p>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 glass-panel flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/20"
                >
                  Send another transmission <ArrowRight size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
