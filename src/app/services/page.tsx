import React from 'react'
import Link from 'next/link'
import {
  Wrench,
  Shield,
  CheckCircle2,
  ArrowRight,
  Cog,
  Flame,
  Layers,
  Sparkles,
  Phone,
  Mail,
  Gauge,
  Activity,
  Award,
  Zap,
  Check,
  Building2,
  Cpu
} from 'lucide-react'

export const metadata = {
  title: 'Specialized Industrial Services & Engineering Capabilities | Bharat Machine Tools',
  description: 'Turnkey machine retrofitting, precision spindle rebuilding, CNC/VMC reconditioning, and advanced plasma thermal surface coatings in Bangalore, India.'
}

export default function ServicesPage() {
  const serviceCards = [
    {
      id: 'reconditioning',
      title: 'CNC & Manual Machine Reconditioning',
      badge: 'Turnkey Retrofitting',
      badgeColor: 'bg-blue-600',
      tagline: 'Restoring heavy industrial machine tools to factory sub-micron tolerances.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
      href: '/services/servicing-and-reconditioning',
      points: [
        'Complete overhaul of Turning Centers, VMC, HMC & Grinding machines',
        'Guideway re-scraping, alignment and turcite application',
        'Hydraulic, pneumatic, and CNC controller upgrades (Siemens/Fanuc)',
        'On-site servicing at your facility or in our Bangalore cleanroom'
      ]
    },
    {
      id: 'spindle-rebuild',
      title: 'Precision Spindle & Ball Screw Servicing',
      badge: 'Rotodynamic QA',
      badgeColor: 'bg-indigo-600',
      tagline: 'High-speed dynamic balancing and super-precision bearing replacement.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
      href: '/services/servicing-and-reconditioning',
      points: [
        'Cartridge, hydrostatic & high-frequency spindle repairs (up to 45,000 RPM)',
        'Preload calibration with ISO Class P4/P2 super-precision bearings',
        'Dynamic balancing to ISO 1940 Grade G0.4 standards',
        '48-hour continuous thermal and vibration run-in testing'
      ]
    },
    {
      id: 'thermal-coatings',
      title: 'Thermal Process & Surface Coatings',
      badge: 'Surface Metallurgy',
      badgeColor: 'bg-amber-600',
      tagline: 'Advanced plasma spray, carbide overlay, and chemical passivation.',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
      href: '/services/thermal-process-and-coatings',
      points: [
        'Plasma spray metalizing for worn shaft journal restoration',
        'HYOF spray, PTA & TIG cladding for extreme density bonding',
        'Tungsten carbide (WC-Co-Cr) & ceramic anti-abrasion barriers',
        'Hard anodizing, blackodizing & precision passivation'
      ]
    },
    {
      id: 'gearbox-motors',
      title: 'Planetary Gearbox & Drive Maintenance',
      badge: 'Mechanical Drives',
      badgeColor: 'bg-emerald-600',
      tagline: 'Zero-backlash transmission rebuilding and gear tooth grinding.',
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=1200&auto=format&fit=crop',
      href: '/services/servicing-and-reconditioning',
      points: [
        'Planetary, helical, and duplex worm gearbox overhauls',
        'Rotary table and tailstock restoration with certified backlash calibration',
        'Servo motor rewinding, encoder alignment & torque testing',
        'Replacement of custom hardened and ground gear pairs'
      ]
    }
  ]

  const caseStudies = [
    {
      title: 'CNC Turning Center CTB 150 Rebuild',
      before: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/3971b4f2.jpeg',
      after: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/fe72caf2.jpeg',
      scope: 'Full mechanical strip-down, slideway grinding, new spindle bearings, and HMI modernization.',
      result: 'Commissioned on-site with < 0.003mm radial runout.'
    },
    {
      title: 'Precision Slideway Re-Scraping',
      before: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/2f74f73f.jpeg',
      after: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/6f41f130.jpeg',
      scope: 'Manual hand-scraping of worn saddle ways and turcite-B lining replacement.',
      result: 'Restored geometric flatness to 0.002mm/m.'
    },
    {
      title: 'High-Precision Spindle Restoration',
      before: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/0c8bcb46.jpeg',
      after: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/eba738e5.jpeg',
      scope: 'Plasma spray journal build-up, diamond grinding & dynamic balancing.',
      result: 'Vibration levels reduced by 85% at 12,000 RPM.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative bg-[#071333] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000&auto=format&fit=crop"
            alt="Bharat Machine Tools Services"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071333]/90 via-[#071333]/80 to-[#071333]" />
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-400/20 text-blue-300 rounded-full text-xs font-mono font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
            <Wrench className="w-3.5 h-3.5 text-blue-400" />
            Turnkey Engineering Capabilities
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 font-mono leading-tight">
            Specialized Industrial Services <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
              &amp; Machine Reconditioning
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed font-light mb-8">
            Leveraging 25+ years of rotodynamic engineering expertise and precision cleanroom bays in Bangalore. We restore, retrofit, and surface-engineer manual and CNC machines to sub-micron accuracy.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono block">&lt; 0.002mm</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Runout Accuracy</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono block">500+</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Machines Restored</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono block">45,000 RPM</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Spindle Testing</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono block">ISO G0.4</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Dynamic Balance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
            CORE SERVICE DIVISIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase mt-4 mb-3 font-mono">
            Engineered for Zero-Defect Performance
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
            Every service is backed by comprehensive dimensional calibration, vibration spectrum testing, and ISO 9001:2015 quality inspection certificates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {serviceCards.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Visual Header */}
                <div className="h-64 relative overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-white text-[10px] font-bold rounded-md uppercase tracking-wider font-mono shadow-sm ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-mono leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-5">
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {service.tagline}
                  </p>

                  <div className="space-y-2.5 border-t border-slate-100 pt-4">
                    {service.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-8 pt-0">
                <Link
                  href={service.href}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10 font-sans group-hover:gap-3"
                >
                  <span>Explore Technical Details &amp; Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Before/After Case Studies */}
      <section className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-950/60 px-3 py-1 rounded-md border border-blue-800/60">
              PROVEN RESULTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase mt-4 mb-3 font-mono">
              Real Machine Transformation Case Studies
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
              Witness how our engineering team revives heavily worn industrial assets back to OEM precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="bg-slate-800/60 rounded-3xl border border-slate-700/60 p-6 flex flex-col justify-between shadow-lg">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white font-mono">{cs.title}</h3>
                  
                  {/* Before / After Dual Image Container */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="aspect-square rounded-xl overflow-hidden bg-slate-950 border border-red-500/40 relative">
                        <img src={cs.before} alt="Before rebuild" className="w-full h-full object-cover" loading="lazy" />
                        <span className="absolute bottom-1.5 left-1.5 bg-red-600/90 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                          BEFORE
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="aspect-square rounded-xl overflow-hidden bg-slate-950 border border-emerald-500/40 relative">
                        <img src={cs.after} alt="After rebuild" className="w-full h-full object-cover" loading="lazy" />
                        <span className="absolute bottom-1.5 left-1.5 bg-emerald-600/90 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                          AFTER
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {cs.scope}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{cs.result}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services/servicing-and-reconditioning"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-colors shadow-md font-sans"
            >
              <span>View Complete 10-Photo Gallery &amp; Video</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities & Cleanroom Standards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
                OUR MANUFACTURING CELLS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                Class 10,000 Cleanroom &amp; Dynamic Testing Bays
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Located in Abbigere Industrial Area, Bangalore, our facility houses specialized CNC cylindrical grinding machines, Schenck dynamic balancing systems, and CMM inspection cells to guarantee zero-defect dispatches.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="font-mono text-lg font-bold text-blue-900 block">STUDER Cells</span>
                  <span className="text-[11px] text-slate-500 font-light">Sub-micron cylindrical grinding</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="font-mono text-lg font-bold text-blue-900 block">Schenck Balancer</span>
                  <span className="text-[11px] text-slate-500 font-light">ISO 1940 Class G0.4 precision</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md h-80 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=1000&auto=format&fit=crop"
                alt="Cleanroom testing cell"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
                  Bangalore Facility
                </span>
                <p className="text-[11px] text-slate-200 font-light mt-0.5">
                  Unit 1, Lakshmipura Main Road, Abbigere Industrial Area, Bengaluru 560090
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#0b1b4f] to-[#1e3a8a] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Direct Engineering Consultation
            </span>
            <h3 className="text-xl sm:text-3xl font-black font-mono mt-2">
              Ready to Upgrade or Recondition Your Machines?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 font-light max-w-xl">
              Contact our engineering desk for on-site machine inspection, thermal coating recommendations, or an immediate formal quotation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:08048031763"
              className="inline-flex items-center gap-2 px-6 py-4 bg-white text-blue-900 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-blue-50 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>080 4803 1763</span>
            </a>
            <a
              href="https://wa.me/919530208882?text=Hello%2C%20I%20need%20engineering%20services%20and%20machine%20reconditioning%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Request Quote</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
