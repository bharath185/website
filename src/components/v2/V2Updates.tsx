"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

export default function V2Updates() {
  const [updates, setUpdates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const targetSlugs = [
    "4-factors-that-determine-the-performance-of-crossed-roller-bearings",
    "is-a-high-frequency-spindle-the-right-choice-for-your-machining-application",
    "why-rolled-ball-screws-are-a-reliable-choice-for-industrial-motion-systems",
    "the-role-of-planetary-gearboxes-in-heavy-duty-industrial-applications"
  ]

  useEffect(() => {
    async function loadUpdates() {
      try {
        const res = await fetch("/api/updates")
        if (res.ok) {
          const data = await res.json()
          setUpdates(data.updates || [])
        }
      } catch (err) {
        console.error("Error loading updates:", err)
      } finally {
        setLoading(false)
      }
    }
    loadUpdates()
  }, [])

  // Get matching news items
  const matchedUpdates = useMemo(() => {
    if (updates.length === 0) return []
    const matched = targetSlugs
      .map(slug => updates.find(item => item.slug === slug))
      .filter((item): item is any => !!item)

    // Pad with latest posts if match count is less than 4
    if (matched.length < 4) {
      const remaining = updates.filter(item => !matched.some(m => m.id === item.id))
      return [...matched, ...remaining].slice(0, 4)
    }
    return matched
  }, [updates])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading || matchedUpdates.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-[#f8fafc] relative overflow-hidden border-t border-slate-200/60">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Spotlight backdrop blur */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200/40 px-3 py-1 rounded-md uppercase tracking-widest">
              Updates &amp; Journal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase mt-4 mb-2 tracking-tight font-display">
              Read What&apos;s Latest
            </h2>
            <p className="text-slate-600 text-xs font-light leading-relaxed">
              Stay updated with BMT&apos;s corporate breakthroughs, industrial exhibitions, product announcements, and manufacturing technical updates.
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors shrink-0 group"
          >
            All Updates
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Columns Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchedUpdates.map((item) => {
            return (
              <article 
                key={item.id} 
                className="bg-white border border-slate-200/80 rounded-[2rem] overflow-hidden flex flex-col group hover:border-slate-350 hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300"
              >
                {/* Image view frame */}
                <div className="p-2 aspect-[4/3] w-full overflow-hidden bg-slate-50 relative border-b border-slate-100">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative border border-slate-200/40 shadow-inner">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Meta details */}
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] font-bold uppercase tracking-wider mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{formatDate(item.date)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[11px] font-extrabold text-slate-900 leading-snug tracking-tight mb-2 uppercase font-display group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/news/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-[10px] font-light leading-relaxed mb-5 flex-grow line-clamp-3">
                    {item.description}
                  </p>

                  {/* Card footer link */}
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <Link 
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors group/link"
                    >
                      Read Technical Post
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
