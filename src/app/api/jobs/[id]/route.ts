import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { getPgClient } from '@/lib/pg-products'

export const dynamic = 'force-dynamic'

// PUT /api/jobs/[id]
// Admin Only: Updates a job posting's details
export async function PUT(
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
    const { title, department, location, type, experienceLevel, description, highlights, requirements, isActive } = body

    const client = await getPgClient()
    try {
      // Check existing job
      const checkRes = await client.query('SELECT * FROM "Job" WHERE "id" = $1 LIMIT 1;', [id])
      if (checkRes.rows.length === 0) {
        return NextResponse.json({ error: 'Job posting not found' }, { status: 404 })
      }
      const existing = checkRes.rows[0]

      const updatedTitle = title !== undefined ? title : existing.title
      const updatedDept = department !== undefined ? department : existing.department
      const updatedLoc = location !== undefined ? location : existing.location
      const updatedType = type !== undefined ? type : existing.type
      const updatedExp = experienceLevel !== undefined ? experienceLevel : (existing.experienceLevel || '2+ Years')
      const updatedDesc = description !== undefined ? description : existing.description
      const updatedHighlights = highlights !== undefined 
        ? (Array.isArray(highlights) ? JSON.stringify(highlights) : highlights) 
        : existing.highlights
      const updatedReq = requirements !== undefined ? requirements : existing.requirements
      const updatedActive = isActive !== undefined ? isActive : existing.isActive

      const updateRes = await client.query(`
        UPDATE "Job"
        SET "title" = $1, "department" = $2, "location" = $3, "type" = $4, "experienceLevel" = $5, "description" = $6, "highlights" = $7, "requirements" = $8, "isActive" = $9, "updatedAt" = NOW()
        WHERE "id" = $10
        RETURNING *;
      `, [updatedTitle, updatedDept, updatedLoc, updatedType, updatedExp, updatedDesc, updatedHighlights, updatedReq, updatedActive, id])

      return NextResponse.json(updateRes.rows[0])
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error updating job:', error)
    return NextResponse.json({ error: error?.message || 'Failed to update job posting' }, { status: 500 })
  }
}

// DELETE /api/jobs/[id]
// Admin Only: Deletes a job posting
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 403 })
    }

    const { id } = await params

    const client = await getPgClient()
    try {
      await client.query('DELETE FROM "Job" WHERE "id" = $1;', [id])
      return NextResponse.json({ success: true, message: 'Job posting deleted' })
    } finally {
      await client.end().catch(() => {})
    }
  } catch (error: any) {
    console.error('Error deleting job:', error)
    return NextResponse.json({ error: error?.message || 'Failed to delete job posting' }, { status: 500 })
  }
}
