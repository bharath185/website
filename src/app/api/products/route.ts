import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'
import { products as defaultProducts } from '@/data/products'

export async function GET() {
  try {
    let products = await db.product.findMany({
      orderBy: { createdAt: 'desc' }
    })

    // Auto-seed default catalog into SQLite if database table is empty
    if (products.length === 0) {
      console.log('Seeding initial product catalog into SQLite database...')
      for (const p of defaultProducts) {
        await db.product.create({
          data: {
            id: p.id,
            name: p.name,
            slug: p.slug,
            category: p.category,
            price: p.price || 10000,
            shortDescription: p.shortDescription,
            description: p.description,
            image: p.image,
            specifications: p.specifications ? JSON.stringify(p.specifications) : null,
            features: p.features ? JSON.stringify(p.features) : null
          }
        })
      }
      products = await db.product.findMany({
        orderBy: { createdAt: 'desc' }
      })
    }

    // Parse JSON specs and features
    const parsedProducts = products.map((p) => ({
      ...p,
      specifications: p.specifications ? JSON.parse(p.specifications) : [],
      features: p.features ? JSON.parse(p.features) : []
    }))

    return NextResponse.json({ products: parsedProducts })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const body = await req.json()
    const { name, category, price, shortDescription, description, image, specifications, features } = body

    if (!name || !category || price === undefined || !shortDescription || !description || !image) {
      return NextResponse.json(
        { error: 'Name, category, price, short description, description, and image URL are required' },
        { status: 400 }
      )
    }

    // Generate unique slug
    let baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (!baseSlug) baseSlug = `product-${Date.now()}`
    
    let slug = baseSlug
    const existing = await db.product.findUnique({ where: { slug } })
    if (existing) {
      slug = `${baseSlug}-${Date.now().toString().slice(-4)}`
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        category,
        price: parseFloat(price.toString()),
        shortDescription,
        description,
        image,
        specifications: Array.isArray(specifications) ? JSON.stringify(specifications) : specifications || null,
        features: Array.isArray(features) ? JSON.stringify(features) : features || null
      }
    })

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        specifications: product.specifications ? JSON.parse(product.specifications) : [],
        features: product.features ? JSON.parse(product.features) : []
      }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
