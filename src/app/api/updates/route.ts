import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getSessionUser } from '@/lib/auth'

export async function GET() {
  try {
    let posts = await db.updatePost.findMany({
      orderBy: { date: 'desc' }
    })

    // Auto seed fallback updates if empty
    if (posts.length === 0) {
      const defaultUpdates = [
        {
          title: "How Hydro Static Spindles Improve Precision in High-Accuracy Machining",
          date: "2026-07-31",
          image: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
          slug: "how-hydro-static-spindles-improve-precision-in-high-accuracy-machining"
        },
        {
          title: "Why Rotary Tables Are Essential for Multi-Axis Precision Machining",
          date: "2026-07-29",
          image: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
          slug: "why-rotary-tables-are-essential-for-multi-axis-precision-machining"
        },
        {
          title: "How a Planetary Gear Box Improves Torque and Space Efficiency",
          date: "2026-07-27",
          image: "https://productimages.withfloats.com/tile/66b1c6074f7781d15f4e72db.jpg",
          slug: "how-a-planetary-gear-box-improves-torque-and-space-efficiency"
        }
      ]

      for (const post of defaultUpdates) {
        await db.updatePost.create({ data: post })
      }

      posts = await db.updatePost.findMany({
        orderBy: { date: 'desc' }
      })
    }

    return NextResponse.json({ success: true, updates: posts })
  } catch (error) {
    console.error('Error fetching updates:', error)
    const fallbackPosts = [
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
    return NextResponse.json({ success: true, updates: fallbackPosts })
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, date, image } = body

    if (!title || !date || !image) {
      return NextResponse.json({ error: 'Title, date and image are required' }, { status: 400 })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const post = await db.updatePost.create({
      data: {
        title,
        date,
        image,
        slug
      }
    })

    return NextResponse.json({ success: true, update: post })
  } catch (error) {
    console.error('Error creating update post:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
