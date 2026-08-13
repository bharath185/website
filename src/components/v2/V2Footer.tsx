"use client"

import React from "react"
import Link from "next/link"
import { Compass, MapPin, Phone, Mail, ArrowUp } from "lucide-react"

export default function V2Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-slate-100 relative border-t border-slate-200 overflow-hidden">
      
      {/* Background blueprint overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand details Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.jpg" 
                alt="Bharat Machine Tools" 
                className="h-8 w-auto object-contain bg-white px-2 py-0.5 rounded-lg border border-slate-200" 
              />
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-light">
              Providing precision-engineered industrial spindles, hydrostatic bearings, SPDs, and custom assemblies to leading manufacturing houses across India. Established in Bangalore, Karnataka.
            </p>
          </div>

          {/* Quick Nav Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 font-mono">
              Corporate Links
            </h4>
            <div className="flex flex-col gap-3 font-light text-slate-650 text-xs">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home Landing</Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">Product Catalogue</Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">Support Center</Link>
              <Link href="/orders" className="hover:text-blue-600 transition-colors">Track Shipment</Link>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 font-mono">
              Core Products
            </h4>
            <div className="flex flex-col gap-3 font-light text-slate-650 text-xs">
              <Link href="/products" className="hover:text-blue-600 transition-colors">Machine Spindles</Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">Hydrostatic Bearings</Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">Precision Ball Screws</Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">Drive Accessories</Link>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-4 text-xs font-light text-slate-650">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2 font-mono">
              Contact Hub
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Peenya Industrial Area, Bangalore, KA, 560058</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              <span>+91 95302 08882</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span>contact@bmtbharat.com</span>
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-slate-500 font-mono tracking-wider">
            © {new Date().getFullYear()} BHARAT MACHINE TOOLS. ALL RIGHTS RESERVED.
          </span>
          <button
            onClick={scrollToTop}
            className="p-3 bg-white hover:bg-slate-200 border border-slate-200 rounded-2xl transition-all text-slate-500 hover:text-slate-800 shadow-sm"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
