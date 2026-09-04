import React from 'react'
import Link from 'next/link'
import { HelpCircle, Phone, Mail, ChevronDown, MessageSquare } from 'lucide-react'

export default function FAQPage() {
  const faqs = [
    {
      q: 'What types of machine tools and accessories does Bharat Machine Tools manufacture?',
      a: 'Bharat Machine Tools manufactures and exports high-precision machine spindles (hydrostatic, hydrodynamic, cartridge, and high-frequency BT30/BT40/BT50), precision locknuts (YSK, YSF, YSR), rotary tables, tailstocks, planetary gearboxes, ball screws, crossed roller bearings, YRT bearings, flow forming machine mandrels, straightening rollers, reeling rollers, and custom SPM tooling.'
    },
    {
      q: 'Can Bharat Machine Tools perform on-site machine retrofitting and reconditioning?',
      a: 'Yes. We offer both on-site servicing directly at your factory premises and complete overhaul at our cleanroom facility in Abbigere Industrial Area, Bangalore. We recondition turning centers, VMCs, HMCs, cylindrical grinders, centerless grinders, and gear hobbing machines.'
    },
    {
      q: 'What accuracy and runout tolerances do your precision spindles achieve?',
      a: 'Our precision cartridge and hydrostatic spindles are engineered for sub-micron accuracy, typically maintaining dynamic radial and axial runouts of less than 0.002 mm (2 microns) with high rigidity under full industrial load.'
    },
    {
      q: 'Do you provide custom design and manufacturing for special purpose machines (SPM)?',
      a: 'Absolutely. Guided by our motto "We Can Make What You Can Imagine," we engineer tailored spindles, mandrels, elevation actuators, and custom mechanical sub-assemblies based on your CAD drawings, sample parts, or unique engineering requirements.'
    },
    {
      q: 'What surface coating and thermal treatment services do you offer?',
      a: 'We provide plasma spray metalizing, HYOF (High Velocity Oxygen Fuel) coatings, PTA & TIG cladding, ceramic and tungsten carbide protective coatings, hard facing, chemical blackodizing, passivation, and hard anodization.'
    },
    {
      q: 'How can I request a technical quote or submit an RFQ for products?',
      a: 'You can submit an inquiry through our website Enquiry Cart, call our desk directly at +91-9880464557 (Abbas Khan), send an email to bmt.sangeeta@gmail.com / bmt.abbas@gmail.com, or chat with us on WhatsApp.'
    },
    {
      q: 'Do you supply products outside Bangalore and internationally?',
      a: 'Yes, Bharat Machine Tools supplies precision assemblies and machine parts across Karnataka, pan-India industrial hubs, and overseas clients with standard export packaging and insured logistics.'
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": "https://bmtbharat.com/faq/#faq",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bmtbharat.com/faq/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bmtbharat.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "FAQ",
            "item": "https://bmtbharat.com/faq"
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-[#fafbfc] text-slate-900 pt-24 sm:pt-28 pb-16 font-sans relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#122f87]" />
            <span className="text-[10px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
              SUPPORT &bull; ENGINEERING KNOWLEDGE BASE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight font-display leading-[1.15]">
            Frequently Asked <span className="text-[#122f87]">Questions</span>
          </h1>

          <div className="flex items-center justify-center gap-1.5 pt-0.5 pb-0.5">
            <span className="w-12 h-1 bg-[#122f87] rounded-full" />
            <span className="w-8 h-1 bg-blue-500 rounded-full" />
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light max-w-xl mx-auto">
            Find answers to common technical inquiries regarding our spindle manufacturing, sub-micron tolerances, custom SPM engineering, and nationwide factory commissioning.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden open:border-blue-300 transition-all duration-200"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 font-mono group-open:text-[#122f87] transition-colors">
                  {faq.q}
                </h2>
                <div className="w-7 h-7 rounded-full bg-slate-100 group-open:bg-blue-50 text-slate-500 group-open:text-[#122f87] flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </summary>
              <p className="text-xs sm:text-sm text-slate-600 mt-4 pt-4 border-t border-slate-100 font-light leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}

          {/* Contact Support Box */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-mono">
              Have a Different Question or Custom Requirement?
            </h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto font-light">
              Our technical engineering desk is available to assist with custom design drawings, urgent breakdown requirements, and product selection.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="tel:+919880464557"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91-9880464557</span>
              </a>
              <a
                href="https://wa.me/919530208882?text=Hello%2C%20I%20have%20an%20engineering%20inquiry%20regarding%20Bharat%20Machine%20Tools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
