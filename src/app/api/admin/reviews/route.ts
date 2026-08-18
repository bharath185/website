import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/reviews
// Admin Only: Fetch all reviews (approved & unapproved) for moderation
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const reviews = await db.productReview.findMany({
      include: {
        product: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews for admin:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// PUT /api/admin/reviews
// Admin Only: Approve/moderate a review
export async function PUT(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const body = await req.json()
    const { id, isApproved } = body

    if (!id || isApproved === undefined) {
      return NextResponse.json({ error: 'Missing review ID or approval status' }, { status: 400 })
    }

    const updatedReview = await db.productReview.update({
      where: { id },
      data: { isApproved: !!isApproved }
    })

    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error('Error moderating review:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

// DELETE /api/admin/reviews
// Admin Only: Delete a review (spam)
export async function DELETE(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 })
    }

    await db.productReview.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
