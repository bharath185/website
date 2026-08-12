'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Package,
  ShoppingCart,
  ClipboardList,
  User,
  ShieldAlert,
  X,
  ChevronRight,
  LogOut,
  SlidersHorizontal,
  Plus
} from 'lucide-react'
import { useEnquiry } from '@/context/EnquiryContext'
import { useAuth } from '@/context/AuthContext'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname.startsWith('/v2') || pathname.startsWith('/redesign')) {
    return null
  }
  const { itemCount } = useEnquiry()
  const { user, openAuthModal, logout } = useAuth()
  const [adminSheetOpen, setAdminSheetOpen] = useState(false)

  const isTabActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const tabs = [
    { key: 'home', href: '/', label: 'Home', icon: Home },
    { key: 'products', href: '/products', label: 'Products', icon: Package },
    { key: 'cart', href: '/enquiry', label: `Cart (${itemCount})`, icon: ShoppingCart, count: itemCount },
    { key: 'orders', href: '/orders', label: 'Orders', icon: ClipboardList, requiresAuth: true },
  ]

  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 px-2 py-1.5 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] safe-area-pb">
        <div className="flex items-center justify-around max-w-md mx-auto relative">
          {tabs.map((tab) => {
            const active = isTabActive(tab.href)
            const Icon = tab.icon

            return (
              <Link
                key={tab.key}
                href={tab.requiresAuth && !user ? '#' : tab.href}
                onClick={(e) => {
                  if (tab.requiresAuth && !user) {
                    e.preventDefault()
                    openAuthModal('login')
                  }
                }}
                className={`relative flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
                  active ? 'text-blue-900 font-extrabold scale-105' : 'text-slate-500 font-medium hover:text-slate-900'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="mobileTabPill"
                    className="absolute inset-0 bg-blue-50/90 rounded-xl border border-blue-200/80 shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <div className="relative z-10">
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-900' : 'text-slate-600'}`} />
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md border border-white">
                      {tab.count > 9 ? '9+' : tab.count}
                    </span>
                  )}
                </div>
                <span className="relative z-10 text-[10px] mt-1 tracking-tight">{tab.label}</span>
              </Link>
            )
          })}

          {/* Account / Admin Action Button */}
          {user?.role === 'ADMIN' ? (
            <button
              onClick={() => setAdminSheetOpen(true)}
              className={`relative flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
                pathname.startsWith('/admin')
                  ? 'text-red-700 font-extrabold scale-105'
                  : 'text-slate-500 font-medium hover:text-slate-900'
              }`}
            >
              {pathname.startsWith('/admin') && (
                <motion.div
                  layoutId="mobileTabPill"
                  className="absolute inset-0 bg-red-50/90 rounded-xl border border-red-200/80 shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <div className="relative z-10 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping" />
              </div>
              <span className="relative z-10 text-[10px] mt-1 tracking-tight text-red-600 font-extrabold">Admin</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (!user) openAuthModal('login')
              }}
              className={`relative flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all ${
                user ? 'text-slate-600' : 'text-blue-900 font-extrabold'
              }`}
            >
              <User className="w-5 h-5 text-blue-900 relative z-10" />
              <span className="relative z-10 text-[10px] mt-1 tracking-tight truncate max-w-[50px] font-semibold">
                {user ? user.name.split(' ')[0] : 'Account'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Native iOS / Android Action Sheet Bottom Drawer for Admin */}
      <AnimatePresence>
        {adminSheetOpen && user?.role === 'ADMIN' && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAdminSheetOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="relative z-10 bg-white rounded-t-3xl border-t border-slate-200 p-6 shadow-2xl safe-area-pb space-y-4"
            >
              {/* Drag Handle Bar */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2" />

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Admin Control Center</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Logged in as {user.name}</p>
                  </div>
                </div>

                <button
                  onClick={() => setAdminSheetOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Sheet Menu Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => {
                    setAdminSheetOpen(false)
                    router.push('/admin/orders')
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100/70 text-blue-900 rounded-xl flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-extrabold text-slate-900 group-hover:text-blue-900">
                        Manage Orders &amp; Status
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">
                        Update customer order status &amp; tracking IDs
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900" />
                </button>

                <button
                  onClick={() => {
                    setAdminSheetOpen(false)
                    router.push('/admin/products')
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100/70 text-blue-900 rounded-xl flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-extrabold text-slate-900 group-hover:text-blue-900">
                        Add &amp; Edit Product Catalog
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">
                        Add new machine tools, change prices &amp; images
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900" />
                </button>

                <button
                  onClick={() => {
                    setAdminSheetOpen(false)
                    router.push('/orders')
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-200 text-slate-800 rounded-xl flex items-center justify-center">
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-extrabold text-slate-900">
                        View Customer Orders Page
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">
                        Track live order progress view
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <button
                onClick={() => {
                  setAdminSheetOpen(false)
                  logout()
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs uppercase tracking-wider rounded-2xl transition-colors mt-3 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                Log Out Admin Account
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
