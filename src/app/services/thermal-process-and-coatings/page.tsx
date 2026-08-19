import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Flame, Layers, ShieldCheck, Sparkles, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'Thermal Process, Surface Treatment & Coatings | Bharat Machine Tools',
  description: 'Metalizing, plasma spray, HYOF spray, PTA & TIG cladding, hard facing, ceramic & carbide coatings, blackodizing, and anodization in Bangalore, India.'
}

export default function ThermalProcessCoatingsPage() {
  const coatingCapabilities = [
    {
      title: 'Metalizing / Metal Plating & Plasma Spray',
      description: 'Ultra-high-temperature plasma spray depositing metallic and alloy layers to restore worn shaft journals and create anti-corrosion barriers.',
      tags: ['Plasma Spray', 'Thermal Arc', 'Shaft Journal Build-Up']
    },
    {
      title: 'HYOF Spray, PTA & TIG Cladding',
      description: 'High-Velocity Oxygen Fuel (HVOF) and Plasma Transferred Arc (PTA) cladding for dense, low-porosity coatings with extreme metallurgical bonding.',
      tags: ['High Density', 'PTA Cladding', 'TIG Overlay']
    },
    {
      title: 'Hard Facing & Passivation',
      description: 'Application of wear-resistant alloys to component surfaces exposed to severe abrasion, impact, and high-temperature erosion.',
      tags: ['Wear Resistance', 'Erosion Control', 'Extended Life']
    },
    {
      title: 'Ceramic & Tungsten Carbide Coatings',
      description: 'Extreme-hardness ceramic and tungsten carbide (WC-Co-Cr) coatings providing exceptional resistance against mechanical abrasive wear.',
      tags: ['Tungsten Carbide', 'Ceramic Barrier', 'Diamond Ground']
    },
    {
      title: 'Blackodizing & Chemical Passivation',
      description: 'Precision chemical conversion coatings providing corrosion resistance without altering the tight micrometer dimensions of precision components.',
      tags: ['Zero Dimensional Change', 'Black Oxide', 'Corrosion Inhibitor']
    },
    {
      title: 'Anodization & Surface Conversion',
      description: 'Controlled electrochemical surface oxidation providing enhanced hardness, wear protection, and electrical insulation for aluminum alloys.',
      tags: ['Hard Anodizing', 'Surface Hardness', 'Dielectric Barrier']
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Breadcrumbs */}
      <div className="bg-[#0b1b4f] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white transition-colors mb-4 font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Services
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-mono">
            Thermal Process, Surface Treatment &amp; Coatings
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-light leading-relaxed">
            Advanced metallurgical coatings and surface engineering to maximize hardness, corrosion resistance, and operational lifespan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Overview Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
            <Flame className="w-4 h-4" />
            <span>Industrial Surface Treatment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
            Engineered Protective Coatings for High-Wear Components
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            Bharat Machine Tools provides a comprehensive range of thermal processes, metallurgical coatings, and chemical surface treatments to satisfy the rigorous demands of aerospace, defense, toolmaking, and heavy machinery operations.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {coatingCapabilities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-mono font-bold text-xs">
                    0{index + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Operational Advantages
            </span>
            <h3 className="text-xl font-bold font-mono mt-1 mb-4 text-white">
              Why Upgrade Your Components with BMT Coatings?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-300 font-light">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Up to 300% extension in component operational service life</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Significant reduction in abrasive friction &amp; heat generation</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Restoration of undersized bearing journals without remanufacturing</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Corrosion barrier protection for aggressive chemical environments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Action Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-mono">
              Have a Specific Coating or Surface Treatment Requirement?
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-light">
              Our metallurgical specialists can recommend the optimal coating thickness and material composition for your machine parts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:08048031763"
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
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
