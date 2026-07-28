"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, Truck, Wrench } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Wrench className="w-4 h-4" />
            Precision Engineering Since 1995
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Premium Quality
            <span className="block text-blue-400">Industrial Machine Tools</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            India&apos;s trusted manufacturer of straightening rollers, bearings, spindles, and machinery spares. 
            Delivering precision engineering excellence to industries worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-colors border border-white/20"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: ShieldCheck, label: "Certified Quality", desc: "ISO 9001 compliant" },
            { icon: Truck, label: "Pan India Delivery", desc: "Reliable logistics" },
            { icon: Wrench, label: "Custom Manufacturing", desc: "As per your specs" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <item.icon className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
