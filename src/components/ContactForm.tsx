'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  ExternalLink, 
  MessageSquare, 
  Cpu, 
  Cog, 
  ShieldCheck, 
  Activity, 
  Layers, 
  HelpCircle,
  ChevronDown,
  Navigation,
  Globe,
  Zap,
  Building2,
  FileCheck
} from 'lucide-react'

const PRODUCT_CATEGORIES = [
  { id: 'spindles', label: 'Motorized & Belt Spindles', icon: Cog },
  { id: 'rotary-tables', label: 'CNC Rotary Tables (4th/5th Axis)', icon: Layers },
  { id: 'ball-screws', label: 'Ball Screws & Bearings', icon: Cpu },
  { id: 'defense', label: 'Defense Actuators & Masts', icon: ShieldCheck },
  { id: 'reconditioning', label: 'Machine Rebuilding & Scraping', icon: Activity },
  { id: 'custom', label: 'Custom OEM Engineering', icon: Zap }
]

const TIMELINE_OPTIONS = [
  'Urgent (< 1 Week)',
  'Standard (2-4 Weeks)',
  'Project Planning / Budgeting'
]

const FAQS = [
  {
    q: "What is your typical turnaround time for custom spindles and rotary tables?",
    a: "Standard replacement spindles and standard CNC rotary tables are dispatched within 1–2 weeks. Customized high-frequency motorized spindles or complex 5-axis systems are engineered, manufactured, dynamically balanced, and delivered in 3–5 weeks with full QA test certificates."
  },
  {
    q: "Do you provide on-site machine geometric alignment and guideway scraping across India?",
    a: "Yes. BMT operates an emergency field engineering crew that deploys directly to customer facilities across India for guideway scraping, spindle vibration analysis, and turnkey geometric laser alignment."
  },
  {
    q: "Can you reverse-engineer or replace obsolete imported European or Japanese spindles?",
    a: "Absolutely. We specialize in precision import substitution. We can analyze worn or discontinued spindles, re-engineer the bearing cartridges, restore runout to < 0.001 mm, and save you up to 40% on import replacement costs."
  },
  {
    q: "Are dynamic balancing reports and calibration certificates included?",
    a: "Yes. Every assembly dispatched from our Bangalore facility includes traceable ISO G0.4 dynamic balancing reports, laser interferometry runout documentation, and 48-hour continuous thermal run logs."
  }
]

export default function ContactForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>('spindles')
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Standard (2-4 Weeks)')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    specs: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct rich formatted WhatsApp message
    const categoryObj = PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)
    const categoryName = categoryObj ? categoryObj.label : 'General Inquiry'

    const waText = `*BMT TECHNICAL QUOTATION INQUIRY*%0A` +
      `----------------------------------------%0A` +
      `*Client Name:* ${formData.name}%0A` +
      `*Company:* ${formData.company || 'N/A'}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Requirement:* ${categoryName}%0A` +
      `*Timeline:* ${selectedTimeline}%0A` +
      (formData.specs ? `*Technical Specs:* ${formData.specs}%0A` : '') +
      `*Details:* ${formData.message}%0A` +
      `----------------------------------------%0A` +
      `_Sent from Bharat Machine Tools Official Contact Portal_`

    window.open(`https://wa.me/919530208882?text=${waText}`, '_blank')
    setSubmitted(true)
  }

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="w-full space-y-16 sm:space-y-20">

      {/* ========================================================================= */}
      {/* 4-CARD TRENDY DIRECT COMMUNICATION GRID                                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Managing Director Direct Line */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="group relative p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#122f87] group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                EXECUTIVE LINE
              </span>
              <h3 className="text-base font-bold text-slate-900 font-display uppercase mt-2">
                Mr. Abbas Khan
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Managing Director &bull; Technical Consultation
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100">
            <a 
              href="tel:+919880464557" 
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#122f87] hover:text-blue-600 transition-colors"
            >
              <span>+91-9880464557</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Card 2: 24/7 WhatsApp Technical Desk */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="group relative p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#122f87] group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                24x7 RAPID RFQ
              </span>
              <h3 className="text-base font-bold text-slate-900 font-display uppercase mt-2">
                WhatsApp Desk
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Instant quotes, drawings &amp; spec discussions
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100">
            <a 
              href="https://wa.me/919530208882?text=Hello%20BMT%20Engineering%20Team%2C%20I%20would%20like%20to%20request%20a%20technical%20quotation." 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#122f87] hover:text-blue-600 transition-colors"
            >
              <span>+91-9530208882</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Card 3: Official Engineering Email */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="group relative p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#122f87] group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                TECHNICAL INQUIRIES
              </span>
              <h3 className="text-base font-bold text-slate-900 font-display uppercase mt-2">
                Official Email
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Send formal RFQs, CAD step files &amp; blueprints
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <a 
              href="mailto:bmt.abbas@gmail.com" 
              className="text-xs font-mono font-bold text-[#122f87] hover:text-blue-600 transition-colors truncate"
            >
              bmt.abbas@gmail.com
            </a>
            <button
              onClick={() => handleCopyEmail('bmt.abbas@gmail.com')}
              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </motion.div>

        {/* Card 4: Factory Works & Operating Hours */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="group relative p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#122f87] group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                BANGALORE WORKS
              </span>
              <h3 className="text-base font-bold text-slate-900 font-display uppercase mt-2">
                Factory Timings
              </h3>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Mon - Sat: 9:00 AM - 6:30 PM (IST)
              </p>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100">
            <a 
              href="tel:08048031763" 
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#122f87] hover:text-blue-600 transition-colors"
            >
              <span>Desk: 080 4803 1763</span>
            </a>
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* MAIN INTERACTIVE QUOTATION & CONFIGURATOR FORM + FACILITY INFO            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column (8 cols): Interactive RFQ Machine Configurator */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 bg-white rounded-3xl border-2 border-slate-200/90 p-6 sm:p-10 shadow-xl shadow-blue-900/5 relative overflow-hidden"
        >
          {/* Subtle Corner Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-[#122f87]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase font-display">
                Inquiry Formatted &amp; Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
                Thank you. Your quotation request has been compiled. Our engineering team in Bangalore will review your technical specifications and respond immediately.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', company: '', specs: '', message: '' })
                  }}
                  className="px-6 py-3 bg-[#122f87] hover:bg-[#0e256b] text-white rounded-xl text-xs font-bold uppercase font-mono tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Submit Another RFQ
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              {/* Form Title */}
              <div className="space-y-1 border-b border-slate-100 pb-5">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                  STEP-BY-STEP PROJECT INQUIRY
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase tracking-tight font-display">
                  Configure Your Machine Tool Request
                </h3>
              </div>

              {/* Step 1: Category Selector Pills */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                  1. Select Machine Category / Assembly *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRODUCT_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id
                    const CatIcon = cat.icon
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#122f87] text-white border-[#122f87] shadow-md shadow-blue-900/20 ring-2 ring-blue-500/20' 
                            : 'bg-slate-50/80 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <CatIcon className={`w-4 h-4 ${isSelected ? 'text-blue-200' : 'text-blue-600'}`} />
                        <span className="text-[11px] font-bold leading-tight font-display">
                          {cat.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Project Timeline Pills */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                  2. Required Delivery Timeline
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_OPTIONS.map((time) => {
                    const isSelected = selectedTimeline === time
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTimeline(time)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 3: Contact Inputs */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                  3. Contact &amp; Company Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none transition-all text-xs text-slate-900 placeholder-slate-400 font-medium"
                      placeholder="Your Full Name *"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none transition-all text-xs text-slate-900 placeholder-slate-400 font-medium"
                      placeholder="Company Name (Optional)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none transition-all text-xs text-slate-900 placeholder-slate-400 font-medium font-mono"
                      placeholder="Mobile / Phone Number *"
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none transition-all text-xs text-slate-900 placeholder-slate-400 font-medium"
                      placeholder="Official Email ID *"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.specs}
                    onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none transition-all text-xs text-slate-900 placeholder-slate-400 font-medium"
                    placeholder="Specific Dimensions / RPM / Taper / Stroke (e.g. BT-40 12000 RPM)"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200/90 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#122f87] focus:border-[#122f87] outline-none transition-all text-xs text-slate-900 placeholder-slate-400 font-medium resize-none"
                    placeholder="Describe your machine requirement, drawings, application details, or challenges..."
                  />
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#122f87] hover:bg-[#0e256b] text-white font-bold rounded-2xl transition-all duration-300 text-xs font-mono uppercase tracking-wider shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Technical RFQ to Chief Engineer</span>
                </button>
                <span className="text-[10px] text-slate-400 text-center block mt-2 font-mono">
                  Instant WhatsApp dispatch &bull; Average response within 2 hours
                </span>
              </div>

            </form>
          )}
        </motion.div>

        {/* Right Column (4 cols): Registered Works Address & Map */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Works Address Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#122f87] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                  MANUFACTURING BASE
                </span>
                <h4 className="text-sm font-bold text-slate-900 font-display uppercase">
                  Bangalore Works &amp; Plant
                </h4>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Bharat Machine Tools</strong><br />
                  #312 Ground Floor, Sharadhamma Illam, GPT, 1st Main Nagappa Block, Near Abbigere HP Petrol Pump, Abbigere, Chikkabanavara, Bangalore - 560090, Karnataka, INDIA
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl font-mono text-[10px] space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>GPS COORDINATES:</span>
                  <span className="text-slate-900 font-bold">13.0674° N, 77.5186° E</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>STATE / REGION:</span>
                  <span className="text-slate-900 font-bold">Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action Link */}
            <a
              href="https://maps.google.com/?q=Sharadhamma+Illam+Nagappa+Block+Abbigere+Bangalore+560090"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-slate-900 hover:bg-[#122f87] text-white rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              <span>Get Driving Directions</span>
            </a>
          </div>

          {/* Quick FAQ / Engineering SLA Accordion */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <HelpCircle className="w-4 h-4 text-[#122f87]" />
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                Engineering Inquiries FAQ
              </h4>
            </div>

            <div className="space-y-2.5">
              {FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx
                return (
                  <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left flex items-center justify-between text-[11px] font-bold text-slate-800 hover:text-[#122f87] transition-colors cursor-pointer bg-slate-50/60"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="p-3 bg-white text-[10px] text-slate-600 font-light leading-relaxed border-t border-slate-100"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

        </motion.div>

      </div>

    </div>
  )
}
