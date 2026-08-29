'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Check, 
  Copy, 
  ExternalLink, 
  MessageSquare, 
  Building2,
  Navigation
} from 'lucide-react'

const TOPICS = [
  'Motorized Spindles',
  'CNC Rotary Tables',
  'Ball Screws & Bearings',
  'Defense Actuators',
  'Reconditioning / Scraping',
  'Other / Inquiry'
]

export default function ContactForm() {
  const [selectedTopic, setSelectedTopic] = useState<string>('Motorized Spindles')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct clean formatted WhatsApp message
    const waText = `*BMT BHARAT WEBSITE INQUIRY*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Email:* ${formData.email}%0A` +
      (formData.company ? `*Company:* ${formData.company}%0A` : '') +
      `*Requirement:* ${selectedTopic}%0A%0A` +
      `*Message:* ${formData.message}`

    window.open(`https://wa.me/919530208882?text=${waText}`, '_blank')
    setSubmitted(true)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bmt.abbas@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto w-full">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: COMPACT & SLEEK BRAND CONTACT CARD                           */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-5 bg-gradient-to-br from-[#0b1b4f] via-[#122f87] to-[#1a3fa8] rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-blue-950/15 flex flex-col justify-between relative overflow-hidden"
      >
        {/* Subtle Ambient Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          
          {/* Section Header */}
          <div className="space-y-1.5 border-b border-white/10 pb-4">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
              DIRECT DESK
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight font-display text-white">
              Contact Details
            </h2>
            <p className="text-xs text-blue-100/80 font-light leading-relaxed">
              Connect directly with our senior engineers and management in Bangalore.
            </p>
          </div>

          {/* Compact Channels List */}
          <div className="space-y-3.5 text-xs">
            
            {/* Phone */}
            <a
              href="tel:+919880464557"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-200 block">
                  Call Chief Engineer (Direct)
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono block">
                  +91-9880464557
                </span>
                <span className="text-[10px] text-blue-200/80 font-light truncate block">
                  Mr. Abbas Khan, Managing Director
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20would%20like%20to%20request%20a%20technical%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-300 block">
                  24x7 WhatsApp Desk
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono block">
                  +91-9530208882
                </span>
                <span className="text-[10px] text-blue-200/80 font-light truncate block">
                  Instant quotes &amp; drawings
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-300 shrink-0" />
            </a>

            {/* Email */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-200 block">
                  Official Email
                </span>
                <a 
                  href="mailto:bmt.sangeeta@gmail.com" 
                  className="text-xs font-bold text-white font-mono block hover:underline truncate"
                >
                  bmt.sangeeta@gmail.com
                </a>
                <a
                  href="mailto:bmt.abbas@gmail.com"
                  className="text-[10px] text-blue-200/80 font-light block truncate hover:underline"
                >
                  bmt.abbas@gmail.com
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer shrink-0"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Address */}
            <div className="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <div className="text-[11px] text-blue-100/90 leading-relaxed font-light">
                  <strong className="text-white block font-semibold">Works &amp; Plant:</strong>
                  155/59, Lakshmipura Main Road, 2nd Cross, Abbigere Industrial Area, Chikkabanavara Post, Bengaluru, Karnataka 560090
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-blue-200/80">GSTIN: 29AAUFB7927K1ZK</span>
                <a
                  href="https://maps.google.com/?q=155/59+Lakshmipura+Main+Road+2nd+Cross+Abbigere+Industrial+Area+Chikkabanavara+Post+Bengaluru+560090"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold inline-flex items-center gap-1 hover:underline"
                >
                  <span>Map</span>
                  <Navigation className="w-3 h-3 text-blue-300" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom plant status */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-blue-200/80 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bangalore Plant: ACTIVE</span>
          </div>
          <span>ISO 9001:2015</span>
        </div>

      </motion.div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: SIMPLE, ELEGANT & COMPACT RFQ FORM                          */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-lg shadow-slate-900/5 flex flex-col justify-between"
      >
        {submitted ? (
          <div className="text-center py-12 space-y-4 my-auto">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-[#122f87] flex items-center justify-center mx-auto border border-blue-200">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 uppercase font-display">
              Message Dispatched!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-light">
              Your inquiry has been compiled on WhatsApp. Our engineering team in Bangalore will respond with specs &amp; quotation shortly.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', phone: '', company: '', message: '' })
                }}
                className="px-5 py-2.5 bg-[#122f87] hover:bg-[#0e256b] text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-between h-full">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold text-[#122f87] uppercase tracking-widest bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                  QUICK RFQ
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Avg. Response: &lt; 2h
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight font-display mt-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-500 font-light">
                Fill in your requirements below for an instant quotation.
              </p>
            </div>

            {/* Requirement Pills */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-700 uppercase font-mono tracking-wider">
                Select Requirement
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TOPICS.map((topic) => {
                  const isSelected = selectedTopic === topic
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#122f87] text-white shadow-xs' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                      }`}
                    >
                      {topic}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2x2 Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Precision Engineering Ltd."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                Requirement Details *
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your machine specs (RPM, taper, dimensions, stroke, or services)..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 bg-[#122f87] hover:bg-[#0e256b] text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-blue-900/10 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.005] active:scale-[0.995]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message via WhatsApp</span>
              </button>
            </div>

          </form>
        )}
      </motion.div>

    </div>
  )
}
