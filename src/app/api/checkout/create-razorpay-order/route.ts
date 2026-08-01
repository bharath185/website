import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { razorpay } from '@/lib/razorpay'

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Please log in to place an order' }, { status: 401 })
    }

    const { items, shippingAddress, contactPhone } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!shippingAddress || !contactPhone) {
      return NextResponse.json({ error: 'Shipping address and contact phone are required' }, { status: 400 })
    }

    let totalAmount = 0
    const orderItemsData = items.map((item: { product: { id: string; name: string; price?: number }; quantity: number }) => {
      const price = item.product.price || 10000
      const qty = item.quantity || 1
      totalAmount += price * qty
      return {
        productId: item.product.id,
        productName: item.product.name,
        quantity: qty,
        price: price
      }
    })

    const currency = 'INR'
    const amountInPaise = Math.round(totalAmount * 100)

    let razorpayOrderId = `order_mock_${Date.now()}`
    try {
      if (process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('sample')) {
        const razorpayOrder = await razorpay.orders.create({
          amount: amountInPaise,
          currency,
          receipt: `rcpt_${Date.now()}`,
          notes: {
            userId: user.id,
            userEmail: user.email
          }
        })
        razorpayOrderId = razorpayOrder.id
      }
    } catch (rzpError) {
      console.warn('Razorpay live order create fallback to test mode:', rzpError)
    }

    const order = await db.order.create({
      data: {
        userId: user.id,
        totalAmount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        razorpayOrderId,
        shippingAddress,
        contactPhone,
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: true
      }
    })

    return NextResponse.json({
      success: true,
      order,
      razorpayOrderId,
      amount: amountInPaise,
      currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_sample_key'
    })
  } catch (error) {
    console.error('Create Razorpay order error:', error)
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 })
  }
}
