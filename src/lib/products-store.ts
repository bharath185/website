import { Product } from '@/types'
import {
  pgGetAllProducts,
  pgGetProductByIdOrSlug,
  pgAddProduct,
  pgUpdateProduct,
  pgDeleteProduct
} from '@/lib/pg-products'

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await pgGetAllProducts()
    return products || []
  } catch (err) {
    console.error('Error in pgGetAllProducts from Neon DB:', err)
    return []
  }
}

export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  try {
    return await pgGetProductByIdOrSlug(idOrSlug)
  } catch (err) {
    console.error('Error in pgGetProductByIdOrSlug from Neon DB:', err)
    return null
  }
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
