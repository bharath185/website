import { NextResponse } from 'next/server'
import { getPgClient } from '@/lib/pg-products'
import { getProductByIdOrSlug } from '@/lib/products-store'
import { db } from '@/lib/db'

// Helper: Group reviews by customer, take latest review, and calculate purchase/review count
function groupReviewsByCustomer(rawReviews: any[]) {
  const userMap = new Map<string, { latestReview: any; purchaseCount: number }>()

  for (const rev of rawReviews) {
    const key = (rev.email || rev.name || rev.id).toLowerCase().trim()
    if (!userMap.has(key)) {
      userMap.set(key, {
        latestReview: rev,
        purchaseCount: 1
      })
    } else {
      const entry = userMap.get(key)!
      entry.purchaseCount += 1
      if (new Date(rev.createdAt) > new Date(entry.latestReview.createdAt)) {
        entry.latestReview = rev
      }
    }
  }

  return Array.from(userMap.values()).map(({ latestReview, purchaseCount }) => ({
    ...latestReview,
    purchaseCount
  }))
}

// GET /api/reviews
// Public: Fetch all APPROVED reviews for a product (deduplicated by customer with purchase count)
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
        const deduplicated = groupReviewsByCustomer(res.rows)
        return NextResponse.json(deduplicated)
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

    const deduplicated = groupReviewsByCustomer(reviews)
    return NextResponse.json(deduplicated)
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

    if (!productId || !name || !email || rating === undefined || comment === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const numRating = Number(rating)
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const cleanComment = (comment || '').trim()
    if (!cleanComment) {
      return NextResponse.json({ error: 'Feedback comment is required' }, { status: 400 })
    }

    const reviewId = `rev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`

    try {
      const client = await getPgClient()
      try {
        const query = `
          INSERT INTO "ProductReview" (id, "productId", name, email, rating, comment, "isApproved", "createdAt")
          VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
          RETURNING *;
        `
        const res = await client.query(query, [
          reviewId,
          productId,
          name.trim(),
          email.trim().toLowerCase(),
          numRating,
          cleanComment,
          true
        ])

        return NextResponse.json({
          success: true,
          review: res.rows[0],
          message: 'Review submitted successfully!'
        })
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG review insert failed, trying Prisma fallback:', pgErr)
    }

    const review = await db.productReview.create({
      data: {
        productId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        rating: numRating,
        comment: cleanComment,
        isApproved: true
      }
    })

    return NextResponse.json({
      success: true,
      review,
      message: 'Review submitted successfully!'
    })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
