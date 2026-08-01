"use client"

import { motion } from "framer-motion"
import ScrollReveal from "@/components/ScrollReveal"
import { galleryImages } from "@/data/products"
import { Video, ShieldCheck, Cog } from "lucide-react"

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Facility &amp; Operations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Manufacturing Excellence In Action
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm">
              Watch our precision CNC machine tools, hydrostatic spindle retrofitting, and manufacturing facility in Bangalore.
            </p>
          </div>
        </ScrollReveal>

        {/* Full-Width Widescreen Video Showcase Card (Autoplay & Controls Hidden) */}
        <ScrollReveal>
          <div className="mb-16 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative w-full">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/OiRRi-ljmFA?autoplay=1&mute=1&controls=0&loop=1&playlist=OiRRi-ljmFA&modestbranding=1&rel=0&playsinline=1&disablekb=1"
                title="Bharat Machine Tools Facility Video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 pointer-events-none"
              />
            </div>
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Bharat Machine Tools Facility Tour</h3>
                  <p className="text-xs text-slate-400">Bangalore Unit 1 Industrial Area</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800/90 rounded-xl border border-slate-700">
                  <Cog className="w-4 h-4 text-blue-400" />
                  CNC Retrofitting
                </span>
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800/90 rounded-xl border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Quality Tested
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Facility Photo Grid */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Inside Our Facility</h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {img.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent px-4 pb-3 pt-8">
                  <span className="text-xs font-bold text-white">{img.caption}</span>
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
