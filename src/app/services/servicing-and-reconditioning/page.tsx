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
      title: 'Special Purpose Machines & CNC Lathes',
      description: 'Slideway re-scraping, spindle bearing cartridge overhauls, turret alignment, and hydraulic chuck clamping rebuilds.',
      image: '/images/images/image-4.png'
    },
    {
      title: '5-Axis Gantry & VMC Machining Centers',
      description: 'Axis ball screw replacement, linear guide alignment, automatic tool changer (ATC) timing calibration, and spindle taper regrinding.',
      image: '/images/images/image-2.png'
    },
    {
      title: 'Precision Spindle & Bearing Test Bench',
      description: 'Hydrostatic and high-speed cartridge spindle rebuilding, dynamic balancing up to 45,000 RPM, and sub-micron runout testing.',
      image: '/images/images/image-5.png'
    },
    {
      title: 'CNC Controller & Drive Automation',
      description: 'Customized HMI operator panels, servo drive retrofitting, and automated tool changer synchronization.',
      image: '/images/images/image-3.png'
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-800 pt-32 sm:pt-36 lg:pt-40 pb-20 relative overflow-hidden">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors mb-4 font-mono uppercase tracking-wider font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Services
        </Link>
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40 inline-flex items-center gap-1.5 mb-3">
            <Wrench className="w-3 h-3 text-blue-600" />
            TURNKEY MACHINE RESTORATION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 uppercase tracking-tight font-display">
            Servicing &amp; Machine Reconditioning
          </h1>
          <p className="text-slate-600 text-xs sm:text-base mt-2 max-w-2xl font-light leading-relaxed">
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
              src="https://www.youtube-nocookie.com/embed/4qTSX3RlR6Y?autoplay=1&mute=1&loop=1&playlist=4qTSX3RlR6Y&controls=1&modestbranding=1&rel=0&playsinline=1"
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

        {/* Featured Case Studies from BMT Industrial Portfolio */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              PROVEN CASE STUDIES
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 font-mono mt-2">
              Industrial Engineering Case Studies
            </h2>
            <p className="text-xs text-slate-500 font-light mt-1">
              Real engineering solutions delivered and proofed at customer plants across India.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-3">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-fit">
                Rail Wheel Factory
              </span>
              <h3 className="font-bold text-slate-900 text-sm font-mono">Heavy Machine Tool Reconditioning</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Complete mechanical overhaul, guideway scraping, and geometric restoration conducted directly at the Rail Wheel Factory plant.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-3">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-fit">
                Defense &amp; Aviation
              </span>
              <h3 className="font-bold text-slate-900 text-sm font-mono">40-Ton Actuators &amp; Frangible Masts</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Design and manufacturing of 40-Ton roller-screw actuators (5s stroke time) and airport frangible masts proofed on-site.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-3">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-fit">
                Special Spindles
              </span>
              <h3 className="font-bold text-slate-900 text-sm font-mono">Friction Welding &amp; Bar Peeling</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Custom manufacturing &amp; reconditioning of heavy-duty friction welding and bar peeling machine spindles with &lt; 0.001mm runout.
              </p>
            </div>
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
