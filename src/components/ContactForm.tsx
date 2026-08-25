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
  'Machine Reconditioning',
  'General Inquiry'
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: CLEAN & ATTRACTIVE CONTACT CHANNELS                          */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-5 space-y-5"
      >
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/60 inline-block">
            DIRECT COMMUNICATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight font-display">
            We&apos;re Here to Help
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
            Reach out directly to our engineering desk in Bangalore for quotes, drawings, or technical consultation.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="space-y-3 pt-2">
          
          {/* Phone Card */}
          <a
            href="tel:+919880464557"
            className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex items-center gap-4 group cursor-pointer block"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#122f87] group-hover:bg-[#122f87] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                Call Chief Engineer
              </span>
              <span className="text-sm font-bold text-slate-900 font-mono block mt-0.5">
                +91-9880464557
              </span>
              <span className="text-[10px] text-slate-500 font-light">
                Mr. Abbas Khan, MD (Direct)
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
          </a>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/919530208882?text=Hello%20BMT%20Team%2C%20I%20would%20like%20to%20request%20a%20technical%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex items-center gap-4 group cursor-pointer block"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600 block">
                24x7 WhatsApp Desk
              </span>
              <span className="text-sm font-bold text-slate-900 font-mono block mt-0.5">
                +91-9530208882
              </span>
              <span className="text-[10px] text-slate-500 font-light">
                Instant quotes &amp; spec discussions
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
          </a>

          {/* Email Card */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#122f87] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 truncate">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                Official Email
              </span>
              <a 
                href="mailto:bmt.abbas@gmail.com" 
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors font-mono block mt-0.5 truncate"
              >
                bmt.abbas@gmail.com
              </a>
              <span className="text-[10px] text-slate-500 font-light">
                Send blueprints &amp; CAD models
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-2 text-slate-400 hover:text-[#122f87] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Address Card */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 leading-relaxed font-light">
                <strong className="text-slate-900 block font-semibold">Registered Works &amp; Plant:</strong>
                #312 Ground Floor, Sharadhamma Illam, GPT, 1st Main Nagappa Block, Near Abbigere HP Petrol Pump, Abbigere, Bangalore - 560090, India
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">Mon - Sat: 9:00 AM - 6:30 PM</span>
              <a
                href="https://maps.google.com/?q=Sharadhamma+Illam+Nagappa+Block+Abbigere+Bangalore+560090"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>Directions</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: SIMPLE & ELEGANT CONTACT / RFQ FORM                         */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-9 shadow-lg shadow-slate-900/5 relative"
      >
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-[#122f87] flex items-center justify-center mx-auto border border-blue-200">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 uppercase font-display">
              Message Formatted &amp; Dispatched!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been compiled. Our engineering team in Bangalore will respond shortly.
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
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight font-display">
                Send an Inquiry / Request a Quote
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Fill in the details below and we will respond with technical specs &amp; pricing.
              </p>
            </div>

            {/* Category selection chips */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono tracking-wider">
                Select Requirement
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => {
                  const isSelected = selectedTopic === topic
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#122f87] text-white shadow-xs' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {topic}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Bharat Precision Tools"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase font-mono tracking-wider mb-1">
                Your Requirement / Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about the dimensions, RPM, machine model, or service required..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none text-xs text-slate-900 transition-all font-medium resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#122f87] hover:bg-[#0e256b] text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-blue-900/10 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.005] active:scale-[0.995]"
            >
              <Send className="w-4 h-4" />
              <span>Send Message via WhatsApp</span>
            </button>

          </form>
        )}
      </motion.div>

    </div>
  )
}
