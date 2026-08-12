import React from "react"
import { getProductBySlug } from "@/data/products"
import { notFound } from "next/navigation"
import ProductDetailClientV2 from "@/components/v2/ProductDetailClientV2"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function V2ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const product = getProductBySlug(resolvedParams.slug)
  
  if (!product) {
    notFound()
  }

  return (
    <ProductDetailClientV2 product={product} />
  )
}
