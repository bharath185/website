'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldAlert,
  Search,
  RefreshCw,
  Edit3,
  X,
  CheckCircle2,
  Truck,
  Building2,
  Package
} from 'lucide-react'
import { Order } from '@/types'

const orderStatuses = ['ALL', 'PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export default function AdminOrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')

  // Edit Modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [editStatus, setEditStatus] = useState('PROCESSING')
  const [editTrackingNumber, setEditTrackingNumber] = useState('')
  const [editAdminNotes, setEditAdminNotes] = useState('')
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState('')

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
      setError('Network error loading admin orders.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'ADMIN') {
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

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  const handleOpenEdit = (order: Order) => {
    setSelectedOrder(order)
    setEditStatus(order.status)
    setEditTrackingNumber(order.trackingNumber || '')
    setEditAdminNotes(order.adminNotes || '')
    setUpdateSuccess('')
  }

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return

    setUpdating(true)
    setUpdateSuccess('')
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          trackingNumber: editTrackingNumber,
          adminNotes: editAdminNotes
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setUpdateSuccess('Order status updated successfully!')
        fetchOrders()
        setTimeout(() => {
          setSelectedOrder(null)
          setUpdateSuccess('')
        }, 1200)
      } else {
        setError(data.error || 'Failed to update order status')
      }
    } catch {
      setError('Network error updating status')
    } finally {
      setUpdating(false)
    }
  }

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = selectedStatus === 'ALL' || o.status === selectedStatus
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !query ||
      o.id.toLowerCase().includes(query) ||
      (o.user?.name && o.user.name.toLowerCase().includes(query)) ||
      (o.user?.email && o.user.email.toLowerCase().includes(query)) ||
      o.shippingAddress.toLowerCase().includes(query)
    return matchesStatus && matchesSearch
  })

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount * 1.18 : 0), 0)
  const processingCount = orders.filter((o) => o.status === 'PROCESSING' || o.status === 'PAID').length
  const shippedCount = orders.filter((o) => o.status === 'SHIPPED').length
  const deliveredCount = orders.filter((o) => o.status === 'DELIVERED').length

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 lg:pt-24 pb-16">
      {/* Admin Header Banner */}
      <section className="bg-white border-b border-slate-200 py-10 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Admin Order Status Manager</h1>
                <p className="text-xs text-slate-500">
                  Update customer order statuses, add courier tracking numbers, and add notes anytime.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/products"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/20"
              >
                <Package className="w-4 h-4" />
                Manage Products
              </Link>
              <button
                onClick={fetchOrders}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                title="Refresh Orders"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Orders</span>
              <span className="text-xl font-bold text-slate-900 font-mono">{orders.length}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Processing</span>
              <span className="text-xl font-bold text-blue-900 font-mono">{processingCount}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Shipped</span>
              <span className="text-xl font-bold text-indigo-700 font-mono">{shippedCount}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Delivered</span>
              <span className="text-xl font-bold text-emerald-700 font-mono">{deliveredCount}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Est. Revenue</span>
              <span className="text-xl font-bold text-slate-900 font-mono">₹{totalRevenue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, Customer Name, Email, Address..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {orderStatuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedStatus === st
                    ? 'bg-blue-900 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-600">
                <tr>
                  <th className="px-6 py-4">Order ID &amp; Date</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Current Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-900 block">{order.id}</span>
                      <span className="text-[11px] text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 block">{order.user?.name || 'Customer'}</span>
                      <span className="text-[11px] text-slate-500 block">{order.user?.email}</span>
                      <span className="text-[11px] text-slate-500">{order.contactPhone}</span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-blue-900">
                      ₹{(order.totalAmount * 1.18).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          order.status === 'DELIVERED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : order.status === 'SHIPPED'
                            ? 'bg-blue-50 text-blue-900 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(order)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-colors text-xs uppercase tracking-wider shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Order Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Update Order Status</h3>
            <p className="text-xs text-slate-500 mb-6">Modifying Order <span className="font-mono text-slate-900 font-bold">{selectedOrder.id}</span></p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            {updateSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {updateSuccess}
              </div>
            )}

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Order Status *</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Courier Tracking Number</label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={editTrackingNumber}
                    onChange={(e) => setEditTrackingNumber(e.target.value)}
                    placeholder="e.g. DTDC12938481"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Seller Notes for Customer</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    rows={3}
                    value={editAdminNotes}
                    onChange={(e) => setEditAdminNotes(e.target.value)}
                    placeholder="Notes on dispatch status, delivery date..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 resize-none font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-900/20 text-xs uppercase tracking-wider"
              >
                {updating ? 'Saving Status...' : 'Save & Update Customer Status'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
