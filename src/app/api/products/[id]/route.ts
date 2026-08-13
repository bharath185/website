import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'
import { products as defaultProducts } from '@/data/products'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    let product: any = null

    try {
      product = await db.product.findUnique({
        where: { id }
      })

      if (!product) {
        product = await db.product.findUnique({
          where: { slug: id }
        })
      }
    } catch {
      // Serverless fallback
    }

    if (!product) {
      product = defaultProducts.find((p) => p.id === id || p.slug === id)
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({
      product: {
        ...product,
        specifications: typeof product.specifications === 'string' ? JSON.parse(product.specifications) : (product.specifications || []),
        features: typeof product.features === 'string' ? JSON.parse(product.features) : (product.features || [])
      }
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    const { id } = await params
    const fallback = defaultProducts.find((p) => p.id === id || p.slug === id)
    if (fallback) {
      return NextResponse.json({ product: fallback })
    }
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()
    const { name, category, price, shortDescription, description, image, specifications, features } = body

    const updateData: Record<string, any> = {}
    if (name) updateData.name = name
    if (category) updateData.category = category
    if (price !== undefined) updateData.price = parseFloat(price.toString())
    if (shortDescription) updateData.shortDescription = shortDescription
    if (description) updateData.description = description
    if (image) updateData.image = image
    if (specifications !== undefined) {
      updateData.specifications = Array.isArray(specifications) ? JSON.stringify(specifications) : specifications
    }
    if (features !== undefined) {
      updateData.features = Array.isArray(features) ? JSON.stringify(features) : features
    }

    let existingProduct: any = null
    try {
      // 1. Try to find the product in DB by ID
      existingProduct = await db.product.findUnique({
        where: { id }
      })
      
      // 2. Try by slug if not found by ID
      if (!existingProduct) {
        existingProduct = await db.product.findUnique({
          where: { slug: id }
        })
      }
    } catch (e) {
      console.warn("DB connection warning during fetch in PUT:", e)
    }

    let updatedProduct: any = null

    if (existingProduct) {
      // Product exists in DB, update it using its actual DB primary key (existingProduct.id)
      updatedProduct = await db.product.update({
        where: { id: existingProduct.id },
        data: updateData
      })
    } else {
      // Product does NOT exist in DB yet. It's in the defaultProducts fallback list.
      // We must retrieve the default details to fill in any missing fields, and INSERT it!
      const fallback = defaultProducts.find((p) => p.id === id || p.slug === id)
      if (!fallback) {
        return NextResponse.json({ error: 'Product not found in database or catalog fallbacks' }, { status: 404 })
      }

      // Prepare complete product details for creation
      const createData = {
        id: fallback.id, // preserve the existing id (e.g. "straightening-machine-rollers")
        name: name || fallback.name,
        slug: fallback.slug,
        category: category || fallback.category,
        price: price !== undefined ? parseFloat(price.toString()) : (fallback.price || 10000),
        shortDescription: shortDescription || fallback.shortDescription,
        description: description || fallback.description,
        image: image || fallback.image,
        specifications: specifications !== undefined
          ? (Array.isArray(specifications) ? JSON.stringify(specifications) : specifications)
          : (fallback.specifications ? JSON.stringify(fallback.specifications) : null),
        features: features !== undefined
          ? (Array.isArray(features) ? JSON.stringify(features) : features)
          : (fallback.features ? JSON.stringify(fallback.features) : null),
      }

      updatedProduct = await db.product.create({
        data: createData
      })
    }

    return NextResponse.json({
      success: true,
      product: {
        ...updatedProduct,
        specifications: typeof updatedProduct.specifications === 'string' ? JSON.parse(updatedProduct.specifications) : (updatedProduct.specifications || []),
        features: typeof updatedProduct.features === 'string' ? JSON.parse(updatedProduct.features) : (updatedProduct.features || [])
      }
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const { id } = await params

    try {
      await db.product.delete({
        where: { id }
      })
      return NextResponse.json({ success: true, message: 'Product deleted successfully' })
    } catch (e) {
      console.error('Prisma error deleting product:', e)
      return NextResponse.json({ error: 'Failed to delete product from database' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
