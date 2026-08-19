"use client"

import React from 'react'
import Link from 'next/link'
import { Wrench, Flame, CheckCircle2, ArrowRight, ShieldCheck, Cog, Award, Users, CheckSquare } from 'lucide-react'

export default function V2ServicesShowcase() {
  const stats = [
    { value: '500+', label: 'PROJECTS COMPLETED', icon: CheckSquare, desc: 'Precision spindles, machines & components delivered' },
    { value: '120+', label: 'HAPPY CLIENTS', icon: Users, desc: 'Aerospace, defense, automotive & machine builders' },
    { value: '35+', label: 'SKILLED STAFF', icon: Award, desc: 'Rotodynamic design & precision cleanroom specialists' }
  ]

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-100/60 px-3 py-1 rounded-md border border-blue-200/60">
            SPECIALIZED ENGINEERING &amp; RECONDITIONING
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-3 font-mono">
            We Can Make What You Can Imagine
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
            Beyond manufacturing, Bharat Machine Tools delivers complete on-site and in-house machine retrofitting, spindle restoration, and advanced metallurgical surface coatings.
          </p>
        </div>

        {/* 2 Big Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Service 1: Machine Servicing & Reconditioning */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
            <div>
              <div className="h-56 bg-slate-950 relative overflow-hidden">
                <img
                  src="/images/images/image-4.png"
                  alt="Bharat Machine Tools Manufactured Machine & Reconditioning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-wider font-mono">
                    Turnkey Engineering
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono mt-1.5">
                    Servicing &amp; Machine Reconditioning
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Retrofitting &amp; reconditioning of all types of manual and CNC machines (Turning Centers, VMC, HMC, Centerless Grinding, Cylindrical Grinding, Gear Hobbing). Available on-site or at our Bangalore facility.
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Spindle &amp; precision ball screw rebuilding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Rotary table &amp; tail stock alignment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Planetary gearboxes &amp; motor restoration</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <Link
                href="/services/servicing-and-reconditioning"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md shadow-blue-900/10 font-sans"
              >
                <span>View Service Scope &amp; Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 2: Thermal Process & Surface Coatings */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
            <div>
              <div className="h-56 bg-slate-950 relative overflow-hidden">
                <img
                  src="/images/images/image-1.png"
                  alt="Thermal Process & Surface Coatings at BMT"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-2.5 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded uppercase tracking-wider font-mono">
                    Surface Metallurgy
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono mt-1.5">
                    Thermal Process &amp; Surface Coatings
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  High-performance thermal spray, cladding, and metallurgical conversion treatments engineered to multiply component wear resistance and prevent corrosion under heavy industrial cycles.
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Metalizing &amp; Plasma Spray Coating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>HYOF Spray, PTA &amp; TIG Cladding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Ceramic &amp; Tungsten Carbide Protective Coatings</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <Link
                href="/services/thermal-process-and-coatings"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md shadow-slate-900/10 font-sans"
              >
                <span>Explore Coating Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Authentic Stats Banner from bmtbharat.com */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono mt-1">
                    {stat.label}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1 font-light max-w-xs">
                    {stat.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
