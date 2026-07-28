import Link from "next/link"
import { ArrowRight, Wrench, RefreshCw, Cog, Hammer } from "lucide-react"

const services = [
  {
    icon: RefreshCw,
    title: "Roller Reconditioning",
    description: "Extend the life of your rollers with our professional regrinding, hard chrome plating, and re-bonding services.",
    link: "/products/roller-reconditioning-regrinding",
  },
  {
    icon: Wrench,
    title: "Bearing Repair & Refurbishment",
    description: "Cost-effective bearing repair service — restore to like-new condition at 40-60% cost savings.",
    link: "/products/bearing-repair-refurbishment",
  },
  {
    icon: Cog,
    title: "Custom Manufacturing",
    description: "Custom-engineered components manufactured to your exact specifications and drawings.",
    link: "/contact",
  },
  {
    icon: Hammer,
    title: "Reverse Engineering",
    description: "Precision reverse engineering services for obsolete or hard-to-find machine parts.",
    link: "/contact",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4">
            Comprehensive Engineering Services
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Beyond manufacturing, we offer a complete range of engineering services to keep your operations running smoothly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.link}
              className="group bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <service.icon className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
