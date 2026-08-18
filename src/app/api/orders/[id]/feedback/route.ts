import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/orders/[id]/feedback
// Submit overall feedback & rating for a specific order
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { overallRating, overallFeedback } = body

    if (overallRating === undefined || !overallFeedback) {
      return NextResponse.json({ error: 'Rating and feedback are required' }, { status: 400 })
    }

    const ratingVal = parseInt(overallRating, 10)
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 })
    }

    // Verify order exists
    const order = await db.order.findUnique({
      where: { id }
    })
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const updatedOrder = await db.order.update({
      where: { id },
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
