import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'
import { db } from '@/lib/db'

// GET /api/admin/reviews
// Admin Only: Fetch all reviews for moderation
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    try {
      const client = await getPgClient()
      try {
        const query = `
          SELECT r.*, p.name as "productName", p.slug as "productSlug"
          FROM "ProductReview" r
          LEFT JOIN "Product" p ON r."productId" = p.id
          ORDER BY r."createdAt" DESC;
        `
        const res = await client.query(query)
        const formatted = res.rows.map((row: any) => ({
          ...row,
          product: row.productName ? { name: row.productName, slug: row.productSlug } : null
        }))
        return NextResponse.json(formatted)
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG admin reviews fetch error, trying Prisma fallback:', pgErr)
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

    try {
      const client = await getPgClient()
      try {
        const res = await client.query(
          'UPDATE "ProductReview" SET "isApproved" = $1 WHERE id = $2 RETURNING *;',
          [!!isApproved, id]
        )
        if (res.rows.length > 0) {
          return NextResponse.json(res.rows[0])
        }
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG review moderation error, trying Prisma fallback:', pgErr)
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
// Admin Only: Delete a review permanently
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

    try {
      const client = await getPgClient()
      try {
        await client.query('DELETE FROM "ProductReview" WHERE id = $1;', [id])
        return NextResponse.json({ success: true, message: 'Review deleted' })
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG review delete error, trying Prisma fallback:', pgErr)
    }

    await db.productReview.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Review deleted' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
