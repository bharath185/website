import { Product } from '@/types'

export const BMT_PRODUCTS_KEY = 'bmt_custom_products_v3'
export const BMT_DELETED_KEY = 'bmt_deleted_product_ids_v3'

export function getClientDeletedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(BMT_DELETED_KEY)
    if (raw) {
      const arr = JSON.parse(raw)
      if (Array.isArray(arr)) return new Set(arr)
    }
  } catch {}
  return new Set()
}

export function recordClientDeletedId(idOrSlug: string) {
  if (typeof window === 'undefined') return
  try {
    const set = getClientDeletedIds()
    set.add(idOrSlug)
    localStorage.setItem(BMT_DELETED_KEY, JSON.stringify(Array.from(set)))
  } catch {}
}

export function getClientStoredProducts(): Product[] {
  const deletedIds = getClientDeletedIds()

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(BMT_PRODUCTS_KEY)
      if (raw) {
        const arr = JSON.parse(raw)
        if (Array.isArray(arr) && arr.length > 0) {
          return arr.filter((p: Product) => !deletedIds.has(p.id) && !deletedIds.has(p.slug))
        }
      }
    } catch {}
  }

  return []
}

export function saveClientStoredProducts(products: Product[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(BMT_PRODUCTS_KEY, JSON.stringify(products))
  } catch {}
}

export function addClientProduct(product: Product) {
  const current = getClientStoredProducts()
  const updated = [product, ...current.filter((p) => p.id !== product.id && p.slug !== product.slug)]
  saveClientStoredProducts(updated)
  return updated
}

export function updateClientProduct(idOrSlug: string, updates: Partial<Product>) {
  const current = getClientStoredProducts()
  const updated = current.map((p) => {
    if (p.id === idOrSlug || p.slug === idOrSlug) {
      return { ...p, ...updates }
    }
    return p
  })
  saveClientStoredProducts(updated)
  return updated
}

export function deleteClientProduct(idOrSlug: string) {
  recordClientDeletedId(idOrSlug)
  const current = getClientStoredProducts()
  const updated = current.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug)
  saveClientStoredProducts(updated)
  return updated
}
