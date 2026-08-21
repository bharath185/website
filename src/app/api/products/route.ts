import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'
import { products as defaultProducts } from '@/data/products'

export async function GET() {
  try {
    let products: any[] = []
    try {
      products = await db.product.findMany({
        include: {
          reviews: {
            where: { isApproved: true },
            select: { rating: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } catch (dbErr) {
      console.error('Failed to query products from DB:', dbErr)
    }

    const parsedProducts = products.map((p) => {
      const parsedSpec = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || [])
      const parsedFeat = typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
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
        ...p,
        image: parsedImages[0] || p.image || '',
        images: parsedImages,
        specifications: parsedSpec,
        features: parsedFeat,
        reviews: p.reviews || []
      }
    })

    return NextResponse.json({ products: parsedProducts })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ products: [] })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const body = await req.json()
    const { name, category, price, shortDescription, description, image, images, specifications, features, tag } = body

    // Normalize images array
    let imagesList: string[] = []
    if (Array.isArray(images) && images.length > 0) {
      imagesList = images.filter(Boolean)
    } else if (image) {
      imagesList = [image]
    }

    const primaryImage = imagesList[0] || image

    if (!name || !category || price === undefined || !shortDescription || !description || !primaryImage) {
      return NextResponse.json(
        { error: 'Name, category, price, short description, description, and at least one image are required' },
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
          image: primaryImage,
          images: JSON.stringify(imagesList),
          specifications: Array.isArray(specifications) ? JSON.stringify(specifications) : specifications || null,
          features: Array.isArray(features) ? JSON.stringify(features) : features || null,
          tag: tag || null
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
        image: primaryImage,
        images: JSON.stringify(imagesList),
        specifications: Array.isArray(specifications) ? JSON.stringify(specifications) : specifications || [],
        features: Array.isArray(features) ? JSON.stringify(features) : features || [],
        tag: tag || null
      }
    }

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        image: primaryImage,
        images: imagesList,
        specifications: typeof product.specifications === 'string' ? JSON.parse(product.specifications) : (product.specifications || []),
        features: typeof product.features === 'string' ? JSON.parse(product.features) : (product.features || [])
      }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
