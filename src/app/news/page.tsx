"use client"

import React, { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Calendar, ArrowRight, Search, BookOpen, RefreshCw } from "lucide-react"

export default function NewsPage() {
  const [postsList, setPostsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    async function getUpdates() {
      try {
        const res = await fetch("/api/updates")
        if (res.ok) {
          const data = await res.json()
          setPostsList(data.updates || [])
        }
      } catch (err) {
        console.error("Error loading updates:", err)
      } finally {
        setLoading(false)
      }
    }
    getUpdates()
  }, [])

  // Format Date String helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Filter news based on search query
  const filteredNews = useMemo(() => {
    return postsList.filter(item => {
      const title = item.title.toLowerCase()
      const content = (item.content || '').toLowerCase()
      const query = searchQuery.toLowerCase()
      return title.includes(query) || content.includes(query)
    })
  }, [searchQuery, postsList])

  // Get current visible subset
  const visibleNews = useMemo(() => {
    return filteredNews.slice(0, visibleCount)
  }, [filteredNews, visibleCount])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafbfc] pt-28 pb-16 flex flex-col items-center justify-center text-blue-900 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Technical Journal...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
            TECHNICAL JOURNAL &amp; NEWS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-4 tracking-tight font-display">
            Precision Machining Journal
          </h1>
          <p className="text-slate-600 text-xs leading-relaxed font-light">
            Browse our complete engineering updates catalog featuring {postsList.length} entries on spindle maintenance, crossed roller bearing design, and thermal surface treatment.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="relative flex items-center bg-white border border-slate-200 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden focus-within:border-slate-350 focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all">
            <Search className="w-4 h-4 text-slate-400 absolute left-5 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search news, updates or keywords..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setVisibleCount(12) // Reset visible count on new search query
              }}
              className="w-full h-12 pl-12 pr-6 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />
          </div>
          {searchQuery && (
            <p className="text-[10px] font-mono text-slate-500 text-center mt-3">
              Found {filteredNews.length} matches for &quot;{searchQuery}&quot;
            </p>
          )}
        </div>

        {/* News Grid */}
        {visibleNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleNews.map((item) => (
              <article 
                key={item.id}
                className="bg-white border border-slate-200/80 hover:border-slate-350 hover:shadow-[0_12px_35px_rgba(0,0,0,0.03)] transition-all duration-300 rounded-[2rem] overflow-hidden flex flex-col group"
              >
                {/* Image Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-200/60 p-2">
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-100 relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-60" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  {/* Meta details */}
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px] font-bold uppercase tracking-wider mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{formatDate(item.date)}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xs font-extrabold text-slate-900 leading-snug tracking-tight mb-2.5 uppercase font-display group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/news/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h2>

                  {/* Short description */}
                  <p className="text-slate-600 text-[11px] font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                    {item.description}
                  </p>

                  {/* Footer read link */}
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <Link 
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 transition-colors group/link"
                    >
                      Read Technical Post
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200 max-w-lg mx-auto">
            <BookOpen className="w-8 h-8 text-slate-350 mx-auto mb-4" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">No Updates Found</h3>
            <p className="text-xs font-light text-slate-500 mt-2">Try searching for other terms like Spindles, Bearings, or Rollers.</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredNews.length > visibleCount && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-900 text-white hover:bg-blue-600 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
            >
              Load More Updates
            </button>
            <p className="text-[10px] text-slate-400 mt-3 font-mono">
              Showing {visibleCount} of {filteredNews.length} articles
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
