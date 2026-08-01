import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (user.role === 'ADMIN') {
      const orders = await db.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
          user: {
            select: { name: true, email: true, phone: true }
          }
        }
      })
      return NextResponse.json({ orders })
    } else {
      const orders = await db.order.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
          items: true
        }
      })
      return NextResponse.json({ orders })
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
