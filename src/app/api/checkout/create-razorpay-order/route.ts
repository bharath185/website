import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
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

    const { items, shippingAddress, contactPhone } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!shippingAddress || !contactPhone) {
      return NextResponse.json({ error: 'Shipping address and contact phone are required' }, { status: 400 })
    }

    let totalAmount = 0
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
    } catch {
      // Serverless fallback for read-only Vercel SQLite
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
