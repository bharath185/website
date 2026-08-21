"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, RefreshCw } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import ProductCard from "@/components/ProductCard"
import { Product } from "@/types"

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          if (data.products && data.products.length > 0) {
            setProducts(data.products.slice(0, 6))
          }
        }
      } catch (err) {
        console.error('Error fetching homepage products:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  return (
    <section id="products" className="py-16 lg:py-24 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              Featured Machine Tools &amp; Components
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm">
              Machinery, bearings, hydrostatic spindles, and accessories — precision-manufactured
              in Bangalore to the highest industry standards. Order online or submit custom quote requests.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-blue-900">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <ScrollReveal>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 bg-white text-slate-800 font-bold rounded-xl hover:border-blue-700 hover:text-blue-900 transition-all text-xs uppercase tracking-wider shadow-sm"
            >
              Explore All Products
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
