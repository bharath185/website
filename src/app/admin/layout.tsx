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
  ShieldAlert,
  ChevronRight,
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

  const pageMeta: Record<string, { title: string, subtitle: string, icon: any, colorClass: string, iconColor: string }> = {
    "/admin/orders": { 
      title: "Admin Order Status Manager", 
      subtitle: "Update customer order statuses, add courier tracking numbers, and add notes anytime.",
      icon: ShoppingCart,
      colorClass: "bg-red-50 border-red-200",
      iconColor: "text-red-600"
    },
    "/admin/products": { 
      title: "Admin Product Catalog Manager", 
      subtitle: "Add new machine tools, update prices, change images, and edit descriptions across the entire site.",
      icon: Package,
      colorClass: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    "/admin/updates": { 
      title: "Engineering Updates Manager", 
      subtitle: "Publish technical insights and announcements directly to the homepage updates feed.",
      icon: Newspaper,
      colorClass: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600"
    },
    "/admin/jobs": { 
      title: "Job Openings Manager", 
      subtitle: "Post new job requirements, toggle active statuses, and edit specifications for recruitment.",
      icon: Briefcase,
      colorClass: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600"
    },
    "/admin/applicants": { 
      title: "Candidate Application Tracking", 
      subtitle: "Track submitted candidate bios, check professional summaries, and review uploaded resume files.",
      icon: Users,
      colorClass: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-600"
    },
    "/admin/reviews": { 
      title: "Product Reviews Moderation", 
      subtitle: "Review customer submissions, toggle public visibility approvals, and delete spam comments.",
      icon: Star,
      colorClass: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600"
    },
    "/admin/settings": { 
      title: "Application Settings", 
      subtitle: "Configure mail server specifications and MD profile content directly.",
      icon: Mail,
      colorClass: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-600"
    },
  }

  const currentMeta = pageMeta[pathname] || {
    title: "Admin Dashboard",
    subtitle: "Manage your store specifications and updates",
    icon: ShieldAlert,
    colorClass: "bg-slate-50 border-slate-200",
    iconColor: "text-slate-600"
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600/30 antialiased" style={{ colorScheme: 'light' }}>
      
      {/* Top Banner with Navigation */}
      <section className="bg-white border-b border-slate-200 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Left side: Page identity info */}
            {pathname === "/admin/products" ? (
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="BMT Logo" className="h-10 w-auto object-contain" />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-xl">
                  Admin Control
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm shrink-0 ${currentMeta.colorClass}`}>
                  <currentMeta.icon className={`w-6 h-6 ${currentMeta.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none mb-1.5">
                    <span>BMT Bharat</span>
                    <ChevronRight className="w-2.5 h-2.5 text-slate-300" />
                    <span className="text-blue-500">Admin Control</span>
                  </div>
                  <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">{currentMeta.title}</h1>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-medium">{currentMeta.subtitle}</p>
                </div>
              </div>
            )}

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
                      flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                      ${isActive
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                      }
                    `}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-500" : "text-slate-450"}`} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              <div className="h-5 w-px bg-slate-300 mx-1"></div>
              
              <Link
                href="/"
                className="flex items-center gap-2 px-3.5 py-2.5 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-slate-450" />
                <span>Web</span>
              </Link>
              <button
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                className="flex items-center gap-2 px-3.5 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Administrative Work Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

    </div>
  )
}
