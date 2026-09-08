import { Product } from '@/types'
import {
  pgGetAllProducts,
  pgGetProductByIdOrSlug,
  pgAddProduct,
  pgUpdateProduct,
  pgDeleteProduct
} from '@/lib/pg-products'

import productsLive from '@/data/products-live.json'

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await pgGetAllProducts()
    if (products && products.length > 0) {
      return products
    }
  } catch (err) {
    console.error('Error in pgGetAllProducts from Neon DB:', err)
  }
  return (productsLive as unknown as Product[]) || []
}

export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  if (!idOrSlug) return null
  const cleanId = decodeURIComponent(idOrSlug).toLowerCase().trim()
  
  try {
    const dbProduct = await pgGetProductByIdOrSlug(idOrSlug)
    if (dbProduct) return dbProduct
  } catch (err) {
    console.error('Error in pgGetProductByIdOrSlug from Neon DB:', err)
  }

  // Fallback to static catalog
  const staticProduct = (productsLive as unknown as Product[]).find(
    (p) =>
      p.id?.toLowerCase() === cleanId ||
      p.slug?.toLowerCase() === cleanId ||
      p.id?.toLowerCase() === idOrSlug.toLowerCase() ||
      p.slug?.toLowerCase() === idOrSlug.toLowerCase()
  )

  return staticProduct || null
}

export async function addProduct(productData: Partial<Product>): Promise<Product> {
  return await pgAddProduct(productData)
}

export async function updateProduct(idOrSlug: string, updates: Partial<Product>): Promise<Product | null> {
  return await pgUpdateProduct(idOrSlug, updates)
}

export async function deleteProduct(idOrSlug: string): Promise<boolean> {
  return await pgDeleteProduct(idOrSlug)
}
