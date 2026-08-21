"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, ShieldAlert, LogOut, Compass } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"

export default function V2Header() {
  const [scrolled, setScrolled] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  
  const pathname = usePathname()
  const { itemCount } = useEnquiry()
  const { user, openAuthModal, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Catalogue" },
    { href: "/services", label: "Services" },
    { href: "/news", label: "News & Journal" },
    ...(!user ? [{ href: "/careers", label: "Careers" }] : []),
    { href: "/contact", label: "Support & Contact" },
    ...(user && user.role !== "ADMIN" ? [{ href: "/orders", label: "Track Orders" }] : []),
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 border-b border-slate-200/85 backdrop-blur-xl shadow-[0_2px_15px_rgba(0,0,0,0.015)] ${
        scrolled ? "py-3" : "py-4.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group hover:opacity-95 transition-opacity">
          <img 
            src="/logo.png" 
            alt="Bharat Machine Tools Logo" 
            className="h-12 sm:h-16 w-auto object-contain" 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 relative rounded-xl z-10 flex items-center justify-center ${
                  isActive 
                    ? "text-[#122f87]"
                    : "text-slate-600 hover:text-[#122f87]"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeHeaderPill" 
                    className="absolute inset-0 rounded-xl -z-10 bg-blue-50 border border-blue-200/40" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side controls: Cart + Auth */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon */}
          {(!user || user.role !== "ADMIN") && (
            <Link
              href="/enquiry"
              className="p-2.5 rounded-xl transition-all relative flex items-center justify-center border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 hover:scale-105 active:scale-95 shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-[0_0_8px_rgba(37,99,235,0.4)] animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {/* User Auth Info */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl transition-all text-xs font-bold hover:scale-105 active:scale-95 shadow-sm"
                style={{ color: '#334155' }}
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                {user.name.split(" ")[0]}
              </button>
              {userDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-1.5 z-50">
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/products"
                      className="flex items-center gap-2 px-3.5 py-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setUserDropdown(false)
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all font-medium text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal()}
              className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile controls (hidden since we use mobile bottom tab bar) */}
        <div className="md:hidden flex items-center" />
      </div>
    </header>
  )
}
