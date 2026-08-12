"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingCart, ShieldCheck } from "lucide-react"
import { products } from "@/data/products"

export default function V2Products() {
  // Take first 3 products for preview
  const previewProducts = products.slice(0, 3)

  return (
    <section className="py-24 bg-[#030712] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20">
              FEATURED CATALOGUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-4 mb-2 font-display">
              Precision Engineering Components
            </h2>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Discover high-stiffness spindles, zero-backlash ball screws, and custom machine tool accessories manufactured to sub-micron standards.
            </p>
          </div>

          <Link
            href="/v2/products"
            className="group mt-6 md:mt-0 flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors shrink-0"
          >
            Explore Catalogue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewProducts.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group backdrop-blur-xl bg-slate-950/40 border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_35px_-5px_rgba(59,130,246,0.15)] rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="aspect-[4/3] bg-slate-950 overflow-hidden relative">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/90 text-blue-400 font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-md border border-white/5">
                    {p.category.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight mb-2 uppercase">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-light leading-relaxed line-clamp-3">
                    {p.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-white/5 bg-slate-950/20">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">List Price</span>
                  <span className="text-xs font-bold text-white">₹{(p.price || 0).toLocaleString("en-IN")}</span>
                </div>
                <Link
                  href={`/v2/products/${p.slug}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center gap-1 shadow-md shadow-blue-500/10"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
