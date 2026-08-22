import React from 'react'
import Link from 'next/link'
import {
  Wrench,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Gauge,
  Clock,
  MapPin,
  Sparkles,
  Cpu,
  Settings
} from 'lucide-react'

export const metadata = {
  title: 'Specialized Industrial Services | Bharat Machine Tools',
  description: 'Turnkey CNC machine retrofitting, precision spindle reconditioning, and plasma thermal spray coatings in Bangalore, India.'
}

export default function ServicesPage() {
  const mainServices = [
    {
      title: 'Machine Retrofitting & Reconditioning',
      subtitle: 'Complete Mechanical, Electrical & Hydraulic Restoration',
      description:
        'Comprehensive overhaul of manual and CNC machine tools—including Turning Centers, VMCs, HMCs, cylindrical grinders, and gear hobbers. Restored to original OEM geometric runout and flatness tolerances.',
      image: '/images/images/image-4.png',
      imageAlt: 'Bharat Machine Tools Manufactured Special Purpose Machine & CNC Rebuilding Cell',
      badge: 'BMT Machine Facility',
      href: '/services/servicing-and-reconditioning',
      highlights: [
        'Guideway hand-scraping & Turcite-B application',
        'Precision spindle & ball screw rebuilding (< 0.002mm runout)',
        'Rotary table, tailstock & gearbox overhauls',
        'On-site servicing at your plant or in our Bangalore facility'
      ]
    },
    {
      title: 'Thermal Process & Surface Coatings',
      subtitle: 'Plasma Spray, HVOF Cladding & Anti-Wear Metallurgy',
      description:
        'Advanced thermal spray and metallurgical coatings designed to restore undersized bearing journals, reduce friction, and multiply component operating life in abrasive environments.',
      image: '/images/images/image-1.png',
      imageAlt: 'Specialized Thermal Process & Machine Tool Enclosure at Bharat Machine Tools',
      badge: 'Surface Metallurgy',
      href: '/services/thermal-process-and-coatings',
      highlights: [
        'Plasma spray metalizing for worn shaft journal build-up',
        'HVOF spray, PTA & TIG cladding for high-density bonding',
        'Tungsten carbide (WC-Co-Cr) & ceramic anti-abrasion barriers',
        'Chemical blackodizing, passivation & hard anodizing'
      ]
    }
  ]

  const workshopCapabilities = [
    {
      icon: Gauge,
      title: 'Sub-Micron Calibration',
      desc: 'Dynamic runout verification using laser interferometry and electronic dial gauges.'
    },
    {
      icon: Cpu,
      title: 'Drive & CNC Retrofits',
      desc: 'Fanuc, Siemens, and Heidenhain CNC controller retrofits for manual machines.'
    },
    {
      icon: ShieldCheck,
      title: 'OEM Tolerances Guaranteed',
      desc: 'All reconditioned units ship with ISO-standard alignment test charts.'
    },
    {
      icon: Clock,
      title: 'Rapid Turnaround',
      desc: 'Emergency spindle overhauls and breakdown service support across India.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-800 pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden font-sans">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Header Block (Exact News page matching style) */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40 inline-flex items-center gap-1.5">
            <Wrench className="w-3 h-3 text-blue-600" />
            ENGINEERING &amp; RECONDITIONING DIVISION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 uppercase mt-4 mb-4 tracking-tight font-display">
            Specialized Industrial Services
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
            Turnkey machine tool retrofitting, spindle rebuilding, and plasma thermal surface treatments. Restoring your heavy industrial assets to sub-micron factory accuracy in Bangalore.
          </p>
        </div>

        {/* Main 2 Services Section (Clean, spacious 2-column layout) */}
        <div className="space-y-12 mb-20">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:shadow-md transition-shadow duration-300"
            >
              {/* Image Column */}
              <div className={`lg:col-span-5 relative bg-slate-950 min-h-[320px] lg:min-h-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#122f87] text-white text-[11px] font-mono font-bold uppercase tracking-wider rounded-md shadow-sm">
                    {service.badge}
                  </span>
                </div>
              </div>

              {/* Text / Details Column */}
              <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600 block">
                    {service.subtitle}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-mono leading-snug">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="pt-3 space-y-2.5">
                    {service.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/919530208882?text=Hello%2C%20I%20am%20interested%20in%20your%20machine%20servicing%20and%20reconditioning%20capabilities."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider"
                  >
                    <span>Instant Quote &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Capabilities Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              Bangalore Workshop Standards
            </span>
            <h2 className="text-2xl font-bold text-slate-900 uppercase mt-3 font-display">
              Why Tier-1 Plants Trust BMT Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshopCapabilities.map((cap, cIdx) => {
              const Icon = cap.icon
              return (
                <div
                  key={cIdx}
                  className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{cap.title}</h3>
                    <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-[#0b1b4f] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold uppercase font-display">
              Need a Machine Overhaul or Thermal Coating Quote?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              Send us your machine specifications or component drawings. Our service engineers will conduct a technical assessment within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:08048031763"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>080 4803 1763</span>
            </a>
            <a
              href="mailto:bmt.sangeeta@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email Service Cell</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  )
}
