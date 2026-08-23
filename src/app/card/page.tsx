"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Share2, 
  Download, 
  QrCode, 
  Award, 
  ShieldCheck, 
  Check, 
  Copy, 
  MessageSquare, 
  ExternalLink,
  Sparkles,
  Building,
  Wrench,
  X
} from "lucide-react"

export default function DigitalVisitingCardPage() {
  const [copied, setCopied] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)
  const [qrSvg, setQrSvg] = useState<string>("")
  const [currentUrl, setCurrentUrl] = useState<string>("https://bmt.prigenix.com/card")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/card`
      setCurrentUrl(url)
      // Generate QR Code via reliable QR API URL
      setQrSvg(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&color=0b1b4f&bgcolor=ffffff`)
    }
  }, [])

  const handleDownloadVCard = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Khan;Abbas;;Mr.;",
      "FN:Mr. Abbas Khan",
      "ORG:Bharat Machine Tools",
      "TITLE:Founder & Managing Director",
      "TEL;TYPE=CELL,VOICE:+919880464557",
      "TEL;TYPE=WORK,VOICE:+918048031763",
      "TEL;TYPE=WORK,VOICE:+919530208882",
      "EMAIL;TYPE=WORK,INTERNET:bmt.abbas@gmail.com",
      "EMAIL;TYPE=WORK,INTERNET:bmt.sangeeta@gmail.com",
      "URL:https://bmt.prigenix.com",
      "ADR;TYPE=WORK:;;#312 Ground Floor, Sharadhamma Illam, GPT, 1st Main Nagappa Block, Near Abbigere HP Petrol Pump, Abbigere, Chikkabanavara;Bangalore;Karnataka;560090;India",
      "NOTE:Bharat Machine Tools - Precision Motorized Spindles, Hydrostatic Bearings, Ball Screws, Defense Actuators & Turnkey CNC Reconditioning. CMTI Panelist.",
      "END:VCARD"
    ].join("\r\n")

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "Abbas_Khan_BMT.vcf")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mr. Abbas Khan | Bharat Machine Tools",
          text: "Connect with Mr. Abbas Khan (MD - Bharat Machine Tools Bangalore). Precision Spindles, Bearings & Machine Reconditioning.",
          url: currentUrl
        })
      } catch (err) {
        console.log("Share cancelled or failed", err)
      }
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden py-16">
      
      {/* Background Holographic Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Main Digital Card Container */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl relative z-10 my-auto">
        
        {/* Top Metallic Banner with Verified Badge */}
        <div className="relative h-32 bg-gradient-to-r from-[#0b1b4f] via-[#122f87] to-blue-900 p-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-300" />
              DIGITAL BUSINESS CARD
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors border border-white/20"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-colors border border-white/20"
              title="Share Card"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Avatar & Header Block */}
        <div className="px-6 pb-6 pt-0 relative">
          
          {/* Circular MD Portrait / Monogram */}
          <div className="-mt-14 mb-4 flex items-end justify-between">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 border-2 border-blue-500/50 shadow-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                <img 
                  src="/logo.png" 
                  alt="Bharat Machine Tools" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-slate-900 flex items-center justify-center text-white" title="Verified MD">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* CMTI Panelist Badge */}
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800/60">
                <Award className="w-3 h-3 text-blue-400" />
                CMTI Panelist
              </span>
            </div>
          </div>

          {/* Name & Title */}
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white font-display uppercase tracking-tight">
              Mr. Abbas Khan
            </h1>
            <p className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Founder &amp; Managing Director
            </p>
            <p className="text-xs text-slate-300 font-medium">
              Bharat Machine Tools &bull; Bangalore, India
            </p>
          </div>

          {/* Corporate Motto Pill */}
          <div className="my-4 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-center text-slate-300 font-medium tracking-wide">
            &ldquo;We Can Make What You Can Imagine &bull; Make In India&rdquo;
          </div>

          {/* 1-Tap Quick Action Grid (Call, WhatsApp, Email, Maps) */}
          <div className="grid grid-cols-4 gap-2.5 mb-5">
            <a
              href="tel:+919880464557"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md active:scale-95 group"
            >
              <Phone className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono font-bold uppercase">Call</span>
            </a>

            <a
              href="https://wa.me/919880464557?text=Hello%20Mr.%20Abbas%20Khan%2C%20I%20got%20your%20digital%20business%20card%20and%20would%20like%20to%20discuss%20a%20machine%20tool%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all shadow-md active:scale-95 group"
            >
              <MessageSquare className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono font-bold uppercase">WhatsApp</span>
            </a>

            <a
              href="mailto:bmt.abbas@gmail.com?subject=Engineering%20Enquiry%20via%20Digital%20Card"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all border border-slate-700 active:scale-95 group"
            >
              <Mail className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono font-bold uppercase">Email</span>
            </a>

            <a
              href="https://maps.google.com/?q=Sharadhamma+Illam+Abbigere+Bangalore+560090"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-all border border-slate-700 active:scale-95 group"
            >
              <MapPin className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-mono font-bold uppercase">Location</span>
            </a>
          </div>

          {/* Primary "Add to Contacts" Button */}
          <button
            onClick={handleDownloadVCard}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all active:scale-98 mb-5"
          >
            <Download className="w-4 h-4" />
            <span>Save Contact to Phone (.vcf)</span>
          </button>

          {/* Detailed Contact List */}
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start gap-3">
              <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-semibold">Direct Mobile &amp; Office</span>
                <a href="tel:+919880464557" className="text-white font-medium hover:text-blue-400 transition-colors block">
                  +91-9880464557
                </a>
                <span className="text-slate-400 text-[11px]">080 4803 1763 / +91-9530208882</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start gap-3">
              <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-semibold">Email Contacts</span>
                <a href="mailto:bmt.abbas@gmail.com" className="text-white font-medium hover:text-blue-400 transition-colors block">
                  bmt.abbas@gmail.com
                </a>
                <span className="text-slate-400 text-[11px]">bmt.sangeeta@gmail.com</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 flex items-start gap-3">
              <Building className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono text-slate-400 block uppercase font-semibold">Registered Works &amp; Plant</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  #312 Ground Floor, Sharadhamma Illam, GPT, 1st Main Nagappa Block, Near Abbigere HP Petrol Pump, Abbigere, Chikkabanavara, Bangalore - 560090, Karnataka, INDIA
                </p>
              </div>
            </div>
          </div>

          {/* Core Engineering Offerings Deck */}
          <div className="mt-5 pt-5 border-t border-slate-800 space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Core BMT Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Spindles (45k RPM)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Hydrostatic Bearings</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Ball Screws (Ø180x10m)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>CNC Reconditioning</span>
              </div>
            </div>
          </div>

          {/* Links to Full Site & Profile */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link
              href="/company-profile"
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-center font-mono font-bold text-[11px] uppercase tracking-wider transition-colors border border-slate-700"
            >
              Company Profile
            </Link>
            <Link
              href="/"
              className="py-2.5 px-3 rounded-xl bg-blue-900/40 hover:bg-blue-900/60 text-blue-300 text-center font-mono font-bold text-[11px] uppercase tracking-wider transition-colors border border-blue-800/50 flex items-center justify-center gap-1"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>

      {/* QR Code Modal for In-Person Scanning / Networking */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-slate-900 shadow-2xl relative text-center space-y-4">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 block">
                SCAN TO SAVE CONTACT
              </span>
              <h3 className="text-lg font-bold font-mono uppercase mt-1">Mr. Abbas Khan</h3>
              <p className="text-[11px] text-slate-500">Bharat Machine Tools</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-center">
              {qrSvg ? (
                <img src={qrSvg} alt="QR Code to connect" className="w-48 h-48 rounded-lg" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center font-mono text-xs text-slate-400">
                  Generating QR...
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Link Copied!" : "Copy Card Link"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Share / Copy Toast Notification */}
      {copied && (
        <div className="fixed bottom-6 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold shadow-xl animate-fade-up flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          <span>Digital Card link copied to clipboard!</span>
        </div>
      )}

    </div>
  )
}
