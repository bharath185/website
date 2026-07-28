import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedProducts } from "@/data/products"
import ProductCard from "./ProductCard"

export default function ProductsSection() {
  const featured = getFeaturedProducts()

  return (
    <section id="products" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4">
              Premium Quality Products
            </h2>
            <p className="text-gray-500 mt-2 max-w-2xl">
              From precision rollers to high-performance bearings and spindles — we deliver quality you can trust.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-colors flex-shrink-0"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
