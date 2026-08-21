"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, ArrowUp, MessageSquare } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

// Inline SVG social icons (brand icons not available in lucide-react)
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
)
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
)
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
)
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
)

export default function V2Footer() {
  const { user } = useAuth()
  const [social, setSocial] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    twitter: '',
    whatsapp: ''
  })

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const res = await fetch('/api/social-settings')
        const data = await res.json()
        if (data?.settings) {
          setSocial(data.settings)
        }
      } catch (e) {
        console.error('Failed to load social settings', e)
      }
    }
    fetchSocial()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { name: 'facebook', Icon: FacebookIcon, url: social.facebook, color: '#1877F2' },
    { name: 'instagram', Icon: InstagramIcon, url: social.instagram, color: '#E4405F' },
    { name: 'linkedin', Icon: LinkedinIcon, url: social.linkedin, color: '#0A66C2' },
    { name: 'youtube', Icon: YoutubeIcon, url: social.youtube, color: '#FF0000' },
    { name: 'twitter', Icon: TwitterIcon, url: social.twitter, color: '#000000' },
    { name: 'whatsapp', Icon: WhatsappIcon, url: social.whatsapp, color: '#25D366' },
  ]

  const activeSocialLinks = socialLinks.filter(({ url }) => !!url)

  return (
    <>
      <footer className="bg-slate-100 relative border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand details Column */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="Bharat Machine Tools" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-[11px] text-blue-900 font-bold font-mono tracking-wide">
                &ldquo;We Can Make What You Can Imagine&rdquo;
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-light">
                Leading manufacturer, supplier, and exporter of CNC Machines, Machine Tools, Spindles, Hydrostatic Bearings, and Custom Assemblies. Established in Bangalore, Karnataka.
              </p>
              {/* Social icons in footer */}
              {activeSocialLinks.length > 0 && (
                <div className="flex gap-3 mt-2">
                  {activeSocialLinks.map(({ name, Icon, url, color }) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors" title={name}>
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            {/* Quick Nav Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 font-mono">
                Corporate Links
              </h4>
              <div className="flex flex-col gap-3 font-light text-slate-600 text-xs">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home Landing</Link>
                <Link href="/products" className="hover:text-blue-600 transition-colors">Product Catalogue</Link>
                <Link href="/services" className="hover:text-blue-600 transition-colors">Specialized Services</Link>
                <Link href="/services/servicing-and-reconditioning" className="hover:text-blue-600 transition-colors">Machine Reconditioning</Link>
                <Link href="/services/thermal-process-and-coatings" className="hover:text-blue-600 transition-colors">Thermal Coatings</Link>
                <Link href="/news" className="hover:text-blue-600 transition-colors">News &amp; Technical Journal</Link>
                <Link href="/faq" className="hover:text-blue-600 transition-colors">Frequently Asked Questions</Link>
                {!user && (
                  <Link href="/careers" className="hover:text-blue-600 transition-colors">Careers</Link>
                )}
                <Link href="/contact" className="hover:text-blue-600 transition-colors">Support Center</Link>
                <Link href="/orders" className="hover:text-blue-600 transition-colors">Track Shipment</Link>
              </div>
            </div>
            {/* Categories Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 font-mono">
                Core Products
              </h4>
              <div className="flex flex-col gap-3 font-light text-slate-600 text-xs">
                <Link href="/products" className="hover:text-blue-600 transition-colors">Machine Spindles</Link>
                <Link href="/products" className="hover:text-blue-600 transition-colors">Hydrostatic Bearings</Link>
                <Link href="/products" className="hover:text-blue-600 transition-colors">Precision Ball Screws</Link>
                <Link href="/products" className="hover:text-blue-600 transition-colors">Planetary Gearboxes</Link>
                <Link href="/products" className="hover:text-blue-600 transition-colors">Locknuts &amp; Mandrels</Link>
                <Link href="/products" className="hover:text-blue-600 transition-colors">Drive Accessories</Link>
              </div>
            </div>
            {/* Contact Details Column */}
            <div className="flex flex-col gap-3.5 text-xs font-light text-slate-600">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 font-mono">
                Contact Hub
              </h4>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Unit 1, Lakshmipura Main Road 2nd Cross, Abbigere Industrial Area, Chikkabanavara Post, Bengaluru, Karnataka, 560090</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>080 4803 1763</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>bmt.sangeeta@gmail.com</span>
              </div>
              <div className="pt-2 border-t border-slate-200/60 text-[10px] font-mono text-slate-500">
                GSTIN: <span className="font-bold text-slate-700">29AAUFB7927K1ZK</span>
              </div>
            </div>
          </div>
          {/* Copyright Area */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">
              © {new Date().getFullYear()} BHARAT MACHINE TOOLS. ALL RIGHTS RESERVED.
            </span>
            <button onClick={scrollToTop} className="p-3 bg-white hover:bg-slate-200 border border-slate-200 rounded-2xl transition-all text-slate-500 hover:text-slate-800 shadow-sm" title="Back to Top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating social media sidebar - right side */}
      {activeSocialLinks.length > 0 && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[3px]">
          {activeSocialLinks.map(({ name, Icon, url, color }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[34px] h-[34px] rounded-[6px] text-white transition-all duration-200 hover:opacity-90 hover:shadow-md hover:-translate-x-0.5"
              style={{ backgroundColor: color }}
              title={name.charAt(0).toUpperCase() + name.slice(1)}
            >
              <Icon className="w-[15px] h-[15px]" />
            </a>
          ))}
        </div>
      )}
    </>
  )
}
