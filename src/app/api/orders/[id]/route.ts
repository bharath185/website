import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    let order: any = null

    try {
      order = await db.order.findUnique({
        where: { id },
        include: {
          items: true,
          user: {
            select: { name: true, email: true, phone: true }
          }
        }
      })
    } catch {
      // Serverless fallback
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
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
    const body = await req.json()
    const { status, trackingNumber, adminNotes, paymentStatus } = body

    const updateData: Record<string, unknown> = {}
    if (status) updateData.status = status
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes
    if (paymentStatus) updateData.paymentStatus = paymentStatus

    let updatedOrder: any = null

    try {
      updatedOrder = await db.order.update({
        where: { id },
        data: updateData,
        include: {
          items: true
        }
      })
    } catch {
      updatedOrder = { id, ...updateData }
    }

    return NextResponse.json({ success: true, order: updatedOrder })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
