import { Product } from '@/types'
import {
  pgGetAllProducts,
  pgGetProductByIdOrSlug,
  pgAddProduct,
  pgUpdateProduct,
  pgDeleteProduct
} from '@/lib/pg-products'
import { products as defaultProducts } from '@/data/products'

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await pgGetAllProducts()
    if (products && products.length > 0) {
      return products
    }
  } catch (err) {
    console.error('Error in pgGetAllProducts:', err)
  }

  // If database is completely empty (0 rows), return default products
  return defaultProducts.map((p) => ({
    ...p,
    images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
  }))
}

export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  try {
    const found = await pgGetProductByIdOrSlug(idOrSlug)
    if (found) return found
  } catch (err) {
    console.error('Error in pgGetProductByIdOrSlug:', err)
  }

  const all = await getAllProducts()
  return all.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null
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
