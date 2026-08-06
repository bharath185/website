import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const user = await getSessionUser()
    let orders: any[] = []

    try {
      if (user && user.role === 'ADMIN') {
        orders = await db.order.findMany({
          orderBy: { createdAt: 'desc' },
          include: {
            items: true,
            user: {
              select: { name: true, email: true, phone: true }
            }
          }
        })
      } else if (user) {
        orders = await db.order.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: 'desc' },
          include: {
            items: true
          }
        })
      }
    } catch {
      // Serverless SQLite read-only fallback
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ orders: [] })
  }
}
