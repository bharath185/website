"use client"

import Link from "next/link"
import { X, Minus, Plus, ShoppingCart, ArrowRight, Trash2 } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"

export default function EnquiryCart() {
  const { items, removeItem, updateQuantity, clearEnquiry, itemCount } = useEnquiry()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your enquiry list is empty</h2>
        <p className="text-gray-500 mb-6">Browse our products and add items you&apos;re interested in.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          Browse Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Enquiry List ({itemCount} {itemCount === 1 ? "item" : "items"})
        </h2>
        <button
          onClick={clearEnquiry}
          className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-blue-700 font-bold">{item.product.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.product.slug}`}
                className="text-sm font-medium text-gray-900 hover:text-blue-700 block truncate"
              >
                {item.product.name}
              </Link>
              <span className="text-xs text-gray-500">{item.product.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => removeItem(item.product.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
