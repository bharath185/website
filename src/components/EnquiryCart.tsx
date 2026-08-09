"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Shield, CreditCard, Send, Plus, Minus } from "lucide-react";
import { useEnquiry } from "@/context/EnquiryContext";
import { useAuth } from "@/context/AuthContext";
import CheckoutModal from "@/components/CheckoutModal";

export default function EnquiryCart() {
  const { items, removeItem, updateQuantity, clearCart } = useEnquiry();
  const { user, openAuthModal } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.product.price || 10000) * item.quantity, 0);
  const gstEstimate = subtotal * 0.18;
  const grandTotal = subtotal + gstEstimate;

  const handleCheckoutClick = () => {
    if (!user) {
      openAuthModal("login");
    } else {
      setCheckoutOpen(true);
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(
      `*New Machine Tool Order Enquiry*%0A%0A` +
      items.map(i => `- ${i.product.name} (Qty: ${i.quantity})`).join('%0A') +
      `%0A%0APlease contact me with a custom quotation.`
    );
    window.open(`https://wa.me/919530208882?text=${message}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
          Explore our industrial catalog and add machine tools, hydrostatic spindles, or accessories to place your order.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-md text-xs uppercase tracking-wider"
        >
          Explore Catalog &amp; Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-xl font-extrabold text-slate-900">
              Selected Products ({items.length})
            </h2>
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:underline font-bold"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl border border-slate-200 bg-slate-50 shrink-0"
                />
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm truncate">{product.name}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 text-slate-600 hover:bg-slate-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 font-mono">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 text-slate-600 hover:bg-slate-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
            <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
              Enquiry Summary
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Submit your quotation request. Once submitted, our sales engineering team will review the request and get in touch with you shortly with custom pricing.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/20"
              >
                <Send size={16} /> Request Quotation
              </button>

              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow"
              >
                <Send size={16} /> Instant WhatsApp Enquiry
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
              <Shield size={14} className="text-blue-900 shrink-0" />
              <span>Secure enquiry submission. Our team will contact you directly with custom pricing.</span>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
