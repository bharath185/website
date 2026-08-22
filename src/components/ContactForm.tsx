"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct WhatsApp message
    const message = `*BMT Bharat Website Enquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Company:* ${formData.company}%0A%0A*Message:* ${formData.message}`
    
    // Open WhatsApp URL
    window.open(`https://wa.me/919530208882?text=${message}`, "_blank")
    
    setSubmitted(true)
  }

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          
          <ScrollReveal className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-slate-500 text-xs">Your enquiry has been received. We&apos;ll contact you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", company: "", message: "" }) }}
                    className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        id="name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-xs text-slate-900 placeholder-slate-400 font-medium"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email *</label>
                      <input
                        id="email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-xs text-slate-900 placeholder-slate-400 font-medium"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone *</label>
                      <input
                        id="phone"
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-xs text-slate-900 placeholder-slate-400 font-medium"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Company</label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-xs text-slate-900 placeholder-slate-400 font-medium"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Message *</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors text-xs text-slate-900 placeholder-slate-400 font-medium resize-none"
                      placeholder="Tell us about your machine tool requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 text-xs uppercase tracking-wider shadow-md shadow-slate-900/10"
                  >
                    <Send className="w-4 h-4" />
                    Send Enquiry via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 text-sm">Contact Information</h3>
                <ul className="space-y-4 text-xs">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Address</p>
                      <p className="text-slate-600 mt-0.5">
                        Bharat Machine Tools - Unit 1, Lakshmipura Main Road 2nd Cross,
                        Abbigere Industrial Area, Chikkabanavara Post, Bengaluru, Karnataka 560090
                      </p>
                    </div>
                  </li>
                  <li>
                    <a href="tel:+918048031763" className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900">Phone</p>
                        <p className="text-slate-600 hover:text-blue-600 transition-colors mt-0.5">080 4803 1763</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:bmt.sangeeta@gmail.com" className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900">Email</p>
                        <p className="text-slate-600 hover:text-blue-600 transition-colors mt-0.5">bmt.sangeeta@gmail.com</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Business Hours</p>
                      <p className="text-slate-600 mt-0.5">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-slate-600">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-md">
                <h3 className="font-bold text-white mb-2 text-sm">Need a Quick Quote?</h3>
                <p className="text-xs text-slate-300 mb-4">Send us your machine tool requirements via WhatsApp and get a quote within hours.</p>
                <a
                   href="https://wa.me/919530208882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all text-xs uppercase tracking-wider shadow"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  WhatsApp Us Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
  )
}
