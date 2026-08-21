import { NextResponse } from 'next/server'
import { getPgClient } from '@/lib/pg-products'
import { getSessionUser } from '@/lib/auth'

export async function GET() {
  try {
    let posts: any[] = []
    try {
      const client = await getPgClient()
      try {
        const res = await client.query('SELECT * FROM "UpdatePost" ORDER BY date DESC;')
        posts = res.rows
      } finally {
        await client.end().catch(() => {})
      }
    } catch (pgErr) {
      console.warn('Direct PG error in /api/updates:', pgErr)
    }

    if (posts.length === 0) {
      posts = [
        {
          id: '1',
          title: "How Hydro Static Spindles Improve Precision in High-Accuracy Machining",
          date: "2026-07-31",
          image: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
          slug: "how-hydro-static-spindles-improve-precision-in-high-accuracy-machining"
        },
        {
          id: '2',
          title: "Why Rotary Tables Are Essential for Multi-Axis Precision Machining",
          date: "2026-07-29",
          image: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
          slug: "why-rotary-tables-are-essential-for-multi-axis-precision-machining"
        },
        {
          id: '3',
          title: "How a Planetary Gear Box Improves Torque and Space Efficiency",
          date: "2026-07-27",
          image: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
          slug: "how-a-planetary-gear-box-improves-torque-and-space-efficiency"
        }
      ]
    }

    return NextResponse.json({ success: true, updates: posts })
  } catch (error) {
    console.error('Error fetching updates:', error)
    return NextResponse.json({ success: true, updates: [] })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, date, image, description, content } = body

    if (!title || !date || !image) {
      return NextResponse.json({ error: 'Title, date and image are required' }, { status: 400 })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const id = `upd-${Date.now()}`

    const client = await getPgClient()
    try {
      const query = `
        INSERT INTO "UpdatePost" (id, title, date, image, slug, description, content, "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING *;
      `
      const res = await client.query(query, [
        id,
        title,
        date,
        image,
        slug,
        description || '',
        content || ''
      ])

      return NextResponse.json({ success: true, update: res.rows[0] })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error) {
    console.error('Error creating update post:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
