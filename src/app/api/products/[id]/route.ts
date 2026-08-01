import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    let product = await db.product.findUnique({
      where: { id }
    })

    if (!product) {
      product = await db.product.findUnique({
        where: { slug: id }
      })
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({
      product: {
        ...product,
        specifications: product.specifications ? JSON.parse(product.specifications) : [],
        features: product.features ? JSON.parse(product.features) : []
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
    const { name, category, price, shortDescription, description, image, specifications, features } = body

    const updateData: Record<string, unknown> = {}
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

    const updatedProduct = await db.product.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      product: {
        ...updatedProduct,
        specifications: updatedProduct.specifications ? JSON.parse(updatedProduct.specifications) : [],
        features: updatedProduct.features ? JSON.parse(updatedProduct.features) : []
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

    await db.product.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
