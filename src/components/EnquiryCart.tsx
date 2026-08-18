"use client"

import { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Shield, Send, Plus, Minus, CheckCircle } from "lucide-react";
import { useEnquiry } from "@/context/EnquiryContext";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import CheckoutModal from "@/components/CheckoutModal";

export default function EnquiryCart() {
  const { items, removeItem, updateQuantity, clearCart } = useEnquiry();
  const { user, openAuthModal } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const isMobile = useIsMobile();

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 bg-white border border-slate-200 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <ShoppingBag size={24} className="text-[#122f87]" />
        </div>
        <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-slate-500 text-xs max-w-sm mx-auto mb-8 font-light leading-relaxed">
          Explore our high-precision spindle systems, linear tracks, and accessories catalog to add components.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold rounded-2xl transition-all shadow-md shadow-blue-900/10 hover:shadow-blue-900/20 text-xs uppercase tracking-wider cursor-pointer"
        >
          Explore Full Catalog <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="bg-slate-50 min-h-screen px-4 pt-4 pb-32">
        {/* Mobile Header Row */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            {items.length} ITEMS SELECTED
          </span>
          <button
            onClick={clearCart}
            className="text-[9px] text-red-655 hover:text-red-500 font-bold uppercase tracking-wider border border-red-200/50 rounded-xl px-2.5 py-1 bg-red-50/40 cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* Scrollable list of items */}
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/60 p-3.5 flex items-center gap-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]"
            >
              {/* Product Thumbnail */}
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-contain rounded-xl border border-slate-200/80 bg-slate-50 shrink-0 p-1"
              />
              
              {/* Product Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[7px] font-mono font-bold text-red-500 bg-red-50 border border-red-200/30 px-1.5 py-0.5 rounded uppercase tracking-wider inline-block">
                  {product.category}
                </span>
                <h3 className="font-extrabold text-[11px] text-slate-900 truncate uppercase tracking-tight">
                  {product.name}
                </h3>
                <p className="text-[8px] text-slate-400 font-mono">ID: {product.id}</p>
                
                {/* Stepper Counter on Mobile */}
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 w-24 overflow-hidden h-7">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="px-2 text-[10px] font-bold text-slate-900 font-mono">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                  >
                    <Plus size={10} />
                  </button>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => removeItem(product.id)}
                className="p-2 text-slate-400 hover:text-red-600 rounded-xl cursor-pointer shrink-0"
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Sticky Bottom Check Panel */}
        <div className="fixed bottom-[68px] left-0 right-0 z-30 bg-white border-t border-slate-200/80 p-4 pb-6 flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.03)] backdrop-blur-xl">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Total Qty</span>
            <span className="text-xs font-extrabold text-slate-950 font-mono">
              {items.reduce((sum, item) => sum + item.quantity, 0)} Items
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleWhatsAppEnquiry}
              className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
            >
              WhatsApp
            </button>
            
            <button
              onClick={handleCheckoutClick}
              className="px-5 py-3 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-900/10 cursor-pointer flex items-center gap-1.5"
            >
              <Send size={11} /> Request Quote
            </button>
          </div>
        </div>

        <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Product Checklist */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
              Selected Products ({items.length})
            </h2>
            <button
              onClick={clearCart}
              className="text-[10px] text-red-600 hover:text-red-500 font-extrabold uppercase tracking-wider border border-red-200/60 hover:border-red-300 rounded-xl px-3 py-1.5 bg-red-50/40 transition-all cursor-pointer"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-[2rem] border border-slate-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-[1.5rem] border border-slate-200 bg-slate-50 shrink-0 shadow-inner"
                />
                
                <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                  <span className="text-[9px] font-mono font-bold text-red-600 bg-red-50 border border-red-200/40 px-2.5 py-0.5 rounded uppercase tracking-wider inline-block">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm truncate uppercase tracking-tight">{product.name}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">ID: {product.id}</p>
                </div>

                <div className="flex items-center gap-4">
                  
                  {/* Quantity adjustment box */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-inner">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2.5 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-950 font-mono">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2.5 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Remove product button */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                    aria-label="Delete item"
                  >
                    <Trash2 size={15} />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Enquiry Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.2rem] border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 sticky top-28">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight mb-4 pb-3 border-b border-slate-100 font-display">
              Enquiry Summary
            </h3>

            <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">
              Submit your quotation list directly to our sales engineering desk. We will analyze the loading capacities, specs, and quantities, returning a detailed technical quote to your registered details.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#122f87] hover:bg-[#1a3fa8] text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-blue-900/10 hover:shadow-blue-900/20 cursor-pointer"
              >
                <Send size={14} /> Request Quotation
              </button>

              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-emerald-700/15 cursor-pointer"
              >
                <Send size={14} /> WhatsApp Enquiry
              </button>
            </div>

            {/* Verification highlights */}
            <div className="mt-6 p-4 bg-blue-50/40 border border-blue-100/50 rounded-2xl flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-[#122f87] shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-900 leading-normal font-light">
                <strong>Protected Inquiry:</strong> Submitted specs are verified for tooling compatibility before quoting. Expect responses within 1-2 business days.
              </p>
            </div>
          </div>
        </div>

      </div>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
