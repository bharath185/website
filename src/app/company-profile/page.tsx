import React from "react"
import Link from "next/link"
import { 
  ShieldCheck, 
  Award, 
  Settings, 
  CheckCircle2, 
  Cpu, 
  Wrench, 
  Compass, 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Layers, 
  Activity, 
  ArrowRight,
  Sparkles,
  Gauge,
  Factory,
  Globe,
  Share2,
  FileCheck
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Corporate Company Profile | Bharat Machine Tools Bangalore",
  description: "Official Corporate Profile of Bharat Machine Tools. High-precision machine tool manufacturing, motorized spindles, hydrostatic bearings, ball screws, defense actuators, and turnkey CNC reconditioning in Bangalore, India.",
  keywords: [
    "Bharat Machine Tools company profile",
    "BMT Bangalore profile",
    "precision machine manufacturing Bangalore",
    "Make in India machine tools",
    "Abbas Khan BMT",
    "spindles manufacturer India"
  ]
}

export default function CompanyProfilePage() {
  const coreMachinery = [
    {
      title: "External Cylindrical Grinder",
      capacity: "Capacity: Ø 500 mm x 5000 mm Length",
      description: "Heavy-duty sub-micron precision cylindrical grinding for long shafts, mandrels, and high-load rotodynamic components.",
      image: "/images/ppt/page_8_img_1_Im0.jpg",
      tag: "Heavy Grinding"
    },
    {
      title: "Universal Cylindrical Grinder",
      capacity: "Capacity: Ø 360 mm x 1500 mm",
      description: "Dual internal and external cylindrical grinding for high-frequency motorized spindles and bearing housings.",
      image: "/images/ppt/page_10_img_1_Im0.jpg",
      tag: "Sub-Micron Precision"
    },
    {
      title: "Big CNC Turning Centre",
      capacity: "Heavy Turning & Boring",
      description: "Multi-axis heavy CNC turning for complex geometries, aerospace actuators, and precision spindle housings.",
      image: "/images/ppt/page_9_img_1_Im0.jpg",
      tag: "CNC Automation"
    },
    {
      title: "Internal & External Grinding Cell",
      capacity: "Capacities: Ø 320 x 1200 & Ø 320 x 1000 mm",
      description: "Precision bore grinding with tight concentricity controls down to < 0.001 mm runout tolerances.",
      image: "/images/ppt/page_12_img_1_Im0.jpg",
      tag: "Bore Grinding"
    },
    {
      title: "Vertical Machining Center (VMC)",
      capacity: "Multi-Axis Milling & Profiling",
      description: "High-rigidity VMC machining for rotary table housings, customized fixture plates, and transmission assemblies.",
      image: "/images/ppt/page_14_img_1_Im0.jpg",
      tag: "VMC Milling"
    },
    {
      title: "Horizontal Rotary Grinding & EDM",
      capacity: "Surface Flatness & Jig Boring",
      description: "High-precision rotary surface grinding, electrical discharge machining (EDM), and jig boring.",
      image: "/images/ppt/page_15_img_1_Im0.jpg",
      tag: "Surface & EDM"
    }
  ]

  const caseStudies = [
    {
      badge: "Heavy Railways",
      title: "Rail Wheel Factory Machine Reconditioning",
      desc: "Turnkey mechanical overhaul, guideway hand-scraping, and dynamic geometric alignment conducted directly on-site at the Rail Wheel Factory.",
      image: "/images/ppt/page_35_img_1_Im0.jpg"
    },
    {
      badge: "Defense & Aerospace",
      title: "40-Ton & 9-Ton Heavy Linear Actuators",
      desc: "Engineered and manufactured roller-screw driven elevation actuators with 20,000 kg axial load capacity and 5-second rapid stroke time.",
      image: "/images/ppt/page_22_img_1_Im0.jpg"
    },
    {
      badge: "Aviation Infrastructure",
      title: "Airport Frangible Masts",
      desc: "Complete design, structural development, and airport proofing of frangible, pneumatic, and electro-mechanical masts.",
      image: "/images/ppt/page_24_img_1_Im0.jpg"
    },
    {
      badge: "Precision Tooling",
      title: "Crankshaft Grinding Fixture Assemblies",
      desc: "Complete engineering and tooling development of LH/RH crankshaft grinding fixtures and housing assemblies proofed at customer plant.",
      image: "/images/ppt/page_18_img_1_Im0.jpg"
    },
    {
      badge: "Special SPM Spindles",
      title: "Friction Welding & Bar Peeling Spindles",
      desc: "Custom high-load spindle assemblies engineered for friction welding and bar peeling machinery with sub-micron runout.",
      image: "/images/ppt/page_39_img_1_Im0.jpg"
    },
    {
      badge: "Aerospace Tooling",
      title: "Flow Forming Lathe Tools (Up to 3 Meters)",
      desc: "Specialized flow forming machine mandrels and tooling manufactured up to 3 meters in single-piece precision setup.",
      image: "/images/ppt/page_25_img_1_Im0.jpg"
    }
  ]

  const capabilitiesList = [
    {
      category: "Precision Machine Spindles",
      items: [
        "High Frequency Grinding Spindles (Up to 45,000 RPM)",
        "Machining Center Spindles: BT-30, BT-40, BT-50",
        "Turning Center Spindles: A2-3, A2-4, A2-5, A2-6, A2-8, A2-11, A2-15",
        "Hydrostatic & Hydrodynamic Ultra-Precision Spindles",
        "Internal & Long Bore Grinding Belt-Driven Spindles",
        "Universal Head, Right Angle & Swivel Head Spindles"
      ]
    },
    {
      category: "Rotary Tables & Tailstocks",
      items: [
        "4th & 5th Axis Tilting CNC Rotary Tables",
        "Rotary Tables with Automatic Pallet Changer (APC)",
        "NC Rotary Tables with High-Torque Direct Drive Motors",
        "Precision Tailstocks and Hydraulic Tail Supports",
        "RH Rotary Tables with Integrated Production Systems"
      ]
    },
    {
      category: "Ball Screws & Bearings",
      items: [
        "Ground & Rolled Ball Screws, Lead Screws (Up to Ø180 x 10m)",
        "YRT Axial/Radial Super-Precision Bearings (YRT-Ø100 to Ø800+)",
        "Crossed Roller Bearings & Slewing Ring Bearings",
        "Ball Screw Bearing Cartridges: TDT, TFT, DB, DF configurations",
        "Precision Locknuts (YSK, YSF, YSR Standard & Customized)"
      ]
    },
    {
      category: "Defense & Heavy Automation",
      items: [
        "Heavy Elevation Actuators (9-Ton to 40-Ton with Roller Screws)",
        "Stabilizing Outriggers (20-Ton to 40-Ton Axial Capacity)",
        "Airport Frangible Masts, Pneumatic & EM Telescopic Masts",
        "Planetary Gearboxes & Zero-Backlash Speed Reducers",
        "Duplex & Simplex Worm Wheels & Worm Shafts (Standard/Custom)"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-800 pt-24 sm:pt-28 pb-20 relative overflow-hidden">
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Subtle Glow Accents */}
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">

        {/* 1. HERO BANNER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#122f87] animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#122f87]">
              OFFICIAL CORPORATE PROFILE &bull; ESTD. 1999
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight font-display leading-[1.12]">
            Bharat <span className="text-[#122f87]">Machine Tools</span>
          </h1>

          <div className="flex items-center justify-center gap-1.5 pt-0.5 pb-0.5">
            <span className="w-14 h-1 bg-[#122f87] rounded-full" />
            <span className="w-8 h-1 bg-blue-500 rounded-full" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-900 pt-0.5">
            <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
              &ldquo;We Can Make What You Can Imagine&rdquo;
            </span>
            <span className="bg-[#122f87] text-white px-3 py-1.5 rounded-xl shadow-xs">
              Make In India Excellence
            </span>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Premier Indian engineering OEM specializing in the design, manufacturing, and sub-micron reconditioning of motorized spindles, hydrostatic bearings, CNC rotary tables, precision ball screws, defense actuators, and heavy machine tools.
          </p>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#122f87] hover:bg-[#0e256b] text-white text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Explore Product Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Request Technical Quote / RFQ</span>
            </Link>
          </div>
        </div>

        {/* 2. CORPORATE PILLARS (Mission, Vision, Strategy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase">BMT&apos;s Mission</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                To create a decisive competitive advantage for our customers by creating and executing world-class engineering and manufacturing solutions, thereby exceeding customer expectations in all technical dimensions.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] font-mono text-blue-600 font-bold uppercase">
              World-Class Engineering Solutions
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase">BMT&apos;s Vision</h3>
              <ul className="text-xs text-slate-600 font-light leading-relaxed space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Our customers&apos; preferred first-choice precision supplier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Continuous 50% YoY growth in technical capacity &amp; R&amp;D investment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Financially sound manufacturer of cost-effective zero-defect parts.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] font-mono text-blue-600 font-bold uppercase">
              Continuous Capacity &amp; Innovation
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase">Quality Creed</h3>
              <div className="space-y-2 text-xs text-slate-600 font-light leading-relaxed">
                <blockquote className="italic border-l-2 border-blue-600 pl-3 py-0.5 text-slate-800 font-medium">
                  &ldquo;Quality is not an act, it is a HABIT. Every job is a reflection of the person who does it.&rdquo;
                </blockquote>
                <p>
                  Zero defect, Zero effect. Committed to providing 24x7 technical and commercial engineering support for critical defense and aerospace machinery.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] font-mono text-blue-600 font-bold uppercase">
              Zero Defect &bull; 24x7 Technical Support
            </div>
          </div>
        </div>

        {/* 3. WORKSHOP INFRASTRUCTURE & MACHINERY INVENTORY */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              FACILITIES &amp; CAPACITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display">
              In-House Machinery &amp; Production Cell
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Operating precision grinding, CNC turning, multi-axis machining, and cleanroom bays in Bangalore for component lengths up to 5 meters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreMachinery.map((m, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img 
                    src={m.image} 
                    alt={m.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-[9px] font-mono font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 px-2.5 py-1 rounded-md">
                    {m.tag}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h4 className="text-sm font-bold text-white font-mono">{m.title}</h4>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-blue-600 block">{m.capacity}</span>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TESTING, CALIBRATION & CLEANROOM STANDARDS */}
        <div className="bg-gradient-to-br from-slate-900 to-[#0b1b4f] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300 bg-blue-900/60 px-3 py-1 rounded-md border border-blue-400/30 inline-block">
                IN-HOUSE QUALITY RIGS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight">
                Advanced Metrology &amp; Dynamic Testing Bays
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Every component leaving our facility is physically inspected, geometrically aligned, dynamically balanced, and tested under full load before dispatch with traceable QA certificates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
                  <span className="text-[10px] font-mono text-blue-300 font-bold block uppercase">Dynamic Balancing</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">Up to 45,000 RPM (ISO G0.4)</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
                  <span className="text-[10px] font-mono text-blue-300 font-bold block uppercase">Ultrasonic Flaw Check</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">100% In-House UT Testing</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
                  <span className="text-[10px] font-mono text-blue-300 font-bold block uppercase">Spindle Run Test Benches</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">Continuous 48h Thermal Check</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
                  <span className="text-[10px] font-mono text-blue-300 font-bold block uppercase">Laser Interferometry</span>
                  <span className="text-xs font-semibold text-white block mt-0.5">&lt; 0.001 mm Runout Alignment</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-md">
                <img src="/images/ppt/page_40_img_1_Im0.jpg" alt="Balancing Facilities" className="w-full h-36 sm:h-44 object-cover" />
                <div className="p-2.5 bg-slate-950/80 text-[10px] font-mono font-semibold text-center text-slate-200">
                  Balancing Rig
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-md">
                <img src="/images/ppt/page_41_img_1_Im0.jpg" alt="Spindle Test Rigs" className="w-full h-36 sm:h-44 object-cover" />
                <div className="p-2.5 bg-slate-950/80 text-[10px] font-mono font-semibold text-center text-slate-200">
                  Spindle Run Test Rig
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-md">
                <img src="/images/ppt/page_42_img_1_Im0.jpg" alt="In-House UT Test" className="w-full h-36 sm:h-44 object-cover" />
                <div className="p-2.5 bg-slate-950/80 text-[10px] font-mono font-semibold text-center text-slate-200">
                  In-House UT Test
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-md">
                <img src="/images/ppt/page_43_img_2_Im1.jpg" alt="Inspection Room" className="w-full h-36 sm:h-44 object-cover" />
                <div className="p-2.5 bg-slate-950/80 text-[10px] font-mono font-semibold text-center text-slate-200">
                  Metrology &amp; Inspection
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. COMPREHENSIVE MANUFACTURING & SERVICING SCOPE */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              COMPLETE PRODUCT PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display">
              Scope of Manufacturing &amp; Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilitiesList.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 font-mono text-sm uppercase">{cat.category}</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600 font-light">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 6. PROVEN INDUSTRIAL CASE STUDIES */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              FIELD VALIDATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display">
              Proven Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Demonstrated engineering execution for aerospace, defense, heavy transport, and machine builder OEMs across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-md">
                    {cs.badge}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h4 className="text-sm font-bold text-white font-mono">{cs.title}</h4>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {cs.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. WORKS & FACILITY PHOTO GALLERY */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              FACILITY &amp; WORKSHOP SHOWCASE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase font-display">
              Bangalore Production &amp; Assembly Bays
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Glimpses of our precision grinding cells, heavy CNC machinery, cleanroom assembly bays, and finished product lots.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_2.jpg" 
                alt="Precision Grinding Setup" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                Grinding Cell
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_3.jpg" 
                alt="Heavy CNC Turning Bay" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                CNC Turning Bay
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_14.jpg" 
                alt="Machine Tool Beds" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                Heavy Lathes
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_15.jpg" 
                alt="Assembly Bay" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                Assembly QA
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_10.jpg" 
                alt="Rotary Tables & Spindles" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                Spindles &amp; Tables
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_11.jpg" 
                alt="Ball Screws & Bearings" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                Ball Screws
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_7.jpg" 
                alt="Testing & Calibration" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                Metrology Cell
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group relative aspect-[4/3] bg-slate-900">
              <img 
                src="/images/company-profile/bmt_web_12.jpg" 
                alt="Bearings & Locknuts" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-white uppercase">
                YRT Bearings
              </span>
            </div>
          </div>
        </div>

        {/* 8. CUSTOMER ADVANTAGE */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200/40">
              STRATEGIC PARTNERSHIP
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-mono uppercase">
              The BMT Client Advantage
            </h3>
            <p className="text-xs text-slate-600 font-light">
              Once an engineering contract or purchase agreement is signed, your organization gains direct institutional benefits:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <FileCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-mono text-[11px] uppercase mb-1">Design Analysis at Ordering</strong>
                <p className="text-slate-600 font-light">Complete finite element &amp; stiffness evaluation during early ordering to prevent mechanical pitfalls.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Activity className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-mono text-[11px] uppercase mb-1">Reduced Customer Workload</strong>
                <p className="text-slate-600 font-light">Relieves design engineers with turnkey proofing and complete 3D assembly models.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-mono text-[11px] uppercase mb-1">Complete Transparency</strong>
                <p className="text-slate-600 font-light">Daily flow-of-work status updates, shared documentation, and raw material traceability.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Settings className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-mono text-[11px] uppercase mb-1">Dedicated Test Rigs</strong>
                <p className="text-slate-600 font-light">Custom simulation test benches built specifically for high-stress client applications.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-mono text-[11px] uppercase mb-1">ISO 9001:2015 QA Checklists</strong>
                <p className="text-slate-600 font-light">Strict defense-grade dynamic quality verification before shipment dispatch.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-mono text-[11px] uppercase mb-1">24x7 Direct Engineering SLA</strong>
                <p className="text-slate-600 font-light">Direct phone &amp; on-site engineer deployment from Bangalore for emergency support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 8. CONTACT & WORKS INFO */}
        <div className="bg-[#122f87] rounded-3xl p-8 sm:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-200">
              DIRECT FACTORY COMMUNICATIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display uppercase">
              Connect With Our Engineering Team
            </h3>
            <p className="text-xs text-blue-100 font-light max-w-xl">
              <strong>Registered Works:</strong> #312 Ground Floor, Sharadhamma Illam, GPT, 1st Main Nagappa Block, Near Abbigere HP Petrol Pump, Abbigere, Chikkabanavara, Bangalore - 560090, Karnataka, INDIA
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:+919880464557"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-[#122f87] font-bold text-xs uppercase font-mono tracking-wider rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>+91-9880464557</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase font-mono tracking-wider rounded-xl transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Submit RFQ</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
