"use client"

import { motion } from "framer-motion"
import { Wrench, Cog, Truck, Beaker, ClipboardCheck, HeadphonesIcon } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"

const services = [
  {
    icon: Wrench,
    title: "Servicing and Reconditioning",
    description: "All machines and accessories are retrofitted and reconditioned by us — restoring your rollers, spindles, and machinery to peak performance.",
  },
  {
    icon: Beaker,
    title: "Thermal Process, Surface Treatment & Coatings",
    description: "Professional thermal processing, surface treatment, and coating services to harden, protect, and extend the life of your components.",
  },
  {
    icon: Cog,
    title: "SPM Machine Tools",
    description: "Special purpose machine tools for extrusion & flow forming machines, with rotational gears, actuators, and outriggers.",
  },
  {
    icon: ClipboardCheck,
    title: "Precision Quality Control",
    description: "Every product undergoes precision quality control to meet the rigorous demands of modern industrial applications.",
  },
  {
    icon: Truck,
    title: "Pan-India Supply",
    description: "Reliable supply of machinery, bearings, spindles, and accessories to industrial clients across India.",
  },
  {
    icon: HeadphonesIcon,
    title: "Customer Satisfaction",
    description: "Quality and performance at an affordable price — backed by our expertise, innovative approach, and commitment to you.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Comprehensive Engineering Support
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm">
              Complete industrial support from design to delivery — ensuring your machinery performs at its best.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-all text-blue-900">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
