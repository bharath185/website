import React from 'react'
import Link from 'next/link'
import { Home, Package, Newspaper, Building2, Wrench, Phone } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#122f87] animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
            Page Not Found &bull; 404 Error
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 uppercase tracking-tight font-display">
          Looking for a <span className="text-[#122f87]">Component or Page?</span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
          The page or tagged category you requested may have moved or been updated during our latest precision catalog restructuring.
        </p>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left max-w-lg mx-auto">
          <Link
            href="/products"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#122f87] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#122f87] flex items-center justify-center shrink-0 group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#122f87]">Precision Products</div>
              <div className="text-[11px] text-slate-500">Spindles, Locknuts, Bearings</div>
            </div>
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#122f87] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#122f87] flex items-center justify-center shrink-0 group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#122f87]">Services &amp; Overhaul</div>
              <div className="text-[11px] text-slate-500">Retrofitting, Coatings &amp; QA</div>
            </div>
          </Link>

          <Link
            href="/company-profile"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#122f87] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#122f87] flex items-center justify-center shrink-0 group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#122f87]">Company Profile</div>
              <div className="text-[11px] text-slate-500">About BMT Bangalore OEM</div>
            </div>
          </Link>

          <Link
            href="/news"
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#122f87] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#122f87] flex items-center justify-center shrink-0 group-hover:bg-[#122f87] group-hover:text-white transition-colors">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#122f87]">Technical News &amp; Updates</div>
              <div className="text-[11px] text-slate-500">Engineering Insights &amp; Logs</div>
            </div>
          </Link>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#122f87] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
