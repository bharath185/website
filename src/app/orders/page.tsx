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
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import { Order } from '@/types'

const statusSteps = ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED']

function getStepIndex(status: string) {
  const idx = statusSteps.indexOf(status.toUpperCase())
  return idx === -1 ? 0 : idx
}

export default function UserOrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
      } else {
        setError('Failed to load orders.')
      }
    } catch {
      setError('Network error while loading orders.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/')
      } else {
        fetchOrders()
      }
    }
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-28 pb-16 flex items-center justify-center text-blue-900">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 lg:pt-24 pb-16">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-10 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-blue-900 shadow-sm">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">My Orders &amp; Track Status</h1>
                <p className="text-xs text-slate-500">
                  Track live fulfillment progress, Razorpay payment reference, and courier tracking details.
                </p>
              </div>
            </div>
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-2 bg-[#f1f5f9] hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Orders
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
            <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">No Orders Found</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6">
              You haven&apos;t placed any orders yet. Explore our machine tool catalog and place your first order!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const currentStep = getStepIndex(order.status)

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6"
                >
                  {/* Top Info Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">Order ID:</span>
                        <span className="text-xs font-mono font-bold text-slate-900">{order.id}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                          order.status === 'DELIVERED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : order.status === 'SHIPPED'
                            ? 'bg-blue-50 text-blue-900 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-lg font-mono font-bold text-blue-900">
                        ₹{(order.totalAmount * 1.18).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="py-4">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Fulfillment Progress</p>
                    <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
                      <div
                        className="absolute top-1/2 left-0 h-1 bg-blue-900 -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                      />

                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStep
                        const isCurrent = idx === currentStep

                        return (
                          <div key={step} className="relative z-10 flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDone
                                  ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              } ${isCurrent ? 'ring-4 ring-blue-100 scale-110' : ''}`}
                            >
                              {idx + 1}
                            </div>
                            <span
                              className={`text-[10px] font-bold mt-2 uppercase tracking-tight ${
                                isDone ? 'text-blue-900' : 'text-slate-400'
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Items Ordered</p>
                    <div className="space-y-2">
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                          <span className="font-bold text-slate-900">{item.productName} (x{item.quantity})</span>
                          <span className="font-mono font-bold text-blue-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping & Payment Meta */}
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex items-start gap-2.5 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <Building2 className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block">Shipping Address</span>
                        <span>{order.shippingAddress}</span>
                        <span className="block mt-1 font-mono font-bold text-slate-700">Phone: {order.contactPhone}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900 block">Razorpay Reference</span>
                        <span className="font-mono text-slate-700">Payment ID: {order.razorpayPaymentId || 'VERIFIED'}</span>
                        {order.trackingNumber && (
                          <div className="mt-1 flex items-center gap-1.5 text-blue-900 font-bold">
                            <Truck className="w-3.5 h-3.5" />
                            <span>Courier Tracking: {order.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {order.adminNotes && (
                    <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-950 text-xs rounded-xl flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Update Note from Seller:</span>
                        <span>{order.adminNotes}</span>
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
