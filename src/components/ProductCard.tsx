"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ShoppingCart } from "lucide-react"
import { useEnquiry } from "@/context/EnquiryContext"
import { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, removeItem } = useEnquiry()
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const inCart = items.some((i) => i.product.id === product.id)
  const itemPrice = product.price || 10000

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / 25)
    setRotateY((centerX - x) / 25)
  }

  function handleMouseLeave() {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
      >
        <div style={{ transform: "translateZ(20px)" }}>
          <Link href={`/products/${product.slug}`} className="block p-5">
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-slate-100 bg-slate-50 group-hover:border-slate-200 transition-colors">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-slate-200 text-blue-900 font-extrabold text-[10px] rounded-md uppercase tracking-wider shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                {product.name}
              </h3>
              <span className="text-sm font-mono font-bold text-blue-900 flex-shrink-0">
                ₹{itemPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.shortDescription || product.description}
            </p>
          </Link>
        </div>

        <div className="px-5 pb-5 pt-1" style={{ transform: "translateZ(10px)" }}>
          <button
            onClick={() => (inCart ? removeItem(product.id) : addItem(product))}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              inCart
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-inner"
                : "bg-blue-900 hover:bg-blue-800 text-white shadow-md shadow-blue-900/20 active:scale-[0.98]"
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                Added in Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart &amp; Order
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
