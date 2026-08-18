import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/reviews
// Public: Fetch all APPROVED reviews for a product
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const reviews = await db.productReview.findMany({
      where: {
        productId,
        isApproved: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// POST /api/reviews
// Public: Submit a new product review (moderated by default)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { productId, name, email, rating, comment } = body

    // Validation
    if (!productId || !name || !email || rating === undefined || comment === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ratingVal = parseInt(rating, 10)
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 })
    }

    // Verify product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const review = await db.productReview.create({
      data: {
        productId,
        name,
        email,
        rating: ratingVal,
        comment,
        isApproved: false // Requires admin moderation
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully! It will appear once approved by our team.',
      review
    }, { status: 201 })

  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
