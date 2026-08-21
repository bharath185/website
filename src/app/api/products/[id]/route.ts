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
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    let parsedImages: string[] = []
    if (product.images) {
      try {
        parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images
      } catch {
        parsedImages = []
      }
    }
    if (!Array.isArray(parsedImages) || parsedImages.length === 0) {
      parsedImages = product.image ? [product.image] : []
    }

    return NextResponse.json({
      product: {
        ...product,
        image: parsedImages[0] || product.image || '',
        images: parsedImages,
        specifications: typeof product.specifications === 'string' ? JSON.parse(product.specifications) : (product.specifications || []),
        features: typeof product.features === 'string' ? JSON.parse(product.features) : (product.features || [])
      }
    })
  } catch (error) {
    console.error('Error fetching product:', error)
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
    const { name, category, price, shortDescription, description, image, images, specifications, features, tag } = body

    const updateData: Record<string, any> = {}
    if (name) updateData.name = name
    if (category) updateData.category = category
    if (price !== undefined) updateData.price = parseFloat(price.toString())
    if (shortDescription) updateData.shortDescription = shortDescription
    if (description) updateData.description = description
    if (tag !== undefined) updateData.tag = tag || null

    if (images !== undefined && Array.isArray(images)) {
      const filteredImages = images.filter(Boolean)
      updateData.images = JSON.stringify(filteredImages)
      updateData.image = filteredImages[0] || image || ''
    } else if (image) {
      updateData.image = image
      updateData.images = JSON.stringify([image])
    }

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
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    let parsedImages: string[] = []
    if (updatedProduct.images) {
      try {
        parsedImages = typeof updatedProduct.images === 'string' ? JSON.parse(updatedProduct.images) : updatedProduct.images
      } catch {
        parsedImages = []
      }
    }
    if (!Array.isArray(parsedImages) || parsedImages.length === 0) {
      parsedImages = updatedProduct.image ? [updatedProduct.image] : []
    }

    return NextResponse.json({
      success: true,
      product: {
        ...updatedProduct,
        image: parsedImages[0] || updatedProduct.image || '',
        images: parsedImages,
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
