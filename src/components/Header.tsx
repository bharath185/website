"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, Phone, ChevronDown } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Rollers", href: "/products?category=rollers" },
      { label: "Bearings", href: "/products?category=bearings" },
      { label: "Spindles", href: "/products?category=spindles" },
      { label: "Machinery & Spares", href: "/products?category=machinery" },
      { label: "Accessories", href: "/products?category=accessories" },
    ]
  },
  {
    label: "Services",
    href: "/products?category=services",
    children: [
      { label: "Roller Reconditioning", href: "/products/roller-reconditioning-regrinding" },
      { label: "Bearing Repair", href: "/products/bearing-repair-refurbishment" },
    ]
  },
  { label: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const { itemCount } = useEnquiry()

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BMT</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Bharat Machine Tools</span>
              <span className="block text-xs text-gray-500">Precision Engineering Since 1995</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {item.children ? (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-in fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+919945678900" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700">
              <Phone className="w-4 h-4" />
              <span>+91 99456 78900</span>
            </a>

            <Link
              href="/enquiry"
              className="relative flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Enquiry</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden p-2 text-gray-700 hover:text-blue-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen === item.label && (
                      <div className="ml-4 space-y-1 pb-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-blue-50"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <a href="tel:+919945678900" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4" />
              +91 99456 78900
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
