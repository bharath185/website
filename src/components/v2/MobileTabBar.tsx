"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, ShoppingCart, ClipboardList, User, ShieldAlert, LogOut } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { useAuth } from "@/context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileTabBar() {
  const pathname = usePathname()
  const { itemCount } = useEnquiry()
  const { user, openAuthModal, logout } = useAuth()
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false)

  const tabs = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Catalog", icon: ShoppingBag },
    ...((!user || user.role !== "ADMIN") ? [{ href: "/enquiry", label: "Enquiry", icon: ShoppingCart, badge: true }] : []),
    ...(user && user.role !== "ADMIN" ? [{ href: "/orders", label: "Orders", icon: ClipboardList }] : []),
  ]

  const handleProfileClick = () => {
    if (!user) {
      openAuthModal("login")
    } else {
      setProfileDrawerOpen(true)
    }
  }

  return (
    <>
      {/* Sticky Bottom Tab Bar (visible on mobile viewports only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200/80 backdrop-blur-xl px-2 py-2.5 pb-5 flex items-center justify-around shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
                isActive ? "text-[#122f87]" : "text-slate-400"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 transition-transform active:scale-90" />
                {tab.badge && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white font-mono text-[8px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-[0_0_6px_rgba(37,99,235,0.3)] animate-pulse">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">{tab.label}</span>
            </Link>
          )
        })}

        {/* Profile Tab */}
        <button
          onClick={handleProfileClick}
          className={`flex flex-col items-center justify-center flex-1 py-1 relative cursor-pointer ${
            profileDrawerOpen || pathname === "/admin/products" ? "text-[#122f87]" : "text-slate-400"
          }`}
        >
          <User className="w-5 h-5 transition-transform active:scale-90" />
          <span className="text-[9px] font-bold mt-1 uppercase tracking-wider">
            {user ? "Profile" : "Sign In"}
          </span>
        </button>
      </div>

      {/* Slide-Up Profile Bottom Sheet (iOS/Android Native drawer feeling) */}
      <AnimatePresence>
        {profileDrawerOpen && user && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 md:hidden bg-slate-900/60 backdrop-blur-md">
            {/* Click-away backdrop */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setProfileDrawerOpen(false)} />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="relative w-full bg-white border-t border-slate-200 rounded-t-[2.5rem] p-6 pb-10 shadow-2xl z-10 max-h-[80vh] overflow-y-auto"
            >
              {/* Drag Handle Bar */}
              <div 
                onClick={() => setProfileDrawerOpen(false)} 
                className="w-12 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full mx-auto mb-6 cursor-pointer"
              />

              <div className="space-y-6">
                {/* Account Details Header */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-[#122f87] rounded-2xl flex items-center justify-center font-extrabold text-lg shadow-sm">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-950 text-sm uppercase tracking-tight">{user.name}</h3>
                    <p className="text-xs text-slate-500 font-light">{user.email}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{user.phone || "No phone added"}</p>
                  </div>
                </div>

                {/* Profile menu links */}
                <div className="space-y-3">
                  {user.role !== "ADMIN" && (
                    <Link
                      href="/orders"
                      onClick={() => setProfileDrawerOpen(false)}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/40 rounded-2xl text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      View My Enquiries
                    </Link>
                  )}

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/products"
                      onClick={() => setProfileDrawerOpen(false)}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-blue-50 hover:bg-blue-100/50 border border-blue-100 rounded-2xl text-xs font-bold uppercase tracking-wider text-[#122f87]"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Admin Controls
                      </span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout()
                      setProfileDrawerOpen(false)
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#122f87] hover:bg-blue-700 text-white border border-blue-700 rounded-2xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm shadow-blue-700/10"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out Account
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
