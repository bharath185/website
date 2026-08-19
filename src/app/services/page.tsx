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
  Sparkles
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
      image: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/fe72caf2.jpeg',
      imageAlt: 'Reconditioned CTB 150 CNC Turning Center by Bharat Machine Tools',
      badge: 'Turnkey Rebuild',
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
      image: 'https://fpimages.withfloats.com/actual/64a80389ab2fb40001bec441.jpg',
      imageAlt: 'Industrial Surface Coating and Metallurgy at Bharat Machine Tools',
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
      image: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/6f41f130.jpeg',
      title: 'Guideway Hand-Scraping',
      detail: 'Geometric alignment to 0.002 mm/m flatness for precision lathe & milling saddles.'
    },
    {
      image: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/eba738e5.jpeg',
      title: 'Spindle Shaft Balancing',
      detail: 'Dynamic balancing up to 45,000 RPM adhering to ISO 1940 Grade G0.4 standards.'
    },
    {
      image: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/0e8d1c9b.jpeg',
      title: 'CNC Controller Retrofitting',
      detail: 'Integration of modern Siemens, Fanuc & Delta CNC systems with customized HMI panels.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Clean Header Banner */}
      <section className="bg-[#0b1b4f] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-blue-400/20">
            <Wrench className="w-3.5 h-3.5" />
            Engineering &amp; Reconditioning Division
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono mb-4">
            Specialized Industrial Services
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Turnkey machine tool retrofitting, spindle rebuilding, and plasma thermal surface treatments. Restoring your heavy industrial assets to sub-micron factory accuracy.
          </p>
        </div>
      </section>

      {/* Main 2 Services Section (Clean, spacious 2-column layout) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="space-y-16">
          {mainServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:shadow-md transition-shadow duration-300"
            >
              {/* Image Column */}
              <div className={`lg:col-span-5 relative bg-slate-950 min-h-[300px] lg:min-h-full ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
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

                {/* Direct Action Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm font-sans"
                  >
                    <span>View Technical Scope &amp; Case Studies</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real Workshop Capability Showcase */}
      <section className="bg-white border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              IN-HOUSE PRECISION STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-3 mb-2">
              Our Reconditioning Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              Executed inside our dedicated cleanrooms and testing bays in Abbigere Industrial Area, Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workshopCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-slate-900 overflow-hidden relative">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 font-mono">{cap.title}</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {cap.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Trust & Metrics Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-mono block">&lt; 0.002 mm</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-1 block">Radial &amp; Axial Runout</span>
          </div>
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-mono block">500+</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-1 block">Machines Restored</span>
          </div>
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-mono block">ISO G0.4</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-1 block">Dynamic Balancing</span>
          </div>
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-black text-[#122f87] font-mono block">On-Site</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-1 block">Pan-India Servicing</span>
          </div>
        </div>
      </section>

      {/* Simple, Professional CTA Strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#0b1b4f] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
              Need Machine Servicing or Surface Treatment?
            </h3>
            <p className="text-xs text-slate-300 font-light">
              Speak directly with our technical team in Bangalore for an on-site evaluation or prompt quotation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:08048031763"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0b1b4f] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-colors shadow-sm font-sans"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>080 4803 1763</span>
            </a>
            <a
              href="https://wa.me/919530208882?text=Hello%2C%20I%20need%20machine%20servicing%20and%20reconditioning%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm font-sans"
            >
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm font-sans"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Submit RFQ</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
