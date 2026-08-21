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
  Package,
  FileText,
  Mail,
  Newspaper
} from 'lucide-react'
import { Order, OrderStatus } from '@/types'
import { jsPDF } from 'jspdf'

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
  const [editStatus, setEditStatus] = useState<string>('PROCESSING')
  const [editTrackingNumber, setEditTrackingNumber] = useState('')
  const [editAdminNotes, setEditAdminNotes] = useState('')
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState('')

  // PDF Quotation Modal State
  const [pdfOrder, setPdfOrder] = useState<Order | null>(null)
  const [pdfPrices, setPdfPrices] = useState<Record<string, string>>({})
  const [pdfDiscount, setPdfDiscount] = useState('0')
  const [pdfTerms, setPdfTerms] = useState(
    "1. Price Basis: Ex-works Bangalore\n" +
    "2. GST: 18% extra as applicable\n" +
    "3. Delivery: Within 2-3 weeks from purchase order\n" +
    "4. Payment: 100% advance against Proforma Invoice"
  )

  const handleOpenPdfGenerator = (order: Order) => {
    const prices: Record<string, string> = {}
    order.items?.forEach((item: any) => {
      prices[item.id] = '10000'
    })
    setPdfPrices(prices)
    setPdfDiscount('0')
    setPdfOrder(order)
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
      } else {
        setOrders([])
      }
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-blue-900">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  

  const handleOpenEdit = (order: Order) => {
    setSelectedOrder(order)
    setEditStatus(order.status || 'PAID')
    setEditTrackingNumber(order.trackingNumber || '')
    setEditAdminNotes(order.adminNotes || '')
    setUpdateSuccess('')
    setError('')
  }

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return

    setUpdating(true)
    setUpdateSuccess('')

    const updatedOrder: Order = {
      ...selectedOrder,
      status: editStatus as OrderStatus,
      trackingNumber: editTrackingNumber,
      adminNotes: editAdminNotes
    }

    try {
      await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          trackingNumber: editTrackingNumber,
          adminNotes: editAdminNotes
        })
      })

      // Update state
      setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? updatedOrder : o)))

      setUpdateSuccess('Order status updated successfully!')
      setTimeout(() => {
        setSelectedOrder(null)
        setUpdateSuccess('')
      }, 1000)
    } catch {
      setError('Network error updating status')
    } finally {
      setUpdating(false)
    }
  }
  const downloadPdf = async () => {
    if (!pdfOrder) return

    const img = new Image()
    img.src = '/images/logo.png'
    
    const generateDoc = (logoImg?: HTMLImageElement) => {
      const doc = new jsPDF()

      // 1. Draw header background/branding
      doc.setFillColor(18, 47, 135) // BMT Blue #122f87
      doc.rect(0, 0, 210, 30, 'F')

      let textX = 15

      // Draw Logo if available
      if (logoImg) {
        let logoHeight = 20
        let logoWidth = (logoImg.naturalWidth / logoImg.naturalHeight) * logoHeight
        const maxLogoWidth = 70 // Capping logo width to prevent text truncation
        if (logoWidth > maxLogoWidth) {
          logoWidth = maxLogoWidth
          logoHeight = (logoImg.naturalHeight / logoImg.naturalWidth) * logoWidth
        }

        const bannerHeight = 30
        const cardHeight = logoHeight + 4
        const cardWidth = logoWidth + 4
        const cardY = (bannerHeight - cardHeight) / 2

        // Draw white background card for logo
        doc.setFillColor(255, 255, 255)
        doc.roundedRect(15, cardY, cardWidth, cardHeight, 1.5, 1.5, 'F')
        
        // Draw logo inside card
        doc.addImage(logoImg, 'JPEG', 17, cardY + 2, logoWidth, logoHeight)
        
        textX = 15 + cardWidth + 6 // Adjust text x offset
      }

      // Header text
      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(15)
      doc.text('BHARAT MACHINE TOOLS', textX, 14)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text('Precision Industrial Machinery & Accessories | Bangalore', textX, 20)

      // 2. Quotation Metadata Block
      doc.setTextColor(51, 65, 85) // Slate 700
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(13)
      doc.text('QUOTATION ESTIMATE', 15, 45)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.5)
      doc.text(`Quotation No: BMT-QTN-${pdfOrder.id.split('-').pop()}`, 15, 52)
      doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 15, 57)
      doc.text('Validity: 30 Days', 15, 62)

      // Customer details
      doc.setFont('helvetica', 'bold')
      doc.text('Prepared For:', 110, 45)
      doc.setFont('helvetica', 'normal')
      doc.text(`Company/Client: ${pdfOrder.user?.name || 'Valued Customer'}`, 110, 52)
      doc.text(`Contact Phone: ${pdfOrder.contactPhone}`, 110, 57)
      doc.text(`Email: ${pdfOrder.user?.email || 'guest@bmtbharat.com'}`, 110, 62)
      doc.text(`Delivery/Factory Address:`, 110, 67)
      
      const splitAddress = doc.splitTextToSize(pdfOrder.shippingAddress || '', 85)
      doc.text(splitAddress, 110, 72)

      // Horizontal line
      doc.setDrawColor(226, 232, 240)
      doc.line(15, 82, 195, 82)

      // 3. Table of Items
      doc.setFont('helvetica', 'bold')
      doc.text('Item Description', 15, 90)
      doc.text('Qty', 125, 90, { align: 'right' })
      doc.text('Unit Price (INR)', 160, 90, { align: 'right' })
      doc.text('Total (INR)', 195, 90, { align: 'right' })

      doc.line(15, 93, 195, 93)

      let y = 100
      let itemsSubtotal = 0

      doc.setFont('helvetica', 'normal')
      pdfOrder.items?.forEach((item: any, index: number) => {
        const priceVal = parseFloat(pdfPrices[item.id] || '0')
        const itemTotal = priceVal * item.quantity
        itemsSubtotal += itemTotal

        const splitName = doc.splitTextToSize(`${index + 1}. ${item.productName || item.product?.name}`, 95)
        doc.text(splitName, 15, y)

        doc.text(`${item.quantity}`, 125, y, { align: 'right' })
        doc.text(`${priceVal.toLocaleString('en-IN')}`, 160, y, { align: 'right' })
        doc.text(`${itemTotal.toLocaleString('en-IN')}`, 195, y, { align: 'right' })

        y += 8 * splitName.length
      })

      doc.line(15, y, 195, y)
      y += 8

      const discountPct = parseFloat(pdfDiscount || '0')
      const discountAmount = itemsSubtotal * (discountPct / 100)
      const afterDiscount = itemsSubtotal - discountAmount
      const gstAmount = afterDiscount * 0.18
      const grandTotal = afterDiscount + gstAmount

      doc.text('Subtotal:', 140, y)
      doc.text(`${itemsSubtotal.toLocaleString('en-IN')}`, 195, y, { align: 'right' })
      y += 6

      if (discountPct > 0) {
        doc.text(`Discount (${discountPct}%):`, 140, y)
        doc.text(`-${discountAmount.toLocaleString('en-IN')}`, 195, y, { align: 'right' })
        y += 6
      }

      doc.text('GST (18%):', 140, y)
      doc.text(`${gstAmount.toLocaleString('en-IN')}`, 195, y, { align: 'right' })
      y += 6

      doc.setFont('helvetica', 'bold')
      doc.text('Estimated Grand Total:', 140, y)
      doc.text(`${grandTotal.toLocaleString('en-IN')}`, 195, y, { align: 'right' })
      y += 12

      // 4. Terms and Conditions
      doc.setFontSize(10)
      doc.text('Terms & Conditions:', 15, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      const splitTerms = doc.splitTextToSize(pdfTerms, 175)
      doc.text(splitTerms, 15, y)

      // Footer notes
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text('Bharat Machine Tools | Peenya Industrial Area, Bangalore | contact@bmtbharat.com', 15, 285)

      doc.save(`BMT_Quotation_${pdfOrder.id}.pdf`)
      setPdfOrder(null)
    }

    img.onload = () => generateDoc(img)
    img.onerror = () => {
      console.warn('BMT logo load error, rendering fallback PDF layout.')
      generateDoc()
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
      (o.contactPhone && o.contactPhone.toLowerCase().includes(query)) ||
      (o.shippingAddress && o.shippingAddress.toLowerCase().includes(query))
    return matchesStatus && matchesSearch
  })

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount * 1.18 : 0), 0)
  const processingCount = orders.filter((o) => o.status === 'PROCESSING' || o.status === 'PAID').length
  const shippedCount = orders.filter((o) => o.status === 'SHIPPED').length
  const deliveredCount = orders.filter((o) => o.status === 'DELIVERED').length

    return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Customer Orders</h2>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Orders
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Orders</span>
          <span className="text-xl font-bold text-slate-900 font-mono">{orders.length}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Processing</span>
          <span className="text-xl font-bold text-blue-900 font-mono">{processingCount}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Shipped</span>
          <span className="text-xl font-bold text-indigo-700 font-mono">{shippedCount}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Delivered</span>
          <span className="text-xl font-bold text-emerald-700 font-mono">{deliveredCount}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-500 font-bold block uppercase">Pending Enquiries</span>
          <span className="text-xl font-bold text-[#b91c1c] font-mono">{orders.filter(o => o.status === 'PENDING').length}</span>
        </div>
      </div>

      {/* Main Content */}
      <div>
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
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Orders Found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Placed orders will appear here for status updates and courier tracking entry.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-600">
                  <tr>
                    <th className="px-6 py-4">Order ID &amp; Date</th>
                    <th className="px-6 py-4">Customer Details</th>
                    <th className="px-6 py-4">Items Count</th>
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
                          {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 block">{order.user?.name || 'Customer'}</span>
                        <span className="text-[11px] text-slate-500 block">{order.user?.email || 'guest@bmtbharat.com'}</span>
                        <span className="text-[11px] text-slate-500">{order.contactPhone}</span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0} units
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
                          {order.status || 'PAID'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-xs uppercase tracking-wider border border-slate-200 shadow-sm"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            Update Status
                          </button>
                          <button
                            onClick={() => handleOpenPdfGenerator(order)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-colors text-xs uppercase tracking-wider shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Generate Quote
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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

      {/* Quotation PDF Generator Modal */}
      {pdfOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setPdfOrder(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-900 shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Generate Quotation PDF</h2>
                <p className="text-xs text-slate-500">Configure prices and download official document</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <p className="block font-bold text-slate-700 uppercase tracking-wider mb-2">Item Prices (₹)</p>
                <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  {pdfOrder.items?.map((item: any) => (
                    <div key={item.id} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-bold text-slate-800 line-clamp-1">{item.productName || item.product?.name} (x{item.quantity})</span>
                      <input
                        type="number"
                        required
                        value={pdfPrices[item.id] || ''}
                        onChange={(e) => setPdfPrices({...pdfPrices, [item.id]: e.target.value})}
                        placeholder="Unit Price"
                        className="w-full sm:w-32 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-900 font-mono focus:outline-none focus:border-blue-600 font-bold"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Add Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={pdfDiscount}
                  onChange={(e) => setPdfDiscount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 font-bold font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Terms &amp; Conditions</label>
                <textarea
                  rows={4}
                  value={pdfTerms}
                  onChange={(e) => setPdfTerms(e.target.value)}
                  placeholder="Standard terms..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 resize-none font-medium"
                />
              </div>

              <button
                onClick={downloadPdf}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-900/20 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Download PDF Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
