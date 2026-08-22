import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Flame, Layers, ShieldCheck, Sparkles, Phone, Mail, ArrowRight, Shield, Zap } from 'lucide-react'

export const metadata = {
  title: 'Thermal Process, Surface Treatment & Coatings | Bharat Machine Tools',
  description: 'Metalizing, plasma spray, HYOF spray, PTA & TIG cladding, hard facing, ceramic & carbide coatings, blackodizing, and anodization in Bangalore, India.'
}

export default function ThermalProcessCoatingsPage() {
  const coatingCapabilities = [
    {
      title: 'Metalizing / Plasma Thermal Spray',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
      description: 'Ultra-high-temperature plasma spray depositing metallic and alloy layers to restore worn shaft journals and create anti-corrosion barriers without heat distortion.',
      tags: ['Plasma Spray', 'Shaft Journal Build-Up', 'Anti-Corrosion']
    },
    {
      title: 'HYOF Spray, PTA & TIG Cladding',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
      description: 'High-Velocity Oxygen Fuel (HVOF) and Plasma Transferred Arc (PTA) cladding for dense, ultra-low porosity coatings with extreme metallurgical bonding strength.',
      tags: ['HVOF High Density', 'PTA Cladding', 'TIG Metallurgical Overlay']
    },
    {
      title: 'Ceramic & Tungsten Carbide Coatings',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
      description: 'Extreme-hardness ceramic and tungsten carbide (WC-Co-Cr) coatings providing diamond-ground finishes and unmatched resistance against mechanical abrasion.',
      tags: ['Tungsten Carbide', 'Ceramic Barrier', 'Diamond Ground (Ra < 0.1)']
    },
    {
      title: 'Hard Facing & Wear Resistance',
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop',
      description: 'Application of specialized cobalt and nickel-based superalloys to machine surfaces exposed to heavy abrasive wear, severe friction, and high thermal loads.',
      tags: ['Stellite / Colmonoy', 'Severe Abrasion', 'Thermal Barrier']
    },
    {
      title: 'Chemical Blackodizing & Passivation',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
      description: 'Zero-dimensional-change chemical conversion providing deep black corrosion inhibition while strictly maintaining sub-micron tolerances on precision tooling.',
      tags: ['Zero Dimension Change', 'Black Oxide', 'Corrosion Inhibitor']
    },
    {
      title: 'Hard Anodizing & Surface Conversion',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
      description: 'Electrochemical oxide conversion forming a tough, wear-resistant ceramic-like barrier on aluminum components with superior dielectric insulation.',
      tags: ['Type III Hard Anodize', 'Dielectric Barrier', 'Lightweight Armor']
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors mb-4 font-mono uppercase tracking-wider font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Services
        </Link>
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-md border border-amber-200/60 inline-flex items-center gap-1.5 mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            SURFACE METALLURGY DIVISION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 uppercase tracking-tight font-display leading-tight">
            Thermal Process, Surface Treatment &amp; Coatings
          </h1>
          <p className="text-slate-600 text-xs sm:text-base mt-3 max-w-3xl font-light leading-relaxed">
            Advanced metallurgical coatings engineered to maximize component hardness, mitigate frictional heat, and extend operational lifespan in abrasive industrial environments.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Process Capabilities Grid with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coatingCapabilities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-amber-600/90 text-white font-mono font-bold text-[10px] rounded uppercase tracking-wider">
                      Method 0{index + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-sm font-bold text-white font-mono leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
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
            </div>
          ))}
        </div>

        {/* Benefits Matrix */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
              OPERATIONAL ADVANTAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mt-1 mb-6 text-white">
              Why Upgrade High-Wear Components with BMT Coatings?
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 text-xs text-slate-300 font-light">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5 font-mono">3x Longer Component Life</strong>
                  <span>Multiplies operational hours between maintenance intervals for severe-duty applications.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5 font-mono">Zero Heat Distortion</strong>
                  <span>Cold-process plasma and HVOF methods prevent warping of precision spindle shafts.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5 font-mono">Journal Build-Up Restoration</strong>
                  <span>Reclaims undersized or grooved bearing seatings back to original drawing dimensions.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5 font-mono">Chemical &amp; Salt Barrier</strong>
                  <span>Provides high electrochemical resistance in corrosive petrochemical and fluid lines.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-base sm:text-xl font-bold text-slate-900 font-mono">
              Need a Custom Coating Recommendation for Your Machine Parts?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-light max-w-xl">
              Our metallurgical team can evaluate your wear conditions, substrate material, and tolerance limits to provide the optimal coating specification.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:08048031763"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>080 4803 1763</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
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
