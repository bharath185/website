import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getProductByIdOrSlug, updateProduct, deleteProduct } from '@/lib/products-store'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const decodedId = decodeURIComponent(id)
    const product = await getProductByIdOrSlug(decodedId)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
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
    const decodedId = decodeURIComponent(id)
    const body = await req.json()
    const { name, category, price, shortDescription, description, image, images, specifications, features, tag } = body

    const updateData: Record<string, any> = {}
    if (name !== undefined) updateData.name = name
    if (category !== undefined) updateData.category = category
    if (price !== undefined && price !== null && price !== '') {
      const parsedPrice = parseFloat(price.toString())
      updateData.price = !isNaN(parsedPrice) ? parsedPrice : 0
    }
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription
    if (description !== undefined) updateData.description = description
    if (tag !== undefined) updateData.tag = tag || null
    if (image !== undefined) updateData.image = image
    if (images !== undefined && Array.isArray(images)) {
      updateData.images = images.filter(Boolean)
      if (updateData.images.length > 0) {
        updateData.image = updateData.images[0]
      }
    }
    if (specifications !== undefined) {
      updateData.specifications = Array.isArray(specifications) ? specifications : (typeof specifications === 'string' ? JSON.parse(specifications) : specifications)
    }
    if (features !== undefined) {
      updateData.features = Array.isArray(features) ? features : (typeof features === 'string' ? JSON.parse(features) : features)
    }

    const updated = await updateProduct(decodedId, updateData)

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      product: updated
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
    const decodedId = decodeURIComponent(id)
    const deleted = await deleteProduct(decodedId)

    if (!deleted) {
      return NextResponse.json({ error: 'Product not found or already deleted' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Product permanently deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
