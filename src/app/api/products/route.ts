import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getAllProducts, addProduct } from '@/lib/products-store'

export async function GET() {
  try {
    const products = await getAllProducts()
    return NextResponse.json({ products })
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

    const createdProduct = await addProduct({
      name,
      category,
      price: parseFloat(price.toString()),
      shortDescription,
      description,
      image: primaryImage,
      images: imagesList,
      specifications: Array.isArray(specifications) ? specifications : (typeof specifications === 'string' ? JSON.parse(specifications) : ["High Precision", "Bangalore Made"]),
      features: Array.isArray(features) ? features : (typeof features === 'string' ? JSON.parse(features) : ["Engineered for high durability & precision"]),
      tag: tag || null
    })

    return NextResponse.json({
      success: true,
      product: createdProduct
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
