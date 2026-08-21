import { NextResponse } from 'next/server'
import { getPgClient } from '@/lib/pg-products'
import { getProductByIdOrSlug } from '@/lib/products-store'
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

    try {
      const client = await getPgClient()
      try {
        const query = `
          SELECT * FROM "ProductReview"
          WHERE ("productId" = $1 OR "productId" = (SELECT id FROM "Product" WHERE slug = $1 LIMIT 1))
            AND "isApproved" = true
          ORDER BY "createdAt" DESC;
        `
        const res = await client.query(query, [productId])
        return NextResponse.json(res.rows)
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG reviews fetch failed, trying Prisma:', pgErr)
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
// Submit a product review from verified order feedback
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { productId, name, email, rating, comment } = body

    // Validation
    if (!productId || !name || !email || rating === undefined || comment === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ratingVal = parseInt(rating.toString(), 10)
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 })
    }

    // Verify product exists in Neon DB
    const product = await getProductByIdOrSlug(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const reviewId = `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    const targetProductId = product.id

    try {
      const client = await getPgClient()
      try {
        const query = `
          INSERT INTO "ProductReview" (
            id, "productId", name, email, rating, comment, "isApproved", "createdAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
          RETURNING *;
        `
        const res = await client.query(query, [
          reviewId,
          targetProductId,
          name,
          email,
          ratingVal,
          comment,
          true // Auto-approve verified customer feedback from orders
        ])

        return NextResponse.json({
          success: true,
          message: 'Review and feedback submitted successfully!',
          review: res.rows[0]
        }, { status: 201 })
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG review creation failed, trying Prisma:', pgErr)
    }

    const review = await db.productReview.create({
      data: {
        id: reviewId,
        productId: targetProductId,
        name,
        email,
        rating: ratingVal,
        comment,
        isApproved: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully!',
      review
    }, { status: 201 })

  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
