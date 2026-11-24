import dns from 'dns'
import { Pool, Client } from 'pg'
import { Product } from '@/types'

const FALLBACK_HOSTNAME = 'ep-fragrant-sound-azji41kz-pooler.c-3.ap-southeast-1.aws.neon.tech'
const FALLBACK_USER = 'neondb_owner'
const FALLBACK_PASS = 'npg_MemHW9SCdtg2'
const FALLBACK_NAME = 'neondb'
const FALLBACK_PORT = 5432

// Curated high-resolution fallback image mapping for critical machinery products
const KNOWN_PRODUCT_IMAGES: Record<string, string> = {
  'rotary-tables': 'https://productimages.withfloats.com/tile/649bf791a942e10001afa81f.png',
  '5th-axis-rotary-table': 'https://productimages.withfloats.com/tile/649bf9892c55490001fe2276.png',
  'ball-screws': 'https://productimages.withfloats.com/tile/6499819740036f0001c548d2.jpg',
  'locknuts': '/uploads/1786554276270-vmh5apy.png',
  'planetary-gear-box': '/uploads/1786553860570-t4s3j5l.png',
  'spm-machine-tools': '/uploads/1786554554525-g9u0dry.png',
  'bend-checking-fixture': '/uploads/1787331777609-x5noist.png',
  'polished-industrial-shafts': '/images/products/polished-industrial-shafts.png'
}

function sanitizeProductImage(slug: string, img: string): string {
  if (!img) return KNOWN_PRODUCT_IMAGES[slug] || ''
  // Guard against MD portrait uploaded into Rotary Tables or any machine product
  if (img.includes('1786554119506-30flis9') || img.includes('md_portrait') || img.includes('md.jpg')) {
    return KNOWN_PRODUCT_IMAGES[slug] || 'https://productimages.withfloats.com/tile/649bf791a942e10001afa81f.png'
  }
  // Guard against Locknuts photo accidentally duplicating into Ball Screws
  if (slug === 'ball-screws' && img.includes('1786554265141-6t94w7e')) {
    return 'https://productimages.withfloats.com/tile/6499819740036f0001c548d2.jpg'
  }
  return img
}

let cachedPool: Pool | null = null

export async function getPgClient(): Promise<Client> {
  const dbUrl = process.env.DATABASE_URL

  if (dbUrl) {
    try {
      const parsedUrl = new URL(dbUrl)
      const host = parsedUrl.hostname
      const isLocal = !host || host === 'localhost' || host === '127.0.0.1'

      const client = new Client({
        connectionString: dbUrl,
        ssl: isLocal ? false : { rejectUnauthorized: false, servername: host },
        connectionTimeoutMillis: 10000
      })

      await client.connect()
      return client
    } catch (parseErr) {
      console.warn('Error connecting with DATABASE_URL, attempting standard client:', parseErr)
      const client = new Client({
        connectionString: dbUrl,
        ssl: false,
        connectionTimeoutMillis: 10000
      })
      await client.connect()
      return client
    }
  }

  // Fallback to Neon if DATABASE_URL is not set
  let targetIp = FALLBACK_HOSTNAME
  try {
    const dnsPromises = dns.promises
    dns.setServers(['8.8.8.8', '1.1.1.1'])
    const ips = await dnsPromises.resolve4(FALLBACK_HOSTNAME)
    if (ips && ips.length > 0) {
      targetIp = ips[0]
    }
  } catch (dnsErr) {
    targetIp = FALLBACK_HOSTNAME
  }

  const client = new Client({
    host: targetIp,
    port: FALLBACK_PORT,
    database: FALLBACK_NAME,
    user: FALLBACK_USER,
    password: FALLBACK_PASS,
    ssl: {
      rejectUnauthorized: false,
      servername: FALLBACK_HOSTNAME
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
      parsedImages = parsedImages.map(img => sanitizeProductImage(p.slug, img))
      const primaryImage = sanitizeProductImage(p.slug, parsedImages[0] || p.image || '')

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
        image: primaryImage,
        images: parsedImages.length > 0 ? parsedImages : [primaryImage],
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
    parsedImages = parsedImages.map(img => sanitizeProductImage(p.slug, img))
    const finalPrimaryImage = sanitizeProductImage(p.slug, parsedImages[0] || p.image || '')

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
      image: finalPrimaryImage,
      images: parsedImages.length > 0 ? parsedImages : [finalPrimaryImage],
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
    parsedImages = parsedImages.map(img => sanitizeProductImage(p.slug, img))
    const finalPrimaryImage = sanitizeProductImage(p.slug, parsedImages[0] || p.image || '')

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
      image: finalPrimaryImage,
      images: parsedImages.length > 0 ? parsedImages : [finalPrimaryImage],
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
