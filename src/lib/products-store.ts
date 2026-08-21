import fs from 'fs'
import path from 'path'
import { db } from '@/lib/db'
import { products as defaultProducts } from '@/data/products'
import { Product } from '@/types'

// Path for serverless & local persistent cache
const CACHE_FILE = path.join(process.cwd(), 'src', 'data', 'products-live.json')
const TMP_CACHE_FILE = '/tmp/products-live.json'

function getCachePath(): string {
  // In serverless production on Vercel, /tmp is writable
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    if (fs.existsSync(TMP_CACHE_FILE)) {
      return TMP_CACHE_FILE
    }
  }
  return fs.existsSync(CACHE_FILE) ? CACHE_FILE : TMP_CACHE_FILE
}

function readStoredProducts(): Product[] | null {
  try {
    if (fs.existsSync(TMP_CACHE_FILE)) {
      const data = fs.readFileSync(TMP_CACHE_FILE, 'utf-8')
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {}

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8')
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {}

  return null
}

function writeStoredProducts(products: Product[]) {
  const jsonStr = JSON.stringify(products, null, 2)
  try {
    fs.writeFileSync(CACHE_FILE, jsonStr, 'utf-8')
  } catch {}

  try {
    fs.writeFileSync(TMP_CACHE_FILE, jsonStr, 'utf-8')
  } catch {}
}

export async function getAllProducts(): Promise<Product[]> {
  // 1. Try reading from Database
  try {
    const dbProducts = await db.product.findMany({
      include: {
        reviews: {
          where: { isApproved: true },
          select: { rating: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    if (dbProducts && dbProducts.length > 0) {
      const parsed: Product[] = dbProducts.map((p) => {
        let parsedImages: string[] = []
        if (p.images) {
          try {
            parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images
          } catch {
            parsedImages = []
          }
        }
        if (!Array.isArray(parsedImages) || parsedImages.length === 0) {
          parsedImages = p.image ? [p.image] : []
        }

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          category: p.category,
          price: p.price,
          shortDescription: p.shortDescription,
          description: p.description,
          image: parsedImages[0] || p.image || '',
          images: parsedImages,
          tag: p.tag || undefined,
          specifications: typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || []),
          features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || []),
          reviews: p.reviews || []
        }
      })

      // Sync to cache
      writeStoredProducts(parsed)
      return parsed
    }
  } catch (dbErr) {
    // Database connection not available or error
  }

  // 2. Try reading from Live File Storage
  const cached = readStoredProducts()
  if (cached !== null) {
    return cached
  }

  // 3. Initialize from defaultProducts if not initialized yet
  const initial = defaultProducts.map((p) => ({
    ...p,
    images: (p.images && p.images.length > 0) ? p.images : (p.image ? [p.image] : [])
  }))
  writeStoredProducts(initial)
  return initial
}

export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  const all = await getAllProducts()
  const found = all.find((p) => p.id === idOrSlug || p.slug === idOrSlug)
  return found || null
}

export async function addProduct(productData: Partial<Product>): Promise<Product> {
  const all = await getAllProducts()

  // Generate unique slug
  let baseSlug = (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  if (!baseSlug) baseSlug = `product-${Date.now()}`
  let slug = baseSlug
  if (all.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${Date.now().toString().slice(-4)}`
  }

  const id = productData.id || `prod-${Date.now()}`
  const imagesList = Array.isArray(productData.images) && productData.images.length > 0
    ? productData.images.filter(Boolean)
    : (productData.image ? [productData.image] : ['https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg'])

  const primaryImage = imagesList[0]

  const newProduct: Product = {
    id,
    name: productData.name || 'Untitled Product',
    slug,
    category: productData.category || 'Machinery',
    price: productData.price || 0,
    shortDescription: productData.shortDescription || productData.name || '',
    description: productData.description || productData.name || '',
    image: primaryImage,
    images: imagesList,
    tag: productData.tag || null,
    specifications: productData.specifications || ["High Precision", "Bangalore Made"],
    features: productData.features || ["Engineered for high durability & precision"],
    reviews: []
  }

  // 1. Try DB insertion
  try {
    await db.product.create({
      data: {
        id: newProduct.id,
        name: newProduct.name,
        slug: newProduct.slug,
        category: newProduct.category,
        price: newProduct.price,
        shortDescription: newProduct.shortDescription,
        description: newProduct.description,
        image: newProduct.image,
        images: JSON.stringify(newProduct.images),
        specifications: JSON.stringify(newProduct.specifications),
        features: JSON.stringify(newProduct.features),
        tag: newProduct.tag || null
      }
    })
  } catch (e) {
    // DB not available, file store will persist
  }

  // 2. Update File Store
  const updated = [newProduct, ...all]
  writeStoredProducts(updated)

  return newProduct
}

export async function updateProduct(idOrSlug: string, updates: Partial<Product>): Promise<Product | null> {
  const all = await getAllProducts()
  const index = all.findIndex((p) => p.id === idOrSlug || p.slug === idOrSlug)
  if (index === -1) return null

  const existing = all[index]

  let imagesList = existing.images || (existing.image ? [existing.image] : [])
  if (updates.images !== undefined && Array.isArray(updates.images)) {
    imagesList = updates.images.filter(Boolean)
  } else if (updates.image) {
    imagesList = [updates.image]
  }

  const primaryImage = imagesList[0] || updates.image || existing.image

  const updatedProduct: Product = {
    ...existing,
    ...updates,
    image: primaryImage,
    images: imagesList,
    specifications: updates.specifications || existing.specifications,
    features: updates.features || existing.features,
    tag: updates.tag !== undefined ? updates.tag : existing.tag
  }

  // 1. Try DB update
  try {
    await db.product.update({
      where: { id: existing.id },
      data: {
        name: updatedProduct.name,
        category: updatedProduct.category,
        price: updatedProduct.price,
        shortDescription: updatedProduct.shortDescription,
        description: updatedProduct.description,
        image: updatedProduct.image,
        images: JSON.stringify(updatedProduct.images),
        specifications: JSON.stringify(updatedProduct.specifications),
        features: JSON.stringify(updatedProduct.features),
        tag: updatedProduct.tag || null
      }
    })
  } catch (e) {
    // Fallback: try create if doesn't exist in DB
    try {
      await db.product.create({
        data: {
          id: updatedProduct.id,
          name: updatedProduct.name,
          slug: updatedProduct.slug,
          category: updatedProduct.category,
          price: updatedProduct.price,
          shortDescription: updatedProduct.shortDescription,
          description: updatedProduct.description,
          image: updatedProduct.image,
          images: JSON.stringify(updatedProduct.images),
          specifications: JSON.stringify(updatedProduct.specifications),
          features: JSON.stringify(updatedProduct.features),
          tag: updatedProduct.tag || null
        }
      })
    } catch {}
  }

  // 2. Update File Store
  all[index] = updatedProduct
  writeStoredProducts(all)

  return updatedProduct
}

export async function deleteProduct(idOrSlug: string): Promise<boolean> {
  const all = await getAllProducts()
  const exists = all.some((p) => p.id === idOrSlug || p.slug === idOrSlug)
  if (!exists) return false

  // 1. Try DB delete
  try {
    const dbItem = await db.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }]
      }
    })
    if (dbItem) {
      await db.product.delete({
        where: { id: dbItem.id }
      })
    }
  } catch (e) {}

  // 2. Remove permanently from File Store
  const filtered = all.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug)
  writeStoredProducts(filtered)

  return true
}
