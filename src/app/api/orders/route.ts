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
                         'name', oi.name,
                         'price', oi.price,
                         'quantity', oi.quantity,
                         'image', oi.image
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
                         'name', oi.name,
                         'price', oi.price,
                         'quantity', oi.quantity,
                         'image', oi.image
                       )
                     ) FILTER (WHERE oi.id IS NOT NULL), '[]'
                   ) as items
            FROM "Order" o
            LEFT JOIN "OrderItem" oi ON o.id = oi."orderId"
            WHERE o."userId" = $1
            GROUP BY o.id
            ORDER BY o."createdAt" DESC;
          `
          params = [user.id]
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
