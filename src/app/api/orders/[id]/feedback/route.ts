import { NextResponse } from 'next/server'
import { getPgClient } from '@/lib/pg-products'
import { db } from '@/lib/db'

// POST /api/orders/[id]/feedback
// Submit overall feedback & rating for a specific order
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const decodedId = decodeURIComponent(id)
    const body = await req.json()
    const { overallRating, overallFeedback } = body

    if (overallRating === undefined || !overallFeedback) {
      return NextResponse.json({ error: 'Rating and feedback are required' }, { status: 400 })
    }

    const ratingVal = parseInt(overallRating, 10)
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 })
    }

    // Direct PostgreSQL update
    try {
      const client = await getPgClient()
      try {
        const query = `
          UPDATE "Order"
          SET "overallRating" = $1, "overallFeedback" = $2, "updatedAt" = NOW()
          WHERE id = $3
          RETURNING *;
        `
        const res = await client.query(query, [ratingVal, overallFeedback, decodedId])
        if (res.rows.length > 0) {
          return NextResponse.json({
            success: true,
            message: 'Thank you for your overall order feedback!',
            order: res.rows[0]
          })
        }
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG feedback update error, trying Prisma fallback:', pgErr)
    }

    // Fallback to Prisma
    const updatedOrder = await db.order.update({
      where: { id: decodedId },
      data: {
        overallRating: ratingVal,
        overallFeedback
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your overall order feedback!',
      order: updatedOrder
    })

  } catch (error) {
    console.error('Error submitting order feedback:', error)
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}
