"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Calendar, Award, Quote } from "lucide-react"

interface MDInfoData {
  name: string
  role: string
  image: string
  bioParagraph1: string
  bioParagraph2: string
  quote: string
  quoteAuthor: string
  expTitle: string
  expDescription: string
  stdTitle: string
  stdDescription: string
  affTitle: string
  affDescription: string
  badgeTitle: string
  badgeText: string
}

export default function V2MDProfile({ initialData }: { initialData?: MDInfoData | null }) {
  const [mdInfo, setMdInfo] = useState<MDInfoData>(initialData || {
    name: "Mr. B.R. Gowda",
    role: "Founder & Managing Director",
    image: "",
    bioParagraph1: "Welcome to Bharat Machine Tools (BMT). When we established BMT in Bangalore, our objective was single-focused: to engineer and build dynamic mechanical systems that match the sub-micron tolerances demanded by advanced aerospace, military, and automation OEMs.",
    bioParagraph2: "Over the past 25 years, precision manufacturing has evolved, but our foundational promise remains absolute. We invest continuously in our cleanrooms, dynamic testing bays, and state-of-the-art grinding machinery to ensure that every spindle, hydrostatic bearing, and custom part leaving our cells is an operational masterpiece.",
    quote: "Precision is not a measurement constraint; it is our corporate culture. We don\'t build machines—we craft high-speed rotational masterpieces with sub-micron engineering.",
    quoteAuthor: "B. R. Gowda",
    expTitle: "Experience",
    expDescription: "30+ Years in rotodynamic systems design.",
    stdTitle: "Standards",
    stdDescription: "Direct supervisor of BMT Zero-Defect QA cell.",
    affTitle: "Affiliations",
    affDescription: "Technical panelist at CMTI & AMTI Bangalore.",
    badgeTitle: "MD Credentials",
    badgeText: "CMTI Panelist"
  })

  useEffect(() => {
    if (initialData) return
    async function fetchMDInfo() {
      try {
        const res = await fetch("/api/md-info")
        if (res.ok) {
          const data = await res.json()
          if (data.mdInfo) {
            setMdInfo(data.mdInfo)
          }
        }
      } catch (err) {
        console.error("Error fetching MD Info:", err)
      }
    }
    fetchMDInfo()
  }, [initialData])

  const renderBullets = (text: string) => {
    if (!text) return null
    let lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length <= 1) {
      lines = text.split(';').map(l => l.trim()).filter(Boolean)
    }
    if (lines.length <= 1) {
      lines = text.split('*').map(l => l.trim()).filter(Boolean)
    }

    if (lines.length <= 1) {
      return <p className="text-[10px] text-slate-600 font-light mt-0.5 leading-snug">{text}</p>
    }

    return (
      <ul className="space-y-1 mt-1 text-[10px] text-slate-650 font-light leading-relaxed">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-600 shrink-0 mt-1.5" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    )
  }

  const hasValidImage = mdInfo.image && 
                        mdInfo.image !== "/images/md_portrait.jpg" && 
                        mdInfo.image.trim() !== "";

  return (
    <section className="py-24 bg-slate-50 relative border-t border-slate-200">
      
      {/* Background blueprint grid overlay for styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait Showcase */}
          {hasValidImage && (
            <div className="lg:col-span-5 flex justify-center animate-fade-up">
              <div className="relative group max-w-sm w-full">
                {/* Decorative outline border floating behind */}
                <div className="absolute -inset-4 border border-blue-500/20 rounded-[2.5rem] pointer-events-none transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-x-1 group-hover:-translate-y-1" />
                
                {/* Outer image frame with blueprint lines */}
                <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-white border border-slate-200 shadow-xl p-3">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:15px_15px] opacity-100 pointer-events-none" />
                  
                  {/* Clean white photo wrapper */}
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-slate-100 bg-slate-100">
                    <img 
                      src={mdInfo.image} 
                      alt={`${mdInfo.name}, ${mdInfo.role}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle vignette shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Floating credentials badge */}
                {mdInfo.badgeText && (
                  <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200/90 rounded-2xl px-5 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)] max-w-[210px] hidden sm:block">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-xl border border-blue-100/50">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">{mdInfo.badgeTitle}</span>
                        <span className="block text-[10px] font-extrabold text-slate-900 uppercase tracking-wide mt-0.5">{mdInfo.badgeText}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Column: Bio Details & Message */}
          <div className={hasValidImage ? "lg:col-span-7 flex flex-col justify-center animate-fade-up" : "lg:col-span-12 flex flex-col justify-center animate-fade-up"}>
            
            {/* Header section tag */}
            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
                LEADERSHIP MESSAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-2 tracking-tight font-display">
                From the Desk of MD
              </h2>
              <span className="block text-sm font-extrabold text-blue-600 uppercase tracking-wider font-mono">
                {mdInfo.name} <span className="text-slate-400 font-light text-xs font-sans capitalize tracking-normal">| {mdInfo.role}</span>
              </span>
            </div>

            {/* Core Message Text */}
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-light">
              <p>{mdInfo.bioParagraph1}</p>
              <p>{mdInfo.bioParagraph2}</p>
            </div>

            {/* Cursive Signed Quote block */}
            <div className="my-6 p-6 bg-white border border-slate-200 rounded-2xl relative shadow-sm hover:border-blue-500/10 transition-colors">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-100 pointer-events-none" />
              <p className="text-slate-800 text-[11px] font-medium uppercase tracking-wider leading-relaxed italic pr-10">
                &ldquo;{mdInfo.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase font-bold">&mdash; BMT LEADERSHIP PLEDGE</span>
                <span className="font-serif italic text-slate-700 text-xs font-semibold pr-4 font-mono uppercase tracking-wide">{mdInfo.quoteAuthor}</span>
              </div>
            </div>

            {/* Leadership credentials grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/60 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[9px] font-bold text-slate-900 uppercase tracking-wide font-mono">{mdInfo.expTitle}</h4>
                  {renderBullets(mdInfo.expDescription)}
                </div>
              </div>
              
              <div className="bg-white/60 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[9px] font-bold text-slate-900 uppercase tracking-wide font-mono">{mdInfo.stdTitle}</h4>
                  {renderBullets(mdInfo.stdDescription)}
                </div>
              </div>
              
              <div className="bg-white/60 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
                <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[9px] font-bold text-slate-900 uppercase tracking-wide font-mono">{mdInfo.affTitle}</h4>
                  {renderBullets(mdInfo.affDescription)}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
