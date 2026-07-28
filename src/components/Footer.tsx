import Link from "next/link"
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BMT</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Bharat Machine Tools</h3>
                <p className="text-xs text-gray-400">Since 1995</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for precision engineering solutions — manufacturing high-quality rollers, bearings, spindles, and machinery spares.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "All Products", href: "/products" },
                { label: "Rollers", href: "/products?category=rollers" },
                { label: "Bearings", href: "/products?category=bearings" },
                { label: "Spindles", href: "/products?category=spindles" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Roller Reconditioning", href: "/products/roller-reconditioning-regrinding" },
                { label: "Bearing Repair", href: "/products/bearing-repair-refurbishment" },
                { label: "Custom Manufacturing", href: "/contact" },
                { label: "Reverse Engineering", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">#123, Industrial Layout, Peenya Industrial Area, Bengaluru, Karnataka 560058</span>
              </li>
              <li>
                <a href="tel:+919945678900" className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  +91 99456 78900
                </a>
              </li>
              <li>
                <a href="mailto:info@bmtbharat.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  info@bmtbharat.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Bharat Machine Tools. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Precision Engineering Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
