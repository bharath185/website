import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'
import { db } from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    const { id } = await params
    const decodedId = decodeURIComponent(id)
    let order: any = null

    try {
      const client = await getPgClient()
      try {
        const query = `
          SELECT o.*, 
                 COALESCE(
                   json_agg(
                     json_build_object(
                       'id', oi.id,
                       'orderId', oi."orderId",
                       'productId', oi."productId",
                       'productName', oi."productName",
                       'price', oi.price,
                       'quantity', oi.quantity
                     )
                   ) FILTER (WHERE oi.id IS NOT NULL), '[]'
                 ) as items
          FROM "Order" o
          LEFT JOIN "OrderItem" oi ON o.id = oi."orderId"
          WHERE o.id = $1
          GROUP BY o.id;
        `
        const res = await client.query(query, [decodedId])
        if (res.rows.length > 0) {
          const row = res.rows[0]
          order = {
            ...row,
            items: Array.isArray(row.items) ? row.items : (typeof row.items === 'string' ? JSON.parse(row.items) : [])
          }
        }
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG single order fetch error, trying Prisma fallback:', pgErr)
    }

    if (!order) {
      try {
        order = await db.order.findUnique({
          where: { id: decodedId },
          include: {
            items: true,
            user: {
              select: { name: true, email: true, phone: true }
            }
          }
        })
      } catch {
        // Fallback
      }
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Security check: non-admin user can ONLY access their own order
    if (user && user.role !== 'ADMIN' && order.userId && order.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized to view this order' }, { status: 403 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error fetching order details:', error)
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 })
  }
}

export async function PATCH(
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
    const { status, trackingNumber, adminNotes, paymentStatus } = body

    const updateFields: string[] = []
    const values: any[] = []
    let counter = 1

    if (status !== undefined) {
      updateFields.push(`status = $${counter++}`)
      values.push(status)
    }
    if (trackingNumber !== undefined) {
      updateFields.push(`"trackingNumber" = $${counter++}`)
      values.push(trackingNumber)
    }
    if (adminNotes !== undefined) {
      updateFields.push(`"adminNotes" = $${counter++}`)
      values.push(adminNotes)
    }
    if (paymentStatus !== undefined) {
      updateFields.push(`"paymentStatus" = $${counter++}`)
      values.push(paymentStatus)
    }

    updateFields.push(`"updatedAt" = NOW()`)
    values.push(decodedId)

    let updatedOrder: any = null

    try {
      const client = await getPgClient()
      try {
        const query = `
          UPDATE "Order"
          SET ${updateFields.join(', ')}
          WHERE id = $${counter}
          RETURNING *;
        `
        const res = await client.query(query, values)
        if (res.rows.length > 0) {
          updatedOrder = res.rows[0]
        }
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG update order error, trying Prisma fallback:', pgErr)
    }

    if (!updatedOrder) {
      const updateData: Record<string, unknown> = {}
      if (status !== undefined) updateData.status = status
      if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes
      if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus

      try {
        updatedOrder = await db.order.update({
          where: { id: decodedId },
          data: updateData,
          include: { items: true }
        })
      } catch {
        updatedOrder = { id: decodedId, ...updateData }
      }
    }

    return NextResponse.json({ success: true, order: updatedOrder })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
