"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { 
  ShoppingCart, 
  Package, 
  Newspaper, 
  Mail, 
  Globe, 
  LogOut, 
  Briefcase,
  Users,
  Star
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !authLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/')
    }
  }, [user, authLoading, mounted, router])

  if (!mounted || authLoading || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider animate-pulse">Loading Admin Console...</p>
        </div>
      </div>
    )
  }

  const menuItems = [
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/products", label: "Product", icon: Package },
    { href: "/admin/updates", label: "News", icon: Newspaper },
    { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
    { href: "/admin/applicants", label: "Applicants", icon: Users },
    { href: "/admin/reviews", label: "Reviews", icon: Star },
    { href: "/admin/settings", label: "Email", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600/30 antialiased" style={{ colorScheme: 'light' }}>
      
      {/* Top Banner with Navigation */}
      <section className="bg-white border-b border-slate-200 py-4 sm:py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left side: Brand Logo Only */}
            <Link href="/admin/orders" className="flex items-center hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="Bharat Machine Tools Logo" className="h-10 w-auto object-contain" />
            </Link>

            {/* Right side: Top tabler menu navigation */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                      ${isActive
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                      }
                    `}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              <div className="h-5 w-px bg-slate-300 mx-1"></div>
              
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                title="View Public Website"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Web</span>
              </Link>
              <button
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

    </div>
  )
}
