import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm">
                <img
                  src="https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg"
                  alt="Bharat Machine Tools"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              (WE CAN MAKE WHAT YOU CAN IMAGINE). Leading manufacturer, supplier, and exporter of
              CNC Machines, Machine Tools, Machinery, Hardware &amp; Metal Equipment in India.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.facebook.com/101215162728316/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-900 hover:border-blue-300 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/bharat_machine_tools_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-900 hover:border-blue-300 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/BharatMachineTo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-900 hover:border-blue-300 transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Products Catalog", href: "/products" },
                { label: "Contact Us", href: "/contact" },
                { label: "Cart & Order", href: "/enquiry" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-semibold text-slate-600 hover:text-blue-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">Product Categories</h3>
            <ul className="space-y-2.5">
              {["Machinery", "Bearings", "Spindles", "Accessories"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-slate-600 hover:text-blue-900 transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-800 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-600 font-medium">
                  Bharat Machine Tools - Unit 1, Lakshmipura Main Road 2nd Cross, Abbigere
                  Industrial Area, Chikkabanavara Post, Bengaluru, Karnataka 560090
                </span>
              </li>
              <li>
                <a
                  href="tel:+918048031763"
                  className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-blue-900 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-blue-800 flex-shrink-0" />
                  080 4803 1763
                </a>
              </li>
              <li>
                <a
                  href="mailto:bmt.sangeeta@gmail.com"
                  className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-blue-900 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4 text-blue-800 flex-shrink-0" />
                  bmt.sangeeta@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Bharat Machine Tools. All rights reserved.
          </p>
          <p className="text-xs font-extrabold text-red-600 uppercase tracking-wider">(WE CAN MAKE WHAT YOU CAN IMAGINE)</p>
        </div>
      </div>
    </footer>
  )
}
