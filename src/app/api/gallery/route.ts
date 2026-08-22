import { NextResponse } from 'next/server'
import { getPgClient } from '@/lib/pg-products'

export const dynamic = 'force-dynamic'

// GET /api/gallery
// Fetch all admin-uploaded gallery images
export async function GET() {
  try {
    const client = await getPgClient()
    try {
      const res = await client.query(`
        SELECT * FROM "GalleryImage"
        ORDER BY "createdAt" DESC;
      `)
      return NextResponse.json({ success: true, images: res.rows })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to fetch gallery images' }, { status: 500 })
  }
}

// POST /api/gallery
// Add new image(s) to gallery
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url, urls } = body

    const imagesToAdd: string[] = []
    if (url && typeof url === 'string' && url.trim()) {
      imagesToAdd.push(url.trim())
    }
    if (urls && Array.isArray(urls)) {
      urls.forEach((u) => {
        if (typeof u === 'string' && u.trim() && !imagesToAdd.includes(u.trim())) {
          imagesToAdd.push(u.trim())
        }
      })
    }

    if (imagesToAdd.length === 0) {
      return NextResponse.json({ error: 'Please provide at least one valid image URL' }, { status: 400 })
    }

    const client = await getPgClient()
    try {
      const addedRows = []
      for (const imgUrl of imagesToAdd) {
        const id = `gal-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
        const res = await client.query(
          `INSERT INTO "GalleryImage" ("id", "url", "createdAt") VALUES ($1, $2, NOW()) RETURNING *;`,
          [id, imgUrl]
        )
        addedRows.push(res.rows[0])
      }
      return NextResponse.json({ success: true, images: addedRows })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error adding gallery image:', error)
    return NextResponse.json({ error: error?.message || 'Failed to add gallery image' }, { status: 500 })
  }
}

// DELETE /api/gallery?id=...
// Remove an image from gallery
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    const client = await getPgClient()
    try {
      await client.query(`DELETE FROM "GalleryImage" WHERE "id" = $1;`, [id])
      return NextResponse.json({ success: true, message: 'Image deleted successfully' })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json({ error: error?.message || 'Failed to delete gallery image' }, { status: 500 })
  }
}
