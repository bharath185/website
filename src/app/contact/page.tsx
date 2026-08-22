"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import ContactForm from "@/components/ContactForm"
import { Sparkles, RefreshCw } from "lucide-react"

export default function ContactPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      if (user.role === "ADMIN") {
        router.replace("/admin/orders")
      } else {
        router.replace("/orders")
      }
    }
  }, [user, authLoading, router])

  if (user) {
    return (
      <div className="min-h-screen bg-[#fafbfc] pt-32 pb-20 flex flex-col items-center justify-center text-slate-500 gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-[#122f87]" />
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#122f87]">
          Redirecting to your dashboard...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pt-28 sm:pt-32 pb-20 relative overflow-hidden font-sans">
      {/* Background Tooling Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Ambient Lighting Flares */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block (Matching News & Services clean style) */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3 h-3 text-blue-600" />
            SUPPORT &amp; QUOTATION DESK
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 uppercase tracking-tight font-display">
            Contact Engineering Team
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed font-light">
            Have a custom machine tool requirement or need a rapid technical quote? Reach out to our engineering team in Bangalore directly.
          </p>
        </div>

        {/* Contact Form & Contact Details Grid */}
        <ContactForm />
      </div>
    </div>
  )
}
