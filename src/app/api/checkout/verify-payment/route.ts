import { NextResponse } from 'next/server'
import { getPgClient } from '@/lib/pg-products'
import { db } from '@/lib/db'
import { verifyRazorpaySignature } from '@/lib/razorpay'

export async function POST(req: Request) {
  try {
    const { orderDbId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!orderDbId || !razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json({ error: 'Missing payment verification details' }, { status: 400 })
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature || 'mock_signature'
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    try {
      const client = await getPgClient()
      try {
        const query = `
          UPDATE "Order"
          SET status = 'PAID', "paymentStatus" = 'PAID', "razorpayPaymentId" = $1, "razorpayOrderId" = $2, "updatedAt" = NOW()
          WHERE id = $3
          RETURNING *;
        `
        const res = await client.query(query, [razorpay_payment_id, razorpay_order_id, orderDbId])
        if (res.rows.length > 0) {
          return NextResponse.json({
            success: true,
            order: res.rows[0]
          })
        }
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG verify payment error, trying Prisma fallback:', pgErr)
    }

    const updatedOrder = await db.order.update({
      where: { id: orderDbId },
      data: {
        status: 'PAID',
        paymentStatus: 'PAID',
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id
      },
      include: {
        items: true
      }
    })

    return NextResponse.json({
      success: true,
      order: updatedOrder
    })
  } catch (error) {
    console.error('Verify payment error:', error)
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 })
  }
}
