import dns from 'dns'
import { Pool, Client } from 'pg'
import { Product } from '@/types'

const HOSTNAME = 'ep-fragrant-sound-azji41kz-pooler.c-3.ap-southeast-1.aws.neon.tech'
const DB_USER = 'neondb_owner'
const DB_PASS = 'npg_MemHW9SCdtg2'
const DB_NAME = 'neondb'
const DB_PORT = 5432

let cachedPool: Pool | null = null

async function getPgClient(): Promise<Client> {
  // Resolve IPv4 directly with Google/Cloudflare DNS to bypass any local/serverless DNS glitches
  let targetIp = HOSTNAME
  try {
    const dnsPromises = dns.promises
    dns.setServers(['8.8.8.8', '1.1.1.1'])
    const ips = await dnsPromises.resolve4(HOSTNAME)
    if (ips && ips.length > 0) {
      targetIp = ips[0]
    }
  } catch (dnsErr) {
    // If dns resolve fails, use hostname directly
    targetIp = HOSTNAME
  }

  const client = new Client({
    host: targetIp,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASS,
    ssl: {
      rejectUnauthorized: false,
      servername: HOSTNAME
    },
    connectionTimeoutMillis: 8000
  })

  await client.connect()
  return client
}

export async function pgGetAllProducts(): Promise<Product[]> {
  const client = await getPgClient()
  try {
    const res = await client.query('SELECT * FROM "Product" ORDER BY "createdAt" DESC;')
    
    return res.rows.map((p) => {
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

      let parsedSpecs: string[] = []
      if (p.specifications) {
        try {
          parsedSpecs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications
        } catch {
          parsedSpecs = []
        }
      }

      let parsedFeatures: string[] = []
      if (p.features) {
        try {
          parsedFeatures = typeof p.features === 'string' ? JSON.parse(p.features) : p.features
        } catch {
          parsedFeatures = []
        }
      }

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: parseFloat(p.price) || 0,
        shortDescription: p.shortDescription || p.name,
        description: p.description || p.name,
        image: parsedImages[0] || p.image || '',
        images: parsedImages,
        tag: p.tag || undefined,
        specifications: parsedSpecs,
        features: parsedFeatures,
        reviews: []
      }
    })
  } finally {
    await client.end().catch(() => {})
  }
}

export async function pgGetProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  const client = await getPgClient()
  try {
    const res = await client.query(
      'SELECT * FROM "Product" WHERE id = $1 OR slug = $1 LIMIT 1;',
      [idOrSlug]
    )
    if (res.rows.length === 0) return null

    const p = res.rows[0]
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

    let parsedSpecs: string[] = []
    if (p.specifications) {
      try {
        parsedSpecs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications
      } catch {
        parsedSpecs = []
      }
    }

    let parsedFeatures: string[] = []
    if (p.features) {
      try {
        parsedFeatures = typeof p.features === 'string' ? JSON.parse(p.features) : p.features
      } catch {
        parsedFeatures = []
      }
    }

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: parseFloat(p.price) || 0,
      shortDescription: p.shortDescription || p.name,
      description: p.description || p.name,
      image: parsedImages[0] || p.image || '',
      images: parsedImages,
      tag: p.tag || undefined,
      specifications: parsedSpecs,
      features: parsedFeatures,
      reviews: []
    }
  } finally {
    await client.end().catch(() => {})
  }
}

export async function pgAddProduct(productData: Partial<Product>): Promise<Product> {
  const client = await getPgClient()
  try {
    let baseSlug = (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (!baseSlug) baseSlug = `product-${Date.now()}`
    const slug = baseSlug

    const id = productData.id || `prod-${Date.now()}`
    const imagesList = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images.filter(Boolean)
      : (productData.image ? [productData.image] : ['https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg'])

    const primaryImage = imagesList[0]
    const price = parseFloat((productData.price || 0).toString())
    const shortDescription = productData.shortDescription || productData.name || ''
    const description = productData.description || productData.name || ''
    const category = productData.category || 'Machinery'
    const tag = productData.tag || null
    const specifications = JSON.stringify(productData.specifications || ["High Precision", "Bangalore Made"])
    const features = JSON.stringify(productData.features || ["Engineered for high durability & precision"])
    const imagesJson = JSON.stringify(imagesList)

    const query = `
      INSERT INTO "Product" (
        id, name, slug, category, price, "shortDescription", description, image, images, specifications, features, tag, "createdAt", "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
      RETURNING *;
    `
    const res = await client.query(query, [
      id,
      productData.name || 'Untitled Product',
      slug,
      category,
      price,
      shortDescription,
      description,
      primaryImage,
      imagesJson,
      specifications,
      features,
      tag
    ])

    const p = res.rows[0]
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: parseFloat(p.price) || 0,
      shortDescription: p.shortDescription,
      description: p.description,
      image: primaryImage,
      images: imagesList,
      tag: p.tag || undefined,
      specifications: productData.specifications || ["High Precision", "Bangalore Made"],
      features: productData.features || ["Engineered for high durability & precision"],
      reviews: []
    }
  } finally {
    await client.end().catch(() => {})
  }
}

export async function pgUpdateProduct(idOrSlug: string, updates: Partial<Product>): Promise<Product | null> {
  const existing = await pgGetProductByIdOrSlug(idOrSlug)
  if (!existing) return null

  const client = await getPgClient()
  try {
    let imagesList = existing.images || (existing.image ? [existing.image] : [])
    if (updates.images !== undefined && Array.isArray(updates.images)) {
      imagesList = updates.images.filter(Boolean)
    } else if (updates.image) {
      imagesList = [updates.image]
    }

    const primaryImage = imagesList[0] || updates.image || existing.image || ''
    const name = updates.name !== undefined ? updates.name : existing.name
    const category = updates.category !== undefined ? updates.category : existing.category
    const priceVal = updates.price !== undefined ? parseFloat(updates.price.toString()) : (existing.price ?? 0)
    const price = !isNaN(priceVal) ? priceVal : 0
    const shortDescription = updates.shortDescription !== undefined ? updates.shortDescription : existing.shortDescription
    const description = updates.description !== undefined ? updates.description : existing.description
    const tag = updates.tag !== undefined ? updates.tag : existing.tag
    
    let specs = updates.specifications !== undefined ? updates.specifications : existing.specifications
    if (!Array.isArray(specs)) specs = []
    const specifications = JSON.stringify(specs)

    let feats = updates.features !== undefined ? updates.features : existing.features
    if (!Array.isArray(feats)) feats = []
    const features = JSON.stringify(feats)

    const imagesJson = JSON.stringify(imagesList)

    let slug = existing.slug
    if (updates.slug) {
      slug = updates.slug
    } else if (updates.name && updates.name !== existing.name) {
      const generated = updates.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      if (generated) slug = generated
    }

    const query = `
      UPDATE "Product"
      SET name = $1, slug = $2, category = $3, price = $4, "shortDescription" = $5, description = $6,
          image = $7, images = $8, specifications = $9, features = $10, tag = $11, "updatedAt" = NOW()
      WHERE id = $12
      RETURNING *;
    `
    const res = await client.query(query, [
      name,
      slug,
      category,
      price,
      shortDescription,
      description,
      primaryImage,
      imagesJson,
      specifications,
      features,
      tag,
      existing.id
    ])

    if (res.rows.length === 0) return null

    const p = res.rows[0]
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

    let parsedSpecs: string[] = []
    if (p.specifications) {
      try {
        parsedSpecs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications
      } catch {
        parsedSpecs = []
      }
    }

    let parsedFeatures: string[] = []
    if (p.features) {
      try {
        parsedFeatures = typeof p.features === 'string' ? JSON.parse(p.features) : p.features
      } catch {
        parsedFeatures = []
      }
    }

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: parseFloat(p.price) || 0,
      shortDescription: p.shortDescription || p.name,
      description: p.description || p.name,
      image: parsedImages[0] || p.image || '',
      images: parsedImages,
      tag: p.tag || undefined,
      specifications: parsedSpecs,
      features: parsedFeatures,
      reviews: []
    }
  } finally {
    await client.end().catch(() => {})
  }
}

export async function pgDeleteProduct(idOrSlug: string): Promise<boolean> {
  const client = await getPgClient()
  try {
    const res = await client.query(
      'DELETE FROM "Product" WHERE id = $1 OR slug = $1 RETURNING id;',
      [idOrSlug]
    )
    return res.rowCount !== null && res.rowCount > 0
  } finally {
    await client.end().catch(() => {})
  }
}
