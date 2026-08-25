"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, User, ShieldAlert, LogOut, Sparkles, Phone, Mail } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

export default function V2Header() {
  const [scrolled, setScrolled] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const pathname = usePathname()
  const { itemCount } = useEnquiry()
  const { user, openAuthModal, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setUserDropdown(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/company-profile", label: "Profile" },
    { href: "/products", label: "Catalogue" },
    { href: "/gallery", label: "Gallery" },
    { href: "/services", label: "Services" },
    { href: "/news", label: "News" },
    ...(!user ? [{ href: "/careers", label: "Careers" }] : []),
    ...(!user ? [{ href: "/contact", label: "Contact" }] : []),
    ...(user && user.role !== "ADMIN" ? [{ href: "/orders", label: "Orders" }] : []),
  ]

  const isLanding = pathname === "/"
  const isTransparent = isLanding && !scrolled && !mobileMenuOpen

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent shadow-none py-3.5 sm:py-4.5"
          : "bg-white/95 border-b border-slate-200/85 backdrop-blur-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] py-2.5 sm:py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group hover:opacity-95 transition-opacity shrink-0">
          <img 
            src="/logo.png" 
            alt="Bharat Machine Tools Logo" 
            className="h-10 sm:h-12 lg:h-14 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Navigation Bar (Crisp, No-Wrap, Adaptive Gap) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-200 relative rounded-xl z-10 flex items-center justify-center whitespace-nowrap shrink-0 ${
                  isActive 
                    ? "text-[#122f87]"
                    : "text-slate-600 hover:text-[#122f87]"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeHeaderPill" 
                    className="absolute inset-0 rounded-xl -z-10 bg-blue-50 border border-blue-200/50" 
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side controls: Cart + Auth + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Cart Icon */}
          {(!user || user.role !== "ADMIN") && (
            <Link
              href="/enquiry"
              className="p-2 sm:p-2.5 rounded-xl transition-all relative flex items-center justify-center border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 active:scale-95 shadow-2xs shrink-0"
              title="View Enquiries"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono text-[9px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-[0_0_8px_rgba(37,99,235,0.4)] animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {/* User Auth Info (Desktop) */}
          <div className="hidden sm:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl transition-all text-xs font-bold shadow-2xs whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>{user.name.split(" ")[0]}</span>
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in">
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin/products"
                        className="flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all font-medium"
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
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all font-medium text-left"
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
                className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile / Tablet Menu Button (lg:hidden) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl overflow-hidden shadow-lg"
          >
            <div className="px-4 py-5 space-y-3 max-w-md mx-auto">
              
              {/* Navigation Links Grid */}
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-blue-50 text-[#122f87] border border-blue-200/60"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </Link>
                  )
                })}
              </div>

              {/* Mobile Auth Button */}
              <div className="pt-2 border-t border-slate-100">
                {user ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-slate-800">{user.name}</span>
                    </div>
                    <button
                      onClick={() => logout()}
                      className="text-xs font-mono text-red-600 font-bold hover:underline"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      openAuthModal()
                    }}
                    className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                  >
                    Sign In to Account
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
