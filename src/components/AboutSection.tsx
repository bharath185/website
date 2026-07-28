import { Shield, Award, Users, Factory } from "lucide-react"

const stats = [
  { icon: Award, value: "28+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Factory, value: "10,000+", label: "Products Delivered" },
  { icon: Shield, value: "100%", label: "Quality Assured" },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Leading Manufacturer of Industrial Machine Tools in India
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Bharat Machine Tools (BMT) has been at the forefront of precision engineering and 
                industrial manufacturing since 1995. Based in Bengaluru, we specialize in designing, 
                manufacturing, and supplying high-quality machine tools and components across India.
              </p>
              <p>
                Our product portfolio includes straightening machine rollers, reeling rollers, 
                drive rings, precision bearings, spindles, and comprehensive machinery spares. 
                We serve diverse industries including steel, automotive, aerospace, and general engineering.
              </p>
              <p>
                At BMT, quality is not just a metric — it&apos;s our commitment. Every product 
                undergoes rigorous quality checks to ensure it meets the highest standards of 
                precision, durability, and performance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
