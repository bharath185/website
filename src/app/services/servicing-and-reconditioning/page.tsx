import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Phone, Mail, ShieldCheck, Wrench, Video, Settings, Cog, Check } from 'lucide-react'

export const metadata = {
  title: 'Servicing & Reconditioning of CNC & Manual Machines | Bharat Machine Tools',
  description: 'Retrofitting and reconditioning of Turning Centers, VMC, HMC, centerless grinding, cylindrical grinding, spindles, ball screws, and rotary tables in Bangalore, India.'
}

export default function ServicingReconditioningPage() {
  const machineTypes = [
    {
      title: 'CNC Turning Centers & Lathes',
      description: 'Slideway re-scraping, spindle bearing cartridge overhauls, turret alignment, and hydraulic chuck clamping rebuilds.',
      image: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/fe72caf2.jpeg'
    },
    {
      title: 'VMC & HMC Machining Centers',
      description: 'Axis ball screw replacement, linear guide alignment, automatic tool changer (ATC) timing calibration, and spindle taper regrinding.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Cylindrical & Centerless Grinding Machines',
      description: 'Hydrostatic and hydrodynamic spindle rebuilding, workhead alignment, regulating wheel drive restoration, and sub-micron runout testing.',
      image: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/eba738e5.jpeg'
    },
    {
      title: 'Gear Hobbing & Heavy Machinery',
      description: 'Duplex worm gear backlash elimination, indexing table restoration, heavy-duty lead screw alignment, and precision lubrication retrofits.',
      image: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/6f41f130.jpeg'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header Banner */}
      <div className="bg-[#0b1b4f] text-white pt-24 pb-14 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white transition-colors mb-4 font-mono uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Services
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-blue-400/20">
            <Wrench className="w-3.5 h-3.5" />
            Turnkey Machine Restoration
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-mono">
            Servicing &amp; Machine Reconditioning
          </h1>
          <p className="text-slate-300 text-xs sm:text-base mt-2 max-w-2xl font-light leading-relaxed">
            Turnkey retrofitting, overhauling, and precision geometric restoration of CNC and conventional machine tools across India.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* Video Feature & Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            <Video className="w-4 h-4" />
            <span>Process &amp; Rebuild Video</span>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
            <iframe
              src="https://www.youtube.com/embed/4qTSX3RlR6Y"
              title="Machine Reconditioning Demonstration by Bharat Machine Tools"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed font-light space-y-4">
            <p>
              Bharat Machine Tools provides comprehensive <strong>retrofitting &amp; reconditioning of all types of manual and CNC machines</strong> like turning centers, VMC, HMC, centerless grinding, cylindrical grinding, and gear hobbing machines.
            </p>
            <p>
              Services can be conducted <strong>at the customer's site</strong> or inside our <strong>Bengaluru cleanroom premises</strong>, whichever offers maximum operational convenience and minimal downtime for your production lines.
            </p>
          </div>

          {/* Scope of Servicing List */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-mono mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" />
              Scope of Specialized Reconditioning
            </h3>
            <div className="grid sm:grid-cols-2 gap-3.5 text-xs text-slate-700 font-medium">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Servicing and reconditioning of spindles and ball screws</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Servicing and reconditioning of rotary tables and tail stocks</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Assembly assistance &amp; turnkey commissioning</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Reconditioning of large and small precision bearings (YRT, crossed roller)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Reconditioning of gear boxes including planetary gear boxes</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Main spindle &amp; servo motor reconditioning</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200/80 text-[11px] text-blue-800 font-medium bg-blue-50/50 p-3 rounded-xl">
              💡 <strong>On-Site Maintenance Note:</strong> We can offer complete recurring maintenance contracts and emergency repair activities directly at your factory premises.
            </div>
          </div>
        </div>

        {/* Machine Types We Recondition */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              EQUIPMENT EXPERTISE
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 font-mono mt-2">
              Machinery Handled &amp; Restored
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {machineTypes.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="h-44 bg-slate-900 overflow-hidden relative">
                  <img src={m.image} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-sm font-bold text-white font-mono">{m.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Action Banner */}
        <div className="bg-[#0b1b4f] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-lg font-bold font-mono">Have a Machine Requiring Reconditioning?</h3>
            <p className="text-xs text-slate-300 mt-1 font-light">
              Send us your machine specifications or invite our engineering team for an on-site evaluation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:08048031763"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-[#0b1b4f] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-100 transition-colors shadow-sm font-sans"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>080 4803 1763</span>
            </a>
            <a
              href="https://wa.me/919530208882?text=Hello%2C%20I%20need%20machine%20servicing%20and%20reconditioning%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm font-sans"
            >
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm font-sans"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Submit RFQ</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
