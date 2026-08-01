'use client'

import React, { useState } from 'react'
import { useEnquiry } from '@/context/EnquiryContext'
import { useAuth } from '@/context/AuthContext'
import { X, CreditCard, MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, clearCart } = useEnquiry()
  const { user } = useAuth()
  const router = useRouter()

  const [shippingAddress, setShippingAddress] = useState('')
  const [contactPhone, setContactPhone] = useState(user?.phone || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + (item.product.price || 10000) * item.quantity, 0)
  const gst = subtotal * 0.18
  const grandTotal = subtotal + gst

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingAddress || !contactPhone) {
      setError('Shipping address and contact phone are required.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 1. Create Razorpay order on server
      const res = await fetch('/api/checkout/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.product.id,
            productName: i.product.name,
            quantity: i.quantity,
            price: i.product.price || 10000
          })),
          shippingAddress,
          contactPhone
        })
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to initiate order. Please try again.')
        setLoading(false)
        return
      }

      const { dbOrderId, razorpayOrderId, amount, currency, keyId } = data

      // 2. Launch Razorpay Checkout Modal
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'Bharat Machine Tools',
        description: `Order #${dbOrderId.slice(0, 8)}`,
        image: 'https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg',
        order_id: razorpayOrderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/checkout/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                dbOrderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            })

            const verifyData = await verifyRes.json()

            if (verifyRes.ok && verifyData.success) {
              clearCart()
              onClose()
              router.push('/orders?success=true')
            } else {
              setError(verifyData.error || 'Payment verification failed.')
            }
          } catch {
            setError('Payment verification failed.')
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: contactPhone
        },
        theme: {
          color: '#062594'
        }
      }

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        setError('Razorpay SDK failed to load. Please refresh.')
      }
    } catch {
      setError('An error occurred during checkout setup.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-900 shadow-sm">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Razorpay Secure Checkout</h2>
            <p className="text-xs text-slate-500">Shipping details &amp; online payment</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleRazorpayPayment} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Delivery Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                required
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Full Factory/Company address, pincode, state..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Contact Mobile Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({items.length})</span>
              <span className="font-mono font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST (18%)</span>
              <span className="font-mono font-bold text-slate-900">₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="font-mono text-blue-900">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? 'Initiating Razorpay...' : `Pay ₹${grandTotal.toLocaleString('en-IN')} via Razorpay`}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Supports UPI, Cards, NetBanking &amp; Wallets via Razorpay</span>
        </div>
      </div>
    </div>
  )
}
