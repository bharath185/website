"use client"

import { motion } from "framer-motion"
import { Award, Cog, Factory, Wrench } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

const capabilities = [
  { label: "CNC Machines", icon: Cog },
  { label: "Machine Tools", icon: Wrench },
  { label: "Machinery", icon: Factory },
  { label: "Hardware & Metal Equipment", icon: Award },
]

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              WE CAN MAKE WHAT YOU CAN IMAGINE
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              Bharat Machine Tools is a leading manufacturer, supplier, and exporter of
              CNC Machines, Machine Tools, Machinery, Hardware &amp; Metal Equipment in India.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto mb-4 text-blue-900">
                <cap.icon className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">{cap.label}</div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Bharat Machine Tools
              </h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                To meet new challenges and satisfy changing customer needs, we leverage our
                superior knowledge and experience. All machines and accessories are retrofitted
                and reconditioned by us. With precision quality control, we are a leading
                organization with many happy and satisfied customers.
              </p>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                Quality and performance at an affordable price are our goals. With a commitment
                to customer satisfaction, our expertise, and innovative approach, we are proud
                to serve you.
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                With a wide range of products, we provide spindles, rotary tables, SPM machine
                tools for extrusion &amp; flow forming machines, rotational gears, actuators,
                and outriggers, as well as duplex worm shafts and worm wheels, and YRT bearings
                on large cross roller bearings.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white flex items-center justify-center">
                <img
                  src="/images/gallery/bmt-product-wheel.jpg"
                  alt="Bharat Machine Tools Product Wheel"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl bg-white/90 border border-slate-200 flex items-center justify-center backdrop-blur-md text-blue-900 shadow-xl">
                <Award className="w-9 h-9" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
