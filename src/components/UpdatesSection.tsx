"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import { updates } from "@/data/products"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function UpdatesSection() {
  return (
    <section id="updates" className="py-16 lg:py-24 bg-[#060b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-400 bg-blue-600/15 border border-blue-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
              News &amp; Technical Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
              Latest Engineering Updates
            </h2>
            <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm">
              Insights on spindles, rotary tables, gear boxes, and precision machining
              from the Bharat Machine Tools team in Bangalore.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden hover:border-blue-500/40 transition-colors shadow-md"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  {formatDate(post.date)}
                </div>
                <h3 className="text-base font-semibold text-white leading-snug group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
