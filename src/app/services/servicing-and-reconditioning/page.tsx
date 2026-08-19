import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Phone, Mail, ArrowRight, ShieldCheck, Wrench, Video, Image as ImageIcon } from 'lucide-react'

export const metadata = {
  title: 'Servicing & Reconditioning of CNC & Manual Machines | Bharat Machine Tools',
  description: 'Retrofitting and reconditioning of Turning Centers, VMC, HMC, centerless grinding, cylindrical grinding, spindles, ball screws, and rotary tables in Bangalore, India.'
}

export default function ServicingReconditioningPage() {
  const beforeImages = [
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/3971b4f2.jpeg', label: 'Worn Assembly Received' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/bc9ffd7e.jpeg', label: 'Dismantled Machine Base' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/2f74f73f.jpeg', label: 'Degraded Slide Ways' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/0c8bcb46.jpeg', label: 'Spindle Housing Wear' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/559f69e7.jpeg', label: 'Corroded Electricals & Hydraulics' }
  ]

  const afterImages = [
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/fe72caf2.jpeg', label: 'CTB 150 Commissioned at Customer Site' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/6f41f130.jpeg', label: 'Precision Re-scraped Guideways' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/eba738e5.jpeg', label: 'Dynamically Balanced Spindle Assembly' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/5cc330a6.jpeg', label: 'Refurbished Hydrostatic Drive System' },
    { src: 'https://boost-content-cdn.s3.ap-south-1.amazonaws.com/CustomPages/Images/0e8d1c9b.jpeg', label: 'Modern CTB 150 HMI Control Integration' }
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
            Servicing and Reconditioning
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-light leading-relaxed">
            Turnkey retrofitting, overhauling, and precision restoration of CNC and conventional machine tools across India.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Video Feature & Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            <Video className="w-4 h-4" />
            <span>Process &amp; Rebuild Video</span>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
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
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-mono mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-600" />
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
            <div className="mt-4 pt-4 border-t border-slate-200/80 text-[11px] text-blue-800 font-medium bg-blue-50/50 p-3 rounded-lg">
              💡 <strong>On-Site Maintenance Note:</strong> We can offer complete recurring maintenance contracts and emergency repair activities directly at your factory premises.
            </div>
          </div>
        </div>

        {/* Before / After Transformation Gallery */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
              Verified Case Study
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-mono mt-1">
              Before &amp; After Reconditioning Showcase
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
              Real project transformation of an industrial CNC turning center restored to brand-new factory tolerances.
            </p>
          </div>

          {/* Section: Before */}
          <div className="bg-red-50/40 rounded-2xl border border-red-200/60 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-md font-mono">
                BEFORE RESTORATION
              </span>
              <span className="text-xs text-red-900 font-medium">Degraded Condition at Client Facility</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {beforeImages.map((img, i) => (
                <div key={i} className="group bg-white rounded-xl overflow-hidden border border-red-200 shadow-sm">
                  <div className="aspect-square relative overflow-hidden bg-slate-100">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 text-[10px] text-slate-600 font-medium text-center line-clamp-2">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: After */}
          <div className="bg-emerald-50/40 rounded-2xl border border-emerald-200/60 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-md font-mono">
                AFTER BMT REBUILD &amp; COMMISSIONING
              </span>
              <span className="text-xs text-emerald-900 font-medium">Restored to Sub-Micron OEM Accuracy</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {afterImages.map((img, i) => (
                <div key={i} className="group bg-white rounded-xl overflow-hidden border border-emerald-200 shadow-sm">
                  <div className="aspect-square relative overflow-hidden bg-slate-100">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 text-[10px] text-slate-700 font-bold text-center line-clamp-2">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Action Banner */}
        <div className="bg-[#0b1b4f] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-lg font-bold font-mono">Have a Machine Requiring Reconditioning?</h3>
            <p className="text-xs text-slate-300 mt-1 font-light">
              Send us your machine specifications or invite our engineering team for an on-site evaluation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919530208882?text=Hello%2C%20I%20need%20machine%20servicing%20and%20reconditioning%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
