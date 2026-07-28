"use client"

import Link from "next/link"
import { ShoppingCart, Eye } from "lucide-react"
import { Product } from "@/types"
import { useEnquiry } from "@/context/EnquiryContext"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useEnquiry()

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col">
      <Link href={`/products/${product.slug}`} className="block aspect-[4/3] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-bold text-lg">{product.name.charAt(0)}</span>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">{product.shortDescription}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Eye className="w-8 h-8 text-white" />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block w-fit mb-2">
          {product.category}
        </span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {product.shortDescription}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
