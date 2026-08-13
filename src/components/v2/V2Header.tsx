"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, ShieldAlert, LogOut, ChevronRight, Compass } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

export default function V2Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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
    { href: "/contact", label: "Support & Contact" },
    { href: "/orders", label: "Track Orders" },
  ]

  const toggleMobile = () => setMobileOpen(!mobileOpen)

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-white/90 border-b border-slate-200 backdrop-blur-xl shadow-sm" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group hover:opacity-95 transition-opacity">
          <img 
            src="/logo.jpg" 
            alt="Bharat Machine Tools Logo" 
            className="h-9 sm:h-11 w-auto object-contain bg-white px-2.5 py-1 rounded-xl border border-slate-200" 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                  isActive 
                    ? "text-blue-600 font-semibold" 
                    : scrolled ? "text-slate-600 hover:text-slate-950" : "text-slate-200 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeHeaderDot" 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-600 rounded-full" 
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side controls: Cart + Auth */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            href="/enquiry"
            className={`p-2.5 rounded-2xl transition-all relative flex items-center justify-center border ${
              scrolled 
                ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-950" 
                : "bg-slate-900/50 hover:bg-slate-900 border-white/5 text-slate-300 hover:text-white"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-mono text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Auth Info */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-2xl transition-all text-xs font-bold ${
                  scrolled
                    ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-750 hover:text-slate-950"
                    : "bg-slate-900/50 hover:bg-slate-900 border-white/5 text-slate-300 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                {user.name.split(" ")[0]}
              </button>
              {userDropdown && (
                <div className="absolute right-0 mt-2.5 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl p-1.5 z-50">
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/products"
                      className="flex items-center gap-2 px-3.5 py-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setUserDropdown(false)
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-medium text-left"
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
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-500/15 transition-all"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href="/enquiry"
            className="p-2 bg-slate-900 border border-white/5 rounded-xl text-slate-400 relative"
          >
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[8px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleMobile}
            className="p-2 bg-slate-900 border border-white/5 rounded-xl text-slate-400"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden w-full bg-slate-950 border-b border-white/10 backdrop-blur-xl absolute top-full left-0 right-0 overflow-hidden shadow-2xl py-6 px-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all"
                >
                  {link.label}
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              ))}
              {user ? (
                <>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/products"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 bg-blue-500/10 rounded-xl text-xs font-bold text-blue-400"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Admin Control
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-3 bg-red-500/10 rounded-xl text-xs font-bold text-red-400"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal()
                    setMobileOpen(false)
                  }}
                  className="w-full py-3.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-lg shadow-blue-500/15"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
