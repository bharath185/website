import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'

export const dynamic = 'force-dynamic'

// GET /api/jobs
// Public: Returns all active jobs (or all jobs if requested by authenticated Admin)
export async function GET(req: Request) {
  try {
    const user = await getSessionUser()
    const isAdmin = user && user.role === 'ADMIN'

    const { searchParams } = new URL(req.url)
    const showAll = searchParams.get('all') === 'true'

    const client = await getPgClient()
    try {
      let query = 'SELECT * FROM "Job"'
      const params: any[] = []

      if (!isAdmin || !showAll) {
        query += ' WHERE "isActive" = true'
      }

      query += ' ORDER BY "createdAt" DESC;'

      const res = await client.query(query, params)
      return NextResponse.json(res.rows)
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: error?.message || 'Failed to fetch jobs' }, { status: 500 })
  }
}

// POST /api/jobs
// Admin Only: Creates a new job posting
export async function POST(req: Request) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const body = await req.json()
    const { title, department, location, type, description, requirements } = body

    if (!title || !department || !location || !type || !description || !requirements) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const client = await getPgClient()
    try {
      // Ensure Job table exists
      await client.query(`
        CREATE TABLE IF NOT EXISTS "Job" (
          "id" TEXT PRIMARY KEY,
          "title" TEXT NOT NULL,
          "department" TEXT NOT NULL,
          "location" TEXT NOT NULL,
          "type" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "requirements" TEXT NOT NULL,
          "isActive" BOOLEAN DEFAULT true,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      const id = `job-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
      const res = await client.query(`
        INSERT INTO "Job" ("id", "title", "department", "location", "type", "description", "requirements", "isActive", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING *;
      `, [id, title.trim(), department.trim(), location.trim(), type.trim(), description.trim(), requirements.trim(), true])

      return NextResponse.json(res.rows[0], { status: 201 })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: error?.message || 'Failed to create job posting' }, { status: 500 })
  }
}
