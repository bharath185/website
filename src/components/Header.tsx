"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, Settings, Package, Phone, User as UserIcon, LogOut, ShieldAlert, ClipboardList, ChevronRight } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"

const navLinks = [
  { href: "/", label: "Home", icon: Settings },
  { href: "/products", label: "Products", icon: Package },
  { href: "/contact", label: "Contact Us", icon: Phone },
  { href: "/enquiry", label: "Cart / Order", icon: ShoppingCart },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useEnquiry()
  const { user, openAuthModal, logout } = useAuth()

  if (pathname.startsWith('/v2') || pathname.startsWith('/redesign')) {
    return null
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setUserDropdown(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
              <img
                src="/images/logo.jpg"
                alt="Bharat Machine Tools"
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Clean Desktop Navigation (No Admin Link Wrapping) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    isActive
                      ? "text-blue-900 bg-blue-50 border border-blue-200"
                      : "text-slate-700 hover:text-blue-900 hover:bg-slate-100"
                  }`}
                >
                  <link.icon className="w-4 h-4 text-blue-700" />
                  {link.label}
                  {link.href === "/enquiry" && itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow">
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </Link>
              )
            })}

            {user && (
              <Link
                href="/orders"
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                  pathname === "/orders"
                    ? "text-blue-900 bg-blue-50 border border-blue-200"
                    : "text-slate-700 hover:text-blue-900 hover:bg-slate-100"
                }`}
              >
                <ClipboardList className="w-4 h-4 text-blue-700" />
                My Orders
              </Link>
            )}

            {/* Desktop User Auth Button & Admin Profile Dropdown */}
            {user ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm ${
                    user.role === 'ADMIN'
                      ? 'bg-red-50 hover:bg-red-100 border-red-200 text-red-700'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  }`}
                >
                  {user.role === 'ADMIN' ? (
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-blue-700" />
                  )}
                  <span className="max-w-[110px] truncate">{user.name}</span>
                  {user.role === 'ADMIN' && (
                    <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase">
                      Admin
                    </span>
                  )}
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/orders"
                      onClick={() => setUserDropdown(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                    >
                      <ClipboardList className="w-4 h-4 text-blue-700" />
                      Track My Orders
                    </Link>

                    {user.role === 'ADMIN' && (
                      <div className="pt-1 border-t border-slate-100">
                        <span className="px-4 py-1 text-[10px] font-extrabold text-red-600 uppercase tracking-wider block">
                          Admin Control Center
                        </span>
                        <Link
                          href="/admin/orders"
                          onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs text-red-700 hover:bg-red-50 font-bold"
                        >
                          <ShieldAlert className="w-4 h-4 text-red-600" />
                          Manage Orders &amp; Status
                        </Link>
                        <Link
                          href="/admin/products"
                          onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs text-blue-900 hover:bg-blue-50 font-bold"
                        >
                          <Package className="w-4 h-4 text-blue-800" />
                          Manage Product Catalog
                        </Link>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdown(false)
                        logout()
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 text-left font-bold border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out Account
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="ml-2 flex items-center gap-1.5 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/20"
              >
                <UserIcon className="w-4 h-4" />
                Log In
              </button>
            )}
          </nav>

          {/* Clean Mobile Right Bar: Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 shadow-sm"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileOpen ? <X className="w-4 h-4 text-slate-800" /> : <Menu className="w-4 h-4 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <nav className="px-4 py-4 space-y-2">
              {user ? (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl mb-2 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-900'
                    }`}>
                      {user.role === 'ADMIN' ? <ShieldAlert className="w-4 h-4 text-red-600" /> : user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="block text-xs font-extrabold text-slate-900">{user.name}</span>
                      <span className="block text-[11px] text-slate-500 font-medium">{user.email}</span>
                    </div>
                  </div>
                  {user.role === 'ADMIN' && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-extrabold rounded-md uppercase">
                      Admin
                    </span>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    openAuthModal('login')
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" /> Log In / Register Account
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div className="pt-1 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? "text-blue-900 bg-blue-50 border border-blue-200 shadow-sm"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <link.icon className="w-4 h-4 text-blue-800" />
                        {link.label}
                      </span>
                      {link.href === "/enquiry" && itemCount > 0 ? (
                        <span className="text-xs text-red-600 font-extrabold bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </Link>
                  )
                })}

                {user && (
                  <Link
                    href="/orders"
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-100 uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-3">
                      <ClipboardList className="w-4 h-4 text-blue-800" />
                      My Orders &amp; Tracking
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                )}

                {user?.role === 'ADMIN' && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="px-4 text-[10px] font-extrabold text-red-600 uppercase tracking-wider block">
                      Admin Control Center
                    </span>
                    <Link
                      href="/admin/orders"
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-red-700 bg-red-50 border border-red-200 uppercase tracking-wider shadow-sm"
                    >
                      <span className="flex items-center gap-3">
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        Manage Orders &amp; Status
                      </span>
                      <ChevronRight className="w-4 h-4 text-red-400" />
                    </Link>
                    <Link
                      href="/admin/products"
                      className="flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 uppercase tracking-wider shadow-sm"
                    >
                      <span className="flex items-center gap-3">
                        <Package className="w-4 h-4 text-blue-800" />
                        Add &amp; Edit Product Catalog
                      </span>
                      <ChevronRight className="w-4 h-4 text-blue-400" />
                    </Link>
                  </div>
                )}

                {user && (
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 uppercase tracking-wider border-t border-slate-100 mt-2"
                  >
                    <span className="flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      Log Out Account
                    </span>
                    <span className="text-[10px] text-slate-400">({user.name})</span>
                  </button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
