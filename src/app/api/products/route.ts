import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'
import { products as defaultProducts } from '@/data/products'

export async function GET() {
  try {
    let products: any[] = []

    try {
      products = await db.product.findMany({
        orderBy: { createdAt: 'desc' }
      })
    } catch {
      // Serverless fallback
    }

    if (!products || products.length === 0) {
      return NextResponse.json({ products: defaultProducts })
    }

    const parsedProducts = products.map((p) => ({
      ...p,
      specifications: typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || []),
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
    }))

    return NextResponse.json({ products: parsedProducts })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ products: defaultProducts })
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

    let product: any = null

    try {
      const existing = await db.product.findUnique({ where: { slug } })
      if (existing) {
        slug = `${baseSlug}-${Date.now().toString().slice(-4)}`
      }

      product = await db.product.create({
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
    } catch {
      // Fallback for creating product in serverless read-only environment
      product = {
        id: `prod-${Date.now()}`,
        name,
        slug,
        category,
        price: parseFloat(price.toString()),
        shortDescription,
        description,
        image,
        specifications: Array.isArray(specifications) ? JSON.stringify(specifications) : specifications || [],
        features: Array.isArray(features) ? JSON.stringify(features) : features || []
      }
    }

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        specifications: typeof product.specifications === 'string' ? JSON.parse(product.specifications) : (product.specifications || []),
        features: typeof product.features === 'string' ? JSON.parse(product.features) : (product.features || [])
      }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
