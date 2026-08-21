'use client'

import React, { useState } from 'react'
import { useEnquiry } from '@/context/EnquiryContext'
import { useAuth } from '@/context/AuthContext'
import { X, CreditCard, MapPin, Phone, ShieldCheck, CheckCircle2, Sparkles, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, clearCart } = useEnquiry()
  const { user } = useAuth()
  const router = useRouter()

  const [shippingAddress, setShippingAddress] = useState('')
  const [contactPhone, setContactPhone] = useState(user?.phone || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + (item.product.price || 10000) * item.quantity, 0)
  const gst = subtotal * 0.18
  const grandTotal = subtotal + gst

  const handleInstantPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingAddress || !contactPhone) {
      setError('Shipping address and contact phone are required.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            productName: i.product.name,
            quantity: i.quantity,
            price: i.product.price || 10000
          })),
          shippingAddress,
          contactPhone,
          email: user?.email
        })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setIsSuccess(true)

        setTimeout(() => {
          clearCart()
          onClose()
          setIsSuccess(false)
          router.push('/orders?success=true')
        }, 1200)
      } else {
        setError(data.error || 'Failed to place order.')
        setLoading(false)
      }
    } catch {
      setError('Network error while processing order.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-scale-in">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-[11px] uppercase tracking-wider rounded-full border border-emerald-200 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Submission Successful
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Enquiry Sent!</h2>
              <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1">
                Thank you! Your quotation request has been submitted. Our engineering team will contact you shortly. Redirecting you to status tracking...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-900 shadow-sm">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Request Quotation</h2>
                <p className="text-xs text-slate-500">Submit your engineering enquiry details</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleInstantPayment} className="space-y-4">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Submitting Enquiry...' : 'Submit Quotation Request'}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Our sales engineering team will call you within 1-2 business hours.</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
