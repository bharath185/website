'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Building2,
  RefreshCw,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import Link from 'next/link'
import { Order } from '@/types'

const statusSteps = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED']

const stepDetails = {
  PENDING: {
    label: "Enquiry Received",
    desc: "BMT technical team has received your request and is reviewing specifications.",
    color: "amber"
  },
  PAID: {
    label: "Approved & Verified",
    desc: "Enquiry specifications have been verified. Creating quotation profile.",
    color: "blue"
  },
  PROCESSING: {
    label: "Quote Processing",
    desc: "Custom pricing calculations and production estimation are in progress.",
    color: "indigo"
  },
  SHIPPED: {
    label: "Dispatch / Shipping",
    desc: "Machinery components dispatched or quotation package sent via courier.",
    color: "violet"
  },
  DELIVERED: {
    label: "Completed & Closed",
    desc: "Quotation handoff complete. BMT engineer has established contact.",
    color: "emerald"
  }
}

function getStepIndex(status: string) {
  const idx = statusSteps.indexOf(status?.toUpperCase() || 'PAID')
  return idx === -1 ? 1 : idx
}

export default function UserOrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({})

  const fetchOrders = async () => {
    try {
      setLoading(true)
      let localOrders: Order[] = []

      if (typeof window !== 'undefined') {
        try {
          localOrders = JSON.parse(localStorage.getItem('bmt_local_orders') || '[]')
        } catch {
          localOrders = []
        }
      }

      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        const fetchedOrders = data.orders || []

        // Merge local & fetched orders without duplicates
        const combined = [...localOrders]
        fetchedOrders.forEach((fo: Order) => {
          if (!combined.some((co) => co.id === fo.id)) {
            combined.push(fo)
          }
        })
        setOrders(combined)
      } else {
        setOrders(localOrders)
      }
    } catch {
      if (typeof window !== 'undefined') {
        const saved = JSON.parse(localStorage.getItem('bmt_local_orders') || '[]')
        setOrders(saved)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    if (orders.length > 0) {
      // Expand first order by default to fit screen cleanly
      setExpandedOrders(prev => {
        if (Object.keys(prev).length === 0) {
          return { [orders[0].id]: true }
        }
        return prev
      })
    }
  }, [orders])

  const toggleExpand = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-28 pb-16 flex flex-col items-center justify-center text-blue-900 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#122f87]" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Enquiries...</span>
      </div>
    )
  }

  const totalCount = orders.length
  const activeCount = orders.filter(o => ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED'].includes(o.status || 'PENDING')).length
  const completedCount = orders.filter(o => o.status === 'DELIVERED').length

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 lg:pt-24 pb-16">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 py-6 mb-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#122f87] shadow-sm shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900">Enquiry Tracking</h1>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Monitor live BMT engineering specifications review and quotation progress.
                </p>
              </div>
            </div>
            
            <button
              onClick={fetchOrders}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all border border-slate-200 shadow-sm self-stretch sm:self-auto text-center justify-center"
            >
              <RefreshCw className="w-3 h-3" />
              Refresh
            </button>
          </div>

          {/* Quick Metrics */}
          {totalCount > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 max-w-xl">
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-2.5 text-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Total</span>
                <span className="text-base font-black text-slate-900 font-mono mt-0.5 block">{totalCount}</span>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-2.5 text-center">
                <span className="text-[9px] text-blue-900/60 font-bold uppercase tracking-wider block">Active</span>
                <span className="text-base font-black text-[#122f87] font-mono mt-0.5 block">{activeCount}</span>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5 text-center">
                <span className="text-[9px] text-emerald-900/60 font-bold uppercase tracking-wider block">Closed</span>
                <span className="text-base font-black text-emerald-700 font-mono mt-0.5 block">{completedCount}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {orders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">No Enquiries Found</h3>
            <p className="text-slate-500 text-[11px] max-w-sm mx-auto mb-4 leading-relaxed">
              You haven&apos;t placed any machinery inquiries yet. Browse our industrial tools catalog to request custom quotations.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#122f87] hover:bg-[#0f266c] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10"
            >
              Browse Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {orders.map((order) => {
              const isCancelled = order.status === 'CANCELLED'
              const currentStep = getStepIndex(order.status)
              const isExpanded = !!expandedOrders[order.id]

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-slate-250 shadow-sm overflow-hidden hover:border-slate-350 transition-all duration-300"
                >
                  {/* Clickable Header Accordion Panel */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="bg-slate-50 border-b border-slate-100 px-4 py-3.5 sm:px-6 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ref ID:</span>
                        <span className="text-xs font-mono font-black text-slate-900">{order.id.split('-').pop()}</span>
                      </div>
                      <span className="text-slate-300 text-sm">|</span>
                      <p className="text-[10px] text-slate-500 font-bold">
                        {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-wider border ${
                          isCancelled
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : order.status === 'DELIVERED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-[#122f87] border-blue-200'
                        }`}
                      >
                        {order.status || 'PENDING'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Collapsible Card Body */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 space-y-5 border-t border-slate-100 animate-fade-in">
                      {/* Status Tracking Timelines */}
                      {isCancelled ? (
                        <div className="bg-red-50/50 border border-red-150 rounded-xl p-3 flex items-start gap-2.5 text-xs text-red-900">
                          <Clock className="w-4 h-4 text-red-650 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold block text-red-950">Enquiry Closed / Cancelled</span>
                            <p className="font-medium text-red-800 mt-0.5">
                              This engineering request has been marked as closed or cancelled. Please contact BMT Sales Engineering for clarifications.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-1 border-b border-slate-100 pb-5">
                          {/* Desktop Horizontal Timeline */}
                          <div className="hidden md:flex items-center justify-between max-w-2xl mx-auto py-2 relative">
                            <div className="absolute top-[24px] left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0 rounded" />
                            <div
                              className="absolute top-[24px] left-0 h-0.5 bg-[#122f87] -translate-y-1/2 z-0 transition-all duration-500 rounded"
                              style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                            />

                            {statusSteps.map((step, idx) => {
                              const isDone = idx <= currentStep
                              const isCurrent = idx === currentStep
                              const details = stepDetails[step as keyof typeof stepDetails] || { label: step, desc: '' }

                              let Icon = Clock
                              if (step === 'PAID') Icon = ShieldCheck
                              if (step === 'PROCESSING') Icon = RefreshCw
                              if (step === 'SHIPPED') Icon = Truck
                              if (step === 'DELIVERED') Icon = CheckCircle2

                              return (
                                <div key={step} className="relative z-10 flex flex-col items-center max-w-[100px] text-center">
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                      isDone
                                        ? 'bg-[#122f87] text-white shadow-md'
                                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                                    } ${isCurrent ? 'ring-4 ring-blue-100 scale-105' : ''}`}
                                  >
                                    <Icon className={`w-4.5 h-4.5 ${isCurrent && step === 'PROCESSING' ? 'animate-spin' : ''}`} />
                                  </div>
                                  <span
                                    className={`text-[8.5px] font-black mt-2.5 uppercase tracking-wider ${
                                      isDone ? 'text-[#122f87]' : 'text-slate-400'
                                    }`}
                                  >
                                    {details.label}
                                  </span>
                                </div>
                              )
                            })}
                          </div>

                          {/* Mobile Vertical Timeline */}
                          <div className="block md:hidden space-y-3">
                            {statusSteps.map((step, idx) => {
                              const isDone = idx <= currentStep
                              const isCurrent = idx === currentStep
                              const details = stepDetails[step as keyof typeof stepDetails] || { label: step, desc: '' }

                              let Icon = Clock
                              if (step === 'PAID') Icon = ShieldCheck
                              if (step === 'PROCESSING') Icon = RefreshCw
                              if (step === 'SHIPPED') Icon = Truck
                              if (step === 'DELIVERED') Icon = CheckCircle2

                              return (
                                <div key={step} className="flex gap-3">
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                        isDone
                                          ? 'bg-[#122f87] text-white shadow-sm'
                                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                                      }`}
                                    >
                                      <Icon className={`w-3.5 h-3.5 ${isCurrent && step === 'PROCESSING' ? 'animate-spin' : ''}`} />
                                    </div>
                                    {idx < statusSteps.length - 1 && (
                                      <div className={`w-0.5 h-6 ${isDone ? 'bg-[#122f87]' : 'bg-slate-200'}`} />
                                    )}
                                  </div>
                                  <div className="pt-0.5">
                                    <span
                                      className={`text-[10px] font-black block uppercase tracking-wider ${
                                        isDone ? 'text-[#122f87]' : 'text-slate-400'
                                      }`}
                                    >
                                      {details.label}
                                    </span>
                                    <span className="text-[9px] text-slate-500 block mt-0.5 leading-snug">
                                      {details.desc}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {/* Desktop Active Status Detail Banner */}
                          <div className="hidden md:block bg-blue-50/40 border border-blue-100/50 rounded-xl p-3.5 mt-4 text-center max-w-lg mx-auto">
                            <span className="text-[8.5px] font-black uppercase tracking-wider text-[#122f87] block mb-1">
                              Status Log Update
                            </span>
                            <p className="text-[11px] text-slate-700 font-extrabold">
                              {stepDetails[statusSteps[currentStep] as keyof typeof stepDetails]?.desc}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Consignment Tracking Info */}
                      {order.trackingNumber && !isCancelled && (
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 flex items-center justify-between text-xs text-blue-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-white border border-blue-150 rounded-lg flex items-center justify-center text-[#122f87] shadow-sm shrink-0">
                              <Truck className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-extrabold text-slate-900 block">Consignment Tracking Details</span>
                              <span className="font-mono text-[10px] font-bold text-slate-600 block mt-0.5">Courier ID: {order.trackingNumber}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(order.trackingNumber || '')
                              alert('Tracking number copied to clipboard!')
                            }}
                            className="px-2.5 py-1.5 bg-[#122f87] hover:bg-[#0f266c] text-white font-extrabold rounded-lg transition-colors text-[9px] uppercase tracking-wider"
                          >
                            Copy ID
                          </button>
                        </div>
                      )}

                      {/* Admin Engineering Update notes */}
                      {order.adminNotes && (
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-900">
                          <div className="w-7 h-7 bg-white border border-emerald-150 rounded-lg flex items-center justify-center text-emerald-700 shadow-sm shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-extrabold text-emerald-950 block mb-0.5">BMT Desk Engineering Note</span>
                            <p className="font-medium text-emerald-800 leading-relaxed whitespace-pre-wrap">{order.adminNotes}</p>
                          </div>
                        </div>
                      )}

                      {/* Split Details: Requested Items & Shipping Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Items */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-3">Items Requested</span>
                          <div className="space-y-2">
                            {order.items?.map((item: any, idx: number) => (
                              <div key={item.id || idx} className="flex items-center gap-2.5 text-xs pb-2 border-b border-slate-200/50 last:border-0 last:pb-0">
                                <div className="w-6.5 h-6.5 bg-white border border-slate-150 rounded-md flex items-center justify-center text-slate-500 font-bold shrink-0 text-[10px] shadow-sm">
                                  {idx + 1}
                                </div>
                                <span className="font-bold text-slate-800 line-clamp-1">{item.productName || item.product?.name} (x{item.quantity})</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Client Factory Logistics */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between gap-4">
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-3">Client Factory Location</span>
                            <div className="flex items-start gap-2.5 text-xs text-slate-650">
                              <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-900 block text-[11px]">Delivery Address</span>
                                <span className="leading-relaxed block mt-0.5 text-slate-600">{order.shippingAddress}</span>
                                <span className="block mt-1 font-mono font-bold text-slate-800">Phone: {order.contactPhone}</span>
                              </div>
                            </div>
                          </div>

                          {/* Interactive WhatsApp enquiry support */}
                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-3">
                            <span className="text-[9px] font-bold text-slate-500">Need support?</span>
                            <a
                              href={`https://wa.me/919845000000?text=Hello%20BMT%20Team%2C%20I%20would%20like%20to%20consult%20regarding%20my%20enquiry%20No%3A%20${order.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] uppercase tracking-wider rounded-lg transition-all shadow-sm"
                            >
                              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436.002 9.858-4.384 9.86-9.81.002-2.63-1.013-5.101-2.859-6.95S13.9 1.005 11.269 1.005c-5.44 0-9.866 4.385-9.868 9.812-.001 1.562.415 3.09 1.202 4.47l-.99 3.61 3.733-.943z"/>
                              </svg>
                              WhatsApp Support
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
