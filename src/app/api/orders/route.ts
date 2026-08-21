import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSessionUser()
    let orders: any[] = []

    if (!user) {
      return NextResponse.json({ orders: [] })
    }

    try {
      const client = await getPgClient()
      try {
        let query = ''
        let params: any[] = []

        if (user.role === 'ADMIN') {
          query = `
            SELECT o.*, 
                   COALESCE(
                     json_agg(
                       json_build_object(
                         'id', oi.id,
                         'orderId', oi."orderId",
                         'productId', oi."productId",
                         'name', oi."productName",
                         'productName', oi."productName",
                         'price', oi.price,
                         'quantity', oi.quantity
                       )
                     ) FILTER (WHERE oi.id IS NOT NULL), '[]'
                   ) as items
            FROM "Order" o
            LEFT JOIN "OrderItem" oi ON o.id = oi."orderId"
            GROUP BY o.id
            ORDER BY o."createdAt" DESC;
          `
        } else {
          query = `
            SELECT o.*, 
                   COALESCE(
                     json_agg(
                       json_build_object(
                         'id', oi.id,
                         'orderId', oi."orderId",
                         'productId', oi."productId",
                         'name', oi."productName",
                         'productName', oi."productName",
                         'price', oi.price,
                         'quantity', oi.quantity
                       )
                     ) FILTER (WHERE oi.id IS NOT NULL), '[]'
                   ) as items
            FROM "Order" o
            LEFT JOIN "OrderItem" oi ON o.id = oi."orderId"
            WHERE o."userId" = $1 OR (o."shippingAddress" ILIKE $2 AND $2 != '')
            GROUP BY o.id
            ORDER BY o."createdAt" DESC;
          `
          params = [user.id, user.email ? `%${user.email}%` : '']
        }

        const res = await client.query(query, params)
        orders = res.rows.map((r: any) => ({
          ...r,
          items: Array.isArray(r.items) ? r.items : (typeof r.items === 'string' ? JSON.parse(r.items) : [])
        }))

        return NextResponse.json({ orders })
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG orders fetch error, trying Prisma fallback:', pgErr)
    }

    try {
      if (user.role === 'ADMIN') {
        orders = await db.order.findMany({
          orderBy: { createdAt: 'desc' },
          include: {
            items: true,
            user: {
              select: { name: true, email: true, phone: true }
            }
          }
        })
      } else {
        orders = await db.order.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          include: {
            items: true
          }
        })
      }
    } catch {
      // Prisma fallback error
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ orders: [] })
  }
}

// POST /api/orders
// Submit order or quotation request directly into PostgreSQL database
export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUser()
    const body = await req.json()
    const { items, name, email, phone, notes, shippingAddress, contactPhone } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Order items are required' }, { status: 400 })
    }

    let targetUserId: string | null = sessionUser?.id || null

    // If not authenticated in session, check if email corresponds to a registered account in DB
    const client = await getPgClient()
    try {
      if (!targetUserId && email) {
        const userCheck = await client.query('SELECT id FROM "User" WHERE email = $1 LIMIT 1;', [email.trim().toLowerCase()])
        if (userCheck.rows.length > 0) {
          targetUserId = userCheck.rows[0].id
        }
      }

      if (!targetUserId || targetUserId.startsWith('guest-')) {
        targetUserId = null
      }

      const dbOrderId = `BMT-ORD-${Date.now().toString().slice(-6)}`
      const finalShippingAddress = shippingAddress || `${name || 'Valued Customer'}, ${email || ''} - ${notes || 'Direct Order Request'}`
      const finalContactPhone = contactPhone || phone || sessionUser?.phone || '+91 95302 08882'

      await client.query('BEGIN;')

      const orderQuery = `
        INSERT INTO "Order" (
          id, "userId", "totalAmount", status, "paymentStatus",
          "razorpayOrderId", "razorpayPaymentId", "shippingAddress", "contactPhone",
          "adminNotes", "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        RETURNING *;
      `
      const orderRes = await client.query(orderQuery, [
        dbOrderId,
        targetUserId,
        0,
        'PENDING',
        'PENDING',
        null,
        null,
        finalShippingAddress,
        finalContactPhone,
        notes || null
      ])

      const orderItemsData: any[] = []
      for (const it of items) {
        const itemId = `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
        const prodId = it.productId || it.product?.id || 'prod-1'
        const prodName = it.productName || it.product?.name || 'Machine Tool Unit'
        const quantity = it.quantity || 1
        const price = it.price || 0

        const itemQuery = `
          INSERT INTO "OrderItem" (
            id, "orderId", "productId", "productName", quantity, price
          ) VALUES ($1, $2, $3, $4, $5, $6);
        `
        await client.query(itemQuery, [
          itemId,
          dbOrderId,
          prodId,
          prodName,
          quantity,
          price
        ])

        orderItemsData.push({
          id: itemId,
          orderId: dbOrderId,
          productId: prodId,
          name: prodName,
          productName: prodName,
          quantity,
          price
        })
      }

      await client.query('COMMIT;')

      const createdOrder = {
        ...orderRes.rows[0],
        items: orderItemsData
      }

      return NextResponse.json({
        success: true,
        order: createdOrder,
        dbOrderId: createdOrder.id,
        message: 'Order placed successfully and recorded in database!'
      }, { status: 201 })

    } catch (dbErr) {
      await client.query('ROLLBACK;').catch(() => {})
      console.error('Database error creating order in POST /api/orders:', dbErr)
      return NextResponse.json({ error: 'Failed to record order in database' }, { status: 500 })
    } finally {
      await client.end().catch(() => {})
    }

  } catch (error) {
    console.error('Error in POST /api/orders:', error)
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 })
  }
}
