import React from 'react'
import Link from 'next/link'
import { Wrench, Shield, CheckCircle2, ArrowRight, Cog, Flame, Layers, Sparkles, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'Specialized Industrial Services & Engineering Capabilities | Bharat Machine Tools',
  description: 'Retrofitting, reconditioning of CNC & manual machines, precision spindle rebuilding, and advanced thermal process surface coatings in Bangalore, India.'
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <div className="bg-[#0b1b4f] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-4 border border-blue-400/20">
            <Wrench className="w-3.5 h-3.5" />
            Engineering Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6 font-mono">
            Specialized Industrial Services &amp; Capabilities
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From precision machine retrofitting and on-site reconditioning to advanced plasma thermal coatings, Bharat Machine Tools delivers high-precision turnkey engineering solutions across India.
          </p>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Servicing & Reconditioning */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group">
            <div className="h-56 bg-slate-900 relative overflow-hidden">
              <img
                src="https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/fe72caf2.jpeg"
                alt="Servicing and Reconditioning by Bharat Machine Tools"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 bg-blue-600 text-white text-[11px] font-bold rounded uppercase tracking-wider">
                  Core Capability
                </span>
                <h2 className="text-xl font-bold text-white mt-2 font-mono">
                  Servicing &amp; Machine Reconditioning
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Complete retrofitting and restoration of manual and CNC machine tools (Turning Centers, VMCs, HMCs, Centerless &amp; Cylindrical Grinding, Gear Hobbing Machines). Delivered at your site or our Bengaluru manufacturing facility.
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>High-speed spindle &amp; ball screw precision rebuilds</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Rotary table &amp; tail stock alignment &amp; restoration</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Planetary gear box &amp; drive motor reconditioning</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>On-site preventive &amp; breakdown maintenance contracts</span>
                </div>
              </div>

              <Link
                href="/services/servicing-and-reconditioning"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md shadow-blue-900/10 font-sans"
              >
                <span>View Full Details &amp; Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Thermal Process & Coatings */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group">
            <div className="h-56 bg-slate-900 relative overflow-hidden">
              <img
                src="https://fpimages.withfloats.com/actual/64a80389ab2fb40001bec441.jpg"
                alt="Thermal Process & Surface Coatings"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 bg-amber-600 text-white text-[11px] font-bold rounded uppercase tracking-wider">
                  Surface Engineering
                </span>
                <h2 className="text-xl font-bold text-white mt-2 font-mono">
                  Thermal Process &amp; Surface Coatings
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                High-performance thermal coatings and metallurgical surface treatments engineered to extend the service life of high-wear industrial components in abrasive and high-temperature environments.
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Metalizing &amp; Plasma Spray Coating</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>HYOF Spray, PTA &amp; TIG Cladding</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Ceramic &amp; Tungsten Carbide Protective Coatings</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Hard Facing, Blackodizing, Passivation &amp; Anodizing</span>
                </div>
              </div>

              <Link
                href="/services/thermal-process-and-coatings"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md shadow-slate-900/10 font-sans"
              >
                <span>View Coating Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Technical Capabilities Highlights */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 font-mono">
              Why Manufacturers Partner with BMT
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
              We leverage superior rotodynamic engineering knowledge and precision cleanrooms in Bangalore to restore machines to OEM tolerance.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Cog className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1 font-mono">Sub-Micron Precision</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Rebuilding and dynamic balancing within &lt; 0.002mm runout tolerances.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1 font-mono">Turnkey Maintenance</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Full on-site mechanical, electrical, and hydraulic servicing across India.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1 font-mono">Extended Component Life</h4>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Specialized surface engineering delivering up to 3x longer wear resistance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Contact Box */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-bold font-mono">Need Custom Maintenance or Coating Assistance?</h4>
            <p className="text-xs text-blue-200 mt-1 font-light">
              Speak directly with our chief rotodynamic engineers for immediate consultation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:08048031763"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>080 4803 1763</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Request Quote</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
