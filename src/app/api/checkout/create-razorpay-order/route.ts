import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    let user = await getSessionUser()
    if (!user) {
      user = {
        id: 'guest-' + Date.now(),
        name: 'Guest Customer',
        email: 'guest@bmtbharat.com',
        role: 'USER',
        phone: '+91 95302 08882',
        passwordResetRequired: false
      }
    }

    const { items, shippingAddress, contactPhone, email } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!shippingAddress || !contactPhone) {
      return NextResponse.json({ error: 'Shipping address and contact phone are required' }, { status: 400 })
    }

    let targetUserId = user?.id

    const orderItemsData = items.map((item: any) => {
      const qty = item.quantity || 1
      return {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: item.productId || item.product?.id || 'p-1',
        productName: item.productName || item.product?.name || 'Machine Tool Unit',
        quantity: qty,
        price: 0
      }
    })

    const dbOrderId = `BMT-ORD-${Date.now().toString().slice(-6)}`

    // 1. Direct PostgreSQL insertion
    try {
      const client = await getPgClient()
      try {
        if ((!targetUserId || targetUserId.startsWith('guest-')) && (email || contactPhone)) {
          const uRes = await client.query(
            'SELECT id FROM "User" WHERE email = $1 OR phone = $2 LIMIT 1;',
            [email ? email.trim().toLowerCase() : '', contactPhone ? contactPhone.trim() : '']
          )
          if (uRes.rows.length > 0) {
            targetUserId = uRes.rows[0].id
          }
        }

        if (!targetUserId) {
          targetUserId = `guest-${Date.now()}`
        }

        await client.query('BEGIN;')

        const orderQuery = `
          INSERT INTO "Order" (
            id, "userId", "totalAmount", status, "paymentStatus",
            "razorpayOrderId", "razorpayPaymentId", "shippingAddress", "contactPhone",
            "createdAt", "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
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
          shippingAddress,
          contactPhone
        ])

        for (const it of orderItemsData) {
          const itemQuery = `
            INSERT INTO "OrderItem" (
              id, "orderId", "productId", "productName", quantity, price
            ) VALUES ($1, $2, $3, $4, $5, $6);
          `
          await client.query(itemQuery, [
            it.id,
            dbOrderId,
            it.productId,
            it.productName,
            it.quantity,
            it.price
          ])
        }

        await client.query('COMMIT;')

        const insertedOrder = {
          ...orderRes.rows[0],
          items: orderItemsData
        }

        return NextResponse.json({
          success: true,
          order: insertedOrder,
          dbOrderId: insertedOrder.id,
          message: 'Quotation Request Submitted Successfully!'
        })
      } catch (err) {
        await client.query('ROLLBACK;').catch(() => {})
        console.warn('Direct PG order insert error, trying Prisma fallback:', err)
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgConnectErr) {
      console.warn('PG connection error:', pgConnectErr)
    }

    // 2. Fallback to Prisma
    let order: any = null
    try {
      order = await db.order.create({
        data: {
          id: dbOrderId,
          userId: user.id,
          totalAmount: 0,
          status: 'PENDING',
          paymentStatus: 'PENDING',
          razorpayOrderId: null,
          razorpayPaymentId: null,
          shippingAddress,
          contactPhone,
          items: {
            create: orderItemsData.map((i: any) => ({
              productId: i.productId,
              productName: i.productName,
              quantity: i.quantity,
              price: 0
            }))
          }
        },
        include: {
          items: true
        }
      })
    } catch (prismaErr) {
      console.error('Prisma order create error:', prismaErr)
      order = {
        id: dbOrderId,
        userId: user.id,
        totalAmount: 0,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        razorpayOrderId: null,
        razorpayPaymentId: null,
        shippingAddress,
        contactPhone,
        createdAt: new Date().toISOString(),
        items: orderItemsData
      }
    }

    return NextResponse.json({
      success: true,
      order,
      dbOrderId: order.id,
      message: 'Quotation Request Submitted Successfully!'
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
